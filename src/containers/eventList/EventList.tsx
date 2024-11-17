import UniversityEvent from '../../components/universityEvent/UniversityEvent.tsx';
import React, { useEffect, useState } from 'react';
import { getAllEvents, isRegisteredToEvent, registerToEvent, unregisterFromEvent } from '../../api/eventsApi';
import {
  Box, Button,
  Drawer, Modal,
  Typography,
} from '@mui/material';
import EventInformationDrawer from '../../components/universityEvent/eventInformationDrawer/EventInformationDrawer.tsx';
import ReviewModal from '../../components/universityEvent/reviewModal/ReviewModal.tsx';


export default function EventList({ universityEvents }) {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [open, setOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [isRegisteredToCurrentEvent, setIsRegisteredToCurrentEvent] = useState(false);


  const getIsRegisteredToEvent = async (id) => {
    const response = await isRegisteredToEvent(id);
    setIsRegisteredToCurrentEvent(response.data);
  };

  const registerToCurrentEvent = (id) => {
    registerToEvent(id);
    setIsRegisteredToCurrentEvent(true);
  };

  const unregisterFromCurrentEvent = (id) => {
    unregisterFromEvent(id);
    setIsRegisteredToCurrentEvent(false);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setOpen(true);
    getIsRegisteredToEvent(event.id);
  };


  return (
    <div className="events">
      {universityEvents.map(item => (
        <div className="events" onClick={() => handleEventClick(item)} key={item.id}>
          <UniversityEvent universityEvent={item} />
        </div>
      ))}


      <EventInformationDrawer
        open={open}
        setOpen={setOpen}
        selectedEvent={selectedEvent}
        isRegisteredToCurrentEvent={isRegisteredToCurrentEvent}
        registerToCurrentEvent={registerToCurrentEvent}
        unregisterFromCurrentEvent={unregisterFromCurrentEvent}
        setReviewModalOpen={setReviewModalOpen}
      />
      <ReviewModal
        reviewModalOpen={reviewModalOpen}
        setReviewModalOpen={setReviewModalOpen}
        currentEventId={1}
      />
    </div>
  );
}
