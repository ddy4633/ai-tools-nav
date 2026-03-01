# 修改文件清单

## Phase 5 代码落地 - 修改详情

### 1. 重构 ToolsList.tsx (P0)
**文件**: `components/tools/ToolsList.tsx`
**变更**:
- 背景色从 `bg-white` 改为 `bg-bg-primary`
- 卡片背景从 `bg-white` 改为 `bg-bg-card`
- 边框颜色统一为 `border-border-card`
- 文字颜色统一为 `text-text-primary/secondary`
- 按钮样式更新为霓虹风格
- 添加 Framer Motion 动画
- 添加空状态动画

### 2. 创建页面过渡动画 (P0)
**新文件**: `components/transitions/PageTransition.tsx`
**功能**:
- 使用 Framer Motion AnimatePresence
- 页面淡入淡出 + 缩放效果
- 自定义缓动函数

**新文件**: `app/template.tsx`
**功能**:
- 应用页面过渡动画到所有页面

### 3. 更新骨架屏组件 (P1)
**文件**: `components/ui/Skeleton.tsx`
**变更**:
- 更新背景色为 `bg-bg-hover`
- 更新卡片骨架屏为深色主题
- 添加 `ThreeColumnGridSkeleton` 组件
- 添加 `CategoryCardSkeleton` 组件

## 文件变更统计

| 类型 | 数量 | 文件 |
|------|------|------|
| 修改 | 2 | ToolsList.tsx, Skeleton.tsx |
| 新增 | 2 | PageTransition.tsx, template.tsx |

## 验证清单

- [ ] ToolsList 样式与主题一致
- [ ] 页面切换有动画效果
- [ ] 骨架屏显示正常
- [ ] 类型检查通过
- [ ] 构建成功
