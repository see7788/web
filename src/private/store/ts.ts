import type { Mysql2 } from 'curd/src'
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

export interface edapi_t extends Pick<Mysql2<Tables_t>, "deleteApi" | "selectApi" | "updateApi" | "insertApi"> {
    opendirApi: (str: string) => Promise<void | string>
}