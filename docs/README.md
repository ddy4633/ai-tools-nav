# 文档索引

当前仓库的文档按“核心文档 / 专题文档 / 历史归档”三层整理，避免根目录继续堆积大量 Markdown 文件。

## 核心文档

- `docs/PROJECT.md`：项目说明与范围
- `docs/API.md`：接口与数据约定
- `docs/DATABASE.md`：数据库设计与初始化说明
- `docs/DEPLOY.md`：部署说明
- `docs/CHANGELOG.md`：更新日志

## 专题文档

- `docs/DESIGN-IMPROVEMENTS-6D.md`：6 维度设计改进
- `docs/EXECUTIVE-SUMMARY.md`：执行摘要
- `docs/ITERATION-EXECUTION-PLAN.md`：迭代执行计划
- `docs/ITERATION-EXECUTION-REPORT-2026-03-04.md`：执行报告
- `docs/ITERATION-RESEARCH-REPORT-2026-03-04.md`：调研报告
- `docs/TASK-BREAKDOWN-2026-03-04.md`：任务拆解
- `docs/TASK-BREAKDOWN-UPDATED.md`：更新后的任务拆解
- `docs/iteration-reports/`：阶段性迭代报告
- `docs/research/`：研究文档
- `research/`：早期调研资料
- `reviews/`：评审记录

## 历史归档

- `docs/archive/legacy/`：原先散落在根目录的历史方案、设计、复盘与草稿
- `docs/archive/2026-03-04/`：2026-03-04 这一轮自动迭代产生的报告与调研归档

## 维护约定

- 新的项目说明、部署、设计、执行类文档，优先放到 `docs/` 下对应主题目录。
- 自动生成的阶段性报告，优先放到 `docs/archive/<日期>/` 或 `docs/iteration-reports/`。
- 根目录默认只保留运行代码、构建配置与 `README.md`。
