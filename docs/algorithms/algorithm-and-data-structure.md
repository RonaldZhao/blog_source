# 算法与数据结构(Python3实现)

## 排序算法

### 选择排序

基本思想: TODO

时间复杂度: O(n^2)

空间复杂度: O(1)

适用情况: TODO

`Python3`代码实现:

```python
def deco(func):
    def wrapper(*args, **kwargs):
        start = time.clock()
        func(*args, **kwargs)
        end = time.clock()
        print('time consuming: {0} clock'.format(end - start))
    return wrapper

@deco
def selection_sort(arr):
    """
    :type arr: list[int] / list[float] / list[str]
    :rtype None: sort arr in-place. AESC.
    """
    length = len(arr)
    if arr is None or length <=1:  # 当传入的arr是None或长度<=1时直接返回
        return
    for i in range(length):
        min_index = i  # 初始化本次最小元素的下表为i
        for j in range(i+1, length):  # 在[i, length-1]区间内寻找最小元素
            if arr[j] < arr[min_index]:
                min_index = j
        if min_index != i:  # 如果找到的最小元素不是当前元素
            arr[i], arr[min_index] = arr[min_index], arr[i]  # 将当前元素和所找到的最小元素互换

```

::: tip TODO
画出此算法随着数据规模的增长所耗时间的变化曲线.
:::

### 插入排序

基本思想: TODO

时间复杂度: O(n^2)

空间复杂度: O(1)

适用情况: 对于**近乎有序**的元素序列, 性能远远优于选择排序.

`Python3`代码实现:

```python
def deco(func):
    def wrapper(*args, **kwargs):
        start = time.clock()
        func(*args, **kwargs)
        end = time.clock()
        print('time consuming: {0} clock'.format(end - start))
    return wrapper

@deco
def insertion_sort(arr):  # 基础版本
    for i in range(1, len(arr)):
        for j in range(i, 0, -1):
            if arr[j] < arr[j-1]:
                arr[j], arr[j-1] = arr[j-1], arr[j]
            else:
                break

@deco
def insertion_sort(arr):  # 改进版本1
    for i in range(1, len(arr)):
        cur = arr[i]
        j = i
        while j > 0 and arr[j-1] > cur:
            arr[j] = arr[j-1]
            j -= 1
        arr[j] = e

```

::: tip TODO
画出此算法随着数据规模的增长所耗时间的变化曲线.
:::

### 冒泡排序

基本思想: TODO

时间复杂度: O(n^2)

空间复杂度: O(1)

适用情况: TODO

`Python3`代码实现:

```python

```

### 希尔排序

基本思想: TODO

时间复杂度: TODO

空间复杂度: O(1)

适用情况: TODO

`Python3`代码实现:

```python

```
