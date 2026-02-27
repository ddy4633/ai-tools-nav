# 第四轮迭代计划

## 目标
实现用户评分系统和搜索功能增强

## 任务清单

### 任务 1: 用户评分系统
- [ ] 创建评分组件 (StarRating)
- [ ] 在工具详情页显示平均评分
- [ ] 添加评分提交功能
- [ ] 更新数据库 schema (添加 ratings 表)
- [ ] 计算并缓存工具平均评分

### 任务 2: 搜索功能增强
- [ ] 添加搜索建议 (autocomplete)
- [ ] 实现搜索历史记录
- [ ] 支持拼音搜索
- [ ] 搜索结果高亮匹配文本
- [ ] 空搜索结果友好提示

### 任务 3: Newsletter 订阅
- [ ] 创建订阅表单组件
- [ ] 添加邮箱验证
- [ ] 存储订阅者信息到数据库
- [ ] 发送欢迎邮件 (可选)

## 数据库变更

```sql
-- 评分表
CREATE TABLE ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id UUID REFERENCES tools(id),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP DEFAULT NOW()
);

-- 订阅者表
CREATE TABLE subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  subscribed_at TIMESTAMP DEFAULT NOW(),
  status VARCHAR(50) DEFAULT 'active'
);

-- 工具表添加平均评分字段
ALTER TABLE tools ADD COLUMN average_rating DECIMAL(2,1) DEFAULT 0;
ALTER TABLE tools ADD COLUMN rating_count INTEGER DEFAULT 0;
```

## 验收标准
- [ ] 用户可以给工具打 1-5 星评分
- [ ] 工具详情页显示平均评分和评分人数
- [ ] 搜索框有自动补全功能
- [ ] Newsletter 订阅表单可用
- [ ] 所有功能响应式适配

## 预计时间
2-3 小时

---
**创建时间**: 2026-02-27
**状态**: 计划中
