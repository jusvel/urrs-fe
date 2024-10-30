import './App.css'
import UniversityEvent from './components/universityEvent/UniversityEvent.tsx';
import SearchBar from './components/searchBar/SearchBar.tsx';
import Navbar from './components/navbar/Navbar.tsx'

function App() {

  return (<div className="root-div">
      <Navbar/>
      <SearchBar/>
      <div className="events">
        <UniversityEvent/>
        <UniversityEvent/>
        <UniversityEvent/>
        <UniversityEvent/>
        <UniversityEvent/>
      </div>
    </div>
  )
}

export default App
