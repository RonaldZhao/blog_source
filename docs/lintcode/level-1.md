# 简单

## 2. 尾部的零

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

## 165. 合并两个排序链表

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

## 174. 删除链表中倒数第n个节点

```python
# Python3
class Solution:
    """
    @param head: The first node of linked list.
    @param n: An integer
    @return: The head of linked list.
    """
    def removeNthFromEnd(self, head, n):
        pre_delete = ListNode(0, head)  # 用来指向要删除结点前面的那个结点, val是啥无所谓
        indx = head
        for i in range(n):
            indx = indx.next
        while indx:
            indx = indx.next
            pre_delete = pre_delete.next
        if pre_delete.next != head:  # 如果要删除的不是头结点
            pre_delete.next = pre_delete.next.next
        else:
            head = head.next
        return head

```

```java
// Java
public class Solution {
    /**
     * @param head: The first node of linked list.
     * @param n: An integer
     * @return: The head of linked list.
     */
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode pre_delete = new ListNode(0);
        pre_delete.next = head;
        ListNode indx = head;
        for(int i=0; i<n; i++) {
            indx = indx.next;
        }
        while(indx != null) {
            indx = indx.next;
            pre_delete = pre_delete.next;
        }
        if(pre_delete.next != head) {
            pre_delete.next = pre_delete.next.next;
        } else {
            head = head.next;
        }
        return head;
    }
}
```

## 365. 二进制中有多少个1

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

## 408. 二进制求和

```python
# Python3
class Solution:
    """
    @param a: a number
    @param b: a number
    @return: the result
    """
    def addBinary(self, a, b):
        return bin(int(a, base=2)+int(b, base=2))[2:]

```

```java
// Java
import java.math.BigInteger;
public class Solution {
    /**
     * @param a: a number
     * @param b: a number
     * @return: the result
     */
    public String addBinary(String a, String b) {
        return (new BigInteger(a, 2).add(new BigInteger(b, 2))).toString(2);
    }
}
```

## 474. 最近公共祖先 II

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

## 495. 实现栈

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

## 835. Hamming距离

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

## 1038. Jewels and Stones

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

## 1126. Merge Two Binary Trees

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

## 1332. Number of 1 Bits

```python
# Python3
class Solution:
    """
    @param n: an unsigned integer
    @return: the number of â1' bits
    """
    def hammingWeight(self, n):
        # 利用一个整数和本身减一的数相与可以消掉最后一个1的特点
        ret = 0
        while n:
            n &= n-1
            ret += 1
        return ret

```

```java
//Java
public class Solution {
    /**
     * @param n: an unsigned integer
     * @return: the number of â€™1' bits
     */
    public int hammingWeight(int n) {
        int ret = 0;
        while(n != 0) {
            n &= n-1;
            ++ret;
        }
        return ret;
    }
}
```

## 1546. 零钱问题

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
