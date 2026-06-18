import { history, Link } from '@umijs/max';
import { Button, Form, Input, message } from 'antd';
import type { Store } from 'antd/es/form/interface';
import type { FC } from 'react';
import useStyles from './styles';

const FormItem = Form.Item;

const Register: FC = () => {
  const { styles } = useStyles();
  const [form] = Form.useForm();

  const onFinish = (values: Store) => {
    console.log('Register Data:', values);

    message.success('Registration successful!');

    history.replace('/dashboard');
  };

  const checkPassword = (_: any, value: string) => {
    if (!value) {
      return Promise.reject(new Error('Please enter a password!'));
    }

    if (value.length < 6) {
      return Promise.reject(
        new Error('Password must be at least 6 characters'),
      );
    }

    return Promise.resolve();
  };

  return (
    <div className={styles.main}>
      <h3>Register</h3>

      <Form
        form={form}
        name="UserRegister"
        onFinish={onFinish}
        layout="vertical"
      >
        <FormItem
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please enter your name!',
            },
          ]}
        >
          <Input size="large" placeholder="Enter your name" />
        </FormItem>

        <FormItem
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please enter your email!',
            },
            {
              type: 'email',
              message: 'Invalid email format!',
            },
          ]}
        >
          <Input size="large" placeholder="Enter your email" />
        </FormItem>

        <FormItem
          label="Password"
          name="password"
          rules={[
            {
              validator: checkPassword,
            },
          ]}
        >
          <Input.Password size="large" placeholder="Minimum 6 characters" />
        </FormItem>

        <FormItem>
          <div className={styles.footer}>
            <Button
              size="large"
              className={styles.submit}
              type="primary"
              htmlType="submit"
            >
              Register
            </Button>

            <Link to="/user/login">Already have an account? Login</Link>
          </div>
        </FormItem>
      </Form>
    </div>
  );
};

export default Register;
