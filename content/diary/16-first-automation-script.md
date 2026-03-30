---
id: first-automation-script
title: "🤖 让龙虾写你的第一个脚本 - 自动获取财经日报关键信息"
description: "从 0 到 1，用 AI 写一个能用的自动化脚本，每天自动获取财经关键信息"
category: cognition
order: 16
readTime: "25 分钟"
date: "2026-03-29"
---

> 写代码不是程序员的专利。
> 
> **会用 AI 写脚本的人，每天多出 2 小时。**

## 📅 2026-03-29 日记

今天想聊一个很多人心里的痛点：

"每天花 1 小时看财经新闻，累。"
"信息太多，抓不住重点。"
"想自动化，但不会写代码。"

是不是特别熟悉？

我以前也这样。每天早上到公司，先花半小时刷：
- 财新网
- 华尔街见闻
- 36 氪
- 雪球

刷完一小时没了，还一堆信息没看。

后来我写了个脚本，现在每天自动推送关键信息给我。

**重点：我不是程序员，脚本是 AI 写的。**

今天这篇日记，就带你从 0 到 1，用 AI 写你的第一个自动化脚本。

**目标：** 自动获取财经日报，提取关键信息，发送到微信/邮件。

**前提：** 会打字就行，不用会编程。

---

## 🎯 一、明确需求（别急着写代码）

很多人一上来就让 AI"写个脚本"，然后 AI 懵了。

**正确做法：** 先明确需求。

### 问自己 3 个问题

**1. 要获取什么信息？**
```markdown
我的需求：
- 宏观经济数据（GDP、CPI、PMI）
- 重要政策（央行、财政部）
- 大公司动态（BAT、字节）
- 股市重要新闻（涨跌停、重大事件）
- 行业动态（我关注的行业）
```

**2. 从哪里获取？**
```markdown
我的选择：
- 财新网（权威，但付费）
- 华尔街见闻（免费，更新快）
- 东方财富网（免费，数据全）

我选：华尔街见闻（免费 + 更新快）
```

**3. 输出什么格式？**
```markdown
我的需求：
- 每天早上 8 点推送
- 发送到微信
- 每条不超过 100 字
- 分门别类整理好
```

### 整理成需求文档

```markdown
【财经日报自动化脚本】

目标：
- 每天早上 8 点自动获取财经关键信息
- 发送到微信

数据源：
- 华尔街见闻（https://www.wallstreetcn.com/news）

关键信息：
- 宏观经济数据
- 重要政策
- 大公司动态
- 股市重要新闻

输出格式：
- 分类整理
- 每条不超过 100 字
- 微信推送
```

**记住：需求越清楚，AI 写得越准。**

---

## 🔧 二、让 AI 帮你拆解任务

需求明确了，别急着让 AI"写代码"。

**正确做法：** 让 AI 帮你拆解任务。

### 指令模板

```markdown
你是一个资深 Python 工程师，擅长写爬虫和自动化脚本。

我想写一个财经日报自动化脚本，需求如下：

【需求】
（粘贴上面的需求文档）

请帮我拆解成具体的开发任务，每个任务要：
1. 任务描述
2. 预计代码量（多少行）
3. 需要的 Python 库
4. 可能的难点
5. 测试方法

输出格式：任务清单表格
```

### AI 输出示例

```markdown
## 开发任务清单

| 序号 | 任务 | 代码量 | 依赖库 | 难点 | 测试方法 |
|------|------|--------|--------|------|---------|
| 1 | 获取网页 HTML | 20 行 | requests | 反爬 | 打印 HTML |
| 2 | 解析新闻列表 | 30 行 | BeautifulSoup | 选择器 | 打印标题列表 |
| 3 | 过滤关键信息 | 40 行 | re | 关键词定义 | 打印过滤结果 |
| 4 | 格式化输出 | 20 行 | - | 格式控制 | 打印最终格式 |
| 5 | 微信推送 | 30 行 | requests | API 配置 | 手动触发测试 |
| 6 | 定时任务 | 10 行 | schedule | 后台运行 | 设置 1 分钟后运行 |
```

**看到没？大任务拆成 6 个小任务，每个都不难。**

---

## 📥 三、获取数据（第 1 步）

### 让 AI 写获取代码

```markdown
你是 Python 工程师，帮我写一个获取网页 HTML 的函数。

【需求】
- 目标 URL：https://www.wallstreetcn.com/news
- 需要模拟浏览器（加 User-Agent）
- 设置超时（10 秒）
- 错误处理（网络错误、超时）

【输出要求】
- 函数名：get_html
- 参数：url
- 返回：HTML 字符串
- 包含详细注释
- 包含使用示例
```

