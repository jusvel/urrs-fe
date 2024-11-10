import UniversityEvent from '../../components/universityEvent/UniversityEvent.tsx';
import { useEffect, useState } from 'react';
import { getAllEvents, isRegisteredToEvent, registerToEvent, unregisterFromEvent } from '../../api/eventsApi';
import {
  Box, Button,
  Drawer,
  Typography,
} from '@mui/material';


export default function EventList({universityEvents}) {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [open, setOpen] = useState(false);
  const [isRegisteredToCurrentEvent, setIsRegisteredToCurrentEvent] = useState(false);



  const getIsRegisteredToEvent = async (id) => {
    const response = await isRegisteredToEvent(id);
    setIsRegisteredToCurrentEvent(response.data);
  };

  const registerToCurrentEvent = (id) => {
    registerToEvent(id);
    setIsRegisteredToCurrentEvent(true);
  }

  const unregisterFromCurrentEvent = (id) => {
    unregisterFromEvent(id);
    setIsRegisteredToCurrentEvent(false);
  }

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setOpen(true);
    getIsRegisteredToEvent(event.id);
  };

  const handleClose = () => {
    setOpen(false);
    // setSelectedEvent(null);
  };

  return (
    <div className="events">
      {universityEvents.map(item => (
        <div className="events" onClick={() => handleEventClick(item)} key={item.id}>
          <UniversityEvent universityEvent={item} />
        </div>
      ))}

      <Drawer anchor="right" open={open} onClose={handleClose}>
        <Box sx={{ width: 300, padding: 2 }}>
          <Typography variant="h6" gutterBottom>{selectedEvent?.title}</Typography>
          <Typography variant="body2" gutterBottom>{selectedEvent?.description}</Typography>
          <Typography variant="subtitle2" gutterBottom><strong>Location:</strong> {selectedEvent?.location}</Typography>
          <Typography variant="subtitle2"
                      gutterBottom><strong>Date:</strong> {new Date(selectedEvent?.eventDate).toLocaleString()}
          </Typography>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => {
              if (isRegisteredToCurrentEvent) {
                unregisterFromCurrentEvent(selectedEvent?.id);
              } else {
                registerToCurrentEvent(selectedEvent?.id);
              }
            }}
          >
            {isRegisteredToCurrentEvent ? 'Unregister' : 'Register'}
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            sx={{ mt: 1 }}
            onClick={handleClose}
          >
            Close
          </Button>
        </Box>
      </Drawer>
    </div>
  );
}
