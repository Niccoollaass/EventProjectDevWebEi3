import "./style/EventPage.scss";
import EventCard from "../Component/Event.tsx"



export default function EventPage() {
  return (
    <div className="event-page">
      <h1 className="event-title">Page des événements</h1>

      <div className="event-list">
        <EventCard title="Concert Johnny Hallyday" />
        <EventCard title="Concert Orelsan" />
        <EventCard title="Concert Naâman" />
      </div>
    </div>
  );
}