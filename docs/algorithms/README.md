# 常用算法的Python实现

[[toc]]

## 快速排序

::: tip 基本思想

将一个大数组按照一个**基准数**分成左右两份，左边的部分都**不大于**基准数，右边的部分都**不小于**基准数；然后对这两份数组再分别应用快速排序，直到分解到每个数组中只剩两个排好序的数为止。

:::

快速排序是一种基于分治思想的排序算法，是一种不稳定排序。

```python
# 快速排序
def quick_sort(nums, left, right):
    # 递归结束的条件
    if left >= right:
        return nums

    # 选择第一个数作为基准数并记录在key中，方便最后写回
    key = nums[left]
    lft = left  
    rit = right

    # 遍历整个当前数组
    while left < right:
        # 从右侧开始筛选大于参考点的值，直到遇到
        while left < right and nums[right] >= key:
            right -= 1
        nums[left] = nums[right]  # 这个位置的值先挪到左边

        # 从左边开始查找小于参考点的值
        while left < right and nums[left] <= key:
            left += 1
        nums[right] = nums[left]  # 这个位置的值挪到右边

    # 写回改成的值
    nums[left] = key

    # 递归，并返回结果
    quick_sort(nums, low, left - 1)    # 递归左边部分
    quick_sort(nums, left + 1, high)   # 递归右边部分
    return nums

# 测试程序
nums = random.sample(range(1000000), 500000)  # 生成50万个100万范围内的无重复的随机数
print(nums)
sorted_nums = quick_sort(nums, 0, len(nums)-1)
print(sorted_nums)
```

# 算法学习笔记

> 学习内容: [algorithms](https://github.com/keon/algorithms)

## delete_nth

::: tip 算法描述
给定一个列表`array`和一个整数`n`, 创建一个新列表, 其中包含原列表的每一个元素, 但每个元素的重复次数最多为`n`, 并且不重新排序.
:::

举例: `array = [1, 2, 3, 1, 2, 1, 2, 3]`, `n = 2`, 将得到新列表`[1, 2, 3, 1, 2, 3]`.

### 实现一

```python
# 时间复杂度O(n^2)
def delete_nth_naive(array, n):
    ans = []
    for num in array:  # O(n)
        if array.count(num) < n:  # array.count()的时间复杂度也为O(n), 所以可以对此优化
        	ans.append(num)
    return ans

```

### 实现二

```python
# 时间复杂度O(n), 使用hash表针对array.count()的优化
import collections
def delete_nth(array, n):
    ret = []
    counts = collections.defaultdict(int)  # 这样会使在获取counts中没有的键时返回0而不是None或报错
    for num in array:
        if counts[num] < n:
            ret.append(num)
            counts[num] += 1
    return ret

```

## flatten

::: tip 算法描述
实现Flatten Arrays, 即: 给定一个可能包含嵌套列表的列表, 返回一个单一的列表(即不包含嵌套列表).
:::

### 实现一

```python
#返回一个列表
from collections import Iterable

def flatten(input_arr, output_arr=None):
    if output_arr is None:
        output_arr = []
    for elem in input_arr:
        if isinstance(elem, Iterable):
            flatten(elem, output_arr)
        else:
            output_arr.append(elem)
    return output_arr

```

### 实现二

```python
# 返回一个迭代器
def flatten_iter(iterable):
    '''
    接受多维可迭代输入参数, 返回一维输出的生成器.
    '''
    for elem in iterable:
        if isinstance(elem, Iterable):
            yield from flatten_iter(elem)
        else:
            yield elem

```

[参考文章](http://yshblog.com/blog/170)
