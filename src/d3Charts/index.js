/*
 * Description  : 组织树图文件
 * Author       : Saraku.
 * Date         : 2021-04-21 09:08:30
 * LastEditors  : Dongxy
 * LastEditTime : 2021-04-22 17:50:51
 */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from 'react';
import _ from 'lodash';
import * as d3 from 'd3';
import userPng from '../assets/svg/user.svg';
// import './index.css';

/**
 * @param {svgWidth} svgWidth int 图形宽度
 * @param {svgHeight} svgHeight int 图形高度
 * @param {svgPadding} svgPadding int svg内边距
 * @param {cardWidth} cardWidth int 卡片宽度，默认 200px
 * @param {cardHeight} cardHeight int 卡片高度，默认 120px
 * @param {cardStrokeWidth} cardStrokeWidth int 卡片边框宽度，默认 4
 * @param {cardPadding} cardPadding int 卡片内边距，默认 20
 * @param {imgWidth} imgWidth int 头像宽度/长度，默认50
 * @param {childCardWidth} childCardWidth int 子级卡片宽度，默认=cardHeight
 * @param {childCardHeight} childCardHeight int 子级卡片高度，默认= 155
 * @param {cardColor} cardColor string 边框的颜色
 * @param {lineColor} lineColor string 线条的颜色
 * @param {textAlign} textAlign string(middle | left | right) 文本对齐方式，默认left
 * @param {textStyle} textStyle {rootFontSize,textColor,childFontSize}
 * @param {data} data object {name:string,imgSrc:string,description:string,children:[]}
 * 注：description中使用\n可以换行，
 */
