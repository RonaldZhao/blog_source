# functools.wraps装饰器的作用

## 对比测试

先看一个未使用`functools.wraps`的装饰器:

```python
def time_consuming_deco(func):
    """
    计算运行func函数所消耗的时间
    """
    def wrapper(*args, **kwargs):
        start = time.time()*1000
        func(*args, **kwargs)
        end = time.time()*1000  # 转换成毫秒
        print('{0} time consuming: {1} ms'.format(func.__name__, end - start))
    return wrapper

```

下面使用上面的装饰器:

```python
@time_consuming_deco
def f():
    for i in range(1000000):
        pass

f()
print("f.__name__ :", f.__name__)
```

运行结果为:

```
f time consuming: 22.99853515625 ms
f.__name__ : wrapper
```

再看一个使用了`functools.wraps`的装饰器:

```python{5}
def time_consuming_deco(func):
    """
    还是上面计算运行func函数所消耗的时间的装饰器,只不过是用使用了functools.wraps
    """
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()*1000
        func(*args, **kwargs)
        end = time.time()*1000  # 转换成毫秒
        print('{0} time consuming: {1} ms'.format(func.__name__, end - start))
    return wrapper

```

再次运行上面的测试程序结果如下:

```
f time consuming: 22.99853515625 ms
f.__name__ : f
```

## 小结

通过使用`functools.wraps`可以避免自定义装饰器对所装饰函数造成的函数名影响,防止在后面需要使用函数名的时候造成混乱.
