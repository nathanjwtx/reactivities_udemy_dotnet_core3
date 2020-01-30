import React from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'
import { IActivity } from '../../../app/Models/activity'

interface IProps {
  setEditMode: (editMode: boolean) => void;
}

const ActivityForm: React.FC<IProps> = ({setEditMode}) => {
  return (
    <Segment clearing>
      <Form>
        <Form.Input placeholder='Title'/>
        <Form.TextArea rows={2} placeholder='Description'/>
        <Form.Input placeholder='Category'/>
        <Form.Input type='date' placeholder='Date'/>
        <Form.Input placeholder='City'/>
        <Form.Input placeholder='Venue'/>
        <Button onClick={() => setEditMode(false)} content="cancel" />
        <Button floated='right' content="submit" positive />
      </Form>
    </Segment>
  )
}

export default ActivityForm