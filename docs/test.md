---
navbar: false
sidebar: false
---
# 标题

[[toc]]

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

:tada:
:100:

::: tip 提示
这是一个提示
:::

::: warning 警告
这是一个警告
:::

::: danger 危险
这是一个危险提醒
:::

``` python{3}
import json

s = "{'name': 'Ronald'}"
print(json.loads(s))
```


## 标题2

### 标题3

## 另一个标题2

现在是{{ 1+2 }}

{{ $page }}

::: v-pre
`{{ 这句话将会以行内代码的格式原样显示 }}`
:::
