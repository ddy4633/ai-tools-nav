# ai.poph163.com 巡检与修复报告（2026-03-06）

## 1. 巡检背景

- **巡检时间**：2026-03-06
- **巡检域名**：`https://ai.poph163.com`
- **巡检范围**：首页、工具列表页、`/robots.txt`、`/sitemap.xml`、`/api/health`、页面元数据、控制台与网络请求
- **巡检方式**：线上访问核验 + 本地代码回溯 + 本地构建验证

## 2. 问题清单

### P1：`robots.txt` 与 `sitemap.xml` 暴露旧 Dokploy 域名

- **现象**：线上 `https://ai.poph163.com/robots.txt` 和 `https://ai.poph163.com/sitemap.xml` 返回内容仍指向 `https://aitoolsnav-web.dokploy.vibecodinghub.org`
- **影响**：
  - 搜索引擎可能继续抓取旧域名，造成收录分散
  - 新域名权重沉淀受影响
  - 站点地图失真，影响索引效率
- **根因**：仓库中同时存在 `app/robots.ts`、`app/sitemap.ts` 和 `public/robots.txt`、`public/sitemap.xml`；最终线上命中的是 `public/` 中遗留静态文件
- **修复结论**：删除 `public/robots.txt` 与 `public/sitemap.xml`，统一由 App Router 动态生成

### P1：页面头部存在搜索引擎验证占位值

- **现象**：页面输出了 `google-site-verification-code`、`baidu-site-verification-code`、`bing-verification-code` 这类占位内容
- **影响**：
  - 误导后续运维，以为已完成验证
  - 给搜索引擎与站长平台留下错误配置
- **根因**：`app/layout.tsx` 写死了演示用 meta 标签
- **修复结论**：改为环境变量驱动；未配置时不输出任何验证 meta

### P2：页脚社交链接为占位地址

- **现象**：页脚 GitHub 指向 `https://github.com`，Twitter 指向 `https://twitter.com`
- **影响**：
  - 用户点击后无法进入项目或品牌主页
  - 降低站点可信度
- **根因**：组件中写死了通用首页地址
- **修复结论**：改为站点配置驱动；GitHub 默认指向项目仓库，X/Twitter 未配置时不展示

### P3：工具列表搜索需要回车，缺少实时过滤反馈

- **现象**：在 `/tools` 输入关键词后，列表不会立即过滤，必须回车或点建议项
- **影响**：
  - 用户会误以为搜索失效
  - 列表页交互反馈偏弱
- **根因**：`EnhancedSearch` 只在提交表单时调用 `onSearch`
- **修复结论**：增加 200ms 防抖的实时过滤，同时保留回车提交与历史记录逻辑

### P3：部分页面元数据未统一使用正式域名

- **现象**：`/submit`、`/blog/top-ai-tools-2026` 等页面缺少统一的 canonical / openGraph URL 规范
- **影响**：SEO 一致性不足，分享卡片与规范链接可能不稳定
- **根因**：站点 URL 分散硬编码
- **修复结论**：新增 `lib/site.ts` 统一站点配置与 URL 生成逻辑

## 3. 修复拆解

### 3.1 配置层

- 新增 `lib/site.ts`，集中维护站点域名、社交链接、联系邮箱、站长平台验证参数
- 将站点 URL 构造统一收口到 `buildSiteUrl()`

### 3.2 SEO 层

- `app/layout.tsx` 增加 `metadataBase`
- 站长平台验证改为环境变量驱动
- `app/robots.ts`、`app/sitemap.ts` 改为统一走站点配置
- 将 `top-ai-tools-2026` 补充进 sitemap
- 修正 `submit`、`tools`、工具详情页、`top-ai-tools-2026` 的 canonical / OG URL

### 3.3 体验层

- 工具搜索改成实时过滤，减少“输入后无反应”的误判
- 页脚社交链接从占位地址改为真实可维护配置

## 4. 本次变更文件

- `lib/site.ts`
- `app/layout.tsx`
- `app/robots.ts`
- `app/sitemap.ts`
- `app/submit/page.tsx`
- `app/tools/page.tsx`
- `app/tools/[id]/page.tsx`
- `app/blog/top-ai-tools-2026/page.tsx`
- `components/layout/Footer.tsx`
- `components/enhanced-search.tsx`
- `.env.example`
- 删除 `public/robots.txt`
- 删除 `public/sitemap.xml`

## 5. 验证结果

- 本地执行 `npm run build` 通过
- 线上确认首页可访问，`/api/health` 正常返回 `status: ok`
- 已确认当前线上问题来自旧静态文件覆盖，不是应用构建失败

## 6. 上线 SOP

### 6.1 部署前

1. 拉取最新代码
2. 检查环境变量：
   - `NEXT_PUBLIC_SITE_URL=https://ai.poph163.com`
   - `NEXT_PUBLIC_GITHUB_URL`
   - `NEXT_PUBLIC_CONTACT_EMAIL`
   - 如已申请站长平台验证，再配置：
     - `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
     - `NEXT_PUBLIC_BAIDU_SITE_VERIFICATION`
     - `NEXT_PUBLIC_BING_SITE_VERIFICATION`
3. 执行本地构建：`npm run build`

### 6.2 部署后立即核验

1. 检查 robots：

   ```bash
   curl -s https://ai.poph163.com/robots.txt
   ```

   预期：`Sitemap` 指向 `https://ai.poph163.com/sitemap.xml`

2. 检查 sitemap：

   ```bash
   curl -s https://ai.poph163.com/sitemap.xml | head -n 20
   ```

   预期：`<loc>` 全部为 `https://ai.poph163.com/...`

3. 检查首页 canonical 和 OG：

   ```bash
   curl -s https://ai.poph163.com | rg "canonical|og:url|google-site-verification|baidu-site-verification|msvalidate.01"
   ```

   预期：
   - canonical 为正式域名
   - 未配置验证参数时，不应出现占位码

4. 检查工具搜索：
   - 打开 `https://ai.poph163.com/tools`
   - 输入 `deepseek`
   - 预期列表即时收敛到相关工具，无需回车

5. 检查页脚外链：
   - GitHub 应跳转到项目仓库或品牌主页
   - X/Twitter 未配置时不展示
   - Email 应可正常唤起邮件客户端

### 6.3 搜索平台侧后续动作

1. 将新版 `sitemap.xml` 提交到 Google Search Console
2. 将新版 `sitemap.xml` 提交到 Bing Webmaster Tools
3. 如使用百度收录，再同步提交百度站长平台
4. 观察 3~7 天索引与抓取趋势是否回流到 `ai.poph163.com`

## 7. 回滚方案

- 若上线后出现异常，优先回滚到上一个稳定镜像/提交
- 回滚后立即复查：
  - `robots.txt`
  - `sitemap.xml`
  - `/tools` 搜索
  - 首页 metadata
- 若只是环境变量遗漏，不必回滚代码，补齐环境变量并重新部署即可
