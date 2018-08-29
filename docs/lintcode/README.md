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

### 366. 斐波纳契数列

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

### 463. 整数排序

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

### 466. 链表节点计数

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

### 479. 数组第二大数

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

### 484. 交换数组两个元素

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

### 165. 合并两个排序链表

```python
# Python3
class Solution:
    """
    @param l1: ListNode l1 is the head of the linked list
    @param l2: ListNode l2 is the head of the linked list
    @return: ListNode head of linked list
    """
    def mergeTwoLists(self, l1, l2):
        if l1 is None:
            return l2
        if l2 is None:
            return l1
        head = None
        if l1.val <= l2.val:
            head = l1
            l1 = l1.next
        else:
            head = l2
            l2 = l2.next
        indx = head
        while l1 and l2:
            if l1.val <= l2.val:
                indx.next = l1
                l1 = l1.next
            else:
                indx.next = l2
                l2 = l2.next
            indx = indx.next
        if l1:
            indx.next = l1
        if l2:
            indx.next = l2
        return head

```

```java
// Java
public class Solution {
    /**
     * @param l1: ListNode l1 is the head of the linked list
     * @param l2: ListNode l2 is the head of the linked list
     * @return: ListNode head of linked list
     */
    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        if(l1 == null) {
            return l2;
        }
        if(l2 == null) {
            return l1;
        }
        ListNode head;
        if(l1.val <= l2.val) {
            head = l1;
            l1 = l1.next;
        } else {
            head = l2;
            l2 = l2.next;
        }
        ListNode indx = head;
        while(l1 != null && l2 != null) {
            if(l1.val <= l2.val) {
                indx.next = l1;
                l1 = l1.next;
            } else {
                indx.next = l2;
                l2 = l2.next;
            }
            indx = indx.next;
        }
        if(l1 != null) {
            indx.next = l1;
        }
        if(l2 != null) {
            indx.next = l2;
        }
        return head;
    }
}
```

### 365. 二进制中有多少个1

```python
# Python3
class Solution:
    """
    @param: num: An integer
    @return: An integer
    """
    def countOnes(self, num):
        if num >= 0:
            return bin(num)[2:].count('1')
        else:
            return 32 - bin(num)[2:].count('0')

```

```java
// Java
public class Solution {
    /*
     * @param num: An integer
     * @return: An integer
     */
    public int countOnes(int num) {
        int count = 0;
        while(num != 0) {
            num = num & (num-1);
            count++;
        }
        return count;
    }
}
```

### 474. 最近公共祖先 II

```python
# Python3
class Solution:
    """
    @param: root: The root of the tree
    @param: A: node in the tree
    @param: B: node in the tree
    @return: The lowest common ancestor of A and B
    """
    def lowestCommonAncestorII(self, root, A, B):
        if root is None or root == A or root == B:
            return root
        if A is None or B is None:
            return None
        temp_list = []
        indx = A
        while indx:
            temp_list.append(indx)
            indx = indx.parent

        indx = B
        while indx:
            if indx in temp_list:
                return indx
            indx = indx.parent

```

```java
// Java
public class Solution {
    /*
     * @param root: The root of the tree
     * @param A: node in the tree
     * @param B: node in the tree
     * @return: The lowest common ancestor of A and B
     */
    public ParentTreeNode lowestCommonAncestorII(ParentTreeNode root, ParentTreeNode A, ParentTreeNode B) {
        // write your code here
        ArrayList<ParentTreeNode> list = new ArrayList<>();
        ParentTreeNode indx = A;
        while(indx != null) {
            list.add(indx);
            indx = indx.parent;
        }
        indx = B;
        while(indx != null) {
            if(list.contains(indx)) {
                break;
            }
            indx = indx.parent;
        }
        return indx;
    }
}
```

### 495. 实现栈

```python
# Python3
class Stack:
    def __init__(self):
        self.lst = []

    """
    @param: x: An integer
    @return: nothing
    """
    def push(self, x):
        self.lst.append(x)

    """
    @return: nothing
    """
    def pop(self):
        if not self.isEmpty():
            del self.lst[-1]

    """
    这个要注意返回是最后一个元素的值...
    @return: An integer
    """
    def top(self):
        return self.lst[-1]

    """
    @return: True if the stack is empty
    """
    def isEmpty(self):
        return len(self.lst) == 0

```

```java
// Java
public class Stack {
    private LinkedList list;
    Stack() {
        this.list = new LinkedList();
    }
    /*
     * @param x: An integer
     * @return: nothing
     */
    public void push(int x) {
        this.list.push(x);
    }

    /*
     * @return: nothing
     */
    public void pop() {
        this.list.pop();
    }

    /*
     * @return: An integer
     */
    public int top() {
        return (int)this.list.getFirst();
    }

    /*
     * @return: True if the stack is empty
     */
    public boolean isEmpty() {
        return this.list.size() == 0;
    }
}
```

### 835. Hamming距离

```python
# Python3
class Solution:
    """
    @param x: an integer
    @param y: an integer
    @return: return an integer, denote the Hamming Distance between two integers
    """
    def hammingDistance(self, x, y):
        s = bin(x^y)[2:]
        return s.count('1')

```

```java
// Java
public class Solution {
    /**
     * @param x: an integer
     * @param y: an integer
     * @return: return an integer, denote the Hamming Distance between two integers
     */
    public int hammingDistance(int x, int y) {
        return Integer.toBinaryString(x^y).replaceAll("0", "").length();
    }
}
```

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

### 1126. Merge Two Binary Trees

```python
# Python3
class Solution:
    """
    @param t1: the root of the first tree
    @param t2: the root of the second tree
    @return: the new binary tree after merge
    """
    def mergeTrees(self, t1, t2):
        if t1 and t2:
            t1.val = t1.val + t2.val
            t1.left = self.mergeTrees(t1.left, t2.left)
            t1.right = self.mergeTrees(t1.right, t2.right)
        if t2:
            return t2
        return t1

```

```java
// Java
public class Solution {
    /**
     * @param t1: the root of the first tree
     * @param t2: the root of the second tree
     * @return: the new binary tree after merge
     */
    public TreeNode mergeTrees(TreeNode t1, TreeNode t2) {
        if(t1 != null && t2 != null) {
            t1.val = t1.val + t2.val;
            t1.left = mergeTrees(t1.left, t2.left);
            t1.right = mergeTrees(t1.right, t2.right);
        }
        else if(t2 != null) {
            return t2;
        }
        return t1;
    }
}
```

### 1546. 零钱问题

```python
# python3
class Solution:
    """
    @param n: The guest paid
    @param m: the price
    @return: the sum of the number of banknotes
    """
    def coinProblem(self, n, m):
        x = n - m
        ret = 0
        for i in [100, 50, 20, 10, 5, 2, 1]:
            ret += x // i
            x %= i
        return ret

```

```java
// Java
public class Solution {
    /**
     * @param n: The guest paid
     * @param m: the price
     * @return: the sum of the number of banknotes
     */
    public int coinProblem(int n, int m) {
        int x = n - m;
        int ret = 0;
        int[] money = {100,50,20,10,5,2,1};
        for(int i : money) {
            ret += x / i;
            x %= i;
        }
        return ret;
    }
}
```

## 中等级

## 困难级

## 超难级
