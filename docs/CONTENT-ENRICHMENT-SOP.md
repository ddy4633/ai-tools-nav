# 工具详情内容增强 SOP

## 目标

把工具页从“只有一句话简介”升级成“有详细介绍 + 站外评价摘要 + 可持续批量维护”的内容资产。

## 一、单个工具必须包含的内容

每个工具至少补齐以下字段：

- `description`：一句话定位，解决“这是什么”
- `reason`：一句推荐语，解决“为什么值得看”
- `fullReview`：2-4 段详细介绍，解决“适合谁、强在哪、弱在哪”
- `priceRange`：价格或使用门槛说明
- `features`：3-5 个核心功能
- `pros`：3-5 个优点
- `cons`：2-4 个限制
- `alternatives`：2-3 个替代工具
- `reviewSources`：至少 2 条来源化摘要

## 二、来源规则

### 2.1 优先级

1. **官方产品页 / 官方文档**：确认定位、能力边界、计费与功能描述
2. **大站测评 / 用户评价平台**：补“外部怎么评价它”
3. **行业媒体 / 榜单文章**：补趋势、典型场景与市场反馈

### 2.2 推荐来源池

- 官方站点
- `G2`
- `Gartner Peer Insights`
- `Capterra`
- `TechRadar`
- `Tom's Guide`
- `Wired`
- `Zapier`
- `Product Hunt`
- `GitHub`（适用于开源工具）
- 国内工具可补：`SCMP`、`36Kr`、厂商官方博客、主流科技媒体

### 2.3 写法要求

- 不要长摘抄，统一写成**中文精简归纳**
- 不要把广告文案直接当结论
- 官方来源负责“它说自己是什么”
- 第三方来源负责“别人怎么评价它”
- 若找不到高质量第三方来源，不要硬编，先只放官方来源并在待办里标记

## 三、执行步骤

### 3.1 选工具

优先顺序：

1. 首页推荐 / 编辑精选 / 搜索量高的工具
2. 当前详情页内容为空或较弱的工具
3. 分类页头部曝光高的工具

### 3.2 采集信息

每个工具最少采集：

- 官方产品页 1 个
- 第三方测评或评价页 1 个
- 如工具很热门，再补第 3 个来源

### 3.3 写入规则

- `fullReview`：站在真实使用场景写，不写空话
- `pros` / `cons`：写可感知的取舍，不写“功能强大”这种空话
- `reviewSources.summary`：每条 1 句话，突出明确结论

## 四、当前批次策略

### 已完成：首批 10 个工具

- `kimi`
- `qwen`
- `doubao`
- `copy-ai`
- `writesonic`
- `quillbot`
- `grammarly`
- `v0`
- `adobe-firefly`
- `leonardo`

### 已完成：第二批 11 个工具

- `flux`
- `kling`
- `tongyi-wanxiang`
- `pika`
- `luma-dream-machine`
- `kling-video`
- `hailuo`
- `vidu`
- `synthesia`
- `murf`
- `speechify`

### 已完成：第三批 10 个工具

- `tongyi-tingwu`
- `whisper`
- `beautiful-ai`
- `mem`
- `fireflies`
- `reclaim`
- `motion`
- `galileo-ai`
- `uizard`
- `remove-bg`

### 已完成：第四批 10 个工具

- `otter`
- `adobe-podcast`
- `tome`
- `gamma`
- `canva`
- `figma-ai`
- `vectorizer`
- `notion`
- `obsidian`
- `readwise`

### 已完成：第五批 10 个工具

- `pocket`
- `raindrop`
- `mymind`
- `chatgpt-data`
- `claude-code`
- `julius`
- `chatcsv`
- `formula-bot`
- `lark-base`
- `elevenlabs`

### 已完成：第六批 10 个工具

- `chatgpt`
- `claude`
- `gemini`
- `perplexity`
- `deepseek`
- `notion-ai`
- `jasper`
- `midjourney`
- `dalle3`
- `stable-diffusion`

### 已完成：第七批 5 个工具

- `runway`
- `heygen`
- `synclabs`
- `suno`
- `udio`

### 已完成：第八批 10 个工具

- `github-copilot`
- `cursor`
- `codeium`
- `lovable`
- `tldraw`
- `windsurf`
- `bolt-new`
- `v0-dev`
- `replit-agent`
- `cline`

### 已完成：第九批 10 个工具

- `grok3`
- `qwen25max`
- `kimi-k15`
- `manus`
- `ideogram`
- `sora`
- `gemini-2-pro`
- `claude-37-sonnet`
- `openai-operator`
- `perplexity-deep-research`

### 已完成：第十批 7 个工具

- `felvin`
- `recraft-v3`
- `kling-ai`
- `kimi-k25`
- `hunyuan-video`
- `step-1o`
- `flowise`

### 已完成：第十一批 6 个工具

- `fathom-ai`
- `google-vids`
- `softr`
- `figma-for-agents`
- `higgsfield`
- `genspark`

### 下一批建议

`rawTools` 中的条目已全部完成首轮增强。后续重点转为“高热度工具复查”和“链接/价格/版本状态维护”：

- `ChatGPT`
- `Claude`
- `Gemini`
- `Genspark`
- `Fathom`
- `Google Vids`
- `Higgsfield`
- `Softr`
- `Figma for Agents`
- `Kling AI`

## 五、上线前检查

- 工具详情页是否展示“详细评测”
- 工具详情页是否展示“站外评价摘要”
- 来源链接是否能正常打开
- `fullReview` 是否有明显广告腔或事实错误
- `pros` / `cons` 是否具体、有区分度

## 六、长期维护建议

- 每轮只补 8-12 个工具，保证质量稳定
- 优先补首页、编辑精选、高转化工具
- 新工具先上简版，再在 48 小时内补详细版
- 已补工具每月复查一次价格、功能和来源链接
