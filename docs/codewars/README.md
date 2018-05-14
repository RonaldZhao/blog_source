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

