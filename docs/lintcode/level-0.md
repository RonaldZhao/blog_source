# 入门

## 366. 斐波纳契数列

```python
# Python3
class Solution:
    """
    @param n: an integer
    @return: an ineger f(n)
    """
    def generate_next(self):
        a, b = 0, 1
        yield a  # 第一个数要单独返回
        while True:
            yield b
            a, b = b, a+b

    def fibonacci(self, n):
        if n < 1:
            return None
        i = 1
        g = self.generate_next()
        while i < n:
            next(g)
            i += 1
        return next(g)

```

```java
// Java
public class Solution {
    /**
     * @param n: an integer
     * @return: an ineger f(n)
     */
    public int fibonacci(int n) {
        if(n < 1) {
            return -1;
        }
        if(n == 1) {
            return 0;
        }
        if(n == 2 || n == 3) {
            return 1;
        }
        int a = 1;
        int b = 1;
        for(int i=3; i<n; i++) {
            int t = a;
            a = b;
            b = t+b;
        }
        return b;
    }
}
```

## 452. 删除链表中的元素

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

## 454. 矩阵面积

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

## 463. 整数排序

```python
# Python3
class Solution:
    """
    @param A: an integer array
    @return: nothing
    """
    def bubble_sort(self, A):
        if len(A) > 1:
            for i in range(len(A)):
                for j in range(1, len(A)-i):
                    if A[j-1] > A[j]:
                        A[j-1], A[j] = A[j], A[j-1]

    def selection_sort(self, A):
        if len(A) > 1:
            for i in range(len(A)):
                min = i
                for j in range(i+1, len(A)):
                    if A[j] < A[min]:
                        min = j
                A[i], A[min] = A[min], A[i]

    def sortIntegers(self, A):
        # bubble sort
        # self.bubble_sort(A)

        # selection sort
        self.selection_sort(A)

```

```java
// Java
public class Solution {
    /**
     * @param A: an integer array
     * @return: nothing
     */
    public void sortIntegers(int[] A) {
        // bubble sort
        for(int i=0; i<A.length; i++) {
            for(int j=1; j<A.length-i; j++) {
                if(A[j-1] > A[j]) {
                    int t = A[j-1];
                    A[j-1] = A[j];
                    A[j] = t;
                }
            }
        }
    }
}
```

## 466. 链表节点计数

```python
# Python3
class Solution:
    """
    @param head: the first node of linked list.
    @return: An integer
    """
    def countNodes(self, head):
        ret = 0
        while head:
            ret += 1
            head = head.next
        return ret

```

```java
// Java
public class Solution {
    /**
     * @param head: the first node of linked list.
     * @return: An integer
     */
    public int countNodes(ListNode head) {
        int ret = 0;
        while(head != null) {
            ret += 1;
            head = head.next;
        }
        return ret;
    }
}
```

## 479. 数组第二大数

```python
# Python3
class Solution:
    """
    @param nums: An integer array
    @return: The second max number in the array.
    """
    def secondMax(self, nums):
        return sorted(nums)[-2]

```

```java
// Java
public class Solution {
    /**
     * @param nums: An integer array
     * @return: The second max number in the array.
     */
    public int secondMax(int[] nums) {
        java.util.Arrays.sort(nums);
        return nums[nums.length-2];
    }
}
```

## 484. 交换数组两个元素

```python
# Python3
class Solution:
    """
    @param A: An integer array
    @param index1: the first index
    @param index2: the second index
    @return: nothing
    """
    def swapIntegers(self, A, index1, index2):
        A[index1], A[index2] = A[index2], A[index1]

```

```java
// Java
public class Solution {
    /**
     * @param A: An integer array
     * @param index1: the first index
     * @param index2: the second index
     * @return: nothing
     */
    public void swapIntegers(int[] A, int index1, int index2) {
        // write your code here
        int t = A[index1];
        A[index1] = A[index2];
        A[index2] = t;
    }
}
```

## 632. 二叉树的最大节点

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

## 763. 进制转换

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
