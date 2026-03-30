# 搜索引擎登录清单 - OCnote 收录提交

**目标网站：** https://ocnote.bvmcreative.com  
**Sitemap 地址：** https://ocnote.bvmcreative.com/sitemap.xml  
**创建时间：** 2026-03-30

---

## 📋 提交清单总览

| 优先级 | 搜索引擎 | 登录网址 | 提交入口 | 验证方式 | 状态 |
|--------|---------|---------|---------|---------|------|
| P0 | Google | https://search.google.com/search-console | 站点地图 | DNS/HTML | ⏳ 待提交 |
| P0 | 百度 | https://ziyuan.baidu.com | 链接提交 | DNS/HTML | ⏳ 待提交 |
| P1 | Bing | https://www.bing.com/webmasters | Sitemaps | DNS/HTML | ⏳ 待提交 |
| P2 | 360 | https://zhanzhang.so.com | Sitemap 提交 | DNS/HTML | ⏳ 待提交 |
| P2 | 搜狗 | https://zhanzhang.sogou.com | Sitemap 提交 | DNS/HTML | ⏳ 待提交 |
| P3 | Yandex | https://webmaster.yandex.com | Индексирование | DNS/HTML | ⏳ 待提交 |
| P3 | Naver | https://searchadvisor.naver.com | Site Submission | DNS/HTML | ⏳ 待提交 |

---

## 🌐 Google Search Console（P0 优先级）

### 登录信息

| 项目 | 内容 |
|------|------|
| **网址** | https://search.google.com/search-console |
| **登录方式** | Google 账号（Gmail） |
| **语言** | 中文/English |
| **需要科学上网** | ✅ 是 |

### 提交流程

**步骤 1：添加网站**
```
1. 登录 Google Search Console
2. 点击"立即开始"
3. 选择"网址前缀"
4. 输入：https://ocnote.bvmcreative.com
5. 点击"继续"
```

**步骤 2：验证所有权（推荐 DNS 验证）**
```
1. 选择"DNS 记录"验证方式
2. 复制 TXT 记录值（如：google-site-verification=abc123xyz）
3. 登录阿里云 DNS 控制台：https://dns.console.aliyun.com
4. 添加 TXT 记录：
   - 主机记录：@
   - 记录类型：TXT
   - 记录值：粘贴复制的验证码
   - TTL：10 分钟
5. 等待 1-10 分钟 DNS 生效
6. 回到 Google Search Console 点击"验证"
```

**步骤 3：提交 Sitemap**
```
1. 验证成功后，进入左侧菜单"站点地图"
2. 在"添加新站点地图"输入框中输入：sitemap.xml
3. 点击"提交"
4. 状态显示"成功"即完成
```

### 验证代码

```html
<!-- Google 验证 meta 标签 -->
<meta name="google-site-verification" content="待添加_Google_验证码" />
```

### 提交后检查

- [ ] 验证状态：已验证
- [ ] Sitemap 状态：成功
- [ ] 已编入索引的网页：等待 3-7 天
- [ ] 搜索表现：等待收录后查看

### 重要链接

| 功能 | 网址 |
|------|------|
| 站点地图 | https://search.google.com/search-console/sitemaps |
| URL 检查 | https://search.google.com/search-console/inspection |
| 搜索表现 | https://search.google.com/search-console/performance |
| 覆盖率报告 | https://search.google.com/search-console/index |

---

## 🌐 百度站长平台（P0 优先级）

### 登录信息

| 项目 | 内容 |
|------|------|
| **网址** | https://ziyuan.baidu.com |
| **登录方式** | 百度账号（需手机号验证） |
| **语言** | 中文 |
| **需要科学上网** | ❌ 否 |

### 提交流程

**步骤 1：添加网站**
```
1. 登录百度站长平台
2. 点击"添加网站"
3. 输入：https://ocnote.bvmcreative.com
4. 点击"确定"
```

**步骤 2：验证所有权（推荐 HTML 文件验证）**
```
1. 选择"HTML 文件验证"
2. 下载验证文件（如：baidu_verify_codeva-abc123.html）
3. 通过 FTP 上传到网站根目录：
   - 主机：121.43.147.73
   - 端口：21
   - 用户名：ocnote
   - 密码：wAG4wJwM2Ei7
   - 路径：/www/wwwroot/ocnote.bvmcreative.com/
4. 访问验证：https://ocnote.bvmcreative.com/baidu_verify_codeva-abc123.html
5. 确认能打开后，回到百度站长平台点击"验证"
```

