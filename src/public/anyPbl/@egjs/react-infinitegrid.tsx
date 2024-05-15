

import React, { FC, useState, useEffect, useRef, Fragment } from "react"

import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import { MasonryInfiniteGrid } from '@egjs/react-infinitegrid';

// 主要的MasonryGrid组件
const MasonryGrid: React.FC = () => {
  const [items, setItems] = useState(Array.from({ length: 10 }, (_, i) => ({ index: i })));
  const [animateOnAppend, setAnimateOnAppend] = useState(false);

  const GridItem: React.FC<{ index: number; animate: boolean }> = ({ index, animate }) => {
    const imageUrl = `https://naver.github.io/egjs-infinitegrid/assets/image/${(index % 33) + 1}.jpg`; // 确保图片路径正确
    return (
      <Card
        // bordered={false}//边框
        title="Card title"
        hoverable
        style={{
          width: '200px',
          margin: '8px',
          // opacity: 1,
          transition: 'all 1s ease',
          transitionDelay: `${animate ? `${index * 0.1}s` : '0s'}`,
        }}
        cover={
          <img
            src={imageUrl}
            alt={`Image ${index}`} // 重新添加alt属性以提高无障碍性
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'path/to/default-image.jpg';
            }}
          />
        }
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        <Card.Meta title="Europe Street beat" description="www.instagram.com" />
      </Card>
    );
  };

  const handleAppend = () => {
    const nextItems = Array.from({ length: 10 }, (_, i) => ({ index: items.length + i }));
    setItems(prevItems => [...prevItems, ...nextItems]);
    setAnimateOnAppend(true); // 下次追加时触发动画
  };

  return (
    <MasonryInfiniteGrid
      gap={5}
      align={"justify"}
      onRequestAppend={handleAppend}>
      {items.map(({ index }, i) => (
        <GridItem key={i} index={index} animate={animateOnAppend} />
      ))}
    </MasonryInfiniteGrid>
  );
};

export default MasonryGrid;