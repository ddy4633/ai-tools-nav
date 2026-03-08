# 商业化运营 SOP

- 日期：2026-03-08
- 项目：`ai-tools-nav`
- 适用对象：老板、运营、BD、内容同学、开发同学
- 目标：在不大改现有 UI 的前提下，把当前站点已经落地的商业化能力真正跑起来，形成“上资源 → 出曝光 → 有点击/留资 → 跟进成交”的最小闭环。

## 一、 当前已经可以上线的商业化位

### 1. 联盟 / 合作跳转

当前站内以下入口已经支持优先跳转 `affiliate_url`：

- 工具详情页主 CTA：`app/tools/[id]/page.tsx`
- 首页精选位：`components/home/FeaturedTools.tsx`
- 首页趋势位：`components/home/TrendingTools.tsx`
- 首页编辑推荐：`components/home/EditorPicks.tsx`
- 首页赞助区：`components/home/SponsoredTools.tsx`
- 工具列表页：`app/tools/ToolsClient.tsx`
- 分类页模板：`components/categories/CategoryToolsPage.tsx`
- 热门页：`app/trending/page.tsx`
- 高意图博客页：
  - `app/blog/ai-writing-tools-free/page.tsx`
  - `app/blog/ai-art-generators/page.tsx`
  - `app/blog/top-ai-tools-2026/page.tsx`

统一 CTA 组件：`components/ui/ToolPrimaryCta.tsx`

### 2. 赞助位 / 商务置顶

当前已经支持以下赞助能力：

- 首页赞助区块：`components/home/SponsoredTools.tsx`
- 工具赞助标识：`components/ui/SponsorBadge.tsx`
- 赞助筛选与排期：`lib/monetization/sponsored.ts`
- 赞助工具 API：`/api/tools?type=sponsored`

支持的赞助字段：

- `is_sponsored`
- `sponsor_type`
- `sponsor_label`
- `sponsor_rank`
- `sponsor_start_at`
- `sponsor_end_at`

### 3. 付费提交 / 商务线索

当前提交页已经不再是本地假提交，而是走真实接口：

- 页面：`app/submit/page.tsx`
- 表单：`app/submit/SubmitForm.tsx`
- API：`app/api/submissions/route.ts`
- Provider：`lib/submission/provider.ts`

已支持三种方案：

- `free`：免费收录
- `priority`：加急评估
- `sponsored`：赞助合作

### 4. Newsletter 留资

当前 Newsletter 已支持真实后端结构：

- 首页 Newsletter：`components/home/NewsletterSection.tsx`
- 通用表单：`components/newsletter-form.tsx`
- API：`app/api/newsletter/route.ts`
- Provider：`lib/newsletter/provider.ts`

当前 provider：

- `noop`
- `webhook`
- `buttondown`

### 5. 点击与行为埋点

当前点击埋点统一经过：

- 前端埋点：`lib/tracking.ts`
- 外链点击封装：`components/ui/TrackedExternalLink.tsx`
- 服务端事件接收：`app/api/track/route.ts`

当前已重点覆盖：

- `outbound_click`
- `newsletter_subscribe`
- `tool_submission`

---

## 二、 配置清单

### 1. 环境变量

在部署环境中配置以下变量：

```bash
NEWSLETTER_PROVIDER=noop
NEWSLETTER_WEBHOOK_URL=
NEWSLETTER_BUTTONDOWN_API_KEY=
ANALYTICS_WEBHOOK_URL=
NEXT_PUBLIC_SPONSORED_TOOL_IDS=
SUBMISSIONS_PROVIDER=noop
SUBMISSIONS_WEBHOOK_URL=
```

### 2. 推荐最小上线配置

如果今天就要上线，建议按下面最小组合：

```bash
ANALYTICS_WEBHOOK_URL=https://your-webhook.example.com/track
NEWSLETTER_PROVIDER=webhook
NEWSLETTER_WEBHOOK_URL=https://your-webhook.example.com/newsletter
SUBMISSIONS_PROVIDER=webhook
SUBMISSIONS_WEBHOOK_URL=https://your-webhook.example.com/submissions
NEXT_PUBLIC_SPONSORED_TOOL_IDS=chatgpt,claude
```

说明：

- 没有正式邮件平台时，Newsletter 先走 `webhook`
- 没有 CRM 时，商务提交先接飞书/企业微信/Zapier/Make
- 没有完善后台时，赞助位先用 `NEXT_PUBLIC_SPONSORED_TOOL_IDS` 快速上线

