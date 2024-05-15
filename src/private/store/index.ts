import { immer } from 'zustand/middleware/immer'
import { create } from "zustand"
import _ from "lodash"
import type {Tables_t } from './ts'
import { notification } from "antd"
import Ipc from "./Ipc"

type Store_t = {
    ipc: Ipc,
    tables: { [k in keyof Tables_t]?: Array<Tables_t[k]> }
}
export default create<Store_t>()(immer<Store_t>((seter, geter) => {
    return {
        ipc: new Ipc((op) => {
            seter(s => {
                if (typeof op === "string") {
                    notification.warning({
                        message: op,
                        duration: 0, // 提示框自动关闭的时间，单位秒，0表示不自动关闭
                    });
                } if (typeof op === "object") {
                    switch (op.api) {
                        case "curdselect":
                            s.tables[op.table] = _.unionBy(op.data, s.tables[op.table], "id") as any;
                            break;
                        case "curddelete":
                            s.tables[op.table] = _.differenceBy(s.tables[op.table] as any, op.data, "id") as any;
                            break;
                        default:
                            console.log(op)
                    }
                }
            })
        }),
        tables: {},
    }
}))