**步骤 3：提交 Sitemap**
```
1. 验证成功后，进入"数据引入" → "链接提交"
2. 选择"Sitemap"选项卡
3. 输入 Sitemap 地址：https://ocnote.bvmcreative.com/sitemap.xml
4. 点击"提交"
```

**步骤 4（可选）：主动推送 API**
```
1. 获取 API 接口地址（验证后显示）
   格式：http://data.zz.baidu.com/urls?site=xxx&token=xxx
2. 创建 urls.txt 文件，每行一个 URL：
   https://ocnote.bvmcreative.com/
   https://ocnote.bvmcreative.com/article/model-selection
   ...
3. 使用 curl 命令提交：
   curl -H 'Content-Type:text/plain' --data-binary @urls.txt "http://data.zz.baidu.com/urls?site=xxx&token=xxx"
```

### 验证代码

```html
<!-- 百度验证 meta 标签 -->
<meta name="baidu-site-verification" content="待添加_百度_验证码" />
```

### 提交后检查

- [ ] 验证状态：已验证
- [ ] Sitemap 状态：已提交
- [ ] 数据监控：等待 7-14 天
- [ ] 索引量查询：等待收录后查看

### 重要链接

| 功能 | 网址 |
|------|------|
| 链接提交 | https://ziyuan.baidu.com/linksubmit/url |
| 索引量查询 | https://ziyuan.baidu.com/index/index |
| 搜索展现 | https://ziyuan.baidu.com/search/show |
| 移动适配 | https://ziyuan.baidu.com/mobile/adapter |

---

## 🌐 Bing Webmaster Tools（P1 优先级）

### 登录信息

| 项目 | 内容 |
|------|------|
| **网址** | https://www.bing.com/webmasters |
| **登录方式** | Microsoft 账号（Outlook/Hotmail） |
| **语言** | 中文/English |
| **需要科学上网** | ⚠️ 可能需要 |

### 提交流程

**步骤 1：添加网站**
```
1. 登录 Bing Webmaster Tools
2. 点击"Add Site"
3. 输入：https://ocnote.bvmcreative.com
4. 点击"Add"
```

**步骤 2：验证所有权**
```
方式一：XML 文件验证
1. 下载验证文件（如：BingSiteAuth.xml）
2. 通过 FTP 上传到网站根目录
3. 访问验证：https://ocnote.bvmcreative.com/BingSiteAuth.xml
4. 点击"Verify"

方式二：HTML 标签验证
1. 选择"HTML Meta Tag"
2. 复制 meta 标签
3. 添加到网站<head>区域
4. 点击"Verify"

方式三：CNAME 验证
1. 选择"CNAME Authentication"
2. 复制 CNAME 记录值
3. 登录阿里云 DNS 添加 CNAME 记录
4. 等待生效后点击"Verify"
```

**步骤 3：提交 Sitemap**
```
1. 验证成功后，进入"Sitemaps"
2. 点击"Submit a Sitemap"
3. 输入：https://ocnote.bvmcreative.com/sitemap.xml
4. 点击"Submit"
```

### 验证代码

```html
<!-- Bing 验证 meta 标签 -->
<meta name="msvalidate.01" content="待添加_Bing_验证码" />
```

### 提交后检查

- [ ] 验证状态：Verified
- [ ] Sitemap 状态：Submitted
- [ ] Indexed Pages：等待 5-10 天

### 重要链接

| 功能 | 网址 |
|------|------|
| Sitemaps | https://www.bing.com/webmasters/sitemaps |
| URL Submission | https://www.bing.com/webmasters/url-submission-api |
| Search Performance | https://www.bing.com/webmasters/search-performance |
| Index Explorer | https://www.bing.com/webmasters/index-explorer |

---

## 🌐 360 站长平台（P2 优先级）

### 登录信息

| 项目 | 内容 |
|------|------|
| **网址** | https://zhanzhang.so.com |
| **登录方式** | 360 账号（可用手机号注册） |
| **语言** | 中文 |
| **需要科学上网** | ❌ 否 |

### 提交流程

**步骤 1：添加网站**
```
1. 登录 360 站长平台
2. 点击"添加网站"
3. 输入：https://ocnote.bvmcreative.com
4. 点击"确定"
```

