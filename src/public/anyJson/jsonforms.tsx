// import React, { FC, useState } from "react"
// import {
//     materialCells,
//     materialRenderers,
// } from '@jsonforms/material-renderers';
// import { JsonForms } from '@jsonforms/react';
// import { person } from '@jsonforms/examples';
// const Def: FC = () => {
//     // const jsondata = Object.fromEntries(Object.entries(jsonschema.properties).map(([k]) => [k, `请输入${k}`]))
//     const [data, setData] = useState(person.data);
//     console.log(person.uischema)
//     return (
//         <JsonForms
//             // 描述底层数据的JSON模式
//             schema={person.schema}
//             // 要呈现的数据
//             data={data}
//             // 应用于呈现表单的呈现器
//             renderers={materialRenderers}
//             //库好像有问题
//             uischema={person.uischema}
//             // 应用于呈现表单的单元格
//             cells={materialCells}
//             // 在每次数据更改时调用的回调 包含更新的数据和验证结果
//             onChange={({ errors, data }) => {
//                 console.log(errors, data)
//                 setData(data)
//             }}
//             validationMode="ValidateAndHide"
//         />
//     )
// }
// export default Def;