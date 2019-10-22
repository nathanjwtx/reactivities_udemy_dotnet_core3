import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Header, Icon, List } from 'semantic-ui-react'
import { IActivity } from '../Models/activity';
import NavBar from '../../features/nav/NavBar';


const App = () => {
const [activities, setActivites] = useState<IActivity[]>([]);

useEffect(() => {

    axios
      .get<IActivity[]>("http://localhost:5000/api/activities")
      .then(response => {
        setActivites(response.data)
      });
  }, []);

    return (
      <div>
        <NavBar/>
        <List>
          {activities.map((activity) => (
            <List.Item key={activity.id}>{activity.title}</List.Item>
          ))}
        </List>
      </div>
    );
}

export default App;
