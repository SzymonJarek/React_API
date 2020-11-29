import React, { useState, useEffect, Fragment } from "react";
import { Container, Header, Icon, List } from "semantic-ui-react";
import axios from "axios";
import { IActivity } from "../models/activity";
import { Navbar } from "../../features/nav/NavBar";
import { ActivityDashboard } from "../../features/activities/dashboard/ActivityDashboard";

interface IState {
  activities: IActivity[];
}

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );
  const [editMode, setEditMode] = useState(false);

  const handleSelectedActivity = (id: string) => {
    setSelectedActivity(activities.filter((x) => x.id === id)[0]);
  };

  const openCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  };

  const handleCreateActivity = (activity: IActivity) => {
    setActivities([...activities, activity]);
    setSelectedActivity(activity);
    setEditMode(false);
  };

  const handleEditActivity = (activity: IActivity) => {
    setActivities([
      ...activities.filter((x) => x.id !== activity.id),
      activity,
    ]);
    setSelectedActivity(activity);
    setEditMode(false);
  };

  const handleDeleteActivity = (id: string) => {
    setActivities([...activities.filter((x) => x.id !== id)]);
  };

  useEffect(() => {
    axios
      .get<IActivity[]>("http://localhost:5000/api/activities")
      .then((response) => {
        let activities: IActivity[] = [];
        response.data.forEach((activity) => {
          activity.date = activity.date.split(".")[0];
          activities.push(activity);
        });
        // console.log(response);
        setActivities(activities);
      });
  }, []);

  return (
    //fragment to wrapper na elementy Reactowe, musi tu być albo on albo div, Fragment jest niewidoczny w inspektorze html
    <Fragment>
      <Navbar openCreateForm={openCreateForm} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          handleDeleteActivity={handleDeleteActivity}
          activities={activities}
          selectActivity={handleSelectedActivity}
          selectedActivity={selectedActivity}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity}
          handleCreateActivity={handleCreateActivity}
          handleEditActivity={handleEditActivity}
        />
      </Container>
    </Fragment>
  );
};

export default App;
