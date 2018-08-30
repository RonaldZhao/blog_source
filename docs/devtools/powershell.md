# Windows PowerShell 无法激活 python 虚拟环境问题的解决

> 文章原文: [Windows下用PowerShell激活Python的虚拟环境](https://blog.csdn.net/yannanxiu/article/details/78703888)

::: tip
之前以为是`PowerShell`的`bug`, 也没有搜索一下就一直在用`CMD`或者`Cmder`, 直到今天才解决. 看来有问题要先搜索一下才是王道啊!
:::

## 为什么`PowerShell`默认不能激活python虚拟环境

因为PowerShell默认不允许执行*.ps1脚本文件，所以首先需要开启权限。

## 解决方法

以管理员身份启动`PowerShell`，并执行`Set-ExecutionPolicy RemoteSigned`, 然后输入`Y`回车即可.

最后再次激活需要的 python 虚拟环境: `..\venv\Scripts\Activate.ps1`, 即可看到环境已激活.
