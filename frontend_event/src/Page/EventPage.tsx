import "./style/EventPage.scss";
import Modal from "../Component/Modal";
import EventCard from "../Component/EventCard";
import { createEvent,fetchEvents,deleteEvent,modifyEvent,registerEvent,unRegisterEvent,fetchMyRegistrations } from "../API/event-actions";
import { useState,useEffect } from "react";
import type {EventItem,EventWithRegistration} from "../utils/types"
export default function EventPage() {

  const [events, setEvents] = useState<EventWithRegistration[]>([]);

  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  const [currentUserId, setCurrentUserId] = useState<number | null>(null);


  async function loadEvents() {
    try {
      const data = await fetchEvents();
      const regIds = await fetchMyRegistrations(); 
      const regSet = new Set(regIds);

      const enriched: EventWithRegistration[] = data.map((ev: EventItem) => ({
  ...ev,
  is_registered: regSet.has(ev.id),
}));

    setEvents(enriched);
    } catch (err: any) {
      setError(err.message);
    }
  }
  useEffect(() => {
    loadEvents();
    fetch("/api/me", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then(async (res) => {
      const payload = await res.json();
      console.log("STATUS /api/me:", res.status);
      console.log("PAYLOAD /api/me:", payload);
      return payload;
    })
    .then((me) => setCurrentUserId(me.user.id));
  }, []);
async function handleModalSubmit(data: {
    name: string;
    event_date: string;
    description: string;
    people_max: number;
  }) {
    setError(null);
    try {
      if (isEdit && selectedEvent) {
      await modifyEvent(selectedEvent.id, data.name,
        data.event_date,
        data.description,
        data.people_max
      );
    }
      else {
        await createEvent(
          data.name,
          data.event_date,
          data.description,
          data.people_max
        );
    }
      await loadEvents(); // refresh après création
      setIsOpen(false);
      setIsEdit(false);
      setSelectedEvent(null);
    } catch (err: any) {
      setError(err?.message ?? "Erreur inconnue");
    }
  }
async function handleDelete(id:number){
  setError(null);
  try {
    await deleteEvent(id); 

    setEvents((prev) => prev.filter((event) => event.id !== id));
  } catch (err: any) {
    setError(err?.message ?? "Erreur lors de la suppression");
  }
}
async function handleRegister(id: number) {
  setError(null);
  try {
    await registerEvent(id);
    await loadEvents(); // on recharge proprement
  } catch (err: any) {
    setError(err?.message ?? "Erreur lors de l’inscription");
  }
}

async function handleUnRegister(id: number) {
  setError(null);
  try {
    await unRegisterEvent(id);
    await loadEvents(); // on recharge proprement
  } catch (err: any) {
    setError(err?.message ?? "Erreur lors de la désinscription");
  }
}
function handleModify(id: number) {
    const ev = events.find((e) => e.id === id);
    if (!ev) return;

    setIsEdit(true);
    setSelectedEvent(ev);
    setIsOpen(true);
  }
  return (
    <div className="event-page">
      <h1 className="event-title">Page des événements</h1>

      {error && <p className="error">{error}</p>}
      <div className="group">
        <div className="event-list">
          {events.map((event) => (
            <EventCard
              key={event.id}
              id={event.id}
              name={event.name}
              event_date={event.event_date}
              description={event.description}
              creator_username={event.creator_username}
              creator_id={event.creator_id}
              nb_participants={event.nb_participants}
              people_max={event.people_max}
              authorized={currentUserId==event.creator_id}
              onDelete={handleDelete}
              onModify={handleModify}
              is_registered = {event.is_registered}
              onRegister={handleRegister}
              onUnRegister={handleUnRegister}

            />
            
  ))}
        </div>

        <button className="add-btn" onClick={() => setIsOpen(true)}>
          +
        </button>

        <Modal
          open={isOpen}
          title={isEdit ? "Modifier un événement" : "Créer un événement"}
          onClose={() => setIsOpen(false)}
          onSubmit={handleModalSubmit}
          selectedEvent={selectedEvent}
          isEdit={isEdit}

        />
      </div>
    </div>
  );
}
