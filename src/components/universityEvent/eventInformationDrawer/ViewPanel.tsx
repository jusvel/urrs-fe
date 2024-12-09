import { Box, Button, TextField, Typography } from '@mui/material';
import React from 'react';

export default function ViewPanel({
                                    setOpen,
                                    selectedEvent,
                                    isRegisteredToCurrentEvent,
                                    registerToCurrentEvent,
                                    unregisterFromCurrentEvent,
                                    setReviewModalOpen,
                                    eventAttendeeCount,
                                  }) {

  console.log(isRegisteredToCurrentEvent)
  return <Box sx={{ width: 300, padding: 2 }}>
    <Typography variant="h6" gutterBottom>{selectedEvent?.title}</Typography>
    <Typography variant="body2" gutterBottom>{selectedEvent?.description}</Typography>
    <Typography variant="subtitle2" gutterBottom><strong>Location:</strong> {selectedEvent?.location}</Typography>
    <Typography variant="subtitle2" gutterBottom><strong>Attendee count:</strong> {eventAttendeeCount}</Typography>
    <Typography variant="subtitle2"
                gutterBottom><strong>Date:</strong> {new Date(selectedEvent?.eventDate).toLocaleString()}
    </Typography>

    <Button
      variant="contained"
      color="primary"
      fullWidth
      disabled={(new Date() > selectedEvent.eventDate) || (selectedEvent?.registrationEnd != null && (selectedEvent.registrationEnd < new Date())) }
      sx={{ mt: 2 }}
      onClick={() => {
        if (isRegisteredToCurrentEvent) {
          unregisterFromCurrentEvent(selectedEvent?.id);
        } else {
          registerToCurrentEvent(selectedEvent?.id);
        }
      }}
    >
      {
        ((selectedEvent?.registrationEnd != null && (selectedEvent.registrationEnd < new Date()))) ? ('Registracija baigta')
          :
        (isRegisteredToCurrentEvent ? 'Atšaukti registraciją' : 'Registruotis')

      }
    </Button>
    <Button
      disabled={(new Date() < selectedEvent.eventDate)}
      variant="contained"
      color="primary"
      fullWidth
      sx={{ mt: 2 }}
      onClick={() => {
        setReviewModalOpen(true);
      }}
    >
      Palikti atsiliepimą
    </Button>
    <Button
      variant="outlined"
      color="secondary"
      fullWidth
      sx={{ mt: 5 }}
      onClick={() => setOpen(false)}
    >
      Uždaryti
    </Button>
  </Box>
}
