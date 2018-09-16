# Windows 10 安装后要做的事

::: warning 注意
本文只是为了以后再重装系统后节省时间的经验笔记，并不是网文的抄袭与搬家。
:::

## 1. 禁用服务

打开服务，停止并禁用`Windows Search`和`Superfetch`服务。

## 2. 解除宽带保留(网速限制)

运行`gpedit.msc`命令，依次展开`Administrative Templates`->`Network`，然后点击`QoS Packet Scheduler`，然后双击右侧的`Limit reservable bandwidth`，然后点击`Enable`，最后将下面的`Bandwidth limit(%)`的值设置为`0`并点击`Apply`即可。

## 3. 编辑器选择

坚持用`VS Code`吧，不要再用`Atom`了。

## 4. 所需应用

0. 科学上网 + Chrome

1. Bandizip

2. Sublime Text 3

3. PopPlayer

4. Git

5. Node.js

6. MySQL

7. Github Desktop

8. 手心输入法

9. 网易云音乐

10. Python + virtualenv + jupyter

11. CCleaner

## 商店应用

1. To-Do

2. Camera360 Photos
