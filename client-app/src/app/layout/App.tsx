import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react'
import { IActivity } from '../Models/activity';
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

const App = () => {
const [activities, setActivites] = useState<IActivity[]>([]);
const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
const [editMode, setEditMode] = useState(false);

const handleSelectActivity = (id: string) => {
  // set element of returned array to [0] because we are only returning a single item in this instance
  // see bookmark in course section 61
  setSelectedActivity(activities.filter(a => a.id === id)[0])
}

const handleOpenCreateForm = () => {
  setSelectedActivity(null);
  setEditMode(true);
}

const handleCreateActivity = (activity: IActivity) => {
  setActivites([...activities, activity]);
  // after creatiion display new activity
  setSelectedActivity(activity);
  // hide the edit form
  setEditMode(false);
}

const handleEditActivity = (activity: IActivity) => {
  setActivites([...activities.filter(a => a.id !== activity.id), activity]);
  setSelectedActivity(activity);
  setEditMode(false);
}

useEffect(() => {
    axios
      .get<IActivity[]>("http://localhost:5000/api/activities")
      .then(response => {
        setActivites(response.data)
      });
  }, []);

    return (
      <Fragment>
        <NavBar openCreateForm={handleOpenCreateForm} />
        <Container style={{marginTop: '7em'}}>
          <ActivityDashboard 
            activities={activities}
            selectActivity={handleSelectActivity}
            selectedActivity={selectedActivity}
            setSelectedActivity={setSelectedActivity}
            editMode={editMode}
            setEditMode={setEditMode}
            handleCreateActivity={handleCreateActivity}
            handleEditActivity={handleEditActivity}
          />
        </Container>
      </Fragment>
    );
}

export default App;
