import './EventInformationDrawer.css';
import { Box, Button, Drawer, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ViewPanel from './ViewPanel.tsx';
import { getCurrentUserId } from '../../../api/loginApi.ts';
import EditPanel from './EditPanel.tsx';

export default function EventInformationDrawer({
                                                 open,
                                                 setOpen,
                                                 selectedEvent,
                                                 isRegisteredToCurrentEvent,
                                                 registerToCurrentEvent,
                                                 unregisterFromCurrentEvent,
                                                 setReviewModalOpen,
                                                 eventAttendeeCount,
                                                 fetchAllEvents,
                                               }) {
  const [isCurrentUserAuthor, setIsCurrentUserAuthor] = useState(false);

  useEffect(() => {
    getCurrentUserId().then(data => {
      if (selectedEvent?.userId == data.data) setIsCurrentUserAuthor(true);
      else setIsCurrentUserAuthor(false);
    });
  }, [selectedEvent]);

  return (
    <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
      {isCurrentUserAuthor ?
        <EditPanel
          setOpen={setOpen}
          selectedEvent={selectedEvent}
          eventAttendeeCount={eventAttendeeCount}
          fetchAllEvents={fetchAllEvents}
        />
        :
        <ViewPanel
          setOpen={setOpen}
          selectedEvent={selectedEvent}
          isRegisteredToCurrentEvent={isRegisteredToCurrentEvent}
          registerToCurrentEvent={registerToCurrentEvent}
          unregisterFromCurrentEvent={unregisterFromCurrentEvent}
          setReviewModalOpen={setReviewModalOpen}
          eventAttendeeCount={eventAttendeeCount}
        />
      }
    </Drawer>
  );
}
