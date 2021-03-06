import React, { useState, FormEvent } from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'
import { IActivity } from '../../../app/Models/activity'
import {v4 as uuid} from 'uuid'

interface IProps {
  setEditMode: (editMode: boolean) => void;
  activity: IActivity;
  createActivity: (activity: IActivity) => void;
  editActivity: (activity: IActivity) => void;
}

const ActivityForm: React.FC<IProps> = ({
  setEditMode,
  activity: initFormState,
  createActivity,
  editActivity}) => {
  // this function deals with the selectedActivity! being pased by the dashboard in ActivityForm
  const initForm = () => {
    if (initFormState) {
      return initFormState;
    } else {
      return {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
      }
    }
  }

  const [activity, setActivity] = useState<IActivity>(initForm);

  const handleSubmit = () => {
    if (activity.id.length === 0) {
      let newActivity = {...activity, id: uuid()}
      createActivity(newActivity);
    } else {
      editActivity(activity);
    }
  }

  const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // use evet.currentTarget when attaching the same event handler to multiple elements
    const {name, value} = event.currentTarget;
    setActivity({...activity, [name]: value});
  }

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          onChange={handleInputChange}
          name='title'
          placeholder='Title'
          value={activity.title}/>
        <Form.TextArea
          onChange={handleInputChange}
          name='description'
          rows={2}
          placeholder='Description'
          value={activity.description} />
        <Form.Input
          onChange={handleInputChange}
          name='category'
          placeholder='Category'
          value={activity.category} />
        <Form.Input
          onChange={handleInputChange}
          name='date'
          type='datetime-local'
          placeholder='Date'
          value={activity.date} />
        <Form.Input
          onChange={handleInputChange}
          name='city'
          placeholder='City'
          value={activity.city} />
        <Form.Input
          onChange={handleInputChange}
          name='venue'
          placeholder='Venue'
          value={activity.venue} />
        <Button onClick={() => setEditMode(false)} content="cancel" />
        <Button floated='right' content="submit" positive />
      </Form>
    </Segment>
  )
}

export default ActivityForm