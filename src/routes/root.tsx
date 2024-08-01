import React from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import './root.css';
import { Outlet, useNavigate } from "react-router-dom";
import routes from "./routerConfig";
import BreadcrumbComponent from "./breadcrumb";

const { Header, Content, Sider } = Layout;

// const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
//   key,
//   label: `nav ${key}`,
// }));

const items2 = routes;

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();

  const menuClick = (e: {key: string}) => {
    navigate(e.key);
  }

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        {/* <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items1}
          style={{ flex: 1, minWidth: 0 }}
        /> */}
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
        <Layout style={{ padding: '0 24px 24px' }}>
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