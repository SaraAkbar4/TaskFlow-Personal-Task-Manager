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
  const [searchText, setSearchText] = useState('');

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

  // ADD TASK
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
    } catch (err) {
      console.log(err);
    }
  };

  // DELETE TASK
  const handleDelete = (key: string) => {
    Modal.confirm({
      title: 'Delete Task',
      content: 'Are you sure?',
      okText: 'Delete',
      okButtonProps: { danger: true },
      onOk: () => {
        setTasks((prev) => prev.filter((t) => t.key !== key));
        message.success('Task deleted');
      },
    });
  };

  // EDIT TASK
  const handleEdit = (record: Task) => {
    setEditingKey(record.key);
    setEditData(record);
  };

  const handleSave = () => {
    setTasks((prev) =>
      prev.map((t) => (t.key === editingKey ? { ...t, ...editData } : t)),
    );

    setEditingKey('');
    setEditData({});
    message.success('Updated successfully');
  };

  const filteredTasks = tasks.filter((task) =>
    Object.values(task)
      .join(' ')
      .toLowerCase()
      .includes(searchText.toLowerCase()),
  );

  const columns: ColumnsType<Task> = [
    {
      title: 'Title',
      dataIndex: 'title',
      sorter: (a, b) => a.title.localeCompare(b.title),
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
              setEditData({
                ...editData,
                description: e.target.value,
              })
            }
          />
        ) : (
          record.description
        ),
    },

    {
      title: 'Priority',
      dataIndex: 'priority',
      filters: [
        { text: 'Low', value: 'Low' },
        { text: 'Medium', value: 'Medium' },
        { text: 'High', value: 'High' },
      ],
      onFilter: (value, record) => record.priority === value,
      render: (_, record) =>
        editingKey === record.key ? (
          <Select
            value={editData.priority}
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
      sorter: (a, b) => dayjs(a.dueDate).unix() - dayjs(b.dueDate).unix(),
      render: (_, record) =>
        editingKey === record.key ? (
          <DatePicker
            value={dayjs(editData.dueDate)}
            disabledDate={disablePastDates}
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
      filters: [
        { text: 'Pending', value: 'Pending' },
        { text: 'Completed', value: 'Completed' },
      ],
      onFilter: (value, record) => record.status === value,
      render: (_, record) =>
        editingKey === record.key ? (
          <Select
            value={editData.status}
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
              <Button onClick={() => setEditingKey('')}>Cancel</Button>
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
      {/* STATS */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={8}>
          <Card title="Total Tasks">{tasks.length}</Card>
        </Col>
        <Col span={8}>
          <Card title="Completed">
            {tasks.filter((t) => t.status === 'Completed').length}
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Pending">
            {tasks.filter((t) => t.status === 'Pending').length}
          </Card>
        </Col>
      </Row>

      {/* SEARCH + ADD */}
      <Space
        style={{
          marginBottom: 16,
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Input
          placeholder="Search tasks..."
          style={{ width: 300 }}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Add Task
        </Button>
      </Space>

      {/* TABLE */}
      <Table columns={columns} dataSource={filteredTasks} rowKey="key" />

      {/* MODAL */}
      <Modal
        title="Add Task"
        open={isModalOpen}
        onOk={handleAddTask}
        onCancel={() => setIsModalOpen(false)}
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
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            name="priority"
            label="Priority"
            rules={[{ required: true }]}
          >
            <Select
              options={[
                { value: 'Low' },
                { value: 'Medium' },
                { value: 'High' },
              ]}
            />
          </Form.Item>

          <Form.Item
            name="dueDate"
            label="Due Date"
            rules={[{ required: true }]}
          >
            <DatePicker
              disabledDate={disablePastDates}
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <Select options={[{ value: 'Pending' }, { value: 'Completed' }]} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ViewTasks;