### AI 输出示例

```python
import requests
from requests.exceptions import RequestException, Timeout

def get_html(url, timeout=10):
    """
    获取网页 HTML 内容
    
    参数:
        url (str): 目标 URL
        timeout (int): 超时时间（秒）
    
    返回:
        str: HTML 内容，失败返回 None
    """
    # 设置请求头，模拟浏览器
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
    
    try:
        # 发送 GET 请求
        response = requests.get(url, headers=headers, timeout=timeout)
        
        # 检查响应状态
        response.raise_for_status()
        
        # 设置正确的编码
        response.encoding = response.apparent_encoding
        
        return response.text
        
    except Timeout:
        print(f"请求超时：{url}")
        return None
    except RequestException as e:
        print(f"请求错误：{e}")
        return None

# 使用示例
if __name__ == "__main__":
    url = "https://www.wallstreetcn.com/news"
    html = get_html(url)
    
    if html:
        print(f"获取成功，HTML 长度：{len(html)}")
    else:
        print("获取失败")
```

### 测试代码

```bash
# 1. 保存为 test_get_html.py
# 2. 运行
python test_get_html.py

# 预期输出：
# 获取成功，HTML 长度：123456
```

**成功了就继续，失败了让 AI 帮你 debug。**

---

## 🔍 四、解析新闻列表（第 2 步）

### 让 AI 写解析代码

```markdown
你是 Python 工程师，帮我写一个解析新闻列表的函数。

【需求】
- 输入：HTML 字符串
- 输出：新闻列表（包含标题、时间、链接）
- 使用 BeautifulSoup 解析
- 需要处理解析失败的情况

【HTML 结构】
（用浏览器开发者工具查看，复制 HTML 结构给 AI）

<div class="news-item">
  <a class="title" href="/news/123">新闻标题</a>
  <span class="time">2026-03-29 10:00</span>
</div>

【输出要求】
- 函数名：parse_news_list
- 参数：html
- 返回：列表，每个元素是字典
- 包含详细注释
- 包含使用示例
```

### AI 输出示例

```python
from bs4 import BeautifulSoup
from typing import List, Dict, Optional

def parse_news_list(html: str) -> List[Dict[str, str]]:
    """
    解析新闻列表 HTML
    
    参数:
        html (str): HTML 字符串
    
    返回:
        List[Dict]: 新闻列表，每个元素包含 title、time、link
    """
    news_list = []
    
    try:
        # 创建 BeautifulSoup 对象
        soup = BeautifulSoup(html, 'html.parser')
        
        # 查找所有新闻项
        news_items = soup.find_all('div', class_='news-item')
        
        for item in news_items:
            # 提取标题
            title_elem = item.find('a', class_='title')
            if not title_elem:
                continue
            
            # 提取链接
            link = title_elem.get('href', '')
            if link.startswith('/'):
                link = 'https://www.wallstreetcn.com' + link
            
            # 提取时间
            time_elem = item.find('span', class_='time')
            time = time_elem.get_text(strip=True) if time_elem else ''
            
            # 添加到列表
            news_list.append({
                'title': title_elem.get_text(strip=True),
                'time': time,
                'link': link
            })
        
        return news_list
        
    except Exception as e:
        print(f"解析失败：{e}")
        return []

# 使用示例
if __name__ == "__main__":
    html = """
    <div class="news-item">
      <a class="title" href="/news/123">央行降准 0.25 个百分点</a>
      <span class="time">2026-03-29 10:00</span>
    </div>
    """
    
    news_list = parse_news_list(html)
    
    for news in news_list:
        print(f"标题：{news['title']}")
        print(f"时间：{news['time']}")
        print(f"链接：{news['link']}")
        print("---")
```

### 测试代码

```bash
# 1. 保存为 test_parse.py
# 2. 运行
python test_parse.py

# 预期输出：
# 标题：央行降准 0.25 个百分点
# 时间：2026-03-29 10:00
# 链接：https://www.wallstreetcn.com/news/123
# ---
```

---

## 🎯 五、过滤关键信息（第 3 步）

### 让 AI 写过滤代码

