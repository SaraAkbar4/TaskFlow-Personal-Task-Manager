import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Row,
  Select,
} from 'antd';
import dayjs from 'dayjs';
import './index.less';

const { TextArea } = Input;

const CreateTask = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log(values);

    message.success('Task created successfully!');

    form.resetFields();

    form.setFieldsValue({
      createdAt: dayjs(),
    });
  };

  return (
    <div className="create-task-container">
      <Card className="create-task-card" title="Create Task">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            status: 'Pending',
            createdAt: dayjs(),
          }}
        >
          <Row gutter={16}>
            <Col xs={24}>
              <Form.Item
                label="Title"
                name="title"
                rules={[{ required: true, message: 'Please enter task title' }]}
              >
                <Input placeholder="Enter task title" />
              </Form.Item>
            </Col>

            <Col xs={24}>
              <Form.Item
                label="Description"
                name="description"
                rules={[
                  { required: true, message: 'Please enter description' },
                ]}
              >
                <TextArea rows={4} placeholder="Enter task description" />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label="Priority"
                name="priority"
                rules={[{ required: true, message: 'Please select priority' }]}
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
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label="Due Date"
                name="dueDate"
                rules={[{ required: true, message: 'Please select due date' }]}
              >
                <DatePicker
                  style={{ width: '100%' }}
                  disabledDate={(current) =>
                    current && current < dayjs().startOf('day')
                  }
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label="Status"
                name="status"
                rules={[{ required: true, message: 'Please select status' }]}
              >
                <Select
                  options={[
                    { value: 'Pending', label: 'Pending' },
                    { value: 'Completed', label: 'Completed' },
                  ]}
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item label="Created At" name="createdAt">
                <DatePicker showTime style={{ width: '100%' }} disabled />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Create Task
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default CreateTask;
