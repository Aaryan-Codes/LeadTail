import React, { useState } from 'react';
import { GiFoxTail } from "react-icons/gi";
import {
  DesktopOutlined,
  PieChartOutlined,
  UserOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Link } from 'react-router-dom';
const { Content, Footer, Sider } = Layout;

const items = [
  {
    key:'dashboard',
    label:(
        <Link to='/dashboard'>Dashboard</Link>
    ),
    icon:<PieChartOutlined/>
  },
  {
    key:'leadcenter',
    label:(
        <Link to='/leadcenter'>
            Lead Center
        </Link>
    ),
    icon:<DesktopOutlined/>
  },
  {
    key:'User',
    label:(
        <Link to='/users'>User</Link>
    ),
    icon:<UserOutlined/>
  },
  {
    key:'Logout',
    label:(
        <Link to='/login' onClick={()=>localStorage.removeItem('token')}>Logout</Link>
    ),
    icon:<LogoutOutlined />
  }
];
const ProtectedRoute = ({children}) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider className='py-3' collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div  className={`text-gray-300 text-3xl font-semibold flex items-center justify-center my-3`}>{collapsed ? '' : "LeadTail"}  <GiFoxTail /></div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        
        <Content
        >
          {children}
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          <b>LeadTail© </b>{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};
export default ProtectedRoute;