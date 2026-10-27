import "./EventCard.css";

function EventCard({
  event,
  onRegister,
  onCancel,
  onFavorite,
  onRemove,
}) {
  return (
    <article className="event-card">

      <div
        className={`event-card-image ${event.category.toLowerCase()}`}
      >
        <span>{event.category}</span>
      </div>

      <div className="event-card-content">

        <div className="event-card-header">
          <span className="event-category">
            {event.category}
          </span>

          <button
            className={`favorite-button ${
              event.favorite ? "favorite-active" : ""
            }`}
            onClick={() => onFavorite(event.id)}
          >
            {event.favorite ? "★" : "☆"}
          </button>
        </div>

        <h3>{event.title}</h3>

        <p className="event-description">
          {event.description}
        </p>

        <div className="event-details">
          <span>
            📅 <b>Date:</b> {event.date}
          </span>

          <span>
            📍 <b>Venue:</b> {event.venue}
          </span>

          <span>
            👥 <b>Registrations:</b>{" "}
            {event.registrations}
          </span>
        </div>

        <div className="event-buttons">
          {event.registered ? (
            <button
              className="cancel-button"
              onClick={() => onCancel(event.id)}
            >
              Cancel Registration
            </button>
          ) : (
            <button
              className="register-button"
              onClick={() => onRegister(event.id)}
            >
              Register
            </button>
          )}

          <button
            className="favorite-action"
            onClick={() => onFavorite(event.id)}
          >
            {event.favorite ? "★ Saved" : "Add Favorite"}
          </button>

          <button
            className="remove-event-button"
            onClick={() => onRemove(event.id)}
          >
            Remove Event
          </button>
        </div>

      </div>
    </article>
  );
}

export default EventCard;
