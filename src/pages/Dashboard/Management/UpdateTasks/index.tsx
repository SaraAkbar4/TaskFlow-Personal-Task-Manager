import { Button, Card, Form, Input, message, Select } from 'antd';

export default () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log(values);
    message.success('Task updated successfully');
  };

  return (
    <Card title="Update Task">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          title: 'Design Dashboard',
          description: 'Create dashboard UI',
          status: 'In Progress',
          priority: 'High',
          assignee: 'Sara',
        }}
      >
        <Form.Item label="Task Title" name="title">
          <Input />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item label="Status" name="status">
          <Select
            options={[
              { value: 'Pending', label: 'Pending' },
              { value: 'In Progress', label: 'In Progress' },
              { value: 'Completed', label: 'Completed' },
            ]}
          />
        </Form.Item>

        <Form.Item label="Priority" name="priority">
          <Select
            options={[
              { value: 'Low', label: 'Low' },
              { value: 'Medium', label: 'Medium' },
              { value: 'High', label: 'High' },
            ]}
          />
        </Form.Item>

        <Form.Item label="Assignee" name="assignee">
          <Input />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Update Task
        </Button>
      </Form>
    </Card>
  );
};
