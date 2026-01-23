import "./style/EventPage.scss";
import Modal from "../Component/Modal";
import EventCard from "../Component/EventCard";
import { createEvent,fetchEvents } from "../API/event-actions";
import { useState,useEffect } from "react";
import type {AppEvent} from "../utils/types"
export default function EventPage() {
  const [events, setEvents] = useState<AppEvent[]>([]);

  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  async function loadEvents() {
    try {
      const data = await fetchEvents();
      setEvents(data);
    } catch (err: any) {
      setError(err.message);
    }
  }
  useEffect(() => {
    loadEvents();
  }, []);



  async function handleModalSubmit(data: {
    name: string;
    event_date: string;
    description: string;
    people_max: number;
  }) {
    setError(null);
    try {
      await createEvent(
        data.name,
        data.event_date,
        data.description,
        data.people_max
      );
      await loadEvents(); // refresh après création
      setIsOpen(false);
    } catch (err: any) {
      setError(err?.message ?? "Erreur inconnue");
      throw err; 
    }
  }

  return (
    <div className="event-page">
      <h1 className="event-title">Page des événements</h1>

      {error && <p className="error">{error}</p>}

      <div className="event-list">
        {events.map((event) => (
          <EventCard
            id={event.id}
            name={event.name}
            event_date={event.event_date}
            description={event.description}
            creator={event.creator}
            people_max={event.people_max}
          />
        ))}
      </div>

      <button className="add-btn" onClick={() => setIsOpen(true)}>
        +
      </button>

      <Modal
        open={isOpen}
        title="Créer un événement"
        onClose={() => setIsOpen(false)}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
}
