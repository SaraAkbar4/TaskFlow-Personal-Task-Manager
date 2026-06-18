import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { history, Link } from '@umijs/max';
import { App } from 'antd';
import React from 'react';

const Login: React.FC = () => {
  const { message } = App.useApp();

  const handleSubmit = async (_values: { name: string; password: string }) => {
    localStorage.setItem('isLoggedIn', 'true');
    message.success('Login Successful');
    history.replace('/dashboard/management');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <LoginForm
        title="User Login"
        subTitle="Enter your credentials"
        onFinish={handleSubmit}
      >
        <ProFormText
          name="name"
          fieldProps={{
            size: 'large',
            prefix: <UserOutlined />,
          }}
          placeholder="Name"
          rules={[
            {
              required: true,
              message: 'Please enter your name',
            },
          ]}
        />

        <ProFormText.Password
          name="password"
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined />,
          }}
          placeholder="Password"
          rules={[
            {
              required: true,
              message: 'Please enter your password',
            },
          ]}
        />

        <div
          style={{
            textAlign: 'center',
            marginTop: 16,
          }}
        >
          Don't have an account? <Link to="/user/register">Register</Link>
        </div>
      </LoginForm>
    </div>
  );
};

export default Login;
