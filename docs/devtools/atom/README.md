# (译) Atom 飞行手册

## 第一章: 起步

本章是关于 `Atom` 入门的。

### 为什么选择 Atom?

现在有那么多的编辑器，你为什么要花费你的时间学习和使用`Atom`呢？

像`Sublime`和`TextMate`这样的编辑器提供了便利，但是可扩展性有限。另一方面，`Emacs`和`Vim`提供了极大的灵活性，但是它们不是那么的亲民，并且只能使用专用的脚本语言自定义。

我们认为我们可以做的更好。我们的目标是实现可定制性和可用性零妥协的组合：一个对于第一天学习编程的小学生也受欢迎的编辑器，而且当他们成长为经验丰富的黑客时也不会觉得过度臃肿的工具。

正如我们使用`Atom`来构建`Atom`一样，它已经从一个试验品逐渐发展成了我们不可或缺的工具。从表面上看，`Atom`是一个正如你所期待的现代的桌面文本编辑器。然而，观其本质(Pop the hood)，一会发现一个乞求被Hack(be hacked on)的系统。

#### Atom 的核心

网络并非没有缺点，但是二十年的发展已经把它伪造成了一个难以置信的强大的可塑性平台。因此，当我们开始编写我们自己想要扩展的文本编辑器时，`web`技术是显而易见的选择。但首先，我们不得不把它从它的锁链中释放出来。

##### 原生web

web浏览器非常适合浏览网页，但是编写代码是一项需要专用工具的特殊活动。更重要的是，出于安全原因，浏览器严格限制对本地系统的访问，对于我们来说，一个无法写入文件或运行本地子进程的文本编辑器是不实用的。

出于这个原因，我们没有将`Atom`构建成一个传统的web应用程序。相反地，`Atom`是一个基于`Chromium`的被设计为文本编辑器而不是浏览器的定制性变体。每一个`Atom`窗口本质上都是一个本地渲染的web页面。

所有对于典型的Node.js应用程序可用的API对于每个正在运行的窗口中的JavaScript上下文都是可用的。这种混合提供了独特的客户端开发体验。

由于一切都是本地的，因此您不必担心资产管道(asset pipelines)，脚本串联(script concatenation)和异步模块定义(asynchronous module definitions)。 如果要加载某些代码，只需在文件的顶部引用即可。 Node的模块系统可以轻松地将系统分解为许多小型，集中的软件包。

##### 当JavaScript遇见C++

与本地代码交互也非常简单。例如，我们为Oniguruma正则表达式引擎编写了一个包装器，用于TextMate语法支持。在浏览器中，需要使用NaCl或Esprima进行冒险。 节点集成使其变得简单。

除了Node API之外，我们还公开了用于本地对话框的API，添加应用程序和上下文菜单项，操纵窗口尺寸等。

##### web技术：有趣的部分

为Atom编写代码带来的另一个好处是它保证可以在最新版本的Chromium上运行。这意味着我们可以忽略浏览器兼容和polyfills等问题。今天我们就可以使用明天web所有的闪亮的特性。

例如，我们的工作区和窗格的布局是基于flexbox的。这是一个新兴的标准，并且自从我们开始使用它已经经历了很多变化，但是只要它起作用这一切都不重要。

随着整个行业推动网络技术向前发展，我们相信我们正在肥沃的土地上建立Atom。原生UI技术来来往往，但网络是一种标准，随着时间的流逝变得越来越强大和无处不在。 我们很高兴深入挖掘其工具箱。

#### 一个开源文本编辑器

我们认为Atom是GitHub通过合作构建更好软件的主要任务的完美补充。 Atom是一项长期投资，GitHub将继续通过专门的团队支持其发展。 但我们也知道，我们无法单独实现Atom的愿景。 正如Emacs和Vim在过去三十年中所展示的那样，如果你想在文本编辑器周围建立一个蓬勃发展，持久的社区，它必须是开源的。

