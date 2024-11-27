import './CreateEvent.css'
import React, {useEffect, useState} from 'react';
import {MenuItem, Select, TextField} from '@mui/material';
import {createEvent, getEventTypes} from '../../api/eventsApi.ts';
import {useNavigate} from 'react-router-dom';
export default function CreateEvent () {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDesription] = useState("")
  const [location, setLocation] = useState("")
  const [eventDate, setEventDate] = useState("")
  const [selectedEventType, setSelectedEventType] = useState();
  const [eventTypes, setEventTypes] = useState([]);

  const sendCreateEventRequest = () => {
    createEvent(title, description, location, eventDate, selectedEventType);
    navigate('/')
  }

  const fetchEventTypes = async () => {
    await getEventTypes().then((e) =>
      setEventTypes(e)
    );
  }

  useEffect(() => {
    fetchEventTypes()
  }, []);

  return <div className={"event-form"}>
    <TextField
      id="outlined-controlled"
      label="Title"
      value={title}
      onChange={(event) => {
        setTitle(event.target.value);
      }}
    />
    <TextField
      id="outlined-controlled"
      label="Description"
      value={description}
      onChange={(event) => {
        setDesription(event.target.value);
      }}
    />
    <TextField
      id="outlined-controlled"
      label="Location"
      value={location}
      onChange={(event) => {
        setLocation(event.target.value);
      }}
    />
    <TextField
      id="outlined-controlled"
      label="Event date"
      value={eventDate}
      onChange={(event) => {
        setEventDate(event.target.value);
      }}
    />
    <Select
      sx={{mt: 2}}
      label="Renginio tipas"
      id="event-type-select"
      value={selectedEventType}
      onChange={(e) => setSelectedEventType(e.target.value)}
    >
      {eventTypes.map(type =>
        <MenuItem key={type} value={type}>{type}</MenuItem>,
      )}
    </Select>
    <button className={"submit-button"} onClick={sendCreateEventRequest}>Submit</button>
  </div>
}
