import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Button, Layout, Menu } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { sidebarItems } from '../../constant/sidebarItems';
import { useAppDispatch } from '../../redux/hooks';
import { logoutUser } from '../../redux/services/authSlice';

const { Content, Sider } = Layout;

const Sidebar = () => {
  const [showLogoutBtn, setShowLogoutBtn] = useState(true);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onCollapse={(collapsed, type) => {
          if (type === 'responsive' || type === 'clickTrigger') {
            setShowLogoutBtn(!collapsed);
          }
        }}
        width="220px"
        style={styles.sider}
      >
        <div style={styles.logoContainer}>
          <h1 style={styles.logoText}>WELCOME</h1>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          style={styles.menu}
          defaultSelectedKeys={['Dashboard']}
          items={sidebarItems}
        />
        {showLogoutBtn && (
          <div style={styles.logoutContainer}>
            <Button
              type="primary"
              style={styles.logoutButton}
              onClick={handleClick}
            >
              <LogoutOutlined />
              Logout
            </Button>
          </div>
        )}
      </Sider>
      <Layout>
        <Content style={styles.content}>
          <div style={styles.contentWrapper}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Sidebar;


const styles = {
  sider: {
    backgroundColor: '#3F1D4FFF', 
    position: 'relative',
    boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
  },
  logoContainer: {
    textAlign: 'center',
    padding: '1.5rem',
    borderBottom: '1px solid #BDAFD6',
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: '1.8rem',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  menu: {
    backgroundColor: '#3F1D4FFF',
    fontWeight: '700',
    color: '#FFFFFF',
  },
  logoutContainer: {
    margin: 'auto',
    position: 'absolute',
    bottom: 0,
    padding: '1rem',
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
  },
  logoutButton: {
    width: '100%',
    backgroundColor: '#BDAFD6',
    color: '#FFFFFF',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    borderRadius: '8px',
  },
  content: {
    padding: '2rem',
    background: '#EDE7F6', 
  },
  contentWrapper: {
    padding: '1rem',
    maxHeight: 'calc(100vh - 4rem)',
    minHeight: 'calc(100vh - 4rem)',
    background: '#FFFFFF',
    borderRadius: '1rem',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    overflow: 'auto',
  },
};
