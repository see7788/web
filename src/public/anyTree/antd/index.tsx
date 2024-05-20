import React, { FC, useState, useRef, useEffect, Fragment, useMemo } from "react"
import useArrToTeee, { DB_t, useArrToTeee_param_t } from "../useArrToTeee"
import { Tree, GetRef } from "antd";
export interface api_t {
    set_id_parent: (op: { id: number, newId_parent: number }) => Promise<any>
}
export interface param_t<T extends DB_t> extends useArrToTeee_param_t<T> {
    TitleFC?: FC<T>
    api: api_t
    expanded?: number[],
    onClick_title?: (db?: T) => any
    onClick_expand?: (db?: T) => any
    onClick_right?: (db?: T) => any
}
export default function <T extends DB_t>({ onClick_title, onClick_expand, onClick_right, api, dbs, startId, expanded, TitleFC }: param_t<T>) {
    const treeData = useArrToTeee<T>({ dbs, startId })
    const TitleUiNow: FC<T> = TitleFC || ((db) => <>{db.id} {db.name}</>)
    const [expandedNow, expandedSet] = useState<number[]>(expanded || [1])
    useEffect(() => {
        expanded && expandedSet(expanded)
    }, [expanded])
    return (
        // <div onClick={event => event.stopPropagation()}>
        <Tree
            showIcon={true}
            onDrop={({ node, dragNode }) => api.set_id_parent({ id: dragNode.key, newId_parent: node.key })}
            onSelect={(k, { node }) => {
                onClick_title?.(expandedNow.length ? node.db : undefined);
                expandedSet([node.db.id])
            }}//点击title
            titleRender={(node) => <TitleUiNow {...{ ...node.db }} />}
            onExpand={(keys, { expanded, node }) => {
                onClick_expand?.(expanded ? node.db : undefined);
                expandedSet(expanded ? [node.key] : [])
            }}//折叠//展开 
            onRightClick={({ node }) => {
                expandedSet([node.db.id])
                onClick_right?.(expandedNow.length ? node.db : undefined)
            }}//监听右键
            draggable={true}//设置节点可拖拽（IE>8）
            blockNode={true}//是否节点占据一行
            showLine={false}//是否展示连接线
            treeData={treeData}
            autoExpandParent={true}//是否自动展开父节点
            expandedKeys={expandedNow}
        // defaultExpandedKeys={[458]}
        />
        // </div>
    )
}