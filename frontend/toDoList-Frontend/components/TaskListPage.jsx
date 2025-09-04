import React from 'react';

const TaskListPage = () => {
  console.log('TaskListPage', JSON.parse(sessionStorage.getItem('user')));
  return (
    <div>
       Tasks Page
    </div>
  );
};

export default TaskListPage;