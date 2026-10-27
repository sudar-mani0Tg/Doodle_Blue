import { useMemo, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import EventList from "./components/EventList/EventList";
import AddEventModal from "./components/AddEventModal/AddEventModal";
import Footer from "./components/Footer/Footer";
import { initialEvents } from "./data/events";
import "./App.css";

function App() {
  const [events, setEvents] = useState(initialEvents);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const categories = useMemo(
    () => ["All", ...new Set(events.map((event) => event.category))],
    [events]
  );

  const filteredEvents = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return events.filter((event) => {
      const matchesSearch =
        keyword === "" ||
        event.title.toLowerCase().includes(keyword) ||
        event.description.toLowerCase().includes(keyword) ||
        event.venue.toLowerCase().includes(keyword);

      const matchesCategory =
        category === "All" || event.category === category;

      const matchesFavorite = !favoritesOnly || event.favorite;

      return matchesSearch && matchesCategory && matchesFavorite;
    });
  }, [events, search, category, favoritesOnly]);

  const registerEvent = (id) => {
    setEvents((current) =>
      current.map((event) =>
        event.id === id
          ? {
              ...event,
              registered: true,
              registrations: event.registrations + 1,
            }
          : event
      )
    );
  };

  const cancelRegistration = (id) => {
    setEvents((current) =>
      current.map((event) =>
        event.id === id
          ? {
              ...event,
              registered: false,
              registrations: Math.max(0, event.registrations - 1),
            }
          : event
      )
    );
  };

  const toggleFavorite = (id) => {
    setEvents((current) =>
      current.map((event) =>
        event.id === id
          ? { ...event, favorite: !event.favorite }
          : event
      )
    );
  };

  const removeEvent = (id) => {
    setEvents((current) =>
      current.filter((event) => event.id !== id)
    );
  };

  const addEvent = (newEvent) => {
    setEvents((current) => [
      {
        ...newEvent,
        id: crypto.randomUUID(),
        registrations: 0,
        registered: false,
        favorite: false,
      },
      ...current,
    ]);

    setShowModal(false);
  };

  return (
    <div className="app">
      <Navbar />

      <main>
        <Hero />

        <section className="events-section" id="events">
          <div className="container">

            <div className="section-heading">
              <div>
                <span className="eyebrow">
                  DISCOVER YOUR CAMPUS
                </span>

                <h2>Upcoming Events</h2>

                <p>
                  Find opportunities to learn, connect, and participate.
                </p>
              </div>

              <button
                className="primary-button"
                onClick={() => setShowModal(true)}
              >
                + Add Sample Event
              </button>
            </div>

            <div className="event-toolbar">

              <input
                className="search-input"
                type="text"
                placeholder="Search events..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item === "All"
                      ? "All Categories"
                      : item}
                  </option>
                ))}
              </select>

              <button
                className={`favorite-filter ${
                  favoritesOnly ? "active" : ""
                }`}
                onClick={() =>
                  setFavoritesOnly((value) => !value)
                }
              >
                ★ Favorites
              </button>
            </div>

            <EventList
              events={filteredEvents}
              onRegister={registerEvent}
              onCancel={cancelRegistration}
              onFavorite={toggleFavorite}
              onRemove={removeEvent}
            />

          </div>
        </section>

        <section className="about-section" id="about">
          <div className="container">
            <span className="eyebrow">
              ABOUT CAMPUSCONNECT
            </span>

            <h2>Your Campus. Your Community.</h2>

            <p>
              Discover events, connect with students, register
              for activities, and make the most of your campus
              experience.
            </p>
          </div>
        </section>
      </main>

      <Footer />

      {showModal && (
        <AddEventModal
          onClose={() => setShowModal(false)}
          onAdd={addEvent}
        />
      )}
    </div>
  );
}

export default App;
