import "./EventCard.scss"
import type { AppEvent} from "../utils/types";


export default function EventCard({
  name,
  event_date,
  description,
  creator,
  people_max,
}: AppEvent) {
  return (
    <div className="event-card">
      <h3>{name}</h3>
      <p>Date : {new Date(event_date).toLocaleString()}</p>
      <p>{description}</p>
      <p>Créé par {creator}</p>
      <p>Max : {people_max}</p>
    </div>
  );
}