function Index(props) {
  const {
    data = {},
    svgWidth = 1200,
    svgHeight = 400,
    svgPadding,
    cardWidth = 180,
    cardHeight = 110,
    cardColor = 'rgba(66, 163, 255, 0.1)',
    lineColor = '#EEEEEE',
    childCardWidth = 130,
    childCardHeight = 155,
    cardStrokeWidth = 4,
    cardPadding = 20,
    imgWidth = 50,
    fontSize = 16,
    textAlign = 'middle',
    textStyle = {},
  } = props;
  const tree = useRef(null);
  const treeSelect = useRef(null);
  const [treeNodes, setTreeNodes] = useState([]);
  const [treeLinks, setTreeLinks] = useState([]);
  const [transScale, setTransScale] = useState(1);

  /** 遍历data,如果没有imgSrc就默认 */
  const handleData = data => {
    _.map(data, d => {
      if (_.has(d, 'children')) {
        d.imgSrc = _.isEmpty(d.imgSrc) ? userPng : d.imgSrc;
        handleData(d.children);
      } else {
        d.imgSrc = _.isEmpty(d.imgSrc) ? userPng : d.imgSrc;
      }
    });
  };

  useEffect(() => {
    if (!_.isEmpty(data)) {
      let dataClone = _.cloneDeep(data);
      handleData([dataClone]);

      const treeLayout = d3
        .tree()
        .size([svgWidth * 0.8, svgHeight])
        .separation((a, b) => (a.parent === b.parent ? 1 : 2));
      tree.current = treeLayout;
      /** 缩放用的 */
      treeSelect.current = d3.select('tree_svg');

      const hierarchyData = d3.hierarchy(dataClone);
      // hierarchy 把处理后的数据变成层次关系，分成Node(点)和link(线)
      const treeNode = treeLayout(hierarchyData);
      setTreeNodes(treeNode.descendants());
      setTreeLinks(treeNode.links());
    }
  }, [svgWidth, svgHeight, data]);

  const decriptionText = text => {
    if (!_.isEmpty(text)) {
      const arr = text.split('\n');
      return _.map(arr, (d, i) => (
        <tspan x="0" y={22 + i * (fontSize + 4)} fontSize="14" fill="#888888">
          {d}
        </tspan>
      ));
    }
  };

  /** 放大 */
  const zoomUp = () => {
    // d3.zoom().scaleTo(treeSelect.current, transScale + 0.05);
    setTransScale(transScale + 0.05);
  };

  /** 缩小 */
  const zoomDown = () => {
    // d3.zoom().scaleTo(treeSelect.current, transScale - 0.05);
    setTransScale(transScale - 0.05);
  };

  return (
    <div className="orgtree" style={{ position: 'relative' }}>
      <svg
        className="tree_svg"
        width={svgWidth}
        height={svgHeight}
        style={{
          transform:`scale(${transScale})`,
          padding: svgPadding
            ? svgPadding
            : !_.isEmpty(treeNodes) && `10px ${(svgWidth - 2 * Math.floor(treeNodes[0].x)) / 2}px`,
        }}
      >
        <g className="tree_node">
          {_.map(treeNodes, (node, index) => {
            return index === 0 ? (
              <g transform={`translate(${node.x}, ${node.y})`}>
                <defs>
                  <clipPath id={`clip${index}`}>
                    <circle cx={imgWidth / 2} cy={imgWidth / 2} r={imgWidth / 2} stroke="#000000" />
                  </clipPath>
                </defs>
                <rect
                  style={{ stroke: `${cardColor}`, strokeWidth: `${cardStrokeWidth}` }}
                  fill="none"
                  width={cardWidth}
                  height={cardHeight}
                  transform={`translate(-${cardWidth / 2}, ${cardStrokeWidth})`}
                  rx={8}
                  ry={8}
                />
                <image
                  href={node.data.imgSrc}
                  width={imgWidth}
                  height={imgWidth}
                  clipPath={`url(#clip${index})`}
                  transform={`translate(${cardPadding - cardWidth / 2}, ${cardHeight / 2 - 22})`}
                />
                {/* <foreignObject style={{ stroke: `${cardColor}`, strokeWidth: `${cardStrokeWidth}` }} x={0} y={cardHeight / 2} width={cardWidth - 2 * cardPadding - imgWidth} height={cardHeight - 2 * cardPadding}>
                    <p style={{whiteSpace: 'nowrap',overflow: 'hidden',textOverflow: 'ellipsis'}}>测试测试测试测试测试测试测试</p>
                  </foreignObject> */}
                <text textAnchor="left" transform={`translate(0, ${cardHeight / 2})`}>
                  <tspan
                    x="0"
                    y="0"
                    fontSize={textStyle.rootFontSize ? textStyle.rootFontSize : '22'}
                    fontWeight="bold"
                    fill={textStyle.textColor ? textStyle.textColor : '#1A2D3F'}
                  >
                    {node.data.name}
                  </tspan>
                  {decriptionText(node.data.description)}
                </text>
              </g>
            ) : (
              <g transform={`translate(${node.x}, ${node.y})`}>
                <defs>
                  <clipPath id={`clip${index}`}>
                    <circle cx={imgWidth / 2} cy={imgWidth / 2} r={imgWidth / 2} stroke="#000000" />
                  </clipPath>
                </defs>
                <rect
                  style={{ stroke: `${cardColor}`, strokeWidth: `${cardStrokeWidth}` }}
                  fill="none"
                  width={childCardWidth}
                  height={childCardHeight}
                  transform={`translate(-${childCardWidth / 2}, 0)`}
                  rx={8}
                  ry={8}
                />
                <image
                  href={node.data.imgSrc}
                  width={imgWidth}
                  height={imgWidth}
                  clipPath={`url(#clip${index})`}
                  transform={`translate(${-imgWidth / 2}, ${cardPadding / 2 + 5}) scale(1.1)`}
                />
                <text
                  textAnchor={textAlign}
                  transform={`translate(0, ${2 * cardPadding + imgWidth})`}
                >
                  <tspan
                    x="0"
                    y="0"
                    fontSize={textStyle.childFontSize ? textStyle.childFontSize : '17'}
                    fontWeight="bold"
                    fill={textStyle.textColor ? textStyle.textColor : '#1A2D3F'}
                  >
                    {node.data.name}
                  </tspan>
                  {decriptionText(node.data.description)}
                </text>
              </g>
            );
          })}
        </g>
        <g className="tree_line">
          {/* <defs>
          <marker id="arrow"
            markerUnits="strokeWidth"
            markerWidth={20}
            markerHeight={20}
            viewBox='0 0 12 12'
            refX={5}
            refY={6}
            orient='auto'>
            <path d='M2,2 L10,6 L2,10 L6,6 L2,2' fill={lineColor} />
          </marker>
        </defs> */}
          {_.map(treeLinks, (link, i) => {
            const start = { x: link.source.x, y: link.source.y };
            const end = { x: link.target.x, y: link.target.y };
            // 生成贝塞尔曲线
            // const pathLink = d3.linkHorizontal().x(d => d.x).y(d => d.y)({ source: start, target: end });
            // 如果是第一层
            return start.x === treeLinks[0].source.x && start.y === treeLinks[0].source.y ? (
              <path
                key={i}
                d={`M${start.x},${start.y + cardHeight + cardStrokeWidth} L${start.x},${start.y +
                  cardHeight +
                  cardStrokeWidth +
                  30} L${end.x},${start.y + cardHeight + cardStrokeWidth + 30} ${end.x},${end.y}`}
                fill="none"
                stroke={lineColor}
                strokeWidth="2"
                // markerEnd='url(#arrow)'
              />
            ) : (
              <path
                key={i}
                d={`M${start.x},${start.y + childCardHeight + cardStrokeWidth} L${
                  start.x
                },${start.y + childCardHeight + cardStrokeWidth + 30} L${end.x},${start.y +
                  childCardHeight +
                  cardStrokeWidth +
                  30} ${end.x},${end.y}`}
                fill="none"
                stroke={lineColor}
                strokeWidth="2"
                // markerEnd='url(#arrow)'
              />
            );
          })}
        </g>
      </svg>

      <div className="zoombtn" style={{ position: 'absolute', top: 0, right: 0,margin:'8px' }}>
        <span
          onClick={zoomUp}
          style={{
            color: '#2784ee',
            fontSize: '24px',
            fontWeight: 'bold',
            display: 'inline-block',
            height: '28px',
            width: '28px',
            lineHeight: '20px',
            textAlign:'center',
            border: '1px solid #2784ee',
            borderRadius: '50%',
            marginRight:'12px',
            cursor:'pointer'
          }}
        >
          +
        </span>
        <span
          onClick={zoomDown}
          style={{
            color: '#2784ee',
            fontSize: '24px',
            fontWeight: 'bold',
            display: 'inline-block',
            height: '28px',
            width: '28px',
            lineHeight: '20px',
            textAlign:'center',
            border: '1px solid #2784ee',
            borderRadius: '50%',
            cursor:'pointer'
          }}
        >
          -
        </span>
      </div>
    </div>
  );
}

export default Index;
