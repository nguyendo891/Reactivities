import React, { useEffect } from 'react';
import {Container} from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';


function App() {
  const {activityStore} = useStore();
  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]) // [] is used to make sure useEffect is used 1 time,
  // otherwise it becomes an endless loop.Only re-run the effect if [activityStore] changes

if(activityStore.loadingInitial) return <LoadingComponent content='Loading app' />

  //fragment shortcut <>
  return (
    <>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
        />
      </Container>
    </>
  );
}

export default observer(App); // mobx need to observer the entire app
