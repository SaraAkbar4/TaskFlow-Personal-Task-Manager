import { LogoutOutlined } from '@ant-design/icons';
import { history } from '@umijs/max';
import { Button } from 'antd';

export default function RightContent() {
  const handleLogout = () => {
    localStorage.clear(); // optional
    history.replace('/user/login');
  };

  return (
    <Button type="primary" icon={<LogoutOutlined />} onClick={handleLogout}>
      Logout
    </Button>
  );
}
