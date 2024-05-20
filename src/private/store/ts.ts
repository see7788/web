import type { Curd } from 'curd/src/mysql2'
export type ml_t={
    id: number
    id_parent: number
    name: string
    remark: string
    uptimestamp: string
}
export type pro_t={
    id: number
    idg_ml: number
    id_from: string
    name: string
    publicremark: number
    privateremark: number
    uptimestamp?: string
}
export type Tables_t = {
    ml:ml_t
    pro:pro_t
}

export interface edapi_t extends Curd<Tables_t> {
    showItemInFolder: (arr: Array<string|number>) => Promise<any>
}