import EventCard from "../EventCard/EventCard";
import "./EventList.css";

function EventList({
  events,
  onRegister,
  onCancel,
  onFavorite,
  onRemove,
}) {
  if (events.length === 0) {
    return (
      <div className="no-events">
        <h3>No Events Found</h3>
        <p>
          Try changing your search or category filter.
        </p>
      </div>
    );
  }

  return (
    <div className="event-list">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onRegister={onRegister}
          onCancel={onCancel}
          onFavorite={onFavorite}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}

export default EventList;
