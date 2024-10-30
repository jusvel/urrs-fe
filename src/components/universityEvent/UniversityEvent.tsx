import "./UniversityEvent.css"

export default function UniversityEvent() {
  const id = "1"
  const title = "Rugsėjo 1 šventė"
  const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim  veniam, quis nostrud exercitat..."
  const eventDate = new Date("2007-04-30 13:10:02.047")
  const location = "SRK"
  const createdOn = "2007-03-30 13:10:02.047"
  const userId = "1"


  const day = eventDate.getDate()
  const month = eventDate.toLocaleString('default', {month: 'long'})
  const time = eventDate.getHours() + ":" + eventDate.getMinutes()
  return <div className="event-card">
    <div className="event-photo">
      a
    </div>
    <div className="event-details">
      <p className="details-title">
        {title}
      </p>
      <p className="details-location">
        {location}
      </p>
      <p className="details-description">
        {description}
      </p>
    </div>
    <div className="event-date">
      <p className="date-day">
        {day}
      </p>
      <p className="date-month">
        {month}
      </p>
      <p className="date-time">
        {time}
      </p>
    </div>
  </div>
}
