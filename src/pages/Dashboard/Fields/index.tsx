import { Button, Card, DatePicker, Form, Input, Select } from 'antd';
import './index.less';
import dayjs from 'dayjs';

const { TextArea } = Input;

const Fields = () => {
  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <div className="fields-container">
      <Card className="fields-card" title="Task Fields">
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Title"
            name="title"
            rules={[
              { required: true, message: 'Please enter task title' },
              { max: 100, message: 'Maximum 100 characters allowed' },
            ]}
          >
            <Input placeholder="Enter task title" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please enter description' }]}
          >
            <TextArea rows={4} placeholder="Enter task description" />
          </Form.Item>

          <Form.Item
            label="Priority"
            name="priority"
            rules={[{ required: true, message: 'Select task priority' }]}
          >
            <Select
              placeholder="Select Priority"
              options={[
                { value: 'Low', label: 'Low' },
                { value: 'Medium', label: 'Medium' },
                { value: 'High', label: 'High' },
              ]}
            />
          </Form.Item>

          <Form.Item
            label="Due Date"
            name="dueDate"
            initialValue={dayjs()}
            rules={[{ required: true, message: 'Select due date' }]}
          >
            <DatePicker
              style={{ width: '100%' }}
              disabledDate={(current) =>
                current && current < dayjs().startOf('day')
              }
            />
          </Form.Item>

          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: 'Select status' }]}
          >
            <Select
              placeholder="Select Status"
              options={[
                { value: 'Pending', label: 'Pending' },
                { value: 'Completed', label: 'Completed' },
              ]}
            />
          </Form.Item>

          <Form.Item label="Created At">
            <Input disabled value={new Date().toLocaleString()} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Save Task
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Fields;
