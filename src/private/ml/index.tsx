import React, { FC, ReactElement, Fragment, useState } from 'react'
import MlUi from "../../public/anyTree/antd"
import MlEdUi from "./id/ed"
import MlBtnUi from "./id/btns"
import {useLoaderData} from 'react-router-dom'
import { Drawer,Segmented } from 'antd';
import useStore from "../store"
import { ml_t } from "../store/ts"
export default function App({ link }: { link?: ReactElement }) {
    const loaddata=useLoaderData();
    const ipc = useStore(s => s.ipc)
    const dbs = useStore(s => s.tables.ml)
    const [Iddb, IddbSet] = useState<ml_t | void>()
    const indexarr = ['增改', "排列", '_pro', '_pro_sku', '_sku', '_sale供', '_sale求']
    type index_t = (typeof indexarr)[number];
    const [index, indexSet] = useState<index_t>('增改')
    const Info: FC = () => {
        if (Iddb) {
            switch (index) {
                case "增改":
                    return <MlEdUi db={Iddb} api={{ ...ipc.ml.ed, onSubmit: IddbSet }} />
                case "排列":
                    return <MlUi
                        startId={Iddb.id}
                        api={ipc.ml.ids}
                        dbs={dbs || []}
                    />
            }
        }
        switch (index) {
            default:
                return <>{index}</>
        }
    }
    return (
        <Fragment>
            <Drawer
                width={"70%"}
                open={!!Iddb}
                extra={link}
                footer={
                    Iddb
                        ? <MlBtnUi
                            db={Iddb}
                            api={{ ...ipc.ml.btn }}
                            btns={[
                                <Segmented<index_t>
                                    options={indexarr}
                                    onChange={indexSet}
                                    defaultValue={index}
                                />,
                            ]} />
                        : <></>
                }
                onClose={() => IddbSet()}>
                <Info />
            </Drawer>
            <MlUi
                expanded={[458]}
                onClick_right={IddbSet}
                api={ipc.ml.ids}
                dbs={dbs || []}
            />
        </Fragment>
    )
}