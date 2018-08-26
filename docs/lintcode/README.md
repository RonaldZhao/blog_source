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
// Java
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
// Java
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

### 454. 矩阵面积

```python
# python3
class Rectangle:

    '''
     * Define a constructor which expects two parameters width and height here.
    '''
    def __init__(self, width, height):
        self.width = width
        self.height = height

    '''
     * Define a public method `getArea` which can calculate the area of the
     * rectangle and return.
    '''
    def getArea(self):
        return self.width * self.height

```

```java
// Java
public class Rectangle {
    /*
     * Define two public attributes width and height of type int.
     */
     public int width;
     public int height;

    /*
     * Define a constructor which expects two parameters width and height here.
     */
     Rectangle(int width, int height) {
         this.width = width;
         this.height = height;
     }

    /*
     * Define a public method `getArea` which can calculate the area of the
     * rectangle and return.
     */
     public int getArea() {
         return this.width * this.height;
     }
}
```

### 632. 二叉树的最大节点

```python
# Python3
class Solution:
    """
    @param: root: the root of tree
    @return: the max node
    """
    def maxNode(self, root):
        if root is None:
            return root
        left = self.maxNode(root.left)  # 获取左子树的最大结点
        right = self.maxNode(root.right)  # 获取右子树的最大结点
        return self.max(root, self.max(left, right))

    def max(self, a, b):
        '''
        @param: a: a TreeNode
        @param: b: another TreeNode
        @return: the max TreeNode between a and b
        '''
        if a is None:
            return b
        if b is None:
            return a
        if a.val > b.val:
            return a
        return b

```

```java
// Java
public class Solution {
    /*
     * @param root: the root of tree
     * @return: the max node
     */
    public TreeNode maxNode(TreeNode root) {
        if(root == null) {
            return root;
        }
        TreeNode left = maxNode(root.left);
        TreeNode right = maxNode(root.right);
        return max(root, max(left, right));
    }

    TreeNode max(TreeNode a, TreeNode b) {
        if(a == null) {
            return b;
        }
        if(b == null) {
            return a;
        }
        if(a.val > b.val) {
            return a;
        }
        return b;
    }
}
```

### 763. 进制转换

```python
# Python3
class Solution:
    """
    @param n: a decimal number
    @param k: a Integer represent base-k
    @return: a base-k number
    """
    def hexConversion(self, n, k):
        if n == 0:
            return '0'
        ret = ''
        while n > 0:
            t = n % k
            if t <= 9:
                ret = str(t) + ret
            else:
                import string
                ret = string.ascii_uppercase[:6][t-10] + ret
            n //= k
        return ret

```

```java
// Java
public String hexConversion(int n, int k) {
    if(n == 0) {
        return "0";
    }
    String ret = "";
    while(n > 0) {
        int t = n % k;
        if(t <= 9) {
            ret = (char)('0' + t) + ret;
        } else {
            ret = (char)('A' + t - 10) + ret;
        }
        n /= k;
    }
    return ret;
}
```

## 简单级

### 1038. Jewels and Stones

```python
# Python3
class Solution:
    """
    @param J: the types of stones that are jewels
    @param S: representing the stones you have
    @return: how many of the stones you have are also jewels
    """
    def numJewelsInStones(self, J, S):
        from collections import defaultdict
        dictS = defaultdict(int)
        for c in S:
            dictS[c] += 1
        ret = 0
        for c in J:
            ret += dictS[c]
        return ret

```

```java
// Java
public class Solution {
    /**
     * @param J: the types of stones that are jewels
     * @param S: representing the stones you have
     * @return: how many of the stones you have are also jewels
     */
    public int numJewelsInStones(String J, String S) {
        int ret = 0;
        char[] cs = S.toCharArray();
        char[] cj = J.toCharArray();
        HashMap<Character, Integer> map = new HashMap<>();
        for(char c : cs) {
            if(map.get(c) == null) {
                map.put(c, 1);
            } else {
                map.put(c, map.get(c)+1);
            }
        }
        for(char c : cj) {
            if(map.get(c) != null) {
                ret += map.get(c);
            }
        }
        return ret;
    }
}
```

## 中等级

## 困难级

## 超难级
