import React from 'react';
import { Grid, List } from 'semantic-ui-react';
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
}

const ActivityDashboard: React.FC<IProps> = ({
  activities,
  selectActivity,
  selectedActivity,
  setSelectedActivity,
  editMode,
  setEditMode}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList 
          activities={activities}
          selectActivity={selectActivity}
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
          setEditMode={setEditMode}
          activity={selectedActivity!}
        />)}
      </Grid.Column>
    </Grid>
  )
}

export default ActivityDashboard;