**步骤 2：验证所有权**
```
方式一：HTML 文件验证
1. 下载验证文件
2. 上传到网站根目录
3. 点击"验证"

方式二：HTML 标签验证
1. 复制 meta 标签
2. 添加到网站<head>区域
3. 点击"验证"
```

**步骤 3：提交 Sitemap**
```
1. 验证成功后，进入"链接提交"
2. 选择"Sitemap 提交"
3. 输入：https://ocnote.bvmcreative.com/sitemap.xml
4. 点击"提交"
```

### 验证代码

```html
<!-- 360 验证 meta 标签 -->
<meta name="360-site-verification" content="待添加_360_验证码" />
```

### 重要链接

| 功能 | 网址 |
|------|------|
| 链接提交 | https://zhanzhang.so.com/linksubmit |
| 收录查询 | https://zhanzhang.so.com/index |
| 搜索展现 | https://zhanzhang.so.com/performance |

---

## 🌐 搜狗站长平台（P2 优先级）

### 登录信息

| 项目 | 内容 |
|------|------|
| **网址** | https://zhanzhang.sogou.com |
| **登录方式** | 搜狗/搜狐账号 |
| **语言** | 中文 |
| **需要科学上网** | ❌ 否 |

### 提交流程

**步骤 1：添加网站**
```
1. 登录搜狗站长平台
2. 点击"添加网站"
3. 输入：https://ocnote.bvmcreative.com
4. 点击"确定"
```

**步骤 2：验证所有权**
```
方式一：HTML 文件验证
1. 下载验证文件
2. 上传到网站根目录
3. 点击"验证"

方式二：HTML 标签验证
1. 复制 meta 标签
2. 添加到网站<head>区域
3. 点击"验证"
```

**步骤 3：提交 Sitemap**
```
1. 验证成功后，进入"Sitemap 提交"
2. 输入：https://ocnote.bvmcreative.com/sitemap.xml
3. 点击"提交"
```

### 验证代码

```html
<!-- 搜狗验证 meta 标签 -->
<meta name="sogou_site_verification" content="待添加_搜狗_验证码" />
```

### 重要链接

| 功能 | 网址 |
|------|------|
| Sitemap 提交 | https://zhanzhang.sogou.com/sitemap |
| 收录查询 | https://zhanzhang.sogou.com/index |
| 流量分析 | https://zhanzhang.sogou.com/traffic |

---

## 🌐 Yandex Webmaster（P3 优先级，国际流量）

### 登录信息

| 项目 | 内容 |
|------|------|
| **网址** | https://webmaster.yandex.com |
| **登录方式** | Yandex 账号 |
| **语言** | English/Русский |
| **需要科学上网** | ⚠️ 可能需要 |

### 提交流程

**步骤 1：添加网站**
```
1. 登录 Yandex Webmaster
2. 点击"+"添加网站
3. 输入：https://ocnote.bvmcreative.com
4. 点击"Add"
```

**步骤 2：验证所有权**
```
方式一：HTML 文件验证
1. 下载验证文件
2. 上传到网站根目录
3. 点击"Verify"

方式二：DNS 验证
1. 复制 TXT 记录值
2. 登录阿里云 DNS 添加 TXT 记录
3. 等待生效后点击"Verify"
```

**步骤 3：提交 Sitemap**
```
1. 验证成功后，进入"Indexing" → "Sitemap files"
2. 输入：https://ocnote.bvmcreative.com/sitemap.xml
3. 点击"Add"
```

### 重要链接

| 功能 | 网址 |
|------|------|
| Sitemap | https://webmaster.yandex.com/sitemap |
| Indexing | https://webmaster.yandex.com/indexing |
| Search Queries | https://webmaster.yandex.com/queries |

---

## 🌐 Naver Search Advisor（P3 优先级，韩国流量）

### 登录信息

| 项目 | 内容 |
|------|------|
| **网址** | https://searchadvisor.naver.com |
| **登录方式** | Naver 账号 |
| **语言** | 한국어/English |
| **需要科学上网** | ⚠️ 可能需要 |

### 提交流程

**步骤 1：添加网站**
```
1. 登录 Naver Search Advisor
2. 点击"사이트 등록"（Site Registration）
3. 输入：https://ocnote.bvmcreative.com
4. 点击"등록"
```

**步骤 2：验证所有权**
```
方式一：HTML 文件验证
1. 下载验证文件
2. 上传到网站根目录
3. 点击"확인"（Verify）

方式二：DNS 验证
1. 复制 TXT 记录值
2. 登录阿里云 DNS 添加 TXT 记录
3. 等待生效后点击"확인"
```

