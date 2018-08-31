# Medium

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
