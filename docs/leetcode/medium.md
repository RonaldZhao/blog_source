# Medium

## 3. Longest Substring Without Repeating Characters

```python3
class Solution:
    def lengthOfLongestSubstring(self, s):
        """
        :type s: str
        :rtype: int
        """
        max_length = 0  # 记录子串的最大长度
        begin = 0  # 记录当前子串的开始位置
        showed_chars = {}  # 记录每个字符上一次出现时的位置
        
        for i in range(len(s)):  # 遍历整个字符串
            char_i = s[i]  # 获取当前位置的字符
            
            if char_i in showed_chars and showed_chars[char_i] >= begin:  # 如果当前字符出现过并且上一次出现的位置在当前子串开始的位置甚至更后面（即出现了重复字符）
                begin = showed_chars[char_i] + 1  # 则当前子串结束，重新记录下一个子串的开始位置为当前字符上一次出现位置的后面位置
            else:
                max_length = max(max_length, i-begin+1)  # 否则更新最大长度为当前最大长度和当前子串长度的最大值
            
            showed_chars[char_i] = i  # 更新当前字符最后出现的位置
        
        return max_length

```

## 54. Spiral Matrix

```python
# Python3
class Solution:
    def spiralOrder(self, matrix):
        """
        :type matrix: List[List[int]]
        :rtype: List[int]
        """
        ret = []
        if matrix is None or len(matrix) == 0 or matrix[0] is None or len(matrix[0]) == 0:
            return ret

        row_begin = 0
        row_end = len(matrix) - 1
        col_begin = 0
        col_end = len(matrix[0]) - 1

        while row_begin <= row_end and col_begin <= col_end:
            for i in range(col_begin, col_end+1):
                ret.append(matrix[row_begin][i])
            row_begin += 1

            for i in range(row_begin, row_end+1):
                ret.append(matrix[i][col_end])
            col_end -= 1

            if row_begin <= row_end:
                for i in range(col_end, col_begin-1, -1):
                    ret.append(matrix[row_end][i])
            row_end -= 1

            if col_begin <= col_end:
                for i in range(row_end, row_begin-1, -1):
                    ret.append(matrix[i][col_begin])
            col_begin += 1

        return ret

```

## 209. Minimum Size Subarray Sum

```python
# Python3
class Solution:
    def minSubArrayLen(self, s, nums):
        """
        :type s: int
        :type nums: List[int]
        :rtype: int
        """
        # 滑动窗口, O(n)
        ret = float('inf')
        left, cur_sum = 0, 0
        for i in range(len(nums)):
            cur_sum += nums[i]
            while left <= i and cur_sum >= s:
                ret = min(ret, i-left+1)
                cur_sum -= nums[left]
                left += 1
        return ret if ret != float('inf') else 0

```

## 498. Diagonal Traverse

```python
# Python3
# 参考视频: https://www.youtube.com/watch?v=uj65eeIScnQ
class Solution:
    def findDiagonalOrder(self, matrix):
        """
        :type matrix: List[List[int]]
        :rtype: List[int]
        """
        '''
        1.
        s = rows + cols - 1;
        2.
        even index(starting from 0): up right
        int x = s < rows ? s : rows-1;
        int y = s < rows ? 0 : s-(rows-1);

        odd index: down left
        int x = s < cols ? 0 : s-(cols-1);
        int y = s < cols ? s : cols-1;
        '''
        if len(matrix) == 0 or len(matrix[0]) == 0:
            return []
        rows, cols = len(matrix), len(matrix[0])
        s = rows + cols - 1
        ret = []
        for i in range(s):
            if i % 2 == 0:
                x = i if i < rows else rows-1
                y = 0 if i < rows else i-(rows-1)
                while x >= 0 and y < cols:
                    ret.append(matrix[x][y])
                    x -= 1
                    y += 1
            else:
                x = 0 if i < cols else i-(cols-1)
                y = i if i < cols else cols-1
                while x < rows and y >= 0:
                    ret.append(matrix[x][y])
                    x += 1
                    y -= 1
        return ret

```

```java
// Java
/*
1.
s = rows + cols - 1;
2.
even index(starting from 0): up right
int x = s < rows ? s : rows-1;
int y = s < rows ? 0 : s-(rows-1);

odd index: down left
int x = s < cols ? 0 : s-(cols-1);
int y = s < cols ? s : cols-1;
*/
class Solution {
    public int[] findDiagonalOrder(int[][] matrix) {
        if(matrix.length == 0 || matrix[0].length == 0) {
            return new int[0];
        }
        int rows = matrix.length, cols = matrix[0].length;
        int s = rows + cols - 1, index = 0;
        int[] ret = new int[rows * cols];
        for(int i=0; i<s; i++) {
            if(i % 2 == 0) {
                int x = i < rows ? i : rows-1, y = i < rows ? 0 : i-(rows-1);
                while(x >= 0 && y < cols) {
                    ret[index++] = matrix[x--][y++];
                }
            } else {
                int x = i < cols ? 0 : i-(cols-1), y = i < cols ? i : cols-1;
                while(x < rows && y >= 0) {
                    ret[index++] = matrix[x++][y--];
                }
            }
        }
        return ret;
    }
}
```