```markdown
你是 Python 工程师，帮我写一个过滤关键信息的函数。

【需求】
- 输入：新闻列表
- 输出：过滤后的新闻列表
- 过滤规则：
  1. 标题包含关键词（宏观、政策、央行、GDP、CPI 等）
  2. 排除广告和软文（包含"广告"、"推广"等）
  3. 只保留今天的新闻
- 关键词可以配置

【输出要求】
- 函数名：filter_key_news
- 参数：news_list, keywords
- 返回：过滤后的列表
- 包含详细注释
- 包含使用示例
```

### AI 输出示例

```python
from datetime import datetime
from typing import List, Dict

def filter_key_news(
    news_list: List[Dict[str, str]],
    keywords: List[str] = None,
    exclude_words: List[str] = None
) -> List[Dict[str, str]]:
    """
    过滤关键新闻
    
    参数:
        news_list (List[Dict]): 新闻列表
        keywords (List[str]): 关键词列表，包含这些词的新闻会被保留
        exclude_words (List[str]): 排除词列表，包含这些词的新闻会被过滤
    
    返回:
        List[Dict]: 过滤后的新闻列表
    """
    # 默认关键词（财经关键信息）
    if keywords is None:
        keywords = [
            '宏观', '政策', '央行', '降准', '降息',
            'GDP', 'CPI', 'PMI', '通胀', '就业',
            '财政', '税收', '贸易', '汇率',
            '腾讯', '阿里', '字节', '百度', '京东',
            '股市', '涨停', '跌停', 'IPO'
        ]
    
    # 默认排除词（广告、软文）
    if exclude_words is None:
        exclude_words = ['广告', '推广', '赞助', '合作', '品牌']
    
    filtered_list = []
    today = datetime.now().strftime('%Y-%m-%d')
    
    for news in news_list:
        title = news['title']
        time = news['time']
        
        # 排除广告
        if any(word in title for word in exclude_words):
            continue
        
        # 只保留今天的新闻
        if today not in time:
            continue
        
        # 包含关键词才保留
        if any(word in title for word in keywords):
            filtered_list.append(news)
    
    return filtered_list

# 使用示例
if __name__ == "__main__":
    news_list = [
        {'title': '央行降准 0.25 个百分点', 'time': '2026-03-29 10:00', 'link': '...'},
        {'title': '某某产品广告', 'time': '2026-03-29 11:00', 'link': '...'},
        {'title': '腾讯发布新财报', 'time': '2026-03-29 12:00', 'link': '...'},
    ]
    
    filtered = filter_key_news(news_list)
    
    print(f"过滤前：{len(news_list)} 条")
    print(f"过滤后：{len(filtered)} 条")
    
    for news in filtered:
        print(f"- {news['title']}")
```

### 测试代码

```bash
# 1. 保存为 test_filter.py
# 2. 运行
python test_filter.py

# 预期输出：
# 过滤前：3 条
# 过滤后：2 条
# - 央行降准 0.25 个百分点
# - 腾讯发布新财报
```

---

## 📤 六、发送微信通知（第 4 步）

### 让 AI 写发送代码

```markdown
你是 Python 工程师，帮我写一个发送微信通知的函数。

【需求】
- 使用 Server 酱推送（免费，简单）
- 输入：新闻列表
- 输出：发送到微信
- 格式：分类整理，每条不超过 100 字

【Server 酱配置】
- 官网：https://sct.ftqq.com/
- 获取 SendKey
- 推送 URL：https://sctapi.ftqq.com/{SendKey}.send

【输出要求】
- 函数名：send_wechat
- 参数：news_list, sendkey
- 返回：发送结果
- 包含详细注释
- 包含使用示例
```

### AI 输出示例

