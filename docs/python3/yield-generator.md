# yield和generator

> 原文来源：[提高你的Python: 解释 yield 和 Generators（生成器）](http://python.jobbole.com/87613/)

## 协程与子例程

我们调用一个普通的Python函数时，一般是从函数的第一行代码开始执行，结束于`return`语句、异常或者函数结束(其实是一个默认的`return None`)。一旦函数将控制权交还给调用者，就意味着函数的全部结束。函数中做的所有工作以及保存在局部变量中的数据将全部丢失。再次调用这个函数时，一切都将重新创建。

对于在计算机编程中所讨论的函数，这是很标准的流程。这样的函数只能返回一个值，不过，有时可以创建能产生一个序列的函数还是有帮助的。要做到这一点，这种函数要能够"保存自己的工作"。

能够"产生一个序列"是因为我们的函数并没有像通常意义上那样返回。`return`隐含的意思是函数正将执行代码的控制权返回给函数被调用的地方。而`yield`的隐含意思是此控制权的转移是"临时的"和"自愿的"，此函数将来还会回收控制权。

在Python中，拥有这种能力的"函数"被称为"生成器"。它是非常有用的。生成器(以及yield语句)最初的引入是为了让程序员可以更简单的编写用来产生值的序列的代码。以前，要实现类似随机数生成器的东西，需要实现一个类或者一个模块，在生成数据的同时保持对每次调用之间状态的跟踪。但引入生成器之后这就变得十分简单了。

为了更好的理解生成器所解决的问题，让我们来看一个例子。在了解这个例子的过程中，请始终记住我们需要解决的问题：生成值的序列。

::: warning 注意
在Python之外，最简单的生成器应该是被称为协程（coroutines）的东西。在本文中，我将使用这个术语。请记住，在Python的概念中，这里提到的协程就是生成器。Python正式的术语是生成器；协程只是便于讨论，在语言层面并没有正式定义。
:::

## 例子：有趣的素数

假设你的老板让你写一个函数，输入参数是一个`int`的`list`，返回一个可以迭代的包含素数的结果。

::: tip 注意
[迭代器](http://docs.python.org/3/glossary.html#term-iterable)只是对象每次返回特定成员的一种能力。
:::

你认为这含简单，稍加思索就能写出下面的代码：

```python
def get_primes(input_list):
    result_list = list()
    for element in input_list:
        if is_prime(element):
            result_list.append(element)
    return result_list

# 或者这样写
def get_primes(input_list):
    return (element for element in input_list if is_prime(element))

# 下面是is_prime的一中实现
def is_prime(number):
    if number > 1:
        if number == 2:
            return True
        if number % 2 == 0:
            return False
        for current in range(3, int(math.sqrt(number) + 1), 2):
            if current % number == 0:
                return False
        return True
    return False
```

上面`is_prime`的实现完全满足了需要，所以可以告诉老板任务完成了。然后老板反馈说"函数工作正常，good job"。

**处理无限序列**

真的如此吗？过了几天，老板过来再次反馈说她遇到了一些问题：她打算把`get_primes`函数用于一个很大的包含数字的`list`。实际上，这个`list`非常大，仅仅是创建这个`list`就会用完系统的所有内存。为此，她希望能够在调用`get_primes`函数时带上一个`start`参数，返回所有大于这个参数的素数。

显然，只是简单的修改`get_primes`函数是不可能的。因为我们不可能返回包含从`start`到无穷的所有素数的列表。看上去用普通函数处理这个问题的可能性比较渺茫。

在放弃之前，先确定一下最核心的障碍。通过思考，可以得出这样的结论：函数只有一次返回结果的机会，因而必须一次返回所有的结果。得出这样的结论似乎毫无意义；“函数不就是这样工作的么”，通常我们都这么认为的。可是，不学不成，不问不知，“如果它们并非如此呢？”

想象一下，如果`get_primes`可以只是简单返回下一个值，而不是一次返回全部的值，我们能做什么？我们就不再需要创建列表。没有列表，就没有内存的问题。由于老板告诉我们的是，她只需要遍历结果，她不会知道我们实现上的区别。

不幸的是，这样做看上去似乎不太可能。即使是我们有神奇的函数，可以让我们从n遍历到无限大，我们也会在返回第一个值之后卡住：

```python
def get_primes(start):
    for element in magical_infinite_range(start):
        if is_prime(element):
            return element
```

假设这样去调用get_primes：

```python
def solve_number_10():
    # She *is* working on Project Euler #10, I knew it!
    total = 2
    for next_prime in get_primes(3):
        if next_prime < 2000000:
            total += next_prime
        else:
            print(total)
            return
```

显然，在get_primes中，一上来就会碰到输入等于3的，并且在函数的第4行返回。与直接返回不同，我们需要的是在退出时可以为下一次请求准备一个值。

不过函数做不到这一点。当函数返回时，意味着全部完成。我们保证函数可以再次被调用，但是我们没法保证说，“呃，这次从上次退出时的第4行开始执行，而不是常规的从第一行开始”。函数只有一个单一的入口：函数的第1行代码。

## 走进生成器

这类问题极其常见以至于Python专门加入了一个结构来解决它：生成器。一个生成器会“生成”值。创建一个生成器几乎和生成器函数的原理一样简单。

一个生成器函数的定义很像一个普通的函数，除了当它要生成一个值的时候，使用`yield`关键字而不是`return`。如果一个`def`的主体包含`yield`，这个函数会自动变成一个生成器（即使它包含一个`return`）。除了以上内容，创建一个生成器没有什么多余步骤了。

生成器函数返回生成器的迭代器。这可能是你最后一次见到“生成器的迭代器”这个术语了， 因为它们通常就被称作“生成器”。要注意的是生成器就是一类特殊的迭代器。作为一个迭代器，生成器必须要定义一些方法(method)，其中一个就是`__next__()`。如同迭代器一样，我们可以使用`next()`函数来获取下一个值。

为了从生成器获取下一个值，我们使用`next()`函数，就像对付迭代器一样。

(`next()`会操心如何调用生成器的`__next__()`方法)。既然生成器是一个迭代器，它可以被用在for循环中。

每当生成器被调用的时候，它会返回一个值给调用者。在生成器内部使用`yield`来完成这个动作(例如`yield 7`)。为了记住`yield`到底干了什么，最简单的方法是把它当作专门给生成器函数用的特殊的`return`(加上点小魔法)。

**`yield`就是专门给生成器用的`return`(加上点小魔法)。**

下面是一个简单的生成器函数：

```python
>>> def simple_generator_function():
>>>     yield 1
>>>     yield 2
>>>    yield 3
```

这里有两个简单的方法来使用它：

```python
>>> for value in simple_generator_function():
>>>     print(value)
1
2
3
>>> our_generator = simple_generator_function()
>>> next(our_generator)
1
>>> next(our_generator)
2
>>> next(our_generator)
3
```

## 魔法？

那么神奇的部分在哪里?当一个生成器函数调用`yield`，生成器函数的“状态”会被冻结，所有的变量的值会被保留下来，下一行要执行的代码的位置也会被记录，直到再次调用`next()`。一旦`next()`再次被调用，生成器函数会从它上次离开的地方开始。如果永远不调用`next()`，`yield`保存的状态就被无视了。

我们来重写`get_primes()`函数，这次我们把它写作一个生成器。注意我们不再需要`magical_infinite_range`函数了。使用一个简单的`while`循环，我们创造了自己的无穷串列。

```python
def get_primes(number):
    while True:
        if is_prime(number):
            yield number
        number += 1
```

如果生成器函数调用了`return`，或者执行到函数的末尾，会出现一个`StopIteration`异常。 这会通知`next()`的调用者这个生成器没有下一个值了(这就是普通迭代器的行为)。这也是这个`while`循环在我们的`get_primes()`函数出现的原因。如果没有这个`while`，当我们第二次调用`next()`的时候，生成器函数会执行到函数末尾，触发`StopIteration`异常。一旦生成器的值用完了，再调用`next()`就会出现错误，所以你只能将每个生成器的使用一次。下面的代码是错误的：

```python
>>> our_generator = simple_generator_function()
>>> for value in our_generator:
>>>     print(value)

>>> # 我们的生成器没有下一个值了...
>>> print(next(our_generator))
Traceback (most recent call last):
  File "<ipython-input-13-7e48a609051a>", line 1, in <module>
    next(our_generator)
StopIteration

>>> # 然而，我们总可以再创建一个生成器
>>> # 只需再次调用生成器函数即可

>>> new_generator = simple_generator_function()
>>> print(next(new_generator)) # 工作正常
1
```

因此，这个`while`循环是用来确保生成器函数永远也不会执行到函数末尾的。只要调用`next()`这个生成器就会生成一个值。这是一个处理无穷序列的常见方法（这类生成器也是很常见的）。

## 执行流程

让我们回到调用`get_primes`的地方：`solve_number_10`。

```python
def solve_number_10():
    total = 2
    for next_prime in get_primes(3):
        if next_prime < 2000000:
            total += next_prime
        else:
            print(total)
            return
```

我们来看一下`solve_number_10`的`for`循环中对`get_primes`的调用，观察一下前几个元素是如何创建的有助于我们的理解。当`for`循环从`get_primes`请求第一个值时，我们进入`get_primes`，这时与进入普通函数没有区别。

1. 进入`while`循环
2. 停在`if`条件判断（`3`是素数）
3. 通过`yield`将`3`和执行控制权返回给`solve_number_10`

接下来，回到`solve_number_10`：

1. `for`循环得到返回值`3`
2. `for`循环将其赋给`next_prime`
3. `total`加上`next_prime`
4. `for`循环从`get_primes`请求下一个值

这次，进入`get_primes`时并没有从开头执行，而是从上次离开的地方。

```python
def get_primes(number):
    while True:
        if is_prime(number):
            yield number
        number += 1 
```

最关键的是，`number`还保持我们上次调用`yield`时的值（例如`3`）。记住，`yield`会将值传给`next()`的调用方，同时还会保存生成器函数的“状态”。接下来，`number`加到`4`，回到`while`循环的开始处，然后继续增加直到得到下一个素数（`5`）。我们再一次把`number`的值通过`yield`返回给`solve_number_10`的`for`循环。这个周期会一直执行，直到`for`循环结束（得到的素数大于2000000）。

## 更给力点

在[PEP 342](http://www.python.org/dev/peps/pep-0342/)中加入了将值传给生成器的支持。而且能让生成器在单一语句中实现，生成一个值（像从前一样），接受一个值，或同时生成一个值并接受一个值。

我们用前面那个关于素数的函数来展示如何将一个值传给生成器。这一次，我们不再简单地生成比某个数大的素数，而是找出比某个数的等比级数大的最小素数（例如10， 我们要生成比10，100，1000，10000 … 大的最小素数）。我们从`get_primes`开始：

```python
def print_successive_primes(iterations, base=10):
    # 像普通函数一样，生成器函数可以接受一个参数
   
    prime_generator = get_primes(base)
    # 这里以后要加上点什么
    for power in range(iterations):
        # 这里以后要加上点什么
 
def get_primes(number):
    while True:
        if is_prime(number):
        # 这里怎么写?
```

`get_primes`的后几行需要着重解释。`yield`关键字返回`number`的值，而像`other = yield foo`这样的语句的意思是，"返回`foo`的值，这个值返回给调用者的同时，将`other`的值也设置为那个值"。你可以通过`send`方法来将一个值"发送"给生成器。

```python
def get_primes(number):
    while True:
        if is_prime(number):
            number = yield number
        number += 1
```

通过这种方式，我们可以在每次执行`yield`的时候为`number`设置不同的值。现在我们可以补齐`print_successive_primes`中缺少的那部分代码：

```python
def print_successive_primes(iterations, base=10):
    prime_generator = get_primes(base)
    prime_generator.send(None)
    for power in range(iterations):
        print(prime_generator.send(base ** power))
```

这里有两点需要注意：首先，我们打印的是`generator.send`的结果，这是没问题的，因为send在发送数据给生成器的同时还返回生成器通过`yield`生成的值（就如同生成器中`yield`语句做的那样）。

第二点，看一下`prime_generator.send(None)`这一行，当你用`send`来"启动"一个生成器时（就是从生成器函数的第一行代码执行到第一个`yield`语句的位置），你必须发送`None`。这不难理解，根据刚才的描述，生成器还没有走到第一个`yield`语句，如果我们发生一个真实的值，这时是没有人去"接收"它的。一旦生成器启动了，我们就可以像上面那样发送数据了。

## 综述

在本文章的后半部分，我们将讨论了一些`yield`的高级用法及其效果。`yield`已经成为Python最强大的关键字之一。现在我们已经对`yield`是如何工作的有了充分的理解，我们已经有了必要的知识，可以去了解`yield`的一些更"费解"的应用场景。

不管你信不信，我们其实只是揭开了`yield`强大能力的一角。例如，`send`确实如前面说的那样工作，但是在像我们的例子这样，只是生成简单的序列的场景下，`send`几乎从来不会被用到。下面贴一段代码，展示`send`通常的使用方式。对于这段代码如何工作以及为何可以这样工作，在此并不多说，它将作为第二部分很不错的热身。

```python
import random
 
def get_data():
    """返回0到9之间的3个随机数"""
    return random.sample(range(10), 3)
 
def consume():
    """显示每次传入的整数列表的动态平均值"""
    running_sum = 0
    data_items_seen = 0
 
    while True:
        data = yield
        data_items_seen += len(data)
        running_sum += sum(data)
        print('The running average is {}'.format(running_sum / float(data_items_seen)))
 
def produce(consumer):
    """产生序列集合，传递给消费函数（consumer）"""
    while True:
        data = get_data()
        print('Produced {}'.format(data))
        consumer.send(data)
        yield
 
if __name__ == '__main__':
    consumer = consume()
    consumer.send(None)
    producer = produce(consumer)
 
    for _ in range(10):
        print('Producing...')
        next(producer)
```

最后，希望您可以从本文的讨论中获得一些关键的思想：

- generator是用来产生一系列值的
- `yield`则像是generator函数的返回结果
- `yield`唯一所做的另一件事就是保存一个generator函数的状态
- generator就是一个特殊类型的迭代器（iterator）
- 和迭代器相似，我们可以通过使用`next()`来从generator中获取下一个值
- 通过隐式地调用`next()`来忽略一些值