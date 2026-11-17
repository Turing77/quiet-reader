# 纯净阅读 Quiet Reader｜Chrome 浏览器无图模式

如果你在找「摸鱼不被发现插件」，可以试试纯净阅读。它是一款 Chrome 纯文字阅读扩展，点击图标即可在新标签页打开网页正文，隐藏图片、视频和导航，保留标题、段落和列表。

## 摸鱼不被发现插件｜把网页变成纯文字

打开一篇新闻、博客或教程，点击「纯净阅读」，就能在简洁的单栏页面里阅读。只想看其中一段时，可以先选中文字再点击。阅读页支持调整字号、切换深浅主题，也可以一键返回原网页。扩展只改变阅读页的显示方式，浏览记录照常保留。

[下载纯净阅读 Chrome 扩展](https://github.com/Turing77/quiet-reader/releases/latest)

## 安装

1. 下载并解压仓库 ZIP。
2. 在 Chrome 地址栏打开 `chrome://extensions`，开启「开发者模式」。
3. 点击「加载已解压的扩展程序」，选择包含 `manifest.json` 的文件夹。

## 使用

- 在文章页点击扩展图标，打开纯文字版。标题、段落、列表和引用会保留，链接显示为普通文字。
- 只想阅读一段时，可以先选中文字，再点击扩展图标。
- 在阅读页顶部调整字号、切换浅色或深色主题，或返回原网页。

正文在浏览器本地处理。自动提取适合新闻、博客和教程等文章页，提取不完整时可以使用选区阅读。

正文提取使用 [Mozilla Readability](https://github.com/mozilla/readability)，其许可证见 [LICENSE.md](LICENSE.md)。

---

# Quiet Reader

Open the main text of the current webpage in a clean, single-column reading tab. The interface takes inspiration from [Longcut](https://www.longcut.ai/).

## Install

1. Download and extract the repository ZIP.
2. Open `chrome://extensions` in Chrome and turn on **Developer mode**.
3. Click **Load unpacked** and select the folder containing `manifest.json`.

## Use

- Click the extension icon on an article page. The reader keeps headings, paragraphs, lists, and quotes, and displays links as plain text.
- To read an excerpt, select the text before clicking the extension icon.
- Use the toolbar to change the font size, switch between light and dark themes, or return to the original page.

Text is processed locally in your browser. Automatic extraction works best on article pages. If it misses part of the article, you can select that text and open it in the reader.

Text extraction uses [Mozilla Readability](https://github.com/mozilla/readability). See [LICENSE.md](LICENSE.md) for its license.
