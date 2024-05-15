import React, { FC } from "react"
import { Form, Button, Input, } from "antd";
import {ml_t as T} from "../../store/ts"
interface api_t {
    set: (id: number, info: Partial<Omit<T, "id" | "uptimestamp">>) => Promise<any>
    add: (set: Omit<T, "id" | "uptimestamp">) => Promise<any>
    closeDrawer: () => void
}
export interface param_t{
    api: api_t
    db: T
}

const Def: FC<param_t> = ({ db, api }) => {
    const [usefrom] = Form.useForm<Pick<T, "name" | "remark">>()
    return <Form form={usefrom}>
        <Form.Item
            label="name"
            name="name"
            initialValue={db.name}
            rules={[{ required: true, message: 'Please input your name!' }]}
        >
            <Input />
        </Form.Item>
        <Form.Item
            label="remark"
            name="remark"
            initialValue={db.remark}
            rules={[{ required: true, message: 'Please input your remark!' }]}
        >
            <Input.TextArea autoSize={true} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" onClick={() => usefrom.validateFields()
                .then(({ name, remark }) => api.set(
                    db.id,
                    {
                        id_parent: db.id_parent,
                        name,
                        remark
                    }
                )).then(() => api.closeDrawer())}>
                改
            </Button>
            <Button htmlType="submit" onClick={() => usefrom.validateFields()
                .then(({ name, remark }) => api.add({
                    id_parent: db.id_parent,
                    name,
                    remark
                })).then(() => api.closeDrawer())}>
                +弟
            </Button>
            <Button htmlType="submit" onClick={() => usefrom.validateFields()
                .then(({ name, remark }) => api.add({
                    id_parent: db.id,
                    name,
                    remark
                })).then(() => api.closeDrawer())}>
                +子
            </Button>
        </Form.Item>
    </Form>
}
export default Def;