# Easy

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
