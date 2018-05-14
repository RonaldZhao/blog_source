# codewars题目的Python求解

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

## IP验证(IP Validation)

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

## 排序奇数(Sort the odd)

::: tip 问题描述

你有一个由数字组成的数组。

你的任务是将其中的奇数按照升序排序，但是偶数必须仍然在它们本来的位置。

零不是一个奇数所以你不需要移动它。如果你得到了一个空数组，你需要直接返回它。

例如：

```python
sort_array([5, 3, 2, 8, 1, 4]) == [1, 3, 2, 8, 5, 4]
```

:::

我的解法：

```python
# 快速排序，刚学会，所以没用内置的排序函数而自己写了一个
def quick_sort(nums, left, right):
    if left >= right:
        return nums
    key = nums[left]
    low = left
    high = right
    
    while left < right:
        while left < right and nums[right] >= key:
            right -= 1
        nums[left] = nums[right]
        
        while left < right and nums[left] <= key:
            left += 1
        nums[right] = nums[left]
    nums[left] = key
    quick_sort(nums, low, left-1)
    quick_sort(nums, left+1, high)
    return nums

def sort_array(source_array):
    # Return a sorted array.
    odd_nums = []
    [odd_nums.append(x) for x in source_array if x % 2 != 0]
    odd_nums = quick_sort(odd_nums[:], 0, len(odd_nums)-1)
    j=0
    for i in range(len(source_array)):
        if source_array[i] % 2 == 0:
            continue
        source_array[i] = odd_nums[j]
        j += 1
    return source_array
```



## 简单加密＃1 - 交替分割(Simple Encryption #1 - Alternating Split)

::: tip 问题描述

为了构建加密的字符串：

从字符串中每两个字符取一个，然后是其他的剩余字符，将他们拼接起来作为新字符串。

按照上面的方法重复做`n`次。

例如：

```python
"This is a test!", 1 -> "hsi  etTi sats!"
"This is a test!", 2 -> "hsi  etTi sats!" -> "s eT ashi tist!"
```

编写两个方法：

```python
def encrypt(text, n)
def decrypt(encrypted_text, n)
```

对于这两个方法：

如果输入字符串是`None`或者空字符串则直接返回它的值。

如果`n<=0`则直接返回输入的字符串。

:::

我的解法：

```python
def decrypt_once(encrypted_text):
    list_of_encrypted_text = list(encrypted_text)
    left_half = encrypted_text[:len(encrypted_text)//2]
    right_half = encrypted_text[len(encrypted_text)//2:]
    list_of_zip = list(zip(right_half, left_half))
    for i in range(len(list_of_zip)):
        list_of_zip[i] = "".join(list_of_zip[i])
    decrypt_text = "".join(list_of_zip)
    if len(right_half) > len(left_half):
        decrypt_text += encrypted_text[-1]
    return decrypt_text
    
def decrypt(encrypted_text, n):
    if encrypted_text == None or encrypted_text == '' or n <= 0:
        return encrypted_text
    for i in range(n):
        encrypted_text = decrypt_once(encrypted_text)
    return encrypted_text

def encrypt_once(text):
    encrypted_text = ''
    list_of_text = list(text)
    for i in range(1, len(text)//2+1):
        encrypted_text += list_of_text.pop(i)
    encrypted_text += "".join(list_of_text)
    return encrypted_text

def encrypt(text, n):
    if text == None or text == '' or n <= 0:
        return text
    for i in range(n):
        text = encrypt_once(text)
    return text
```

## 乌龟赛跑(Tortoise racing)

::: tip 问题描述

名为`A`和`B`的两只乌龟必须进行一场赛跑。`A`以**每小时720英尺**的平均速度开始。年轻的`B`知道她跑的比`A`快，并且还没有吃完她的白菜。当她开始时，她看到`A`已经**领先70英尺**，但是`B`的速度是**每小时850英尺**。`B`需要多久才能追上`A`？

通俗的讲：给定两个速度`v1`(`A`的速度，整数，大于零)和`v2`(`B`的速度，整数，大于零)和领先值`g`(整数，大于零)，多久`B`能追上`A`？

