

import React from "react"
import { MasonryInfiniteGrid } from '@egjs/react-infinitegrid';
import { OnRequestAppend } from "@egjs/infinitegrid";


function getItems(nowGroupKey: number) {
  const nextGroupKey = nowGroupKey + 1
  // const num = 5
  // return (dbs || []).slice(nowGroupKey * num, nextGroupKey * num).map(v => ({ ...v, groupKey: nextGroupKey }))
  return [
    { groupKey: nextGroupKey, id: Date.now() },
    { groupKey: nextGroupKey, id: Date.now() },
    { groupKey: nextGroupKey, id: Date.now() }
  ]
}
// 主要的MasonryGrid组件
const MasonryGrid: React.FC<{}> = () => {
  const GridCss = {
    width: '200px',
    height: "150px",
    margin: '8px',
    transition: 'all 1s ease',
    // transitionDelay: `${id * 0.1}s`
  }
  const ref = React.useRef<MasonryInfiniteGrid>(null);
  function scrollTo(id: number) {
    const ele = ref.current?.getItems().find(v => `.$${id}` == v.key)
    console.log(ele?.cssRect)
    // ele?.element?.scrollIntoView({
    //   behavior: 'smooth', // 可选，用于平滑滚动
    //   block: 'nearest', // 或者'center', 'end'等，根据需要调整
    //   inline: 'nearest', // 同上
    // });//不滚动
    ele && window.scrollTo(ele?.orgRect)
  }
  const [items, setItems] = React.useState<Array<{ groupKey: number, id: number }>>(getItems(0));

  function onRequestAppend(e: OnRequestAppend) {
    const g = getItems(Number(e?.groupKey || 0))
    if (g.length > 0) {
      setItems([
        ...items,
        ...g,
      ]);
    } else {
      console.log("没有了")
    }
  }
  return <MasonryInfiniteGrid
    ref={ref}
    align={"center"}//justify 间隙变化//center  居中
    gap={5}
    onRequestAppend={onRequestAppend}>
    {items.map(({ id, groupKey }) => (
      <div
        style={GridCss}
        data-grid-groupkey={groupKey}
        key={id}
      >
        <img
          style={{
            width: '200px',
            height: "150px"
          }}
          src={`https://naver.github.io/egjs-infinitegrid/assets/image/${(id % 33) + 1}.jpg`}
        />
      </div>
    ))}
  </MasonryInfiniteGrid>;
};