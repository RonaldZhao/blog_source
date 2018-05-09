# Python面试题收集整理

[[toc]]

## 百度大牛总结十条Python面试题检验你的真实水平

### 1.类继承

问题：有如下一段代码：

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

那么应该如何调用`A`的`show`方法？

答案：

```python
obj.__class__ = A
obj.show()
```

解释：`__class__`方法指向了类对象，只要给他赋值类型` A` ，然后调用方法`show `，但是用完了记得修改回来。 

[文章来源](http://developer.51cto.com/art/201802/565802.htm)