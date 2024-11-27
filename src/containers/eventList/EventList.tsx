import UniversityEvent from '../../components/universityEvent/UniversityEvent.tsx';
import React, {useEffect, useState} from 'react';
import EventInformationDrawer from '../../components/universityEvent/eventInformationDrawer/EventInformationDrawer.tsx';
import ReviewModal from '../../components/universityEvent/reviewModal/ReviewModal.tsx';
import {getAttendeeCount, isRegisteredToEvent, registerToEvent, unregisterFromEvent} from '../../api/attendeesApi.ts';
import "./EventList.css"

interface EventListProps {
  universityEvents: any,
  isLoading: false,
  fetchAllEvents: void,
}

export default function EventList({universityEvents, isLoading, fetchAllEvents}: EventListProps) {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [open, setOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [isRegisteredToCurrentEvent, setIsRegisteredToCurrentEvent] = useState(false);
  const [eventAttendeeCount, setEventAttendeeCount] = useState(0);


  const getIsRegisteredToEvent = async (id) => {
    const response = await isRegisteredToEvent(id);
    setIsRegisteredToCurrentEvent(response.data);
  };

  const getCurrentEventAttendeeCount = async (id) => {
    const response = await getAttendeeCount(id);
    setEventAttendeeCount(response.data);
  };

  const registerToCurrentEvent = (id) => {
    registerToEvent(id).then(() => {
      getCurrentEventAttendeeCount(id);
      setIsRegisteredToCurrentEvent(true);
    });
  };

  const unregisterFromCurrentEvent = (id) => {
    unregisterFromEvent(id).then(() => {
      setIsRegisteredToCurrentEvent(false);
      getCurrentEventAttendeeCount(id);
    });
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setOpen(true);
    getIsRegisteredToEvent(event.id);
    getCurrentEventAttendeeCount(event.id);
  };


  return (<div style={{width: "100%"}}>
      {!isLoading ?
        <div style={{width: "100%"}}>
          {universityEvents.map(item => (
            <div className={"event-list"} onClick={() => handleEventClick(item)} key={item.id}>
              <UniversityEvent universityEvent={item}/>
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
            fetchAllEvents={fetchAllEvents}
          />
          <ReviewModal
            reviewModalOpen={reviewModalOpen}
            setReviewModalOpen={setReviewModalOpen}
            currentEventId={1}
          />
        </div>
        : <p>LOADING</p>}
    </div>
  );
}
