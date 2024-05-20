import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import React from "react"
import { Card } from 'antd';
import { pro_t } from "../../store/ts"

const GridItem: React.FC<pro_t> = ({ id }) => {
    const imageUrl = `https://naver.github.io/egjs-infinitegrid/assets/image/${(id % 33) + 1}.jpg`;
    return (
        <Card
            // bordered={false}//边框
            title={id}
            hoverable
            cover={
                <img
                    src={imageUrl}
                    alt={`Image ${id}`} // 重新添加alt属性以提高无障碍性
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = 'path/to/default-image.jpg';
                    }}
                />
            }
            actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
            ]}
        >
            <Card.Meta title="Europe Street beat" description="www.instagram.com" />
        </Card>
    );
};

export default GridItem