import React, { FC, useState, useEffect, useRef, Fragment } from "react"
import { Popover, Tooltip, Button, Space, } from "antd";
import { DeleteOutlined, DownOutlined, EditOutlined, FolderOpenOutlined, VerticalAlignTopOutlined } from "@ant-design/icons"
import {ml_t as T} from "../../store/ts"

interface api_t {
    set: (id: number, set: Partial<T>) => Promise<any>
    del: (id: number) => Promise<any>
    opendir: (id: number) => Promise<any>
    openDrawer: (db: T) => void
}
export interface param_t {
    api: api_t
    db: T
    btns?: React.ReactNode[]
}

const Def: FC<param_t> = ({ db, api, btns }) => (
    <Space>
        <Button size="small" icon={<FolderOpenOutlined title="打开目录" />} onClick={() => api.opendir(db.id)} />
        <Button size="small" icon={<VerticalAlignTopOutlined title="id_parent=1" />} onClick={() => api.set(db.id, { id_parent: 1 })} />
        <Button size="small" icon={<EditOutlined title="增改" />} onClick={() => api.openDrawer(db)} />
        <Button size="small" icon={<DeleteOutlined title="删" onClick={() => api.del(db.id)} />} />
        {...(btns || [])}
    </Space>
)
export default Def