import './HomePage.css';

import Navbar from '../../components/navbar/Navbar.tsx';
import SearchBar from '../../components/searchBar/SearchBar.tsx';
import EventList from '../eventList/EventList.tsx';
import { getAllEvents } from '../../api/eventsApi.ts'
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [universityEvents, setUniversityEvents] = useState([])
  const [isLoading, setIsLoading] = useState(false);

  const fetchAllEvents = async () => {
    setIsLoading(true);
    const response = await getAllEvents();
    setIsLoading(false);
    setUniversityEvents(response.data);
  };

  useEffect(() => {
    fetchAllEvents();
  },[])

  return (
    <div className="root-div">
      <Navbar />
      <SearchBar />
      <EventList universityEvents={universityEvents} isLoading={isLoading} fetchAllEvents={fetchAllEvents}/>
    </div>
  );
}
