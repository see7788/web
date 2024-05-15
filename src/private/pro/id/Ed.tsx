import React, { FC, useState } from "react"
import {
    materialCells,
    materialRenderers,
} from '@jsonforms/material-renderers';
import { JsonForms } from '@jsonforms/react';
const Def: FC = () => {
    // const jsondata = Object.fromEntries(Object.entries(jsonschema.properties).map(([k]) => [k, `请输入${k}`]))
    const [data, setData] = useState({
      "users": [
        {
          "firstname": "Max",
          "lastname": "Mustermann",
          "age": 25,
          "email": "max@mustermann.com"
        },
        {
          "firstname": "John",
          "lastname": "Doe",
          "age": 35,
          "email": "john@doe.com"
        }
      ]
    });
    return (
        <JsonForms
            // 描述底层数据的JSON模式
            schema={
              {
                "type": "object",
                "properties": {
                  "users": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "title": "Users",
                      "properties": {
                        "firstname": {
                          "type": "string"
                        },
                        "lastname": {
                          "type": "string"
                        },
                        "email": {
                          "type": "string",
                          "format": "email"
                        },
                        "age": {
                          "type": "number",
                          "minimum": 0
                        }
                      },
                      "required": [
                        "firstname"
                      ]
                    }
                  }
                }
              }
            }
            // 要呈现的数据
            data={data}
            // 应用于呈现表单的呈现器
            renderers={materialRenderers}
            //库好像有问题
            // 应用于呈现表单的单元格
            cells={materialCells}
            // 在每次数据更改时调用的回调 包含更新的数据和验证结果
            onChange={({ errors, data }) => {
                console.log(errors, data)
                setData(data)
            }}
            validationMode="ValidateAndHide"
        />
    )
}
export default Def;