# 算法与数据结构(Python3实现)

## 排序算法

### 选择排序

基本思想: TODO

时间复杂度: O(n^2)

空间复杂度: O(1)

适用情况: TODO

`Python3`代码实现:

```python
def time_consuming_deco(func):
    def wrapper(*args, **kwargs):
        start = time.clock()
        func(*args, **kwargs)
        end = time.clock()
        print('{0} time consuming: {1} clock'.format(func.__name__, end - start))
    return wrapper

@time_consuming_deco
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
def time_consuming_deco(func):
    def wrapper(*args, **kwargs):
        start = time.clock()
        func(*args, **kwargs)
        end = time.clock()
        print('{0} time consuming: {1} clock'.format(func.__name__, end - start))
    return wrapper

@time_consuming_deco
def insertion_sort(arr):  # 基础版本
    for i in range(1, len(arr)):
        for j in range(i, 0, -1):
            if arr[j] < arr[j-1]:
                arr[j], arr[j-1] = arr[j-1], arr[j]
            else:
                break

@time_consuming_deco
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

### 归并排序

基本思想: TODO

时间复杂度: O(nlogn)

空间复杂度: O(n)

适用情况: TODO

`Python3`代码实现:

```python
def time_consuming_deco(func):
    def wrapper(*args, **kwargs):
        start = time.clock()
        func(*args, **kwargs)
        end = time.clock()
        print('{0} time consuming: {1} clock'.format(func.__name__, end - start))
    return wrapper

@time_consuming_deco
def merge_sort(arr):
    __merge_sort(arr, 0, len(arr)-1)

def __merge_sort(arr, l, r):
    """
    递归使用归并排序, 对arr[l, r]的范围进行排序
    """
    if l >= r:
        return
    m = (l + r) // 2
    __merge_sort(arr, l, m)
    __merge_sort(arr, m+1, r)
    __merge(arr, l, m, r)

def __merge(arr, l, m, r):
    """
    将arr[l, m]和arr[m+1, r]两部分进行归并
    """
    temp_arr = arr[l:r+1]
    i, j, k = l, m+1, l
    while k <= r and i <= m and j <= r:
        if temp_arr[i-l] < temp_arr[j-l]:
            arr[k] = temp_arr[i-l]
            i += 1
        else:
            arr[k] = temp_arr[j-l]
            j += 1
        k += 1
    if i <= m:
        arr[k:r+1] = temp_arr[i-l:m+1-l]
    if j <= r:
        arr[k:r+1] = temp_arr[j-l:r+1-l]

```
