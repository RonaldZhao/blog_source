# Python面试题收集整理

[[toc]]

## Q：python这么好，说说它的特性吧

A：

1. python是解释型语言。即：它不需要编译，变运行便捷式；
2. python是动态类型化的。即：当声明变量的时候，无需指定变量的类型；
3. python非常适合面向对象编程。即：它允许定义类以及组合和继承；
4. python没有访问修饰符；
5. python中函数是一等对象(第一类对象)。即：函数可以在运行时动态创建；函数可以赋值给变量；函数可以作为参数传递给函数；函数可以作为返回值从函数返回；
6. python容易上手，编码效率高，但比编译型语言运行速度慢。幸运的是，python允许包含基于C的扩展，所以瓶颈可以被优化掉。

## Q： python中对象的赋值、浅拷贝、深拷贝的区别

A：

1. 对象的赋值

python中对象的赋值实际上是简单的对象的引用。即：当创建一个对象并将其赋值给一个变量的时候，python并没有拷贝这个对象，只是简单的把这个对象的引用赋值给变量。

```python
>>> list1 = [1,2,3,4]
>>> list2 = list1
>>> print(list1, id(list1))
[1, 2, 3, 4] 4552843656
>>> print(list2, id(list2))
[1, 2, 3, 4] 4552843656
>>> list1.append(5)
>>> print(list1, id(list1))
[1, 2, 3, 4, 5] 4552843656
>>> print(list2, id(list2))
[1, 2, 3, 4, 5] 4552843656
```

2. 浅拷贝

一般使用`copy.copy()`可以进行对象的浅拷贝。但对于对象中的元素，它仍然使用原始的引用。

```python
>>> import copy
>>> list1 = [1,2,3,4, [5,6,7,8]]
>>> print(list1, id(list1))
[1, 2, 3, 4, [5, 6, 7, 8]] 4322790536
>>> list2 = copy.copy(list1)
>>> print(list2, id(list2))
1, 2, 3, 4, [5, 6, 7, 8]] 4322790792
>>> list1.append(9)
>>> print(list1, id(list1))
[1, 2, 3, 4, [5, 6, 7, 8], 9] 4322790536
>>> print(list2, id(list2))
1, 2, 3, 4, [5, 6, 7, 8]] 4322790792
>>> list1[4].append(10)
>>> print(list1, id(list1))
[1, 2, 3, 4, [5, 6, 7, 8, 10], 9] 4322790536
>>> print(list2, id(list2))
[1, 2, 3, 4, [5, 6, 7, 8, 10]] 4322790792
```

使用`copy.copy()`对`list1`浅拷贝到`list2`，`list2`复制了`list1`的对象，但是`list2`里面的`[5,6,7,8]`和`list1`里面的`[5,6,7,8]`其实都是指向**同一块内存地址**，所以改变了`list1[4]`后`list2[4]`也会发生改变。

3. 深拷贝

深拷贝需要使用`copy.deepcopy()`函数。它会复制一个容器对象，以及它里面的所有元素(包含元素的子元素，即递归复制)。

当对`list1`列表进行深拷贝之后，`list2`复制了`list1`对象，但是与浅拷贝不同的是，`list2`里面的`[5,6,7,8]`与`list1`里面的`[5,6,7,8]`是指向**不同的内存地址**。

## Q：python中 == 和 is 的区别

A：

`is`判断对象标识符是否一致，而`==`是判断两个对象的内容是否相等。`x is y`相当于`id(x) == id(y)`；`==`会调用对象内部的`__eq__()`检查两个对象的内容是否相等。

## Q：如何在python中实现多线程

A：

python中有一个多线程包`threading`可以用来实现多线程。但同时Python中有一个`GIL(Global Interpreter Lock，全局解释器锁)`，它确保在任何时刻只有一个线程可以执行。

线程获取`GIL`，做一些工作，然后将`GIL`传递到下一个线程。这种情况发生的非常快，所以对于人眼而言，它可能看起来像所有线程并行执行，但它们实际上只是轮流使用相同的CPU内核。因此GIL的存在使得Python中的多线程无法真正的利用多核的优势来提高性能。

对于IO密集型操作，在等待操作系统返回的时候会释放GIL。比如爬虫因为有等待服务器的响应时间，可以利用多线程来加速；但是对于CPU密集型操作，只能通过多进程`multiprocess`来加速。

## Q：Python中的猴子补丁是什么

A：

猴子补丁，是一种非常Pythonic的用法。即函数在Python中可以像使用变量一样对它们进行赋值等操作，我们可以在运行时替换模块，这种手法俗称`猴子补丁`。

## Q：Python中的 __new__ 和 __init__ 的区别

A：

`__init__`为初始化方法，而`__new__`方法才是真正的构造函数。只有继承了`object`的类才有`__new__`。

`__new__`至少要有一个参数`cls`，代表要实例化的类，此参数在实例化时由Python解释器自动提供。`__new__`必须要有返回值，返回实例化出来的实例。

`__init__`有一个参数`self`，就是这个`__new__`返回的实例。先运行`__new__`然后才运行`__init__`。

`__init__`在`__new__`的基础上可以完成一些其他初始化的动作。`__init__`不需要返回值。

---

## 1.类继承

问题：有如下一段代码，请问应该如何调用`A`的`show`方法？

```python
class A(object):
	def show(self):
		print('base show')
class B(A):
    def show(self):
        print('derived show')
obj = B()
obj.show()
```

答案：

```python
obj.__class__ = A
obj.show()
```

解释：

