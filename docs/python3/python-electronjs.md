# 使用 Python 和 ElectronJS 制作现代化的 GUI

> 本来来源于[Making modern GUIs with Python and ElectronJS](https://www.youtube.com/watch?v=627VBkAhKTc)

## 为什么做这个东西

许多人都想要为他们的python应用程序制作一个漂亮的用户界面, 但是发现python的标准GUI库(如: Tkinter, PyQT)制作出来的界面都有些不够现代化(说到这可能有人要反对了). 所以本文将使用`Python`和`ElectronJS`制作一个看起来比较有现代风格的GUI程序. [ElectronJS](https://electronjs.org/)是一个由Github开发的允许用户使用`HTML`, `CSS`和`JavaScript`制作跨平台桌面应用程序的工具. 有趣的是, ElectronJS程序的后台逻辑一般都是由JavaScript写的, 但是我们将使用Python代替JavaScript. 所以它们之间的关系如下:

<pre style="background-color: white;">
              communicate
Python <-----------------------> ElectronJS <------> GUI
</pre>

## 开发环境

```bash
$ # OS: Windows 10 专业版 1803
$ python -V
Python 3.6.6
$ node -v
v8.11.3
$ # 此外还需要一个工具来完成Python和ElectronJS之间的通信, 安装方法如下
$ node install python-shell
```
