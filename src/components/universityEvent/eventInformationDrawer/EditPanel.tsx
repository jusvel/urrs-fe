import {
  Box,
  Button,
  Dialog,
  DialogActions, DialogContent,
  DialogContentText,
  DialogTitle, MenuItem, Select,
  TextField,
  Typography,
} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {DateTimePicker, LocalizationProvider} from '@mui/x-date-pickers';
import {DemoContainer} from '@mui/x-date-pickers/internals/demo';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { deleteEvent, generateReport, getEventTypes, updateEvent } from '../../../api/eventsApi.ts';

export default function EditPanel({
                                    setOpen,
                                    selectedEvent,
                                    eventAttendeeCount,
                                    fetchAllEvents,
                                  }) {
  const [title, setTitle] = useState(selectedEvent.title);
  const [description, setDescription] = useState(selectedEvent.description);
  const [location, setLocation] = useState(selectedEvent.location);
  const [date, setDate] = useState(dayjs(selectedEvent.eventDate));
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [selectedEventType, setSelectedEventType] = useState(selectedEvent.eventType);
  const [eventTypes, setEventTypes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEventTypes = async () => {
    await getEventTypes().then(
      (e) => setTypesToSelector(e)
    );
  }

  const downloadReport = async () => {
    setLoading(true)
    await generateReport(selectedEvent.id).then(() => {
      setLoading(false);
    })
  }

  const setTypesToSelector = (e) => {
    setEventTypes(e)
    e.map((type) => {
      if (type.toUpperCase() == selectedEventType) {
        setSelectedEventType(type)
      }
    })
  }

  useEffect(() => {
    fetchEventTypes()

  }, []);

  const deleteCurrentEvent = () => {
    deleteEvent(selectedEvent.id).then(() => {
      setConfirmationOpen(false);
      fetchAllEvents();

    });
  };

  const updateCurrentEvent = () => {
    const dateToSend = date.toISOString().replace('Z', ' ').replace('T', ' ');
    updateEvent(selectedEvent.id, title, description, location, dateToSend, selectedEventType).then(() => {
      setOpen(false);
      fetchAllEvents();

    });
  };

  return <Box sx={{width: 500, padding: 2, display: 'flex', flexDirection: 'column', height: '100%'}}>
    <TextField
      sx={{mt: 2}}
      id="outlined-controlled"
      label="Pavadinimas"
      fullWidth={true}
      value={title}
      onChange={(event) => {
        setTitle(event.target.value);
      }}
    />
    <TextField
      sx={{mt: 2}}
      multiline={true}
      maxRows={7}
      id="outlined-controlled"
      label="Aprašymas"
      fullWidth={true}
      value={description}
      onChange={(event) => {
        setDescription(event.target.value);
      }}
    />

    <TextField
      sx={{mt: 2}}
      id="outlined-controlled"
      label="Vieta"
      fullWidth={true}
      value={location}
      onChange={(event) => {
        setLocation(event.target.value);
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

    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateTimePicker']} sx={{mt: 2}}>
        <DateTimePicker
          label="Renginio data"
          ampm={false}
          onChange={(newValue) => {
            setDate(newValue);
          }}
          value={date}
        />
      </DemoContainer>
    </LocalizationProvider>

    <Typography variant="subtitle2" gutterBottom sx={{mt: 10}}><strong>Užsiregistravusių dalyvių
      skaičius:</strong> {eventAttendeeCount}</Typography>
    <Button
      variant="contained"
      color="primary"
      fullWidth
      sx={{mt: 2}}
      onClick={updateCurrentEvent}
    >
      Išsaugoti
    </Button>
    <Button
      variant="contained"
      color="success"
      fullWidth
      sx={{mt:2}}
      onClick={downloadReport}
    >
      Atsisiųsti ataskaitą
    </Button>
    <Button
      variant="contained"
      color="warning"
      fullWidth
      sx={{mt: 2}}
      onClick={() => {
        setConfirmationOpen(true);
      }}
    >
      Ištrinti renginį
    </Button>
    <Button
      variant="outlined"
      color="secondary"
      fullWidth
      sx={{mt: 5, alignSelf: 'flex-end'}}
      onClick={() => setOpen(false)}
    >
      Atšaukti
    </Button>

    <Dialog open={confirmationOpen} onClose={() => setConfirmationOpen(false)}>
      <DialogContent>
        Ar tikrai norite ištrinti šį renginį?
      </DialogContent>
      <DialogActions>
        <Button size="small" variant="contained" color="error" onClick={deleteCurrentEvent}>
          Taip
        </Button>
        <Button size="small" variant="outlined" color="secondary" onClick={() => setConfirmationOpen(false)}>
          Ne
        </Button>
      </DialogActions>
    </Dialog>
  </Box>;
}
