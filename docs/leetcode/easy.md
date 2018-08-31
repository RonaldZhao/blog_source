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
