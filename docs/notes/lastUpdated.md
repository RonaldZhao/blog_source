# Vuepress中的lastUpdated参数的正确使用

## 我的目录结构：
   
   ![博客目录结构](./filetree.png)

## 使`lastUpdated`参数生效的正确操作步骤：

0. 首先确保博客项目的文件夹是一个基于`git`的文件夹
1. 然后将`.md`文件`add`、`commit`并`push`(理论上说可以暂时不push)
2. 最后执行`npx vuepress build docs`生成`dist`文件夹

## 备注

顺序很重要，必须先`commit`后再`build`才能使`lastUpdated`生效，这一点官方文档没有说清楚。。。
