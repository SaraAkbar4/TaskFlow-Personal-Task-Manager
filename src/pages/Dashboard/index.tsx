import {
  Button,
  Card,
  Col,
  DatePicker,
  Dropdown,
  Form,
  Input,
  Modal,
  message,
  Row,
  Select,
  Space,
  Table,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import React, { useState } from 'react';

interface Task {
  key: string;
  title: string;
  description: string;
  priority: string;
  dueDate: string;
  status: string;
  createdAt: string;
}

const disablePastDates = (current: any) =>
  current && current < dayjs().startOf('day');

const ViewTasks: React.FC = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingKey, setEditingKey] = useState<string>('');
  const [editData, setEditData] = useState<Partial<Task>>({});

  const [tasks, setTasks] = useState<Task[]>([
    {
      key: '1',
      title: 'Complete Dashboard',
      description: 'Finish dashboard UI',
      priority: 'High',
      dueDate: '2026-06-20',
      status: 'Pending',
      createdAt: '2026-06-17',
    },
    {
      key: '2',
      title: 'API Integration',
      description: 'Connect backend APIs',
      priority: 'Medium',
      dueDate: '2026-06-25',
      status: 'Completed',
      createdAt: '2026-06-16',
    },
  ]);

  const handleAddTask = async () => {
    try {
      const values = await form.validateFields();

      const newTask: Task = {
        key: Date.now().toString(),
        title: values.title,
        description: values.description,
        priority: values.priority,
        dueDate: values.dueDate.format('YYYY-MM-DD'),
        status: values.status,
        createdAt: new Date().toISOString().split('T')[0],
      };

      setTasks((prev) => [...prev, newTask]);
      message.success('Task added successfully');

      form.resetFields();
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (key: string) => {
    Modal.confirm({
      title: 'Delete Task',
      content: 'Are you sure you want to delete this task?',
      okText: 'Delete',
      okButtonProps: { danger: true },
      onOk: () => {
        setTasks((prev) => prev.filter((t) => t.key !== key));
        message.success('Task deleted successfully');
      },
    });
  };

  const handleEdit = (record: Task) => {
    setEditingKey(record.key);
    setEditData({
      ...record,
      dueDate: record.dueDate,
    });
  };

  const handleSave = () => {
    setTasks((prev) =>
      prev.map((task) =>
        task.key === editingKey ? { ...task, ...editData } : task,
      ),
    );

    setEditingKey('');
    setEditData({});
    message.success('Task updated successfully');
  };

  const handleCancelEdit = () => {
    setEditingKey('');
    setEditData({});
  };

  const columns: ColumnsType<Task> = [
    {
      title: 'Title',
      dataIndex: 'title',
      render: (_, record) =>
        editingKey === record.key ? (
          <Input
            value={editData.title}
            onChange={(e) =>
              setEditData({ ...editData, title: e.target.value })
            }
          />
        ) : (
          record.title
        ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      render: (_, record) =>
        editingKey === record.key ? (
          <Input.TextArea
            value={editData.description}
            onChange={(e) =>
              setEditData({ ...editData, description: e.target.value })
            }
          />
        ) : (
          record.description
        ),
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      render: (_, record) =>
        editingKey === record.key ? (
          <Select
            value={editData.priority}
            style={{ width: 120 }}
            onChange={(value) => setEditData({ ...editData, priority: value })}
            options={[
              { value: 'Low', label: 'Low' },
              { value: 'Medium', label: 'Medium' },
              { value: 'High', label: 'High' },
            ]}
          />
        ) : (
          record.priority
        ),
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      render: (_, record) =>
        editingKey === record.key ? (
          <DatePicker
            style={{ width: '100%' }}
            value={dayjs(editData.dueDate)}
            onChange={(date) =>
              setEditData({
                ...editData,
                dueDate: date?.format('YYYY-MM-DD') || '',
              })
            }
          />
        ) : (
          record.dueDate
        ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (_, record) =>
        editingKey === record.key ? (
          <Select
            value={editData.status}
            style={{ width: 120 }}
            onChange={(value) => setEditData({ ...editData, status: value })}
            options={[
              { value: 'Pending', label: 'Pending' },
              { value: 'Completed', label: 'Completed' },
            ]}
          />
        ) : (
          record.status
        ),
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      render: (_, record) => record.createdAt, // ❌ NOT EDITABLE
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => {
        if (editingKey === record.key) {
          return (
            <Space>
              <Button type="primary" onClick={handleSave}>
                Save
              </Button>
              <Button onClick={handleCancelEdit}>Cancel</Button>
            </Space>
          );
        }

        return (
          <Dropdown
            menu={{
              items: [
                { key: 'update', label: 'Update' },
                { key: 'delete', label: 'Delete', danger: true },
              ],
              onClick: ({ key }) => {
                if (key === 'update') handleEdit(record);
                if (key === 'delete') handleDelete(record.key);
              },
            }}
          >
            <Button>Actions</Button>
          </Dropdown>
        );
      },
    },
  ];

  return (
    <>
      {/* Stats */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={8}>
          <Card title="Total Tasks">
            <h1>{tasks.length}</h1>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Completed Tasks">
            <h1>{tasks.filter((t) => t.status === 'Completed').length}</h1>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Pending Tasks">
            <h1>{tasks.filter((t) => t.status === 'Pending').length}</h1>
          </Card>
        </Col>
      </Row>

      {/* Add Button */}
      <Space
        style={{ marginBottom: 16, width: '100%', justifyContent: 'flex-end' }}
      >
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Add Task
        </Button>
      </Space>

      {/* Table */}
      <Table columns={columns} dataSource={tasks} rowKey="key" />

      {/* Modal */}
      <Modal
        title="Add Task"
        open={isModalOpen}
        onOk={handleAddTask}
        onCancel={() => {
          form.resetFields();
          setIsModalOpen(false);
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            name="priority"
            label="Priority"
            rules={[{ required: true }]}
          >
            <Select
              options={[
                { value: 'Low', label: 'Low' },
                { value: 'Medium', label: 'Medium' },
                { value: 'High', label: 'High' },
              ]}
            />
          </Form.Item>

          <Form.Item
            name="dueDate"
            label="Due Date"
            rules={[{ required: true }]}
          >
            <DatePicker
              style={{ width: '100%' }}
              disabledDate={disablePastDates}
            />
          </Form.Item>

          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <Select
              options={[
                { value: 'Pending', label: 'Pending' },
                { value: 'Completed', label: 'Completed' },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ViewTasks;