结果是一个由小时、分钟、秒组成的所需时间数组`[hour, min, sec](向下舍入到最接近的秒)`或者是某些语言的字符串。

如果`v1>=v2`那么对于`C++`、`C`、`Go`、`Nim`分别返回`nil`、`nothing`、`null`、`None`，对于`Kotlin`返回`[]`或`-1 -1 -1`。

示例：

(结果的形式取决于所用的语言)

```
race(720, 850, 70) => [0, 32, 18] or "0 32 18"
race(80, 91, 37)   => [3, 21, 49] or "3 21 49"
```

:::

我的解法：

```python
def race(v1, v2, g):
    if v1 >= v2:
    	return None
    s = g/(v2-v1)*3600
    hour = int(s//3600)
    s = s-hour*3600
    min = int(s//60)
    sec = int(s-min*60)
    return [hour, min, sec]
```

## 找众数(Find the majority)

::: tip 题目描述

目标：

给定一个元素列表`[a1, a2, ... , an]`，每一个元素都是一个字符串，编写一个函数`majority`，返回列表中出现次数最多的元素的值。

如果没有赢家，函数应该基于语言返回`None`、`NULL`、`nil`等。

示例：

`majority(["A", "B", "A"])`返回`"A"`，`majority(["A", "B", "B", "A"])`返回`None`。

:::

我的解法：

```python
def majority(arr):
  if arr == []:
      return None
  set_of_arr = set(arr)
  d = dict()
  maxes = []
  for item in set_of_arr:
      d[arr.count(item)] = item
      maxes.append(arr.count(item))
  if maxes.count(max(maxes)) > 1:
      return None
  return d[max(maxes)]
```

## i的幂(Power of i)

::: tip 题目描述

`i`是虚数单位，它由`i²= -1`定义，因此它是`x²+ 1 = 0`的解。

你的任务：

就是写一个函数`pofi`，它以一个字符串（答案可能包含`i`）的形式返回给定的非负整数的最简单形式的幂。

即：给定一个非负整数`n`，返回`i^n`。`i`是虚数单位。

:::

我的解法：

```python
def pofi(n):
    result = ['1', 'i', '-1', '-i']
    return result[n%4]
```

简化一下：

```python
def pofi(n):
    return ['1', 'i', '-1', '-i'][n%4]
```

## (Minimize Sum Of Array (Array Series #1))

::: tip 题目描述

任务：

给定一个整数数组，求出从每个两个整数乘积求和得到的最小和。

注意：

- 数组只包含正数
- 数组元素个数一定为偶数

输入输出示例：

```
1- minSum({5,4,2,3}) ==> return (22)
```

解释：

对两个整数乘积求和得到的最小和：`5 * 2 + 3 * 4 = 22`

```
2- minSum({12,6,10,26,3,24}) ==> return (342)
```

解释：

将两个整数的积相加得到的最小和：`26 * 3 + 24 * 6 + 12 * 10 = 342`

```
3- minSum({9,2,8,7,5,4,0,6}) ==> return (74)
```

解释：

对两个整数乘积求和得到的最小和：`9 * 0 + 8 * 2 + 7 * 4 + 6 * 5 = 74`

```python
minSum({5,4,2,3}) // return 22 
"""
Explanation :: 
5*2 +3*4 = 22
"""

minSum({12,6,10,26,3,24}) // return 342
"""
Explanation ::
26*3 + 24*6 + 12*10 = 342
"""

minSum({9,2,8,7,5,4,0,6}) // return 74
"""
Explanation ::
9*0 + 8*2 +7*4 +6*5 = 74
"""
```

:::

我的解法：

```python
def min_sum(arr):
    arr.sort()
    sum = 0
    for i in range(len(arr)//2):
        sum += (arr[i] * arr[-(i+1)])
    return sum
```

简化一下：

```python
def min_sum(arr):
    arr.sort()
    return sum([arr[i] * arr[-i-1] for i in range(len(arr)//2)])
```

