import React, { useEffect, useState } from "react";
import { GiFoxTail } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import {
  DesktopOutlined,
  PieChartOutlined,
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, message, theme } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { GetCurrentUser } from "../API/userAPIcalls";
import { setUser } from "../redux/user.reducer";
const { Content, Footer, Sider } = Layout;

const items = [
  {
    key: "dashboard",
    label: <Link to="/dashboard">Dashboard</Link>,
    icon: <PieChartOutlined />,
  },
  {
    key: "leadcenter",
    label: <Link to="/leadcenter">Lead Center</Link>,
    icon: <DesktopOutlined />,
  },
  {
    key: "Settings",
    label: "Settings",
    icon: <SettingOutlined />,
    children: [
      {
        key: "User Management",
        label: <Link to="/create-user">Users</Link>,
        icon: <TeamOutlined />,
      },
      {
        key: "Account Settings",
        label: <Link to={"/my-account"}>Account</Link>,
        icon: <UserOutlined />,
      },
    ],
  },
  {
    key: "Logout",
    label: (
      <Link to="/login" onClick={() => localStorage.removeItem("token")}>
        Logout
      </Link>
    ),
    icon: <LogoutOutlined />,
  },
];

const ProtectedRoute = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const getValidUser = async () => {
    const response = await GetCurrentUser();
    if(response.success){
      // console.log(response.data);
      dispatch(setUser(response.data));
    }else{
      dispatch(setUser(null));
      message.error(response.message);
      localStorage.removeItem('token');
      navigate('/');
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getValidUser();
    }else{
      navigate('/login');
    }
  }, []);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        className="py-3"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          className={`text-gray-300 text-3xl font-semibold flex items-center justify-center my-3`}
        >
          {collapsed ? "" : "LeadTail"} <GiFoxTail />
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Content>{children}</Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          <b>LeadTail© </b>
          {new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};
export default ProtectedRoute;
