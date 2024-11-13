import './CreateEvent.css'
import {useState} from 'react';
import {TextField} from '@mui/material';
import {createEvent} from '../../api/eventsApi.ts';
export default function CreateEvent () {
  const [title, setTitle] = useState("");
  const [description, setDesription] = useState("")
  const [location, setLocation] = useState("")
  const [eventDate, setEventDate] = useState("")

  const sendCreateEventRequest = () => {
    createEvent(title, description, location, eventDate)
  }

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
    <button className={"submit-button"} onClick={sendCreateEventRequest}>Submit</button>
  </div>
}
