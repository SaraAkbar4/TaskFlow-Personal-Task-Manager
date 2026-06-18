import { SearchOutlined } from '@ant-design/icons';
import { Card, Col, Input, Row, Select, Table, Tag } from 'antd';
import './index.less';

const Search = () => {
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
        const color =
          priority === 'High'
            ? 'red'
            : priority === 'Medium'
              ? 'orange'
              : 'green';

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
        <Tag color={status === 'Completed' ? 'blue' : 'gold'}>{status}</Tag>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      title: 'Build Login Page',
      description: 'Create login UI using Ant Design',
      priority: 'High',
      dueDate: '2025-08-10',
      status: 'Pending',
    },
    {
      key: '2',
      title: 'Dashboard Setup',
      description: 'Configure dashboard routes',
      priority: 'Medium',
      dueDate: '2025-08-12',
      status: 'Completed',
    },
    {
      key: '3',
      title: 'Task CRUD',
      description: 'Implement task management APIs',
      priority: 'Low',
      dueDate: '2025-08-15',
      status: 'Pending',
    },
  ];

  return (
    <div className="search-container">
      <Card className="search-card" title="Search & Filter Tasks">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <Input
              size="large"
              placeholder="Search by Task Title"
              prefix={<SearchOutlined />}
            />
          </Col>

          <Col xs={24} md={8}>
            <Select
              size="large"
              placeholder="Filter by Status"
              style={{ width: '100%' }}
              allowClear
              options={[
                { value: 'Pending', label: 'Pending' },
                { value: 'Completed', label: 'Completed' },
              ]}
            />
          </Col>

          <Col xs={24} md={8}>
            <Select
              size="large"
              placeholder="Filter by Priority"
              style={{ width: '100%' }}
              allowClear
              options={[
                { value: 'Low', label: 'Low' },
                { value: 'Medium', label: 'Medium' },
                { value: 'High', label: 'High' },
              ]}
            />
          </Col>
        </Row>

        <div style={{ marginTop: 30 }}>
          <Table
            columns={columns}
            dataSource={data}
            pagination={{ pageSize: 5 }}
          />
        </div>
      </Card>
    </div>
  );
};

export default Search;
