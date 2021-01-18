# an-orgTree-react-antd-simple
# 仅限于react项目

### API:
svgWidth int 图形宽度
svgHeight int 图形高度
cardWidth int 卡片宽度
cardHeight int 卡片高度
cardStrokeWidth int 卡片边框宽度
cardPadding int 卡片内边距
imgWidth int 头像宽度/长度
childCardWidth int 子级卡片宽度
childCardHeight int 子级卡片高度
cardColor string 边框的颜色
lineColor string 线条的颜色
textAlign string(middle | left | right) 文本对齐方式，默认left
data:Object {name:string,imgSrc:string,description:string,children:[]}
注：description中使用\n可以换行，

### 引用: import {OrgTree} from 'an-orgTree-react-antd-simple'

### 自适应通过外部传入svgWidth svgHeight控制,默认居中

测试数据：
<OrgTree data={data} />

const data = {
    name: '11111',
    description: '职位',
    imgSrc: userPng,
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