```python
import requests
from typing import List, Dict

def send_wechat(
    news_list: List[Dict[str, str]],
    sendkey: str,
    title: str = "📰 财经日报"
) -> bool:
    """
    发送财经日报到微信
    
    参数:
        news_list (List[Dict]): 新闻列表
        sendkey (str): Server 酱 SendKey
        title (str): 推送标题
    
    返回:
        bool: 发送成功返回 True
    """
    # 格式化消息内容
    content = format_news_content(news_list)
    
    # Server 酱推送 URL
    url = f"https://sctapi.ftqq.com/{sendkey}.send"
    
    # 请求参数
    params = {
        'title': title,
        'desp': content
    }
    
    try:
        # 发送 POST 请求
        response = requests.post(url, params=params, timeout=10)
        
        # 检查响应
        result = response.json()
        if result.get('code') == 0:
            print("微信推送成功")
            return True
        else:
            print(f"微信推送失败：{result.get('message')}")
            return False
            
    except Exception as e:
        print(f"推送异常：{e}")
        return False


def format_news_content(news_list: List[Dict[str, str]], max_length: int = 100) -> str:
    """
    格式化新闻内容为 Markdown
    
    参数:
        news_list (List[Dict]): 新闻列表
        max_length (int): 每条新闻最大长度
    
    返回:
        str: Markdown 格式的内容
    """
    # 按分类整理
    categories = {
        '宏观政策': [],
        '公司动态': [],
        '股市新闻': []
    }
    
    # 分类关键词
    category_keywords = {
        '宏观政策': ['宏观', '政策', '央行', '降准', 'GDP', 'CPI'],
        '公司动态': ['腾讯', '阿里', '字节', '百度', '京东'],
        '股市新闻': ['股市', '涨停', '跌停', 'IPO']
    }
    
    # 分类
    for news in news_list:
        title = news['title']
        
        for category, keywords in category_keywords.items():
            if any(word in title for word in keywords):
                categories[category].append(news)
                break
    
    # 格式化输出
    content = f"## 📅 {datetime.now().strftime('%Y-%m-%d')} 财经日报\n\n"
    
    for category, news_items in categories.items():
        if not news_items:
            continue
        
        content += f"### {category}\n\n"
        
        for i, news in enumerate(news_items[:5], 1):  # 每类最多 5 条
            title = news['title']
            if len(title) > max_length:
                title = title[:max_length-3] + '...'
            
            link = news['link']
            time = news['time']
            
            content += f"{i}. {title}\n"
            content += f"   时间：{time}\n"
            content += f"   [查看详情]({link})\n\n"
    
    content += "---\n"
    content += "🤖 自动推送，如需调整请回复"
    
    return content

# 使用示例
if __name__ == "__main__":
    news_list = [
        {'title': '央行降准 0.25 个百分点', 'time': '10:00', 'link': '...'},
        {'title': '腾讯发布新财报', 'time': '11:00', 'link': '...'},
    ]
    
    sendkey = "你的 SendKey"  # 替换成你的
    send_wechat(news_list, sendkey)
```

### 测试步骤

```bash
# 1. 注册 Server 酱：https://sct.ftqq.com/
# 2. 获取 SendKey
# 3. 保存为 test_send.py
# 4. 替换 sendkey
# 5. 运行
python test_send.py

# 预期：微信收到推送
```

---

## ⏰ 七、设置定时任务（第 5 步）

### 让 AI 写定时代码

```markdown
你是 Python 工程师，帮我写一个定时任务的代码。

【需求】
- 每天早上 8 点运行
- 运行整个脚本（获取 + 解析 + 过滤 + 发送）
- 使用 schedule 库

【输出要求】
- 包含完整的主程序
- 包含详细注释
- 包含后台运行方法
```

### AI 输出示例

```python
import schedule
import time
from datetime import datetime

def job():
    """
    定时任务：每天运行一次
    """
    print(f"[{datetime.now()}] 开始执行财经日报脚本...")
    
    # 1. 获取 HTML
    url = "https://www.wallstreetcn.com/news"
    html = get_html(url)
    
    if not html:
        print("获取 HTML 失败")
        return
    
    # 2. 解析新闻列表
    news_list = parse_news_list(html)
    
    if not news_list:
        print("解析新闻失败")
        return
    
    print(f"获取到 {len(news_list)} 条新闻")
    
    # 3. 过滤关键信息
    filtered = filter_key_news(news_list)
    
    print(f"过滤后 {len(filtered)} 条关键新闻")
    
    # 4. 发送微信
    sendkey = "你的 SendKey"
    send_wechat(filtered, sendkey)
    
    print(f"[{datetime.now()}] 执行完成")


if __name__ == "__main__":
    # 设置定时任务：每天早上 8 点
    schedule.every().day.at("08:00").do(job)
    
    print("财经日报脚本已启动，每天 8:00 自动运行")
    print("按 Ctrl+C 停止")
    
    # 持续运行
    while True:
        schedule.run_pending()
        time.sleep(60)
```

### 后台运行方法

```bash
# 方法 1：nohup（Linux/Mac）
nohup python finance_news.py > finance_news.log 2>&1 &

# 方法 2：screen（Linux/Mac）
screen -S finance
python finance_news.py
# 按 Ctrl+A 然后 D 退出 screen

# 方法 3：Windows 任务计划程序
# 控制面板 → 管理工具 → 任务计划程序 → 创建任务
```

---

## 📦 八、完整代码整合

### 让 AI 整合代码

