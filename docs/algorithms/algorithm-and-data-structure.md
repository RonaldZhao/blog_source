# 算法与数据结构(Python3实现)

## 排序算法

### 选择排序

时间复杂度: O(n^2)

空间复杂度: O(1)

适用情况: pass

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
