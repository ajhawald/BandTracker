import React, { useState, useEffect } from 'react';
import { Music, Calendar, MapPin, Trash2 } from 'lucide-react';
import './App.css';

export default function App() {
  // Load bands from localStorage on startup
  const [bands, setBands] = useState(() => {
    const saved = localStorage.getItem("bands");
    return saved ? JSON.parse(saved) : [];
  });

  const [bandName, setBandName] = useState('');
  const [venue, setVenue] = useState('');
  const [date, setDate] = useState('');

  // Save bands to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("bands", JSON.stringify(bands));
  }, [bands]);

  const addBand = () => {
    if (bandName.trim()) {
      setBands([
        ...bands,
        {
          id: Date.now(),
          name: bandName,
          venue: venue || 'Not specified',
          date: date || 'Date not set',
        },
      ]);
      setBandName('');
      setVenue('');
      setDate('');
    }
  };

  const deleteBand = (id) => {
    setBands(bands.filter((band) => band.id !== id));
  };

  return (
    <div className="app-root">
      <div className="app-container">
        <header className="app-header">
          <div className="app-title-row">
            <Music className="app-title-icon" size={40} />
            <h1 className="app-title">Live Band Tracker</h1>
          </div>
          <p className="app-subtitle">
            Keep track of all the amazing bands you've seen live
          </p>
        </header>

        {/* Input Card */}
        <section className="card card-input">
          <div className="field">
            <label className="field-label">Band Name *</label>
            <input
              type="text"
              value={bandName}
              onChange={(e) => setBandName(e.target.value)}
              placeholder="Enter band name"
              className="text-input"
            />
          </div>

          <div className="fields-row">
            <div className="field">
              <label className="field-label">Venue</label>
              <input
                type="text"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                placeholder="Where did you see them?"
                className="text-input"
              />
            </div>

            <div className="field">
              <label className="field-label">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="date-input"
              />
            </div>
          </div>

          <button onClick={addBand} className="primary-button">
            Add Band
          </button>
        </section>

        {/* List Section */}
        <section className="list-section">
          {bands.length === 0 ? (
            <div className="card empty-state">
              <Music className="empty-icon" size={48} />
              <p className="empty-text">
                No bands logged yet. Add your first concert!
              </p>
            </div>
          ) : (
            <>
              <div className="count-text">
                <span className="count-number">{bands.length}</span>
                <span className="count-label">
                  band{bands.length !== 1 ? 's' : ''} seen live
                </span>
              </div>

              {bands.map((band) => (
                <div key={band.id} className="band-card">
                  <div className="band-main">
                    <h3 className="band-name">{band.name}</h3>

                    <div className="band-meta-row">
                      <MapPin size={16} />
                      <span>{band.venue}</span>
                    </div>

                    <div className="band-meta-row">
                      <Calendar size={16} />
                      <span>{band.date}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => deleteBand(band.id)}
                    className="delete-button"
                    aria-label={`Delete ${band.name}`}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </>
          )}
        </section>
      </div>
    </div>
  );
}