---

## 三、 运营字段维护规范

### 1. `tools` 表 / 内容数据必须维护的字段

至少保证以下字段可用：

- `id`
- `name`
- `category`
- `categorySlug` / `category_slug`
- `website`
- `affiliate_url`（如有商业合作）

如果要上赞助位，还要补：

- `is_sponsored = true`
- `sponsor_type`
- `sponsor_label`
- `sponsor_rank`
- `sponsor_start_at`
- `sponsor_end_at`

### 2. `sponsor_type` 的建议用法

- `homepage_spotlight`：首页赞助位
- `category_spotlight`：分类页赞助位
- `newsletter_spotlight`：周报赞助位
- `featured_listing`：推荐列表中的商务置顶

### 3. `sponsor_rank` 的建议规则

- `1~3`：最强曝光位
- `10~20`：普通商务位
- `999`：默认末尾

### 4. 排期填写规范

- `sponsor_start_at`：使用完整时间，如 `2026-03-10T00:00:00+08:00`
- `sponsor_end_at`：使用完整时间，如 `2026-03-31T23:59:59+08:00`
- 不填开始时间：默认立即生效
- 不填结束时间：默认长期展示

---

## 四、 日常操作 SOP

### SOP A：给某个工具挂联盟链接

适用场景：

- 有 affiliate 链接
- 有邀请码链接
- 有合作落地页

操作步骤：

1. 在工具数据源或 `tools` 表中找到该工具。
2. 补充 `affiliate_url`。
3. 保留 `website` 不变，`affiliate_url` 只作为商业跳转优先地址。
4. 发布后验证以下页面是否优先跳合作链接：
   - 工具详情页
   - 首页精选 / 趋势 / 编辑推荐
   - 工具列表页
   - 分类页
   - 相关博客页
5. 点击后确认 `/api/track` 是否收到 `outbound_click` 事件。

验收标准：

- 页面按钮文案自动变成“访问合作链接”或“合作链接”
- 跳转地址为 `affiliate_url`
- 埋点中 `isAffiliate = true`

### SOP B：上线首页赞助位

适用场景：

- 老板要求快速给赞助客户上线曝光
- 还没有做完整后台

有两种方式：

#### 方式 1：最快方式，用环境变量

1. 配置 `NEXT_PUBLIC_SPONSORED_TOOL_IDS=tool-a,tool-b,tool-c`
2. 重新部署站点
3. 首页会根据 ID 顺序展示赞助工具

适合：

- 快速试投
- 紧急上线
- 技术支持有限时

#### 方式 2：标准方式，用数据库字段

1. 给工具补字段：
   - `is_sponsored = true`
   - `sponsor_type = homepage_spotlight`
   - `sponsor_rank = 1`
   - `sponsor_label = 首页赞助`
   - `sponsor_start_at`
   - `sponsor_end_at`
2. 发布后访问首页确认展示。
3. 点击按钮确认有 `outbound_click` 埋点。

验收标准：

- 首页显示在 `SponsoredTools` 区块
- 已过期的赞助位自动不展示
- 多个赞助位按 `sponsor_rank` 升序排序

### SOP C：给分类页安排商务位

适用场景：

- 某个客户只买“AI 编程”或“AI 写作”分类曝光

操作步骤：

1. 工具补充：
   - `is_sponsored = true`
   - `sponsor_type = category_spotlight`
   - `categorySlug` / `category_slug` 正确
2. 使用 API 验证：

```bash
/api/tools?type=sponsored&category=code&sponsor_type=category_spotlight&active_only=true&limit=10
```

3. 返回结果正确后，再安排前台展示位或给前端接该接口。

说明：

- 当前 API 已经支持按 `category`、`sponsor_type`、`active_only` 组合筛选
- 这一步非常适合下一阶段接管理后台或运营面板

### SOP D：承接加急收录 / 赞助合作线索

操作步骤：

1. 设置 `SUBMISSIONS_PROVIDER=webhook`
2. 设置 `SUBMISSIONS_WEBHOOK_URL`
3. 提交页选择：
   - 免费收录
   - 加急评估
   - 赞助合作
4. 若选择商务方案，表单会要求填写预算区间。
5. webhook 侧根据 `submissionType` 分发给不同群或 CRM。

建议 webhook 侧最少做以下规则：

- `free` → 内容审核池
- `priority` → BD/运营优先跟进
- `sponsored` → 销售/老板直接跟进

