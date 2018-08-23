# LintCode 个人 AC 解法(Python3/Java)

## 入门级

### 2. 尾部的零

```python
# python3
def trailingZeros(self, n):
    # 下面的是一开始想到的解法，结果超时
    """
    if n < 0:
        return None
    elif n < 5:
        return 0
    else:
        f = 1
        while n > 0:
            f = f * n
            n = n - 1
        n = 0
        s = str(f)
        for c in s[::-1]:
            if c != '0':
                break
            n = n + 1
        return n
    """
    # 下面的是从 九章算法 借鉴来的
    s = 0
    while n != 0:
        n = n // 5
        s = s + n
    return s

```

```java
// java
public long trailingZeros(long n) {
    long s = 0;  // int范围不够
    while(n != 0) {
        n /= 5;
        s += n;
    }
    return s;
}
```

### 452. 删除链表中的元素

```python
# python3
def removeElements(self, head, val):
    cur = head  # 设置游标
    prev = head  # 用来保存游标的上一个结点
    while cur != None:
        if cur.val == val:  # 如果当前结点的值等于要给定的值
            if cur == head:
                head = head.next
                cur = head
                continue
            else:
                prev.next = cur.next  # 删除结点
        else:
            prev = cur  # 更新 prev 的指向
        cur = cur.next  # 移动游标
    return head

```

```java
// Java 解
public ListNode removeElements(ListNode head, int val) {
    if(head != null) {
        ListNode cur = head;
        ListNode pre = head;
        while(cur != null) {
            if(val == cur.val) {
                if(cur == head) {
                    head = head.next;
                    cur = head;
                    continue;
                } else {
                    pre.next = cur.next;
                }
            } else {
                pre = cur;
            }
            cur = cur.next;
        }
    }
    return head;
}
```

## 简单级

## 中等级

## 困难级

## 超难级
