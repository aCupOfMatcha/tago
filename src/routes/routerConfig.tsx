import { UserOutlined, LaptopOutlined, FileOutlined } from '@ant-design/icons' // 括号是必须的，不然界面加载不出图片
import type { MenuProps } from 'antd';
import React from 'react';

const routes: MenuProps['items'] = [
    {
        key: '/home',
        icon: React.createElement(LaptopOutlined),
        label: 'home',
    },
    {
        key: '/users',
        icon: React.createElement(UserOutlined),
        label: 'user',
    },
    {
        key: '/files',
        icon: React.createElement(FileOutlined),
        label: 'file',
    },
]

export default routes;