import React, { ChangeEvent, FormEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import {v4 as uuid } from 'uuid';

interface IProps {
  setEditMode: (editMode: boolean) => void;
  activity: IActivity;
  createActivity: (activity: IActivity) => void;
  editActivity: (activity: IActivity) => void;
  submitting: boolean;
}

export const ActivityForm: React.FC<IProps> = ({
  setEditMode,
  activity: initialActivity,
  createActivity,
  editActivity,
  submitting
}) => {
  const initializeForm = () => {
    if (initialActivity) {
      return initialActivity;
    } else {
      return {
        id: "",
        title: "",
        category: "",
        description: "",
        date: "",
        city: "",
        venue: "",
      };
    }
  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };

  const handleSubmitForm = () => {
      if(activity.id.length === 0){
          let newActivity = {
              ...activity,
              id: uuid()
          }
          createActivity(newActivity);
      }else{
          editActivity(activity);
      }
  };

  const [activity, setActivity] = useState(initializeForm);

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmitForm}>
        <Form.Input
          onChange={handleInputChange}
          name="title"
          placeholder="Title"
          value={activity.title}
        />
        <Form.TextArea
          onChange={handleInputChange}
          name="description"
          rows={2}
          placeholder="Description"
          value={activity.description}
        />
        <Form.Input
          onChange={handleInputChange}
          name="category"
          placeholder="Category"
          value={activity.category}
        />
        <Form.Input
          onChange={handleInputChange}
          name="date"
          type="datetime-local"
          placeholder="Date"
          value={activity.date}
        />
        <Form.Input
          onChange={handleInputChange}
          name="city"
          placeholder="City"
          value={activity.city}
        />
        <Form.Input
          onChange={handleInputChange}
          name="venue"
          placeholder="Venue"
          value={activity.venue}
        />
        <Button loading={submitting} type="submit" content="Submit" positive floated="right" />
        <Button
          content="Cancel"
          onClick={() => setEditMode(false)}
          floated="right"
        />
      </Form>
    </Segment>
  );
};
