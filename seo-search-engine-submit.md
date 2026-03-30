# 搜索引擎登录攻略 - OCnote 收录指南

**目标网站：** https://ocnote.bvmcreative.com  
**适用对象：** 技术/运营同事  
**预计时间：** 30-45 分钟

---

## 📋 任务清单

| 优先级 | 搜索引擎 | 网址 | 状态 |
|--------|---------|------|------|
| P0 | Google Search Console | https://search.google.com/search-console | ⏳ 待提交 |
| P0 | 百度站长平台 | https://ziyuan.baidu.com | ⏳ 待提交 |
| P1 | Bing Webmaster Tools | https://www.bing.com/webmasters | ⏳ 待提交 |
| P2 | 360 站长平台 | https://zhanzhang.so.com | ⏳ 待提交 |
| P2 | 搜狗站长平台 | https://zhanzhang.sogou.com | ⏳ 待提交 |

---

## 🌐 Google Search Console

### 第 1 步：登录/注册

**网址：** https://search.google.com/search-console

1. 使用 Google 账号登录（需科学上网）
2. 点击"立即开始"
3. 选择"网址前缀"

### 第 2 步：添加网站

**输入网址：** `https://ocnote.bvmcreative.com`

⚠️ 注意：必须包含 `https://`，不要加末尾斜杠

### 第 3 步：验证所有权（推荐 DNS 验证）

**方式一：DNS 验证（推荐，一次性永久有效）**

1. 选择"DNS 记录"验证方式
2. 复制 TXT 记录值（如：`google-site-verification=abc123xyz`）
3. 登录阿里云 DNS 控制台
4. 添加 TXT 记录：
   - 主机记录：`@`
   - 记录类型：`TXT`
   - 记录值：粘贴复制的验证码
5. 等待 DNS 生效（通常 1-10 分钟）
6. 回到 Google Search Console 点击"验证"

**方式二：HTML 标签验证（快速，但代码变动会失效）**

1. 选择"HTML 标签"验证方式
2. 复制 meta 标签（如：`<meta name="google-site-verification" content="abc123xyz" />`）
3. 将标签添加到网站 `<head>` 区域
4. 点击"验证"

### 第 4 步：提交 Sitemap

1. 验证成功后，进入左侧菜单"站点地图"
2. 输入 sitemap 网址：`sitemap.xml`
3. 点击"提交"
4. 状态显示"成功"即完成

### 第 5 步：后续优化

- 每周检查"覆盖率"报告
- 查看"搜索分析"了解关键词表现
- 提交重要 URL 进行索引

**预计耗时：** 10-15 分钟

---

## 🌐 百度站长平台

### 第 1 步：登录/注册

**网址：** https://ziyuan.baidu.com

1. 使用百度账号登录
2. 没有账号需先注册（需手机号验证）
3. 登录后点击"添加网站"

### 第 2 步：添加网站

**输入网址：** `https://ocnote.bvmcreative.com`

### 第 3 步：验证所有权

**方式一：HTML 文件验证（推荐）**

1. 下载验证文件（如：`baidu_verify_codeva-abc123.html`）
2. 通过 FTP 上传到网站根目录
3. 访问 `https://ocnote.bvmcreative.com/baidu_verify_codeva-abc123.html` 确认能打开
4. 回到百度站长平台点击"验证"

**方式二：HTML 标签验证**

1. 选择"HTML 标签验证"
2. 复制 meta 标签
3. 添加到网站 `<head>` 区域
4. 点击"验证"

**方式三：DNS 验证**

1. 选择"DNS 验证"
2. 复制 TXT 记录值
3. 登录阿里云 DNS 添加 TXT 记录
4. 等待生效后点击"验证"

### 第 4 步：提交 Sitemap

1. 验证成功后，进入"数据引入" → "链接提交"
2. 选择"Sitemap"选项卡
3. 输入 Sitemap 地址：`https://ocnote.bvmcreative.com/sitemap.xml`
4. 点击"提交"

### 第 5 步：主动推送（可选，加速收录）

1. 获取 API 接口地址（如：`http://data.zz.baidu.com/urls?site=xxx&token=xxx`）
2. 使用 curl 命令提交：
```bash
curl -H 'Content-Type:text/plain' --data-binary @urls.txt "http://data.zz.baidu.com/urls?site=xxx&token=xxx"
```

**预计耗时：** 10-15 分钟

---

## 🌐 Bing Webmaster Tools

### 第 1 步：登录/注册

**网址：** https://www.bing.com/webmasters

1. 使用 Microsoft 账号登录（Outlook/Hotmail）
2. 没有账号需先注册
3. 登录后点击"添加站点"

### 第 2 步：添加网站

**输入网址：** `https://ocnote.bvmcreative.com`

### 第 3 步：验证所有权

**方式一：XML 文件验证**

1. 下载验证文件（如：`BingSiteAuth.xml`）
2. 通过 FTP 上传到网站根目录
3. 确认能访问该文件
4. 点击"验证"

**方式二：HTML 标签验证**

