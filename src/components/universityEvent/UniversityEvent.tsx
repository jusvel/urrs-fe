import "./UniversityEvent.css"

export default function UniversityEvent({ universityEvent }) {

  const eventDate = new Date(universityEvent.eventDate);
  const day = eventDate.getDate()
  const month = eventDate.toLocaleString('default', {month: 'long'})
  let minutes = eventDate.getMinutes().toLocaleString();
  if(minutes < 10) minutes = `0${minutes}`
  const time = eventDate.getHours() + ":" + minutes

  return <div className="event-card">
    <div className="event-photo">
      <img src={"4620528.webp"} width={"100%"} height={"100%"}/>
    </div>
    <div className="event-details">
      <p className="details-title">
        {universityEvent.title}
      </p>
      <p className="details-location">
        {universityEvent.location}
      </p>
      <p className="details-description">
        {universityEvent.description}
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
