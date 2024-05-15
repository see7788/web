import React, { FC, useState, useEffect, Fragment } from "react"
export interface DB_t {
    id: number
    id_parent: number
    name: string
}
export interface useArrToTeee_param_t<T extends DB_t> {
    dbs: T[]
    startId?: number,
    expandDef?: number[]
}

export default function useArrToTeee<T extends DB_t>({ dbs, startId,expandDef }: useArrToTeee_param_t<T>) {
    interface TreeDb_t<T extends DB_t> {
        db: T
        key: T["id"]//Tree需要
        children: TreeDb_t<T>[]
        parentNodes: number[]
    }
    const [treeData, treeDataSet] = useState<TreeDb_t<T>[]>([])
    const [expanded, expandedSet] = useState<number[]>([])
    function arrayobjectToTree<T extends DB_t>(db: T[], id_parent: T["id_parent"], clickArr: TreeDb_t<T>["parentNodes"]): TreeDb_t<T>[] {
        const newDb: T[] = []
        const arrobj = db.filter((v, index) => {
            if (v.id_parent == id_parent && v.id != v.id_parent) {
                return true
            } else {
                newDb.push(v)
                return false
            }
        })
        return arrobj.length > 0 ?
            arrobj.map((c) => {
                const parentNodes = [...clickArr, c.id]
                return {
                    key: c.id,
                    children: arrayobjectToTree(newDb, c.id, parentNodes),
                    parentNodes,
                    db: c
                }
            }) :
            [];
    }
    useEffect(() => {
        treeDataSet(arrayobjectToTree(dbs, startId || 1, [startId || 1]))
        expandedSet(expandDef||[1])
    }, [dbs, startId])
    return {treeData,expanded, expandedSet}
}