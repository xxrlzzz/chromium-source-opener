the [idea](https://chaopeng.me/blog/2017/03/02/Chrome-Dev-Tools.html) from 

navigate your chromium code to website source chromium

note that we assume you a in a dir start with src/ (chromium source), and default branch is master

and also accept the request from chrome extension to open code in vscode.

we put log into /tmp/chrome_source_opener.log, sadly the server can't stop once it start ;(

从你的chromium code base 跳转到 source chromium 网站上

注意, 默认你的代码根目录是chromium 的 src, 且跳转到的分支是master

同时接受来自 chrome 扩展的请求 来从浏览器跳转到vscode

服务器log地址到 /tmp/chrome_source_opener.log, 然而没有找到如何停止express server, 所以没有提供停止的接口 