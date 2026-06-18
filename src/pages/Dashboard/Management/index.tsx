import { Button, Card, Space } from 'antd';
import './index.less';

const Management = () => {
  return (
    <div className="management-container">
      <Card className="management-card" title="Task Management">
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Button type="primary" size="large" block>
            Create Task
          </Button>

          <Button size="large" block>
            View All Tasks
          </Button>

          <Button size="large" block>
            Update Task
          </Button>

          <Button danger size="large" block>
            Delete Task
          </Button>
        </Space>
      </Card>
    </div>
  );
};

export default Management;
