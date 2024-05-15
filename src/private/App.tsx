import React, { FC, useEffect, useState } from 'react'
import {
    Link,
    BrowserRouter,
    Routes,
    Route,
    redirect
} from 'react-router-dom'
import { Segmented, Drawer, Space } from 'antd';
import MlUi from "../public/anyTree/antd"
import MlEdUi from "../private/ml/id/ed"
import MlBtnUi from "../private/ml/id/btn"
import MlTitleUi, { param_t as mltitle_param_t } from "../private/ml/id/title"
import ProIdsUi, { param_t as proidsapi } from "./pro/id/ids"
import ProEdUi from "./pro/id/Ed"
import useStore from "./store"
export default function App() {
    const ipc = useStore(s => s.ipc)
    useEffect(() => {
        ipc.init_api.electron()
        ipc.init_table("ml");
        ipc.init_table("pro");
    }, [])
    const tables = useStore(s => s.tables)
    const [MlIdDrawerdb, MlIdDrawerdbSet] = useState<mltitle_param_t["db"] | void>()
    const Ml = (
        <MlUi
            onClick_right={MlIdDrawerdbSet}
            api={ipc.ml.ids}
            startId={921}
            dbs={tables.ml || []}
        />
    )
    return (
        <BrowserRouter>
            <Routes>
                <Route path="pro" element={<>pro</>} />
                <Route path="ml" element={Ml} />
                <Route path="*" element={Ml} />
            </Routes>
            <Drawer
                open={!!MlIdDrawerdb}
                footer={
                    <Space>
                        <Link to="pro">pro</Link>
                        <Link to="ml">ml</Link>
                    </Space>
                }
                extra={MlIdDrawerdb ? <MlBtnUi db={MlIdDrawerdb} api={{ ...ipc.ml.title, openDrawer: MlIdDrawerdbSet }} /> : <></>}
                onClose={() => MlIdDrawerdbSet()}>
                {MlIdDrawerdb ? <MlEdUi api={{ ...ipc.ml.ed, closeDrawer: MlIdDrawerdbSet }} db={MlIdDrawerdb} /> : <></>}
            </Drawer>
        </BrowserRouter>
    );
}