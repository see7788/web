import React, { FC, useState, useImperativeHandle, forwardRef, useMemo } from "react"
import { MasonryInfiniteGrid } from '@egjs/react-infinitegrid';
import { OnRequestAppend } from "@egjs/infinitegrid";
import useStore from "../store"
import { pro_t } from "../store/ts"
import Cart from "./id/antdCard"
export interface ref_t {
  scrollTo: (id: number) => boolean
}
export interface param_t {
  dbs?: pro_t[]
}
const MasonryGrid = forwardRef<ref_t, param_t>(({ dbs }, parentUse) => {
  const ref = React.useRef<MasonryInfiniteGrid>(null);
  const scrollTo: ref_t["scrollTo"] = (id) => {
    const ele = ref.current?.getItems().find(v => `.0:$${id}` == v.key)?.element
    if (ele) {
      ele.scrollIntoView({ block: 'center' })
      return true
    } else {
      return false
    }
  }
  const [maxIndex, maxIndexset] = useState(0)
  const items = useMemo(() => (dbs || []).slice(0, maxIndex), [dbs, maxIndex])
  useImperativeHandle(parentUse, () => {
    return {
      scrollTo
    }
  });
  return <MasonryInfiniteGrid
    ref={ref}
    align={"center"}//justify 间隙变化//center  居中
    gap={5}
    onRequestAppend={e => {
      if (dbs && dbs.length > maxIndex) {
        maxIndexset(maxIndex + 5)
      } else {

      }
    }}>
    {items.map((v) => (
      <div
        style={{
          width: '200px',
          transition: 'all 1s ease',
        }}
        data-grid-groupkey={1}
        key={v.id}
      >
        <Cart {...v} />
      </div>
    ))}
    <div
      style={{
        width: '200px',
        height: "150px",
        transition: 'all 1s ease',
      }}
      data-grid-groupkey={2}
    >
      {dbs && dbs.length == maxIndex ? "y" : "n"}
    </div>
  </MasonryInfiniteGrid>;
});

export default MasonryGrid;