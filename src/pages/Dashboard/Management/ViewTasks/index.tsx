import { Card, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React from 'react';
import './index.less';

interface Task {
  key: string;
  title: string;
  description: string;
  priority: string;
  dueDate: string;
  status: string;
  createdAt: string;
}

const data: Task[] = [
  {
    key: '1',
    title: 'Complete Dashboard',
    description: 'Finish dashboard UI and routing',
    priority: 'High',
    dueDate: '2026-06-25',
    status: 'Pending',
    createdAt: '2026-06-17',
  },
  {
    key: '2',
    title: 'API Integration',
    description: 'Connect frontend with backend APIs',
    priority: 'Medium',
    dueDate: '2026-06-30',
    status: 'Completed',
    createdAt: '2026-06-15',
  },
];

const columns: ColumnsType<Task> = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Priority',
    dataIndex: 'priority',
    key: 'priority',
    render: (priority) => {
      let color = 'green';

      if (priority === 'Medium') {
        color = 'orange';
      }

      if (priority === 'High') {
        color = 'red';
      }

      return <Tag color={color}>{priority}</Tag>;
    },
  },
  {
    title: 'Due Date',
    dataIndex: 'dueDate',
    key: 'dueDate',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status) => (
      <Tag color={status === 'Completed' ? 'green' : 'blue'}>{status}</Tag>
    ),
  },
  {
    title: 'Created At',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
];

const ViewTasks: React.FC = () => {
  return (
    <div className="view-tasks-container">
      <Card title="View Tasks" className="tasks-card">
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 5 }}
        />
      </Card>
    </div>
  );
};

export default ViewTasks;
