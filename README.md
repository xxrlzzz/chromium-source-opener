the [idea](https://chaopeng.me/blog/2017/03/02/Chrome-Dev-Tools.html) from 

navigate your chromium code to website source chromium

useage:
1. right-click in your vsc(or select a key word), choose `open in chromium-source website` , it will navigate to corresponding file in source.chroiumu.com
2. cmd `accept request let browser code open in vscode`, it start local node server on :8989 that receive request from (chrome extension)[https://github.com/han837951112/chromium-open-ide] to open file in vscode. 

note that we assume you a in a dir start with src/ (chromium source), and default branch is master

we put log into /tmp/chrome_source_opener.log, sadly the server can't stop once it start ;(

从你的chromium code base 跳转到 source chromium 网站上

用法:
1. 在src/ 里的代码文件中右键, 选择`open in chromium-source website`, 会在source.chromium.com打开对应的文件
2. 命令`accept request let browser code open in vscode`, 在8989短裤启动node服务器, 接受来自(chrome 扩展)[https://github.com/han837951112/chromium-open-ide]的请求, 它可以从网站跳转到vsc

注意, 默认你的代码根目录是chromium 的 src, 且跳转到的分支是master

服务器log地址到 /tmp/chrome_source_opener.log, 由于没有找到如何停止express server, 暂时不提供停止的接口
