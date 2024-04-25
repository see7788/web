import { immer } from 'zustand/middleware/immer'
import { create } from "zustand"
import Apifrom, { Tables_t } from "serverapi/background"
type res_t = Apifrom["call"] extends (() => Promise<infer v>) ? v : never
type req_t = (...op: Parameters<Apifrom["call"]>) => Promise<void>
interface store {
    call: req_t
    state: { [k in keyof Tables_t]: Tables_t[k][] }
}
export default create<store>()(immer<store>((selfEr, setEr) => {
    return {
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
