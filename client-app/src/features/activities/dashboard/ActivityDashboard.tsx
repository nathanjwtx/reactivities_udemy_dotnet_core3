import React from 'react';
import { Grid, List } from 'semantic-ui-react';

const ActivityDashboard = () => {
  return (
    <Grid>
      <Grid.Column>
        <List>
            {activities.map((activity) => (
              <List.Item key={activity.id}>{activity.title}</List.Item>
            ))}
        </List>
      </Grid.Column>
    </Grid>
  )
}