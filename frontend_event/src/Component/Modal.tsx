import { useState,useEffect } from "react";
import "./Modal.scss";
import type {ModalProps} from "../utils/types"



export default function Modal({ open,
  title,
  onClose,
  onSubmit,
  selectedEvent,
  isEdit
}: ModalProps) {
  const [name, setName] = useState("");
  const [eventDate, setEventDate] = useState(""); // datetime-local: "YYYY-MM-DDTHH:mm"
  const [description, setDescription] = useState("");
  const [peopleMax, setPeopleMax] = useState<number>(20);
  const [nbParticipants, setNbParticipants] = useState<number>(20);

  const [limitWarning, setLimitWarning] = useState<string | null>(null);


  const [localError, setLocalError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (!open) return;

    if (selectedEvent) {
      setName(selectedEvent.name ?? "");
      setDescription(selectedEvent.description ?? "");
      setPeopleMax(Number(selectedEvent.people_max ?? 20));
      setNbParticipants(Number(selectedEvent.nb_participants ?? 0))

      // datetime-local attend "YYYY-MM-DDTHH:mm"
      const dt = selectedEvent.event_date ? String(selectedEvent.event_date).slice(0, 16) : "";
      setEventDate(dt);
    } else {
      // mode création : vider
      setName("");
      setEventDate("");
      setDescription("");
      setPeopleMax(20);
    }

    setLocalError(null);
  }, [open, selectedEvent]);

  if (!open) return null;


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLocalError(null);
    setLoading(true);

    try {
      await onSubmit({
        name,
        event_date: eventDate,
        description,
        people_max: peopleMax,
      });

      // reset + close si OK
      setName("");
      setEventDate("");
      setDescription("");
      setPeopleMax(20);
      onClose();
    } catch (err: any) {
      setLocalError(err?.message ?? "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{title ?? "Modal"}</h2>
          <button className="modal-close" onClick={onClose} aria-label="Fermer">
            ×
          </button>
        </div>

        <div className="modal-body">
          {localError && <p className="error">{localError}</p>}

          <form onSubmit={handleSubmit}>
            <label>
              Nom
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>

            <label>
              Date / heure
              <input
                type="datetime-local"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                required
              />
            </label>

            <label>
              Description
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </label>

           <label>
              Nombre max
              <input
                type="number"
                min={isEdit ? nbParticipants : 1}
                value={peopleMax}
                onChange={(e) => {
                  const value = Number(e.target.value);

                  if (isEdit && value < nbParticipants) {
                    setLimitWarning(
                      `Impossible de descendre en dessous du nombre de participant (${nbParticipants}).`
                    );
                    return;
                  }
                  setLimitWarning(null);
                  setPeopleMax(value);
                }}
                required
              />

              {limitWarning && (
                <p className="warning">{limitWarning}</p>
              )}
            </label>

            <div className="modal-actions">
              <button type="button" onClick={onClose} disabled={loading}>
                Annuler
              </button>
              <button type="submit" disabled={loading}>
                {loading ? (isEdit ? "Modification..." : "Création...") : (isEdit ? "Modifier" : "Créer")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
