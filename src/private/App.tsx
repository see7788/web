import React, { useEffect, useRef, Fragment } from 'react'
import {
    Link,
    BrowserRouter,
    RouterProvider,
    createBrowserRouter,
    createHashRouter,
    Routes,
    Route,
    Outlet
} from 'react-router-dom'
import _ from "lodash"
import { FloatButton } from 'antd';
import Ml from "../private/ml"
import Pro, { ref_t as proref_t } from "../private/pro"
import useStore from "./store"
const routerBtn = ["/pro", "/ml", "/ml/:id"].map((v, i) => (<FloatButton
    key={i}
    description={<Link to={v}>{v}</Link>}
    shape="square"
    style={{ right: i * 50 }}
/>))
export default function App() {
    const ipc = useStore(s => s.ipc)
    const tables = useStore(s => s.tables)
    const proref = useRef<proref_t>(null)
    useEffect(() => {
        ipc.init_ipc.electron()
        ipc.init_table("pro")
        ipc.init_table("ml")
    }, [])
    const router = createHashRouter([
        {
            path: "/pro",
            element: <Pro ref={proref} dbs={tables.pro} />,
        },
        {
            path: "/ml",
            element: <Ml />,
            children: [
                {
                    path: ":id",
                    element: <>test children</>,
                }
            ]
        },
        {
            path: "/",
            element: routerBtn
        },
    ]);
    return (
        <RouterProvider router={router} />
        // <BrowserRouter>
        //     {routerBtn}
        //     <Routes>
        //         <Route path="pro" element={<Pro ref={proref} dbs={tables.pro} />} />
        //         <Route path="ml" element={<Ml link={<Outlet />} />} >
        //             <Route path=":id" element={<Son id={888} />} />
        //         </Route>
        //         <Route path="*" element={<Ml />} />
        //     </Routes>
        // </BrowserRouter>
    );
}