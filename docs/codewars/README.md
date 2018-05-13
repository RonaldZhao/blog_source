# codewars题目的Python求解

目录

[[toc]]

## 百兽盛宴(The Feast of Many Beasts)

::: tip 题目描述

所有的动物都有盛宴！ 每只动物要带来一个盘子。 只有一个规则：盘子中的食物名必须以与动物名称的首字母和尾字母相同。 例如，伟大的蓝鹭(**g**reat blue hero**n**)带来蒜味印度烤饼(**g**arlic naa**n**)，山雀(chickadee)带来巧克力蛋糕(chocolate cake)。

写一个盛宴函数，以动物的名字和盘子中的食物名作为参数，并返回真或假，以表明是否允许此野兽把盘子带到盛宴。

假设野兽的名字和盘子中的食物名都是小写字母，并且每个字母至少有两个字母。 野兽名和盘子中的食物名可能包含连字符和空格，但这些不会出现在字符串的开头或结尾。 而且他们不会包含数字。

:::

我的解法：

```python
def feast(beast, dish):
    # 解法一
    return beast[0] == dish[0] and beast[-1] == dish[-1]
	# 解法二：return beast.startswith(dish[0]) and beast.endswith(dish[-1])
```

## IP验证

::: tip 问题描述

编写一个能够识别合法的点分十进制格式IPv4地址的算法。如果一个IP地址由四个[八字节](https://zh.wikipedia.org/zh-cn/%E5%85%AB%E4%BD%8D%E5%85%83%E7%B5%84)的介于**[0, 255]**的值组成，则视为合法。

函数的输入保证为单个字符串。

示例：

```python
# 合法输入
1.2.3.4
123.45.67.89
# 不合法输入
1.2.3
1.2.3.4.5
123.456.78.90
123.045.067.089
```

:::

我的解法：

```python
def is_valid_IP(strng):
  lst = strng.split('.')
  passed = 0
  for sect in lst:
    if sect.isdigit():
      if sect[0] != '0':
        if 0 < int(sect) <= 255:
          passed += 1
  return passed == 4
```

网友使用`re`模块的解法：

```python
import re
def is_valid_IP(strng):
    return bool(re.match(r'^((\d{1,2}|1\d{2}|2[0-4]\d|25[0-5])(\.(?!$)|$)){4}(?=$)',strng))
```

网友使用`socket`模块的解法：

```python
import socket

def is_valid_IP(addr):
    try:
        socket.inet_pton(socket.AF_INET, addr)
        return True
    except socket.error:
        return False
```
