# 生成指定范围内的指定个数随机数的list

## 代码实现

::: warning 需要用到的模块
`random` 和 `time`
:::

```python
def generate_random_array(n=10, left=1, right=100):
    """
    :desc 生成一个具有n个随机整数的list, 每个元素的范围为[left, right]
    :type n: int, 要生成的随机数个数, 默认为10
    :type left: int, 指定范围的最小值, 默认为1
    :type right: int, 指定范围的最大值, 默认为100
    :rtype: list, 返回一个list[int]
    """
    if n <= 0 or left > right:
      return []
    ret = []
    random.seed(time.time())
    for i in range(n):
      ret.append(random.randint(left, right))
    return ret

```
