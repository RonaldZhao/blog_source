# Easy

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
