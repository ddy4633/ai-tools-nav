# 修复计划（全量）

## 目标
- 修复 `/tools` 搜索/分类深链不生效的问题。
- 在静态版本中实现评分/提交的本地持久化（`localStorage`）。
- 修复前端高亮逻辑、类型重复与 `any` 等低质量点。
- 补齐 API 参数校验（保留可选的 `/api/tools`）。
- 数据库视图与写入能力作为可选增强方案保留。

## 静态优先说明
- 当前优先静态版本：评分与提交改为本地浏览器保存（`localStorage`）。
- 服务端 API 已移除，数据库写入相关内容仅保留为可选方案。

## 范围
- 前端：查询参数承接、交互修复、类型修正、本地持久化。
- 服务端（可选）：`/api/tools` 参数校验。
- 数据库（可选）：视图与写入表结构，供未来启用。

## 任务清单（含完成状态）
- [x] `/tools` 支持 `search` / `category` / `pricing` 深链参数。
- [x] 评分提交改为本地保存（`localStorage`）。
- [x] 工具提交改为本地保存（`localStorage`）。
- [x] API 限制 `limit` 合法范围，避免异常（可选）。
- [x] 修复搜索高亮逻辑的正则状态问题。
- [x] 清理重复类型定义与 `any`。
- [x] 数据库视图与写入结构（可选增强方案保留）。

## 数据库变更（SQL）
1. **视图层（已完成）**
- `tools_view`：统一字段、派生 `pricing_type / hype_score / tier / viral_coefficient`。
- `categories_view`：补齐 `count / popularity`。

2. **评分落库**
- 新增表 `tool_ratings`（记录每次评分）。
- 触发器自动回写 `tools.rating` 与 `tools.review_count`。
- 说明：静态版本不启用，作为可选增强方案保留。

3. **工具提交落库**
- 新增表 `tool_submissions`（独立于 `tools`，避免未审核内容直接对外展示）。
- 说明：静态版本不启用，作为可选增强方案保留。

## 服务端改动（可选）
- `/api/tools`：`limit` 做范围限制与兜底（可保留）。
- 评分与提交 API 在静态版本中移除。

## 前端改动
- `app/tools/page.tsx`：解析 `searchParams` 并传给 `ToolsClient`。
- `ToolsClient`：支持初始搜索/分类/定价值；分类可接受 slug 或名称。
- `EnhancedSearch`：修复高亮正则的 `g` 状态污染。
- `RatingForm`：改为本地保存（`localStorage`）。
- `SubmitForm`：改为本地保存（`localStorage`）。

## 类型与质量修复
- 移除 `types/tool.ts` 中重复类型。
- `ToolsList` 中 `variants: any` 改为 `Variants`。

## 验证清单
- `npm run build`
- `npm run lint`
- 手测：
  - `/tools?search=xxx` 进入后已默认带搜索。
  - `/tools?category=writing` 或 `/tools?category=AI写作` 都能正确过滤。
  - 提交评分返回成功且本地可查。
  - 提交工具返回成功且本地可查。

## 回滚策略
- 回滚本地保存逻辑，恢复为纯展示页面。
- 若启用数据库增强，删除 `tool_ratings` / `tool_submissions` 及其触发器。
