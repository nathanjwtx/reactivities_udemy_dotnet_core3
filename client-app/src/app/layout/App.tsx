import React, { useState, useEffect, Fragment } from 'react';
import { Container } from 'semantic-ui-react'
import { IActivity } from '../Models/activity';
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import agent from '../api/agent';

const App = () => {
const [activities, setActivites] = useState<IActivity[]>([]);
const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
const [editMode, setEditMode] = useState(false);

const handleSelectActivity = (id: string) => {
  // set element of returned array to [0] because we are only returning a single item in this instance
  // see bookmark in course section 61
  setSelectedActivity(activities.filter(a => a.id === id)[0])
  // enables selection of a different activity
  setEditMode(false);
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

const handleDeleteActivity = (id: string) => {
  setActivites([...activities.filter(a => a.id !== id)])
}

useEffect(() => {
  agent.Activities.list()
      .then(response => {
        let activities: IActivity[] = [];
        response.forEach(activity => {
          // reformats date string to lose some accuracy in order to display it on the form
          activity.date = activity.date.split(".")[0];
          activities.push(activity);
        })
        setActivites(activities);
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
            deleteActivity={handleDeleteActivity}
          />
        </Container>
      </Fragment>
    );
}

export default App;
