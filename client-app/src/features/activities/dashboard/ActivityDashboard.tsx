import React from 'react';
import { Grid } from 'semantic-ui-react';
import { IActivity } from '../../../app/Models/activity';
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';

interface IProps {
  activities: IActivity[];
  selectActivity: (id: string) => void;
  selectedActivity: IActivity | null;
  setSelectedActivity: (activity: IActivity | null) => void;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  handleCreateActivity: (activity: IActivity) => void;
  handleEditActivity: (activity: IActivity) => void;
  deleteActivity: (id: string) => void;
}

const ActivityDashboard: React.FC<IProps> = ({
  activities,
  selectActivity,
  selectedActivity,
  setSelectedActivity,
  editMode,
  setEditMode,
  handleCreateActivity,
  handleEditActivity,
  deleteActivity
  }) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList 
          activities={activities}
          selectActivity={selectActivity}
          deleteActivity={deleteActivity}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedActivity && !editMode &&
          (<ActivityDetails
            activity={selectedActivity}
            setEditMode={setEditMode}
            setSelectedActivity={setSelectedActivity}
          />)}
        {editMode && (<ActivityForm
          // show blank form when clicking create after viewing/editing an activity
          key={selectedActivity && selectedActivity.id || 0}
          setEditMode={setEditMode}
          activity={selectedActivity!}
          createActivity={handleCreateActivity}
          editActivity={handleEditActivity}
        />)}
      </Grid.Column>
    </Grid>
  )
}

export default ActivityDashboard;