1. 选择"HTML 标签验证"
2. 复制 meta 标签
3. 添加到网站 `<head>` 区域
4. 点击"验证"

**方式三：DNS 验证**

1. 选择"CNAME 验证"
2. 复制 CNAME 记录值
3. 登录阿里云 DNS 添加 CNAME 记录
4. 等待生效后点击"验证"

### 第 4 步：提交 Sitemap

1. 验证成功后，进入"Sitemaps"
2. 点击"Submit a Sitemap"
3. 输入：`https://ocnote.bvmcreative.com/sitemap.xml`
4. 点击"Submit"

**预计耗时：** 8-12 分钟

---

## 🌐 360 站长平台

### 第 1 步：登录/注册

**网址：** https://zhanzhang.so.com

1. 使用 360 账号登录（可用手机号注册）
2. 登录后点击"添加网站"

### 第 2 步：添加网站

**输入网址：** `https://ocnote.bvmcreative.com`

### 第 3 步：验证所有权

**方式一：HTML 文件验证**

1. 下载验证文件
2. 上传到网站根目录
3. 点击"验证"

**方式二：HTML 标签验证**

1. 复制 meta 标签
2. 添加到网站 `<head>` 区域
3. 点击"验证"

### 第 4 步：提交 Sitemap

1. 进入"链接提交"
2. 选择"Sitemap 提交"
3. 输入 Sitemap 地址
4. 点击"提交"

**预计耗时：** 5-8 分钟

---

## 🌐 搜狗站长平台

### 第 1 步：登录/注册

**网址：** https://zhanzhang.sogou.com

1. 使用搜狗/搜狐账号登录
2. 登录后点击"添加网站"

### 第 2 步：添加网站

**输入网址：** `https://ocnote.bvmcreative.com`

### 第 3 步：验证所有权

**方式一：HTML 文件验证**

1. 下载验证文件
2. 上传到网站根目录
3. 点击"验证"

**方式二：HTML 标签验证**

1. 复制 meta 标签
2. 添加到网站 `<head>` 区域
3. 点击"验证"

### 第 4 步：提交 Sitemap

1. 进入"Sitemap 提交"
2. 输入 Sitemap 地址
3. 点击"提交"

**预计耗时：** 5-8 分钟

---

## 📋 验证代码管理

### 获取验证代码后，添加到网站

验证成功后，将所有验证代码添加到 `index.html` 的 `<head>` 区域：

```html
<!-- 搜索引擎验证 -->
<meta name="google-site-verification" content="实际的 Google 验证码" />
<meta name="baidu-site-verification" content="实际的百度验证码" />
<meta name="msvalidate.01" content="实际的 Bing 验证码" />
<meta name="360-site-verification" content="实际的 360 验证码" />
<meta name="sogou_site_verification" content="实际的搜狗验证码" />
```

### 部署流程

1. 本地修改 `index.html` 或使用构建脚本
2. 重新构建：`pnpm build`
3. 部署到服务器：`scp -r dist/* root@server:/www/wwwroot/ocnote.bvmcreative.com/`
4. 修复权限：`chown -R www:www` 和 `chmod -R 755`
5. 重启 Apache：`/etc/init.d/httpd restart`

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
   - 提交后 24-48 小时开始收录
   - 定期更新 sitemap（每次新增内容后）
   - 检查收录状态

4. **收录时间**
   - Google：3-7 天开始收录
   - 百度：7-14 天开始收录
   - Bing：5-10 天开始收录
   - 360/搜狗：7-14 天开始收录

### 常见问题

**Q: 验证失败怎么办？**
A: 检查 DNS 是否生效（可用 `nslookup -qt=txt ocnote.bvmcreative.com`），或确认 HTML 文件能否访问

**Q: 提交 sitemap 后显示错误？**
A: 检查 sitemap 网址能否直接访问，格式是否正确

**Q: 多久能看到收录？**
A: 通常 1-2 周，保持内容更新会加速收录

**Q: 需要每天提交吗？**
A: 不需要，sitemap 提交一次即可，搜索引擎会定期抓取更新

---

## 📊 进度追踪表

| 搜索引擎 | 验证状态 | Sitemap 提交 | 收录数量 | 提交日期 | 负责人 |
|---------|---------|-------------|---------|---------|--------|
| Google | ⏳ 待验证 | ⏳ 待提交 | - | - | - |
| 百度 | ⏳ 待验证 | ⏳ 待提交 | - | - | - |
| Bing | ⏳ 待验证 | ⏳ 待提交 | - | - | - |
| 360 | ⏳ 待验证 | ⏳ 待提交 | - | - | - |
| 搜狗 | ⏳ 待验证 | ⏳ 待提交 | - | - | - |

**建议：** 每周检查一次收录情况，更新此表格

---

## 🎯 下一步

1. ✅ 完成所有搜索引擎验证
2. ✅ 提交 sitemap
3. ⏳ 等待收录（1-2 周）
4. ⏳ 定期检查收录情况
5. ⏳ 根据搜索分析优化内容

---

**文档版本：** v1.0  
**最后更新：** 2026-03-30  
**维护人：** Jason Kao
