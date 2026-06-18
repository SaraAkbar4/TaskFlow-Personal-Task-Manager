import { history } from '@umijs/max';
import { Button } from 'antd';

export const layout = () => {
  return {
    actionsRender: () => [
      <Button
        key="logout"
        danger
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 9999,
        }}
        onClick={() => {
          localStorage.clear();
          sessionStorage.clear();
          history.replace('/user/login');
        }}
      >
        Logout
      </Button>,
    ],
  };
};
