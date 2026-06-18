import { Button, Card, message, Select } from 'antd';
import React, { useState } from 'react';
import './index.less';

const { Option } = Select;

const DeleteTasks: React.FC = () => {
  const [selectedTask, setSelectedTask] = useState<string>();

  const tasks = [
    'Complete Dashboard',
    'API Integration',
    'Testing Module',
    'Deploy Application',
  ];

  const handleDelete = () => {
    if (!selectedTask) {
      message.warning('Please select a task first');
      return;
    }

    message.success(`Task "${selectedTask}" deleted successfully`);
    setSelectedTask(undefined);
  };

  return (
    <div className="delete-task-container">
      <Card title="Delete Task" className="delete-task-card">
        <div className="form-group">
          <label htmlFor="taskSelect">Select Task</label>

          <Select
            id="taskSelect"
            placeholder="Choose a task"
            value={selectedTask}
            onChange={(value) => setSelectedTask(value)}
            className="task-select"
          >
            {tasks.map((task) => (
              <Option key={task} value={task}>
                {task}
              </Option>
            ))}
          </Select>
        </div>

        <Button
          danger
          type="primary"
          onClick={handleDelete}
          disabled={!selectedTask}
        >
          Delete Task
        </Button>
      </Card>
    </div>
  );
};

export default DeleteTasks;
