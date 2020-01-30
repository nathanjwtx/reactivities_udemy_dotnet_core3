import React, { useState } from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'
import { IActivity } from '../../../app/Models/activity'

interface IProps {
  setEditMode: (editMode: boolean) => void;
  activity: IActivity;
}

const ActivityForm: React.FC<IProps> = ({setEditMode, activity: initFormState}) => {
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

  return (
    <Segment clearing>
      <Form>
        <Form.Input placeholder='Title' value={activity.title}/>
        <Form.TextArea rows={2} placeholder='Description' value={activity.description} />
        <Form.Input placeholder='Category' value={activity.category} />
        <Form.Input type='date' placeholder='Date' value={activity.date} />
        <Form.Input placeholder='City' value={activity.city} />
        <Form.Input placeholder='Venue' value={activity.venue} />
        <Button onClick={() => setEditMode(false)} content="cancel" />
        <Button floated='right' content="submit" positive />
      </Form>
    </Segment>
  )
}

export default ActivityForm