`__class__`方法指向了类对象，只要给他赋值类型` A` ，然后调用方法`show `，但是用完了记得修改回来。

## 2.方法对象

问题：为了让下面这段代码运行，需要增加那些代码？

```python
class A(object):
    def __init__(self, a, b):
        self.__a = a
        self.__b = b
    def myprint(self):
        print('a=', self.__a, 'b=', self.__b)

a1 = A(10, 20)
a1.myprint()

a1(80)
```

答案：为了能让对象实例能被直接调用，需要实现`__call__`方法：

```python
class A(object):
    def __init__(self, a, b):
        self.__a = a
        self.__b = b
    def myprint(self):
        print('a=', self.__a, 'b=', self.__b)
    def __call__(self, num):
        print('call:', num + self.__a)
```

## 3.new和init

问题：下面这段代码输出什么？

```python
class B(object):
    def fn(self):
        print('B fn')
    def __init__(self):
        print('B INIT')


class A(object):
    def fn(self):
        print('A fn')
    def __new__(cls, a):
        print('NEW', a)
        if a > 10:
            return super(A, cls).__new__(cls)
        return B()
    def __init__(self, a):
        print('INIT', a)

a1 = A(5)
a1.fn()
a2 = A(20)
a2.fn()
```

答案：

```python
NEW 5
B INIT
B fn
NEW 20
INIT 20
A fn
```

解释：

使用`__new__`方法，可以决定返回哪个对象，也就是创建对象之前。这个可以用于设计模式的单例模式、工厂模式。`__init__`是创建对象用来调用的。

## 4.list和dict生成

问题：下面这段代码输出什么？

```python
ls = [1, 2, 3, 4]
list1 = [i for i in ls if i > 2]
print(list1)

list2 = [i * 2 for i in ls if i > 2]
print(list2)

dic1 = {x:x**2 for x in (2, 4, 6)}
print(dic1)

dic2 = {x:'item'+str(x**2) for x in (2, 4, 6)}
print(dic2)

set1 = {x for x in 'hello world' if x not in 'low level'}
```

答案：

```python
[3, 4]
[6, 8]
{2: 4, 4: 16, 6: 36}
{2: 'item4', 4: 'item16', 6: 'item36'}
set(['h', 'r', 'd'])
```

## 5.全局变量和局部变量

问题：下面这段代码输出什么？

```python
num = 9

def f1():
    num = 20

def f2():
    print(num)

f2()
f1()
f2()
```

答案：

```python
9
9
```

解释：

`num`看似是个全局变量，实则不是，所以`f1`函数中的`num`实际上是这个函数自己的`num`，与函数外部的`num`没有关系。如果想在`f1`函数内部修改函数外部的`num`的话，则需要使用`global`关键字修饰`num`：

```python
def f1():
    global num
    num = 20
```

这样才能达到在函数内部修改外部的变量的目的。

## 6.交换两个变量的值

问题：用一行代码交换两个变量的值。

```python
a = 8
b = 9
```

答案：`a, b = b, a`

## 7.默认方法

问题：有如下的代码：

```python
class A(object):
    def __init__(seld, a, b):
        self.a1 = a
        self.b1 = b
        print('init')
    def mydefault(self):
        print('default')

a1 = A(10, 20)
a1.fn1()
a1.fn2()
a1.fn3()
```

其中，方法`fn1`、`fn2`、`fn3`都没有定义。添加代码，使没有定义的方法都调用`mydefault`函数，使得上面的代码输出：

```python
default
default
default
```

答案：

```python
class A(object):
    def __init__(self, a, b):
        self.a1 = a
        self.b1 = b
        print('init')
    def mydefault(self):
        print('default')
    def __getattr__(self, name):
        return self.mydefault

a1 = A(10, 20)
a1.fn1()
a1.fn2()
a1.fn3()
```

解释：

方法`__getattr__`只有当调用了没有定义的方法的时候才会调用它。当`fn1`方法传入参数时，我们可以给`mydefault`方法增加一个`*args`不定参数来兼容：

```python
class A(object):
    def __init__(self, a, b):
        self.a1 = a
        self.b1 = b
        print('init')
    def mydefault(self, *args):
        print('default' + str(args[0]))
    def __getattr__(self, name):
        return self.mydefault

a1 = A(10, 20)
a1.fn1()
a1.fn2()
a1.fn3()
```

## 8.包管理

问题：一个包里有三个模块，`mod1.py`、`mod2.py`、`mod3.py`，但使用`from demopack import *`导入模块时，如何保证只有`mod1`、`mod3`被导入了。

答案：在`demopack`包中的`__init__`文件中增加：

```python
__all__ = ['mod', 'mod3']
```

## 9.闭包

问题：写一个函数，接收整数参数`n`，返回一个函数，函数的功能是把函数的参数和`n`相乘并把结果返回。

答案：

```python
def nulby(num):
    def gn(val):
        return num * val
    return gn

zw = nulby(7)
print(zw(9))  # 输出 63
```

## 10.性能

问题：解析下面的代码慢在哪？

```python
def strtest1(num):
    str = 'first'
    for i in range(num):
        str += '×'
    return str

```

答案：

`python`的`str`是个不可变对象，每次迭代，都会生成新的`str`对象来存储新的字符串，`num`越大，创建`str`对象的次数越多，内存消耗越大。

## 参考文章

[精心整理的8道Python面试题，你答不答的出来](https://juejin.im/post/5abd9f9ef265da239d496874)
[原文来源](https://segmentfault.com/a/1190000012277531)
