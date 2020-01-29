import React from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'

interface IProps {
  setEditMode: (editMode: boolean) => void;
}

const ActivityForm: React.FC<IProps> = ({setEditMode}) => {
  return (
    <Segment>
      <Form>
        <Form.Input placeholder='Title'/>
        <Form.TextArea rows={2} placeholder='Description'/>
        <Form.Input placeholder='Category'/>
        <Form.Input type='date' placeholder='Date'/>
        <Form.Input placeholder='City'/>
        <Form.Input placeholder='Venue'/>
        <Button onClick={() => setEditMode(false)} content="cancel" />
      </Form>
    </Segment>
  )
}

export default ActivityForm