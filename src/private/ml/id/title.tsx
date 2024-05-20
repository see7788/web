import React, { FC, useState, useEffect, useRef, Fragment } from "react"
import { Popover, Tooltip, Button, Space, } from "antd";
import Def, { param_t } from "./btns"
export type {param_t}
export default ({ db, api, btns }: param_t) => {
    return < Popover
        placement="right"
        title={db.remark}
        // content={
        //     <Def {...{ db, api, btns }} />
        // }
        >
        {db.id} {db.name}<Def {...{ db, api, btns }} />
    </ Popover>
}