**步骤 3：提交 Sitemap**
```
1. 验证成功后，进入"색인"（Indexing）→ "Sitemap"
2. 输入：https://ocnote.bvmcreative.com/sitemap.xml
3. 点击"제출"（Submit）
```

---

## 📋 验证代码汇总

将所有验证代码添加到 `index.html` 的 `<head>` 区域：

```html
<!-- 搜索引擎验证 -->
<meta name="google-site-verification" content="待添加_Google_Search_Console_验证码" />
<meta name="baidu-site-verification" content="待添加_百度站长平台_验证码" />
<meta name="msvalidate.01" content="待添加_Bing_Webmaster_验证码" />
<meta name="360-site-verification" content="待添加_360_验证码" />
<meta name="sogou_site_verification" content="待添加_搜狗_验证码" />
<meta name="yandex-verification" content="待添加_Yandex_验证码" />
<meta name="naver-site-verification" content="待添加_Naver_验证码" />
```

---

## 📊 提交进度追踪表

| 搜索引擎 | 账号 | 验证日期 | 验证方式 | Sitemap 提交日期 | 收录数量 | 最后检查 | 负责人 |
|---------|------|---------|---------|----------------|---------|---------|--------|
| Google | | ⏳ | | ⏳ | - | - | |
| 百度 | | ⏳ | | ⏳ | - | - | |
| Bing | | ⏳ | | ⏳ | - | - | |
| 360 | | ⏳ | | ⏳ | - | - | |
| 搜狗 | | ⏳ | | ⏳ | - | - | |
| Yandex | | ⏳ | | ⏳ | - | - | |
| Naver | | ⏳ | | ⏳ | - | - | |

---

## ⏱️ 收录时间参考

| 搜索引擎 | 验证时间 | Sitemap 抓取 | 开始收录 | 稳定收录 |
|---------|---------|------------|---------|---------|
| Google | 即时 | 1-3 天 | 3-7 天 | 2-4 周 |
| 百度 | 即时 | 3-7 天 | 7-14 天 | 4-8 周 |
| Bing | 即时 | 2-5 天 | 5-10 天 | 3-6 周 |
| 360 | 即时 | 3-7 天 | 7-14 天 | 4-8 周 |
| 搜狗 | 即时 | 3-7 天 | 7-14 天 | 4-8 周 |
| Yandex | 即时 | 3-7 天 | 7-14 天 | 4-8 周 |
| Naver | 即时 | 5-10 天 | 10-21 天 | 6-10 周 |

---

## ⚠️ 注意事项

### 通用注意事项

1. **网址格式统一**
   - 始终使用 `https://ocnote.bvmcreative.com`
   - 不要混用 `http://` 和 `https://`
   - 不要加末尾斜杠 `/`

2. **验证方式选择**
   - 推荐 DNS 验证（一次性永久有效）
   - HTML 文件验证需要保持文件存在
   - HTML 标签验证需要代码不变动

3. **Sitemap 提交**
   - 提交后 24-48 小时开始抓取
   - 定期更新 sitemap（每次新增内容后）
   - 检查收录状态

4. **收录时间**
   - 不要频繁提交（会被视为垃圾）
   - 保持内容更新会加速收录
   - 高质量外链有助于收录

### 常见问题

**Q: 验证失败怎么办？**
A: 检查 DNS 是否生效（可用 `nslookup -qt=txt ocnote.bvmcreative.com`），或确认 HTML 文件能否访问

**Q: 提交 sitemap 后显示错误？**
A: 检查 sitemap 网址能否直接访问，格式是否正确

**Q: 多久能看到收录？**
A: 通常 1-2 周，保持内容更新会加速收录

**Q: 需要每天提交吗？**
A: 不需要，sitemap 提交一次即可，搜索引擎会定期抓取更新

**Q: 如何检查收录情况？**
A: 使用 `site:ocnote.bvmcreative.com` 在对应搜索引擎搜索

---

## 📞 需要协助

如需协助完成验证或提交，请联系：

- **技术负责人：** Jason Kao
- **联系方式：** 企业微信 @kaojasonchaoyuan
- **文档位置：** `/Users/jasonkao/Desktop/workscript/html/ocnote/search-engine-submit-checklist.md`

---

**文档版本：** v1.0  
**创建时间：** 2026-03-30  
**最后更新：** 2026-03-30  
**维护人：** Jason Kao
