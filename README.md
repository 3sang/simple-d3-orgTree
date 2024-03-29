# an-orgTree-react-antd-simple
# 仅限于 react 项目,不要antd也可以

*** 
写文章时主要借鉴和写的过程：https://blog.csdn.net/SaRAku/article/details/112267919
*** 

### API:

| svgWidth | int | 图形宽度 |  
| svgHeight | int | 图形高度 |  
| cardWidth | int | 卡片宽度 |
| cardHeight | int | 卡片高度 |
| cardStrokeWidth | int | 卡片边框宽度 |
| cardPadding | int | 卡片内边距 |  
| imgWidth | int | 头像宽度/长度 |  
| childCardWidth | int | 子级卡片宽度 |  
| childCardHeight | int | 子级卡片高度 |  
| cardColor | string | 边框的颜色 |  
| lineColor | string | 线条的颜色 |  
| textAlign | string | (middle || left || right) 文本对齐方式，默认 left |
| data | Object | {name:string,imgSrc:string,description:string,children:[]} |
| textStyle | Object | {rootFontSize,textColor,childFontSize} |

注：description 中使用\n 可以换行，

** 自适应通过外部传入 svgWidth svgHeight 控制,默认居中 **

---

测试数据：

```javascript
import React from 'react';
import { OrgTree } from 'an-orgtree-react-antd-simple';

export default function Index(params) {
  const data = {
    name: '11111',
    description: '职位',
    // imgSrc: userPng,
    children: [
      {
        name: '1111-1111',
        description: '职位1\n职位2',
      },
      {
        name: '21332434',
        description: '职位',
        children: [
          {
            name: '9484755',
            description: '职位',
          },
        ],
      },
      {
        name: '1111-2222',
        description: '职位',
      },
      {
        name: '121212',
        description: '职位',
      },
    ],
  };

  return <OrgTree data={data} />;
}
```
