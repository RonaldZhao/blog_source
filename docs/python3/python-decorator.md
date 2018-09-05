# 一文理解 Python 装饰器

> 原文链接: [理解 Python 装饰器看这一篇就够了](https://foofish.net/python-decorator.html)

## Python 装饰器是什么?

举个栗子:

我们都知道内裤的主要功能是用来遮羞, 但是到了冬天它无法防风御寒. 咋办? 一个办法就是把内裤改造得又长又厚. 但同时又有个问题, 它本质上已经不是一条内裤了, 而成了长裤. 于是聪明的做法是在内裤外面再穿一条长裤. 这样内裤便还是内裤, 而且通过套在外面的长裤达到了保暖的作用. `装饰器`就如同这里的长裤, 可以在不改变内裤的前提下增加额外的功能.

正确理解 Python 装饰器前, 还要明白一件事: Python 中的函数和 C++, Java 中的函数不大一样. Python 中的函数可以像普通变量一样当作参数传递给另一个函数, 例如:

```python
def param():
    print('this is function param()')

def f(p):
    p()

f()
```

Python 装饰器本质上就是一个 Python 函数或类, 它可以让其他函数或类在不改变代码的前提下增加额外的功能. Python 装饰器的返回值也是一个函数或类对象.

Python 装饰器经常用于有切面需求的场景, 比如: 插入日志, 性能测试, 事务处理, 缓存, 权限校验等场景, Python 装饰器是解决这类问题的绝佳设计. 有了 Python 装饰器, 我们就可以抽离出大量与函数功能本身无关的雷同代码到装饰器中并继续重用. 概括地讲, Python 装饰器的作用就是在不改动现有对象的前提下为其增加功能.

一个简单的例子:

```python
def f():
    print('this is function f()')
```

现在有一个新的需求: 希望可以记录下函数的执行日志. 于是可以这么改:

```python
def f():
    print('this is function f()')
    logging.info('function f() is running.')
```

这是需求只涉及到一个函数的情况(很简单). 但是如果需求涉及到大量的函数, 如果再这样做的话就会造成大量的雷同代码. 于是为了减少重复书写雷同代码的愚蠢行为, 我们可以重新定义一个新的函数用来专门处理日志, 日志处理完毕之后再执行真正的业务代码:

```python
def use_logging(f):
    logging.warn('{0} is running.'.format(f.__name__))
    f()

def f():
    print('this is function f()')

use_logging(f)
```

这样逻辑上没有问题, 需求也实现了, 但是我们在调用的时候已经不再是调用真正的业务逻辑`f()`函数了, 而是换成了`use_logging()`函数, 这样就破坏了原有的代码结构, 现在我们不得不每次都要把原来的那个`f()`函数作为参数传递给`use_logging()`函数...

于是, Python 装饰器横空出世.

## 简单装饰器(装饰无参函数)

```python
def use_logging(func):
    def wrapper():
        logging.warn('{0} is running.'.format(f.__name__))
        return func()
    return wrapper

def f():
    print('this is function f()')

f = use_logging(f)
f()
```

这里的`use_logging()`函数就是一个装饰器, 它是一个普通的函数, 它把真正执行业务逻辑的函数`f()`包裹在其中, 于是`f()`函数看起来就像被`use_logging()`装饰了一样. `use_logging()`返回的也是一个函数, 这个函数的名字叫`wrapper`.

在这个例子中, 函数进入和退出时, 被称为一个横切面, 所以这种编程方式被称为面向切面的编程.

## @语法糖

`@`符号是 Python 装饰器的语法糖, 它放在函数开始定义(即`def`)的上方, 这样就可以省略最后一步对函数重新赋值的操作.

```python
def use_logging(func):
    def wrapper():
        logging.warn('{0} is running.'.format(f.__name__))
        return func()
    return wrapper

@use_logging
def f():
    print('this is function f()')

f()
```

如上所示, 有了`@`, 我们就可以省去`f = use_logging(f)`这一行了, 直接调用`f()`即可得到想要的结果.

从这个例子也可以看出, `f()`函数不需要做任何的修改, 只需要在定义的地方加上装饰器, 调用方式依然不变. 如果有其他的类似函数, 我们就可以继续调用装饰器来修饰函数, 而不用重复修改函数或增加新的封装. 这样, 我们就提高了程序的可重用性, 并增加了程序的可读性.

## `*args`, `**kwargs`

对于无参数的函数, 以上装饰器已经可以达成所需了. 但是当业务逻辑函数带有参数的时候, 就要对装饰器稍加修改了. 比如:

```python{2,4}
def use_logging(func):
    def wrapper(name):
        logging.warn('{0} is running.'.format(f.__name__))
        return func(name)
    return wrapper

@use_logging
def f(name):
    print('i am {0}'.format(name))

f('ronald')
```

但是这只能适用于参数个数固定为一个的情况, 对于多个参数甚至参数个数不固定的函数, 就要使用`*args`来代替:

```python{2,4}
def use_logging(func):
    def wrapper(*args):
        logging.warn('{0} is running.'.format(f.__name__))
        return func(*args)
    return wrapper

@use_logging
def f(name, age):
    print('my name is {0} and i am {1} years old.'.format(name, age))

f('ronald')
```

但是对于关键字参数, `*args`也是无能为力的, 所以就需要继续加上`**kwargs`了:

```python{2,4}
def use_logging(func):
    def wrapper(*args, **kwargs):
        logging.warn('{0} is running.'.format(f.__name__))
        return func(*args, **kwargs)
    return wrapper

@use_logging
def f(name, age, height=None):
    print('my name is {0} and i am {1} years old.'.format(name, age))

f('ronald')
```

## 带参数的装饰器

未完待续...
