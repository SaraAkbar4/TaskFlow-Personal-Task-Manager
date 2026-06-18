import { PlusOutlined } from '@ant-design/icons';
import { history } from '@umijs/max';
import { Button, Card, Col, Row, Statistic, Table, Tag } from 'antd';
import { useEffect, useState } from 'react';
import './index.less';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';

interface Task {
  id: number;
  title: string;
  description: string;
  priority: string;
  dueDate: string;
  status: string;
  createdAt: string;
}

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');

    if (storedTasks.length > 0) {
      setTasks(storedTasks);
    } else {
      const dummyTasks: Task[] = [
        {
          id: 1,
          title: 'Build Dashboard',
          description: 'Create dashboard UI using Ant Design',
          priority: 'High',
          dueDate: '2026-06-20',
          status: 'Pending',
          createdAt: '2026-06-17',
        },
        {
          id: 2,
          title: 'Setup Authentication',
          description: 'Implement login and logout functionality',
          priority: 'High',
          dueDate: '2026-06-21',
          status: 'Completed',
          createdAt: '2026-06-16',
        },
        {
          id: 3,
          title: 'Create Task Module',
          description: 'Add task creation page and form validation',
          priority: 'Medium',
          dueDate: '2026-06-22',
          status: 'Pending',
          createdAt: '2026-06-15',
        },
        {
          id: 4,
          title: 'Update Tasks',
          description: 'Allow editing existing tasks',
          priority: 'Low',
          dueDate: '2026-06-23',
          status: 'Completed',
          createdAt: '2026-06-14',
        },
        {
          id: 5,
          title: 'Delete Tasks',
          description: 'Add delete confirmation functionality',
          priority: 'Medium',
          dueDate: '2026-06-24',
          status: 'Pending',
          createdAt: '2026-06-13',
        },
      ];

      setTasks(dummyTasks);
      localStorage.setItem('tasks', JSON.stringify(dummyTasks));
    }
  }, []);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]') || [];
    setTasks(storedTasks);
  }, []);

  const totalTasks = tasks.length;

  const pendingTasks = tasks.filter((task) => task.status === 'Pending').length;

  const completedTasks = tasks.filter(
    (task) => task.status === 'Completed',
  ).length;

  const columns = [
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
      render: (priority: string) => {
        let color = 'green';

        if (priority === 'High') color = 'red';
        if (priority === 'Medium') color = 'orange';

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
      render: (status: string) => (
        <Tag color={status === 'Completed' ? 'green' : 'blue'}>{status}</Tag>
      ),
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: Task) => {
        const items: MenuProps['items'] = [
          {
            key: 'update',
            label: 'Update',
          },
          {
            key: 'delete',
            label: 'Delete',
            danger: true,
          },
        ];

        const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
          if (key === 'update') {
            history.push(`/dashboard/management/update-tasks?id=${record.id}`);
          }

          if (key === 'delete') {
            const storedTasks =
              JSON.parse(localStorage.getItem('tasks') || '[]') || [];

            const updatedTasks = storedTasks.filter(
              (task: Task) => task.id !== record.id,
            );

            localStorage.setItem('tasks', JSON.stringify(updatedTasks));

            setTasks(updatedTasks);
          }
        };

        return (
          <Dropdown
            menu={{
              items,
              onClick: handleMenuClick,
            }}
            trigger={['click']}
          >
            <Button>
              Action <DownOutlined />
            </Button>
          </Dropdown>
        );
      },
    },
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => history.push('/dashboard/management/create-tasks')}
        >
          Add Task
        </Button>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card className="stat-card">
            <Statistic title="Total Tasks" value={totalTasks} />
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card className="stat-card">
            <Statistic title="Pending Tasks" value={pendingTasks} />
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card className="stat-card">
            <Statistic title="Completed Tasks" value={completedTasks} />
          </Card>
        </Col>
      </Row>

      <Card title="Recent Tasks" className="tasks-card">
        <Table
          rowKey="id"
          columns={columns}
          dataSource={tasks}
          pagination={{ pageSize: 5 }}
        />
      </Card>
    </div>
  );
};

export default Dashboard;
