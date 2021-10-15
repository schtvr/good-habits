import React from 'react';
import CreateQuest from '../CreateQuest/CreateQuest';
import CreateTask from '../CreateTask/CreateTask';
import './Dashboard.css';
const Dashboard = () => {
  return (
    <div className="Dashboard">
      <CreateQuest />
      <CreateTask /> 
    </div>
  )
};

export default Dashboard
