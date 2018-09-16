# 使用VS Code搭建Python开发环境

> 参考文章：[How to use VS Code for your Python projects](https://fedoramagazine.org/vscode-python-howto/)

## 0. 安装 python 插件

不出意外的话就是popular中的第一名.

## 1. 约定项目虚拟环境保存位置

个人约定为项目下的`.venv`目录.

## 2. 全局安装flake8(代码提示)

执行`pip install -U flake8`.

安装后windows中`flake8.exe`和你的`python.exe`在同一目录.

## 3. 全局安装black(格式化代码)

> 为什么选择`black`：[Auto formatters for Python](https://medium.com/3yourmind/auto-formatters-for-python-8925065f9505)

执行`pip install -U black`.

安装后windows中`black.exe`和你的`python.exe`在同一目录.

配置好后格式化文件的快捷键是`Alt+Shift+F`.

## 4. 修改`settings.json`文件

::: warning 注意!
注意其中涉及到的目录如果不同要按照自己的修改.
:::

```json
{
    "files.autoSave": "afterDelay",
    "editor.renderWhitespace": "boundary",
    "workbench.iconTheme": "vscode-icons",// vscode-icons插件
    "workbench.colorTheme": "One Dark Pro",// One Dark Pro主题
    "python.pythonPath": "${workspaceRoot}\\.venv\\Scripts\\python.exe",
    "python.formatting.provider": "black",
    "python.formatting.blackPath": "D:\\softwares\\Python36\\Scripts\\black.exe",
    "python.formatting.blackArgs": ["--line-length=80"],
    "editor.formatOnSave": true,
    "python.linting.pylintEnabled": false,
    "python.linting.flake8Path": "D:\\softwares\\Python36\\Scripts\\flake8.exe",
    "python.linting.flake8Enabled": true,
    "python.linting.flake8Args": ["--max-line-length=80"],
}
```