import { immer } from 'zustand/middleware/immer'
import { create } from "zustand"
import type { } from 'zustand/middleware'//调试作用
import lodash from 'lodash'
import dayjs from 'dayjs'
import Apifrom, { Tables_t } from "serverapi/background"
// declare global {
//         interface Window {
//         edsqlreact0: StoreOf<WebStore>
//     }
// }
type res_t = (typeof Apifrom) extends (() => Promise<infer v>) ? v : never
type req_t=(...op: Parameters<typeof Apifrom>) => Promise<void>
interface store {
    init: () => Promise<void>
    call: req_t
    state: { [k in keyof Tables_t]: Tables_t[k][] }
}
export default create<store>()(immer<store>((selfEr, setEr) => {
    return {
        async init() { },
        async call(...op) {
        },
        state: {
            ml: [],
            url: [],
            uw: [],
            word: [],
            tag: [],
            mm: [],
            sku: [],
            sale: [],
            money: [],
        }
    }
}))
