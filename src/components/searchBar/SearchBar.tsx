import "./SearchBar.css"

export default function SearchBar() {
  return (
    <div className="search-bar">
      <div className="filter-type">
        tipas
        <input/>
      </div>
      <div className="filter-date">
        data
        <input/>
      </div>
      <div className="search-field">
        paieska
        <input/>
      </div>
      <button className="search-button">
        Ieškoti
      </button>
    </div>)
}
