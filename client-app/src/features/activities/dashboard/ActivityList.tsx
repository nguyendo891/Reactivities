import { observer } from 'mobx-react-lite';
import { Header } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import React, { Fragment } from 'react';
import ActivityListItem from './ActivityListItem';
//using observer to observe the loading indicator.
export default observer(function ActivityList() {
  const { activityStore } = useStore();
  const { groupedActivities } = activityStore;

  return (
    <>
      {groupedActivities.map(([group, activities]) => (
        <Fragment key={group}>
          <Header sub color="teal">
            {group}
          </Header>

          {activities.map((activity) => (
            <ActivityListItem
              key={activity.id}
              activity={activity}
            ></ActivityListItem>
          ))}
        </Fragment>
      ))}
    </>
  );
});
