import { useState } from "react";
import "./AddEventModal.css";

function AddEventModal({ onClose, onAdd }) {
  const [form, setForm] = useState({
    category: "TECH",
    title: "",
    description: "",
    date: "",
    venue: "",
  });

  const update = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const submit = (e) => {
    e.preventDefault();
    onAdd(form);
  };

  return (
    <div className="modal-overlay" onMouseDown={onClose}>
      <div
        className="modal-box"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <span className="eyebrow">
              EVENT MANAGEMENT
            </span>
            <h2>Add New Event</h2>
          </div>

          <button
            className="modal-close"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <form onSubmit={submit}>

          <label>
            Category
            <select
              value={form.category}
              onChange={(e) =>
                update("category", e.target.value)
              }
            >
              <option>TECH</option>
              <option>CULTURE</option>
              <option>WORKSHOP</option>
              <option>SPORTS</option>
              <option>CLUB</option>
            </select>
          </label>

          <label>
            Event Title
            <input
              required
              value={form.title}
              onChange={(e) =>
                update("title", e.target.value)
              }
              placeholder="Campus Hackathon 2026"
            />
          </label>

          <label>
            Description
            <textarea
              required
              value={form.description}
              onChange={(e) =>
                update("description", e.target.value)
              }
              placeholder="Event description"
            />
          </label>

          <label>
            Date
            <input
              required
              value={form.date}
              onChange={(e) =>
                update("date", e.target.value)
              }
              placeholder="November 20, 2026"
            />
          </label>

          <label>
            Venue
            <input
              required
              value={form.venue}
              onChange={(e) =>
                update("venue", e.target.value)
              }
              placeholder="Main Auditorium"
            />
          </label>

          <div className="modal-actions">
            <button
              type="button"
              className="modal-cancel"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="modal-submit"
            >
              Add Event
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default AddEventModal;
