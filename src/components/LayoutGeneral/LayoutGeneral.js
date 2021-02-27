import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  PieChartOutlined,
  BookOutlined,
} from '@ant-design/icons';
import './LayoutGeneral.css';

const { Header, Sider, Content } = Layout;

function LayoutGeneral(props) {

  const [collapsed, setCollapsed] = useState(false)

  const toggle = () => {
    setCollapsed(!collapsed)
  }
    return (
      <Layout  style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            Listado de prospectos
          </Menu.Item>
          <Menu.Item key="2" icon={<PieChartOutlined />}>
            Proximamente
          </Menu.Item>
          <Menu.Item key="3" icon={<BookOutlined />}>
          Proximamente
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background flex" style={{ padding: 0, background: '#efecec', margin: '0px 0px 0px 0px', paddingRight: '50px' }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggle,
          })}
           <span className="titulo-seccion">{props.title}</span>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
           {props.children}
        </Content>
      </Layout>
    </Layout>
    );
} 

export default LayoutGeneral;