```markdown
你是 Python 工程师，帮我把上面所有代码整合成一个完整的脚本。

【要求】
- 所有函数放在一个文件
- 添加完整的文档字符串
- 添加配置区域（URL、关键词、SendKey 等）
- 添加错误处理
- 添加日志输出
- 包含使用说明
```

### AI 输出完整代码

（约 300 行，包含所有功能）

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
财经日报自动化脚本

功能：
- 每天自动获取财经关键信息
- 发送到微信

使用：
1. 配置 SendKey
2. 运行：python finance_news.py
3. 后台运行：nohup python finance_news.py &

作者：AI 助手
日期：2026-03-29
"""

# 所有代码...
```

---

## 🚀 九、运行和测试

### 第 1 次运行

```bash
# 1. 保存完整代码为 finance_news.py
# 2. 安装依赖
pip install requests beautifulsoup4 schedule

# 3. 配置 SendKey（替换代码中的）

# 4. 手动测试
python finance_news.py

# 5. 检查微信是否收到
```

### 设置后台运行

```bash
# Linux/Mac
nohup python finance_news.py > finance_news.log 2>&1 &

# 检查是否运行
ps aux | grep finance_news

# 查看日志
tail -f finance_news.log
```

---

## 🔧 十、常见问题及解决

### Q1：获取 HTML 失败

**可能原因：**
- 网络问题
- 网站反爬

**解决：**
```python
# 加重试机制
for i in range(3):
    html = get_html(url)
    if html:
        break
    time.sleep(2)
```

---

### Q2：解析不到新闻

**可能原因：**
- 网站改版，HTML 结构变了

**解决：**
```python
# 用浏览器开发者工具查看新结构
# 让 AI 更新解析代码
```

---

### Q3：微信收不到推送

**可能原因：**
- SendKey 错了
- 推送频率超限

**解决：**
```python
# 检查 SendKey 是否正确
# Server 酱免费版每天 5 条，升级免费版每天 50 条
```

---

## 📊 十一、扩展场景

同样的方法，可以做很多自动化：

### 场景 1：竞品监控

```python
# 监控竞品官网
# 有更新就推送
```

### 场景 2：价格追踪

```python
# 监控商品价格
# 降价就推送
```

### 场景 3：舆情监控

```python
# 监控品牌 mentions
# 有负面就推送
```

### 场景 4：数据收集

```python
# 每天收集行业数据
# 自动存到 Excel
```

---

## 💡 十二、核心洞察

### 洞察 1：核心不是写代码，是拆解任务

**很多人以为自动化难，是因为：**
- 觉得要学编程
- 觉得要懂技术
- 觉得要花很多时间

**其实：**
- AI 负责写代码
- 你负责拆任务
- 一下午就能搞定

---

### 洞察 2：从小处着手

**别一上来就想"自动化一切"。**

**从小处着手：**
- 先自动化一个场景
- 跑通了再加功能
- 慢慢扩展

**我第一个脚本只有 50 行，现在 300 行。**

---

### 洞察 3：迭代比完美重要

**别追求一次完美。**

**先跑起来，再优化：**
- 第 1 版：能获取就行
- 第 2 版：加过滤
- 第 3 版：加推送
- 第 4 版：加定时

**每版都比前一版好。**

---

<div class="formula-box">

**🤖 让 AI 写脚本的核心**

> 不是学编程，是学拆解。
> 
> AI 负责写，你负责拆。
> 
> **拆解能力 = 自动化能力的核心**

</div>

---

## 📝 十三、课后练习

**练习 1：跑通财经日报脚本**

1. 按上面的步骤，写一个财经日报脚本
2. 手动运行，确保能收到微信
3. 设置定时任务，确保自动运行

---

**练习 2：定制你的脚本**

1. 修改关键词（你关心的行业）
2. 修改推送时间（你方便的时间）
3. 修改输出格式（你喜欢的格式）

---

**练习 3：扩展新场景**

1. 想一个你想自动化的场景
2. 拆解成小任务
3. 让 AI 写代码
4. 测试 + 优化

**坚持一周，你会发现新世界。**

---

**🔥 行动号召：**

从今天开始：

1. 别怕写代码，AI 会写
2. 学会拆任务，这是核心
3. 从小处着手，先跑起来
4. 迭代优化，别追求完美

**记住：会用 AI 写脚本的人，每天多出 2 小时！**

---

*第三周完结，撒花！🎉*

*下一篇：进阶篇 - 建立你的 AI 工作流*