验收标准：

- 表单提交后前端提示成功
- `/api/submissions` 返回 `success: true`
- webhook 能收到完整字段
- 埋点存在 `tool_submission`

### SOP E：接通 Newsletter 留资

#### 方案 1：最快接 webhook

```bash
NEWSLETTER_PROVIDER=webhook
NEWSLETTER_WEBHOOK_URL=https://your-webhook.example.com/newsletter
```

适合：

- 暂时没有邮件系统
- 先把留资导到飞书、多维表格、Google Sheet

#### 方案 2：接 Buttondown

```bash
NEWSLETTER_PROVIDER=buttondown
NEWSLETTER_BUTTONDOWN_API_KEY=bd_xxx
```

适合：

- 已经准备做邮件内容运营
- 想用轻量邮件平台尽快起步

验收标准：

- 首页 / 通用表单可正常提交
- `/api/newsletter` 返回成功
- 埋点存在 `newsletter_subscribe`

### SOP F：检查埋点是否正常

检查链路：

1. 页面点击合作链接
2. 浏览器发起 `/api/track`
3. 服务端将事件记录或转发到 `ANALYTICS_WEBHOOK_URL`
4. 分析端应至少保留以下字段：
   - `name`
   - `occurredAt`
   - `payload.placement`
   - `payload.toolId`
   - `payload.toolName`
   - `payload.targetUrl`
   - `payload.isAffiliate`
   - `path`

建议首批重点看这些 placement：

- `tool_detail_primary_cta`
- `featured_primary_cta`
- `trending_primary_cta`
- `tools_list_primary_cta`
- `category_page_primary_cta`
- `blog_writing_primary_cta`
- `blog_art_primary_cta`
- `blog_top_2026_primary_cta`
- `home_sponsored_primary_cta`

---

## 五、 当前 API 用法

### 1. 拉取所有赞助工具

```bash
/api/tools?type=sponsored&limit=10
```

### 2. 拉取首页赞助位

```bash
/api/tools?type=sponsored&sponsor_type=homepage_spotlight&active_only=true&limit=3
```

### 3. 拉取分类赞助位

```bash
/api/tools?type=sponsored&sponsor_type=category_spotlight&category=code&active_only=true&limit=5
```

### 4. 拉取某分类下的普通工具

```bash
/api/tools?type=all&category=writing&limit=20
```

说明：

- `category` 支持分类 slug 或分类名称
- `active_only=false` 可用于预览未来排期或已过期素材
- `sponsor_type=all` 可查看全部赞助位

---

## 六、 老板视角的最小上线顺序

### 第 1 天

- 给 10~20 个高转化工具补 `affiliate_url`
- 开启 `ANALYTICS_WEBHOOK_URL`
- 首页先配置 1~3 个赞助工具

### 第 2 天

- 接通 `SUBMISSIONS_WEBHOOK_URL`
- 提交页开始承接“加急评估 / 赞助合作”
- 让 BD 或老板每天查看商务线索

### 第 3 天

- 接通 Newsletter provider
- 开始积累邮件订阅用户
- 尝试首个周报赞助或工具合集广告

---

## 七、 上线前检查清单

### 内容侧

- 工具名称、描述、分类无误
- 所有商业化工具都填写了 `website`
- 有合作链接的工具都填写了 `affiliate_url`
- 赞助工具的排期无误

### 页面侧

- 首页赞助区正常显示
- 工具详情页 CTA 正常跳转
- 列表页 / 分类页 / 博客页 CTA 正常显示
- 提交页可正常提交
- Newsletter 可正常提交

### 数据侧

- `/api/track` 正常接收事件
- `/api/submissions` 正常返回成功
- `/api/newsletter` 正常返回成功
- `/api/tools?type=sponsored` 返回正确数据

### 商务侧

- 谁负责查看线索已经明确
- 谁负责补赞助位内容已经明确
- 合作链接归因规则已经明确
- 报价、赞助周期、展示位置已对齐

---

## 八、 下一阶段建议

### P1

- 做一个最小后台：管理 `affiliate_url`、赞助排期、排序
- 在更多专题页和博客页补充商业化 CTA
- 给 `submissions` 增加 UTM 来源透传

### P2

- 接 PostHog / Mixpanel 做转化漏斗
- 增加 Newsletter 广告位管理
- 增加赞助位曝光统计与结案报告

### P3

- 做报价页 / 赞助招商页
- 自动生成商务周报
- 把高转化页面做成套餐化销售
