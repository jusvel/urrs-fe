import './EventInformationDrawer.css';
import { Box, Button, Drawer, Typography } from '@mui/material';
import React from 'react';

export default function EventInformationDrawer({
                                                 open,
                                                 setOpen,
                                                 selectedEvent,
                                                 isRegisteredToCurrentEvent,
                                                 registerToCurrentEvent,
                                                 unregisterFromCurrentEvent,
                                                 setReviewModalOpen,
                                               }) {
  return (
    <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
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
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={() => {
            setReviewModalOpen(true);
          }}
        >
          Leave a Review
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          sx={{ mt: 5 }}
          onClick={() => setOpen(false)}
        >
          Close
        </Button>
      </Box>
    </Drawer>
  );
}