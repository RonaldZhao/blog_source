# yield from

> 参考文章1: [Python中yield和yield from的用法](http://www.cnblogs.com/cnkai/p/7514828.html)

> 参考文章2: [python协程2：yield from 从入门到精通](https://segmentfault.com/a/1190000009781688)

## yield from 基础

`yield from`是`Python 3.3`后新加的语言结构. 它表示**当在生成器`gen`中使用`yield from subgen`时, `subgen`会获得控制权, 把产出的值传给`gen`的调用方**, 即调用方可以直接控制`subgen`. 与此同时, `gen`会阻塞, 等待`subgen`终止.

`yield from`可以用于简化`for`循环中的`yield`表达式. 例如:

```python
def gen():
    for c in 'AB':
        yield c
    for i in range(1, 3):
        yield i

list(gen())
# 下面是执行结果
['A', 'B', 1, 2]
```

可以改写(简化)为:

```python
def gen():
    yield from 'AB'
    yield from range(1, 3)

list(gen())
# 下面是执行结果
['A', 'B', 1, 2]
```

下面来看一个复杂点的例子：源码来自[Python cookbook 3](https://github.com/dabeaz/python-cookbook/blob/master/src/4/how_to_flatten_a_nested_sequence/example.py)

```python
# 一个使用子生成器将嵌套序列展开的例子
from collections import Iterable

def flatten(items, ignore_types=(str, bytes)):
    for x in items:
        if isinstance(x, Iterable) and not isinstance(x, ignore_types):
            yield from flatten(x)
        else:
            yield x

items = [1, 2, [3, 4, [5, 6], 7], 8]

# 生成1 2 3 4 5 6  7 8
for x in flatten(items):
    print(x)

items = ['Dave', 'Paula', ['Thomas', 'Lewis']]
for x in flatten(items):
    print(x)

```

`yield from x`表达式对`x`对象做的第一件事是: 调用`iter(x)`, 获取迭代器, 所以要求`x`是可迭代对象.

`yield from`的主要功能是打开双向通道, 把最外层的调用方和最内层的子生成器连接起来, 使两者可以直接发送和产出值, 还可以直接传入异常, 而不用在中间的协程添加异常处理的代码.

`yield from`包含几个概念:

- 委派生成器: 包含`yield from <Iterable>`表达式的生成器函数
- 子生成器: 从`yield from <Iterable>`部分获取的生成器
- 调用方: 调用委派生成器的客户端(调用方)代码

下面的图是对`yield from`的调用过程:

> 额外资源: Sokolovsky 的 [How Python 3.3 "yield from" construct works](http://flupy.org/resources/yield-from.pdf)

## yield from 实例

下面是对`yield from`应用的一个例子:

```python
from collections import namedtuple

Result = namedtuple('Result', 'count average')

def averager():
    total = 0.0
    count = 0
    average = None
    while True:
        term = yield
        if term is None:
            break
        total += term
        count += 1
        average = total / count
    return Result(count, average)

def grouper(result, key):
    while True:
        results[key] = yield from averager()

def main(data):
    results = {}
    for key, values in data.items():
        group = grouper(results, key)
        next(group)
        for value in values:
            group.send(value)
        group.send(None)
    report(results)

def report(results):
    for key, result in sorted(results.items()):
        group, unit = key.split(';')
        print('{:2} {:5} averaging {:.2f}{}'.format(result.count, group, result.average, unit))

data = {
    'girls;kg':[40, 41, 42, 43, 44, 54],
    'girls;m': [1.5, 1.6, 1.8, 1.5, 1.45, 1.6],
    'boys;kg':[50, 51, 62, 53, 54, 54],
    'boys;m': [1.6, 1.8, 1.8, 1.7, 1.55, 1.6],
}

if __name__ == '__main__':
    main(data)

```

这段代码是从一个字典中读取男生和女生的身高和体重. 然后把数据传给之前定义的`averager`协程, 最后生成一个报告.

执行结果为:

```python
6 boys  averaging 54.00kg
6 boys  averaging 1.68m
6 girls averaging 44.00kg
6 girls averaging 1.58m
```

这断代码展示了yield from 结构最简单的用法。委派生成器相当于管道，所以可以把任意数量的委派生成器连接在一起---一个委派生成器使用yield from 调用一个子生成器，而那个子生成器本身也是委派生成器，使用yield from调用另一个生成器。最终以一个只是用yield表达式的生成器（或者任意可迭代对象）结束。

## yield from 的意义

`PEP380`分 6 点说明了`yield from`的行为.

- 子生成器产出的值都直接传给委派生成器的调用方(客户端代码)
- 使用`send()`方法发给委派生成器的值都直接传给子生成器. 如果发送的值是`None`, 那么会调用子生成器的`__next__()`方法. 如果发送的值不是`None`, 那么会调用子生成器的`send()`方法. 如果调用的方法抛出`StopIteration`异常, 那么委派生成器恢复运行. 其他任何异常都会向上冒, 传给委派生成器.
- 生成器退出时, 生成器(或子生成器)中的`return expr`表达式会触发`StopIteration(expr)`异常.
- `yield from`表达式的值是子生成器终止时传给`StopIteration`异常的第一个参数.
- 传入委派生成器的异常, 除了`GeneratorExit`之外都传给子生成器的`throw()`方法. 如果调用`throw()`方法时抛出`StopIteration`异常, 委派生成器恢复运行. `StopIteration`之外的异常会向上冒泡, 传递给委派生成器.
- 如果把`GeneratorExit`异常传入委派生成器, 或者在委派生成器上调用`close()`方法, 那么在子生成器上调用`close()`方法, 如果它有的话. 如果调用`close()`方法导致异常抛出, 那么异常会向上冒泡, 传给委派生成器; 否则, 委派生成器抛出`GeneratorExit`异常.

---

## 另一个例子

我们一般用到的简单生成器都是单层的, 并没有嵌套. 但是如果是多个生成器嵌套会怎样呢?如下:

```python
def func_inner():
    i = 0
    while True:
        i = yield i

def func_outer():
    a = 0
    b = 1
    inner = func_inner()
    inner.send(None)
    while True:
        a = inner.send(b)
        b = yield a

if __name__ == '__main__':
    outer = func_outer()
    outer.send(None)
    for i in range(5):
        print(outer.send(i))

# 下面是运行结果
0
1
2
3
4
```

在两层嵌套的情况下, 值的传递方式是: 先把值传递给外层生成器, 外层生成器再将值传递给内层生成器, 内层生成器再将值反向传递给外层生成器, 最终`yield`出结果. 如果嵌套的层次更多, 此传递过程将会更加麻烦.

下面使用`yield from`实现:

```python
def func_inner():
    i = 0
    while True:
        i = yield i

def func_outer():
    yield from func_inner()

if __name__ == '__main__':
    outer = func_outer()
    outer.send(None)
    for i in range(5):
        print(outer.send(i))

# 执行结果不变
```

所以, 嵌套传值的时候, 并不需要我们手动实现, `yield from`已经会帮我们完美处理.
