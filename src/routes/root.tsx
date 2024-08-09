import React from 'react';
import { Layout, Menu, theme } from 'antd';
import './root.css';
import { Outlet, useNavigate } from "react-router-dom";
import routes from "./routerConfig";
import BreadcrumbComponent from "./breadcrumb";
import type { MenuProps } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import styles from './root.module.scss';

const { Header, Content, Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

const items2 = routes;

const App: React.FC = () => {
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const items: MenuItem[] = [
    {
      label: 'admin',
      key: 'user',
      icon: <SettingOutlined />,
      popupClassName: "popMenu", // 弹出框样式名
      children: [
        { label: '登出', key: 'logout', 
          onClick: () => {
            localStorage.removeItem('Authorization');
            navigate("/login");
          }
        },
      ]
    },
  ];

  const menuClick = (e: {key: string}) => {
    navigate(e.key);
  }

  return (
    <Layout>
      <Header className={styles.header}>
        <div className="demo-logo" />
        <Menu
          // openKeys={['user']} // 展开的菜单
          mode="horizontal"
          selectedKeys={[]} // 因为我不需要选中的样式
          items={items}
        >
        </Menu>
      </Header>
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items={items2}
            onClick={menuClick}
          >
          </Menu>
        </Sider>
        <Layout className='layout'>
          <Content
            style={{
              padding: 10,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <BreadcrumbComponent />
            This is tako! Hello~
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};


export default App;