import "./EventCard.scss"
import type {EventCardProps} from "../utils/types";
import { FaTrash, FaPen } from "react-icons/fa";


export default function EventCard({
  id,
  name,
  event_date,
  description,
  creator_username,
  creator_id,
  nb_participants,
  people_max,
  authorized,
  onDelete,
  onModify,
  is_registered,
  onRegister,
  onUnRegister
}: EventCardProps) {

    return (
      <div className="event-card">
        <h3>{name}</h3>
        <p>Date : {new Date(event_date).toLocaleString()}</p>
        <p>{description}</p>
        <p>Créé par {creator_username}</p>
        <p>Participants : {nb_participants} /{people_max}</p>

        <div className="event-card__actions">
          <div className="actions-left">
            {authorized && (
              <>
                <button
                  className="icon-btn delete"
                  onClick={() => onDelete(id)}
                  data-tooltip="Supprimer"
                >
                  <FaTrash />
                </button>

                <button
                  className="icon-btn edit"
                  onClick={() => onModify(id)}
                  data-tooltip="Modifier"
                >
                  <FaPen />
                </button>
              </>
            )}
          </div>

          <div className="actions-right">
            {is_registered ? (
              <button
                className="btn-unregister"
                onClick={() => onUnRegister(id)}
              >
                Se désinscrire
              </button>
              
            ):(
              <button
                className="btn-register"
                onClick={() => onRegister(id)}
                disabled={nb_participants >= people_max}
              >
                {nb_participants >= people_max ? "Complet" : "S’inscrire"}
              </button>
            
            )}

          </div>
        </div>
      </div>
    );  
}