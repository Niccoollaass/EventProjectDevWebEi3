import { useState } from "react";
import "./Modal.scss";

type CreateEventData = {
  name: string;
  event_date: string;
  description: string;
  people_max: number;
};

type ModalProps = {
  open: boolean;
  title?: string;
  onClose: () => void;
  onSubmit: (data: CreateEventData) => Promise<void> | void;
};

export default function Modal({ open, title, onClose, onSubmit }: ModalProps) {
  const [name, setName] = useState("");
  const [eventDate, setEventDate] = useState(""); // datetime-local: "YYYY-MM-DDTHH:mm"
  const [description, setDescription] = useState("");
  const [peopleMax, setPeopleMax] = useState<number>(20);

  const [localError, setLocalError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
                min={1}
                value={peopleMax}
                onChange={(e) => setPeopleMax(Number(e.target.value))}
                required
              />
            </label>

            <div className="modal-actions">
              <button type="button" onClick={onClose} disabled={loading}>
                Annuler
              </button>
              <button type="submit" disabled={loading}>
                {loading ? "Création..." : "Créer"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
