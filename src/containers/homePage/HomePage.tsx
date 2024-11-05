import "./HomePage.css"

import Navbar from '../../components/navbar/Navbar.tsx';
import SearchBar from '../../components/searchBar/SearchBar.tsx';
import UniversityEvent from '../../components/universityEvent/UniversityEvent.tsx';

export default function HomePage() {
  return <div className="root-div">
    <Navbar />
    <SearchBar />
    <div className="events">
      <UniversityEvent />
      <UniversityEvent />
      <UniversityEvent />
      <UniversityEvent />
      <UniversityEvent />
    </div>
  </div>;
}
