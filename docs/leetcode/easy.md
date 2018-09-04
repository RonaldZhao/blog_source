# Easy

## 14. Longest Common Prefix

```python
# Python3
class Solution:
    # Approach 1: Horizontal Scanning
    def longestCommonPrefix(self, strs):
        """
        :type strs: List[str]
        :rtype: str
        """
        if strs is None:
          return ''
        length = len(strs)
        if length == 0:
            return ''
        if length == 1:
            return strs[0]
        ret = strs[0][:]
        for i in range(1, length):
            cur_len = len(strs[i])
            if cur_len == 0:
                return ''
            m = min(len(ret), cur_len)
            for j in range(m):
                if ret[j] != strs[i][j]:
                    if j == 0:
                        return ''
                    ret = ret[:j]
                    break
                if j == m-1:
                    ret = ret[:m]
        return ret

    # Approach 2: Vertical Scanning
    def longestCommonPrefix(self, strs):
        """
        :type strs: List[str]
        :rtype: str
        """
        if strs is None:
            return ''
        length = len(strs)
        if length == 0:
            return ''
        if length == 1:
            return strs[0]
        ret = strs[0][:]
        for i in range(len(strs[0])):
            c = ret[i]
            for j in range(1, len(strs)):
                if strs[j] == '' or i == len(strs[j]):
                    return strs[j]
                if c != strs[j][i]:
                    return ret[:i]
        return ret

    # Approach 3: Divide and Conquer
    def longestCommonPrefix(self, strs):
        """
        :type strs: List[str]
        :rtype: str
        """
        if strs is None or len(strs) == 0:
            return ''
        return self.LCP(strs, 0, len(strs)-1)

    def LCP(self, strs, start, end):
        if start == end:
            return strs[start]
        mid = (start + end) // 2
        left = self.LCP(strs, start, mid)
        right = self.LCP(strs, mid+1, end)
        return self.Common_Prefix(left, right)

    def Common_Prefix(self, left, right):
        m = min(len(left), len(right))
        ret = ''
        for i in range(m):
            if left[i] != right[i]:
                return ret
            ret += left[i]
        return ret

```

## 27. Remove Element

```python
# Python3
class Solution:
    def removeElement(self, nums, val):
        """
        :type nums: List[int]
        :type val: int
        :rtype: int
        """
        k = 0
        for i in range(len(nums)):
            if nums[i] != val:
                nums[k] = nums[i]
                k += 1
        return k

```

## 28. Implement strStr()

```python
# Python3
class Solution:
    def strStr(self, haystack, needle):
        """
        :type haystack: str
        :type needle: str
        :rtype: int
        """
        if needle == '':
            return 0
        if needle in haystack:
            return haystack.index(needle)
        return -1

```

## 66. Plus One

```python
# Python3
class Solution:
    def plusOne(self, digits):
        """
        :type digits: List[int]
        :rtype: List[int]
        """
        n = int(''.join(map(str, digits)))
        return list(map(int, list(str(n+1))))

```

## 67. Add Binary

```python
# Python3
class Solution:
    def addBinary(self, a, b):
        """
        :type a: str
        :type b: str
        :rtype: str
        """
        return bin(int(a, base=2)+int(b, base=2))[2:]

```

## 118. Pascal's Triangle

```python
# Python3
class Solution:
    def generate(self, numRows):
        """
        :type numRows: int
        :rtype: List[List[int]]
        """
        if numRows == 0:
            return []
        if numRows == 1:
            return [[1]]
        if numRows == 2:
            return [[1], [1, 1]]
        ret = [[1], [1, 1]]
        pre_row = ret[1]
        for i in range(2, numRows):
            cur_row = [1]
            for j in range(i-1):
                cur_row.append(pre_row[j] + pre_row[j+1])
            cur_row.append(1)
            ret.append(cur_row)
            pre_row = cur_row
        return ret

```

## 167. Two Sum II - Input array is sorted

```python
# Python3
class Solution:
    def twoSum(self, numbers, target):
        """
        :type numbers: List[int]
        :type target: int
        :rtype: List[int]
        """
        # 参考: https://www.jiuzhang.com/solution/two-sum-ii-input-array-is-sorted/#tag-other-lang-python
        left, right = 0, len(numbers)-1
        while left < right:
            if numbers[left] + numbers[right] == target:
                return [left+1, right+1]
            elif numbers[left] + numbers[right] > target:
                right -= 1
            else:
                left += 1
        return None

```

## 189. Rotate Array

```python
# Python3
class Solution:
    def rotate(self, nums, k):
        """
        :type nums: List[int]
        :type k: int
        :rtype: void Do not return anything, modify nums in-place instead.
        """
        l = len(nums)
        if k == 0 or k == l:
            return
        k = k % l
        nums.extend(nums[:l-k])
        del nums[:l-k]

```

## 344. Reverse String

```python
# Python3
class Solution:
    def reverseString(self, s):
        """
        :type s: str
        :rtype: str
        """
        return s[::-1]

```

## 485. Max Consecutive Ones

```python
# Python3
class Solution:
    def findMaxConsecutiveOnes(self, nums):
        """
        :type nums: List[int]
        :rtype: int
        """
        return max(list(map(len, ''.join(map(str, nums)).split('0'))))

```

## 561. Array Partition I

```python
# Python3
class Solution:
    def arrayPairSum(self, nums):
        """
        :type nums: List[int]
        :rtype: int
        """
        if len(nums) == 0:
            return 0
        nums.sort()
        return sum(nums[::2])

```

## 724. Find Pivot Index

```python
# Python3
class Solution:
    def pivotIndex(self, nums):
        """
        :type nums: List[int]
        :rtype: int
        """
        lsum = 0
        tsum = sum(nums)
        for i in range(len(nums)):
            if lsum == tsum-lsum-nums[i]:
                return i
            lsum += nums[i]
        return -1

```

```java
// Java
class Solution {
    public int pivotIndex(int[] nums) {
        int sum = 0, lsum = 0;
        for(int x : nums) {
            sum += x;
        }
        for(int i=0; i<nums.length; i++) {
            if(lsum == sum-lsum-nums[i]) {
                return i;
            }
            lsum += nums[i];
        }
        return -1;
    }
}
```

## 747. Largest Number At Least Twice of Others

```python
# Python3
class Solution:
    def dominantIndex(self, nums):
        """
        :type nums: List[int]
        :rtype: int
        """
        if len(nums) == 1:
            return 0
        nums2 = nums[:]
        max_num = max(nums)
        while max_num in nums2:
            nums2.remove(max_num)
        if len(nums2) == 0:
            return 0
        max_num2 = max(nums2)
        if max_num >= max_num2*2:
            return nums.index(max_num)
        return -1

```
