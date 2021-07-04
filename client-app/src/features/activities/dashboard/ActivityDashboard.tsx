import { observer } from 'mobx-react-lite';
import React from 'react';
import { Grid} from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';

//{activities[0] && (
       //   <ActivityDetails activity={activities[0]}></ActivityDetails>
       // )}  is used when activities[0] is not null
export default observer( function ActivityDashboard() {
  const {activityStore} = useStore();
  const {selectedActivity, editMode} = activityStore;
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList></ActivityList>
      </Grid.Column>
      <Grid.Column width="6">
        {selectedActivity && !editMode && (
          <ActivityDetails
          ></ActivityDetails>
        )}
        {editMode && (
          <ActivityForm/>
        )}
      </Grid.Column>
    </Grid>
  );
} )
