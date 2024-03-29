import { observer } from 'mobx-react-lite';
import React, { useState, ChangeEvent } from 'react';
import { useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from 'uuid';

export default observer( function ActivityForm() {
  const history = useHistory();
  const{activityStore} = useStore();
  const {createActivity, updateActivity,
        loading, loadActivity, loadingInitial} = activityStore;
  const {id} = useParams<{id:string}>();
  const [activity, setActivity] = useState({
    id: '',
    title: '',
    category: '',
    date: '',
    description: '',
    venue: '',
    city: '',
  });
  
  useEffect(()=> {
    if(id) loadActivity(id).then(activity => setActivity(activity!)) //activity! means as developer we know there is no chance to be undefined.
  },[id, loadActivity])//this code only be executed only when id change or loadActivity function change

  

  function handleSubmit() {
    if(activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid()
      };

      createActivity(newActivity).then(()=> history.push(`/activities/${newActivity.id}`) );
    } else {
       updateActivity(activity).then(() => history.push(`/activities/${activity}`))
    }  
  }

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  }

  if(loadingInitial) return <LoadingComponent content ='Loading activity...' />
  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Input
          placeholder="Title"
          value={activity.title}
          name="title"
          onChange={handleInputChange}
        ></Form.Input>
        <Form.TextArea
          placeholder="Description"
          value={activity.description}
          name="description"
          onChange={handleInputChange}
        ></Form.TextArea>
        <Form.Input
          placeholder="Category"
          value={activity.category}
          name="category"
          onChange={handleInputChange}
        ></Form.Input>
        <Form.Input
          type='date'
          placeholder="Date"
          value={activity.date}
          name="date"
          onChange={handleInputChange}
        ></Form.Input>
        <Form.Input
          placeholder="City"
          value={activity.city}
          name="city"
          onChange={handleInputChange}
        ></Form.Input>
        <Form.Input
          placeholder="Venue"
          value={activity.venue}
          name="venue"
          onChange={handleInputChange}
        ></Form.Input>
        <Button loading={loading} floated="right" positive type="submit" content="Submit" />
        <Button
          as= {Link}
          to='/activities'
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
})