import UniversityEvent from '../../components/universityEvent/UniversityEvent.tsx';
import React, { useEffect, useState } from 'react';
import EventInformationDrawer from '../../components/universityEvent/eventInformationDrawer/EventInformationDrawer.tsx';
import ReviewModal from '../../components/universityEvent/reviewModal/ReviewModal.tsx';
import { getAttendeeCount, isRegisteredToEvent, registerToEvent, unregisterFromEvent } from '../../api/attendeesApi.ts';


export default function EventList({ universityEvents }) {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [open, setOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [isRegisteredToCurrentEvent, setIsRegisteredToCurrentEvent] = useState(false);
  const [eventAttendeeCount, setEventAttendeeCount] = useState(0);


  const getIsRegisteredToEvent = async (id) => {
    const response = await isRegisteredToEvent(id);
    setIsRegisteredToCurrentEvent(response.data);
  };

  const getCurrentEventAttendeeCount = async(id) => {
    const response = await getAttendeeCount(id);
    setEventAttendeeCount(response.data);
  }

  const registerToCurrentEvent = (id) => {
    registerToEvent(id);
    setIsRegisteredToCurrentEvent(true);
    getCurrentEventAttendeeCount(id);
  };

  const unregisterFromCurrentEvent = (id) => {
    unregisterFromEvent(id);
    setIsRegisteredToCurrentEvent(false);
    getCurrentEventAttendeeCount(id);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setOpen(true);
    getIsRegisteredToEvent(event.id);
    getCurrentEventAttendeeCount(event.id)
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
        eventAttendeeCount={eventAttendeeCount}
      />
      <ReviewModal
        reviewModalOpen={reviewModalOpen}
        setReviewModalOpen={setReviewModalOpen}
        currentEventId={1}
      />
    </div>
  );
}
