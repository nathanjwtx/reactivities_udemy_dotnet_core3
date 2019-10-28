import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { Header, Icon, List, Container } from 'semantic-ui-react'
import { IActivity } from '../Models/activity';
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';


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
      <Fragment>
        <NavBar/>
        <Container style={{marginTop: '7em'}}>
          <ActivityDashboard activities={activities}/>
        </Container>
      </Fragment>
    );
}

export default App;
