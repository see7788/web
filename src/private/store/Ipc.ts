import dayjs from 'dayjs'
import _ from "lodash"
import type { edapi_t, Tables_t } from './ts'
import { api_t as mlidsapi_t } from "../../public/anyTree/antd"
import { param_t as mled_param_t } from "../ml/id/ed"
import { param_t as mltitle_param_t } from "../ml/id/title"
import { ipcProxy, res_t } from "ipc/src/public"
import { type ElectronAPI } from '@electron-toolkit/preload'
type storeres_t = (op: res_t<edapi_t>) => void
declare global {
    interface Window {
        electron: ElectronAPI
    }
}
export default class Ipc {
    api: edapi_t
    private res: storeres_t
    private get uptimestamp() {
        return dayjs().format('YYYY-MM-DD HH:mm:ss')
    }
    constructor(res: storeres_t) {
        this.res = res
        this.api = ipcProxy<edapi_t>((funname, param) => console.log("init false", funname, param))
    }
    get init_api() {
        const electron = () => {
            this.api = ipcProxy<edapi_t>((funname, param) => window.electron.ipcRenderer.invoke("edapi", funname, param).then(this.res))
            window.electron.ipcRenderer.on("edapi", (e, v) => this.res(v))
        }
        return { electron }
    }
    init_table(t: keyof Tables_t) {
        this.api.selectApi({ table: t })
    }
    get ml(): {
        ids: mlidsapi_t;
        ed: Pick<mled_param_t["api"], "set" | "add">;
        title: Pick<mltitle_param_t["api"], "set" | "del" | "opendir">;
    } {
        type ed_t = Pick<mled_param_t["api"], "set" | "add">
        const ed: ed_t = {
            set: (id, set) => this.api.updateApi({ table: "ml", set, wheres: [["??=?", "ml.id", id]] }),
            add: async (set) => this.api.insertApi({ table: "ml", set: { ...set, uptimestamp: this.uptimestamp } }),
        }
        return {
            ids: {
                set_id_parent: ({ id, newId_parent }) => this.api.updateApi({ table: "ml", wheres: [["??=?", "ml.id", id]], set: { id_parent: newId_parent } }),
            },
            ed,
            title: {
                ...ed,
                del: async (id) => this.api.deleteApi({ table: "ml", wheres: [["??=?", "ml.id", id]] }),
                opendir: async (id) => this.api.opendirApi(`F://ml//${id}`)
            }
        }
    }
}