整个Atom编辑器是免费和开源的，可以在[https://github.com/atom](https://github.com/atom)组织下找到。

### 安装 Atom

为了开始使用`Atom`，您需要将`Atom`安装在您的系统上。本节将介绍如何在您的系统上安装`Atom`以及如何从源码构建它的基础知识。

安装`Atom`应该是相当简单的。通常，您可以访问[https://atom.io/](https://atom.io/)然后在页面顶部看到如下所示的下载按钮：

![download-atom](/imgs/mac-downloads.jpg)

哪一个或几个按钮应该是对应于您的平台的，并且下载包是易于安装的。但是，我们还是在这里稍微详细的介绍一下细节吧。

#### 在 Mac 上安装

`Atom`遵循标准的 Mac zip 安装过程。您可以点击[https://atom.io](https://atom.io/)网站上的下载按钮，也可以转到`Atom`的版本页面下载明确的`atom-mac.zip`文件。一旦您获取到该文件，您可以单击该文件以解压应用程序，然后将新的`Atom`应用程序拖到您的"应用程序"文件夹中。

当您第一次打开`Atom`时，它将尝试安装`atom`和`apm`命令以在终端中使用。 在某些情况下，`Atom`可能无法安装这些命令，因为它需要管理员密码。  例如，要检查`Atom`是否能够安装`atom`命令，请打开终端窗口并输入`which atom`。 如果已安装`atom`命令，您将看到如下内容：

```bash
$ which atom
/usr/local/bin/atom
$
```

如果未安装`atom`命令，则`which`命令不会返回任何内容：

```bash
$ which atom
$
```

要安装`atom`和`apm`命令，请从[命令选项板](https://flight-manual.atom.io/getting-started/sections/atom-basics#command-palette)运行`"Window: Install Shell Commands"，这将提示您输入管理员密码。

##### Portable Mode

##### Building Atom from Source

##### Proxy and Firewall Settings

#### 在 Windows 上安装

#### 在 Linux 上安装

### Atom 基础

既然已经在你的系统上安装了Atom，我们就可以启动它，配置它并熟悉这个编辑器。

当您第一次启动`Atom`时，您应该看到如下所示的界面：

![atom-first-lunch](https://flight-manual.atom.io/getting-started/images/first-launch.png)

这是`Atom`的欢迎界面，为您提供了如何开始使用编辑器的良好起点。

#### 术语

您可以在我们的[术语表](https://flight-manual.atom.io/resources/sections/glossary/)中找到我们在整本手册中使用的所有各种术语的定义。

#### 命令面板

在那个欢迎界面中，我们介绍到的可能是Atom中最重要的命令：命令选项版。当焦点在编辑窗口时如果您按下`Cmd+Shift+P`(Win/Linux则是`Ctrl+Shift+P`)，命令选项版就会弹出。

这个搜索驱动的菜单可以执行Atom中可能执行的任何主要任务。您可以按`Cmd/Control + Shift + P`并搜索命令，而不是单击所有应用程序菜单以查找内容。

![command-palette](https://flight-manual.atom.io/getting-started/images/command-palette.png)

您不仅可以查看并快速搜索数千种可能的命令，还可以查看是否存在与之关联的快捷键绑定。这很棒，因为这意味着你可以以你的方式猜测着做有趣的事情，同时也学习与之相关的快捷键。

对于本书的其余部分，除了针对不同命令的快捷键绑定之外，我们将尝试阐述清楚您可以在命令选项板中搜索的文本。

#### 设置和首选项

Atom有许多设置和首选项，您可以在"设置视图"(Settings View)中进行修改。

![settings](https://flight-manual.atom.io/getting-started/images/settings.png)

这包括更改主题，指定如何处理换行，字体设置，选项卡大小，滚动速度等等。 您还可以使用此屏幕安装新的包和主题，我们将在[Atom包](https://flight-manual.atom.io/using-atom/sections/atom-packages)中介绍。

您可以通过以下三种方式打开"设置视图"(Settings View)：

- 单击菜单栏中的`Atom > Preferences (Mac)`/`File > Settings(Windows)`/`Edit > Preferences (Linux)`菜单项
- 在命令选项板中搜索：`settings-view:open`
- 使用`Cmd+,`/`Ctrl+,`快捷键

#### 更换主题

“设置视图”还允许您更改Atom的主题。 Atom默认提供4种不同的UI主题，Atom和One主题的暗色和浅色变体，以及8种不同的语法主题。 您可以通过单击“设置视图”侧栏中的“主题”选项卡来修改活动主题或安装新主题。

![theme](https://flight-manual.atom.io/getting-started/images/theme.png)

UI主题控制着如标签页和树状视图等这些UI元素的样式，同时语法主题控制着加载到编辑器的文本的语法高亮。要更改语法或UI主题，只需要在相应的下拉列表中选择不同的主题即可。

如果你想要一些不同的主题，在[https://atom.io](https://atom.io/)上还有几十个供你选择。我们将涵盖在[样式调整(Style Tweaks)]()中自定义主题和在[创建主题(Creating a Theme)]()中创建你自己的主题。

#### Soft Wrap

您可以在"设置视图(Settings View)"中指定空白和wrapping的首选项。

![settings-wrap](https://flight-manual.atom.io/getting-started/images/settings-wrap.png)

启用"Soft Tabs"的话当您按`Tab`时将插入空格而不是实际制表符，并且"Tab Length"设置指定当您执行此操作的时候要插入的空格数，或者如果"Soft Tabs"禁用使用多少个空格表示制表符。

"Soft Wrap"选项会将对于当前窗口太长而无法完全展示的行进行自动换行。如果此选项被禁用，则你必须滑动窗口来查看那些超过屏幕宽度的行的剩余部分内容.如果切换"Soft Wrap At Preferred Line Length"选项,则行将以80个字符而不是界面的末尾换行.您还可以在此界面上将默认行长度更改为80以外的值.

在[基础定制](#基础定制)中, 我们将看到如何为不同类型的文件设置不同的wrap首选项(例如, 如果你只想让Markdown文件自动换行而不包括其他文件).

#### 打开, 修改和保存文件

既然您的编辑器已经按照您的意愿运行了, 那我们就开始打开并编辑文件吧. 毕竟这是一个文本编辑器, 对吧?

##### 打开文件

##### 编辑和保存文件

#### 打开的目录

##### 在一个项目中打开文件

### 小结

## 第二章: 使用 Atom

### Atom 包

### 深入 Atom

### Atom Selections

### 编辑与删除文本

### 查找和替换

### Snippets

### 自动补全

### Folding

### Panes

### Pending Pane Items

### 语法

### Atom 中的版本控制

### Github 包

### 在 Atom 中写作

### 基础定制

### 小结

## 第三章: Hacking Atom

### Tools of the Trade

### 初始文件

### 包: 字数统计

### 包: 修改文本

### 包: 激活编辑器信息

### 创建主题

### 创建语法

### 发布

### Iconography

### 调试

### Writing specs

### 处理 URIs

### 跨平台兼容性

### 从 TextMate 转换

### Hacking on Atom Core

### Contributing to Official Atom Packages

### 小结

## 第四章: Atom 的背后

### 配置 API

### Keymaps In-Depth

### Scoped Settings, Scopes and Scope Descriptors

### Atom 中的序列化

### 开发 Node 模块

### 通过服务与其他包进行交互

### 维护您的包

### Atom 是如何使用 Chromium 快照的

### 小结

## 附录 A: 资源

### 词汇表

## 附录 B: 影子 DOM

### 移除影子 DOM 样式

## 附录 C: 升级到 API 1.0

### 升级你的包

### 升级你的 UI 主题或包选择器

### 升级你的语法高亮主题

## 附录 D: Atom 服务器端 API

### Atom 包服务器 API

### Atom 更新服务器 API
