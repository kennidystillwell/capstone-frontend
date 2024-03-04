import React, { useState } from 'react';
import axios from 'axios';
import '../css/ResourceEvents.css';

const ResourcesPage = () => {
  const [events, setEvents] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [locationInput, setLocationInput] = useState('');

  const handleLocationChange = (e) => {
    setLocationInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:5000/resources', {
        params: {
          location: locationInput
        }
      });
          
      if (response.data.data) {
        // Filter out events with missing or empty descriptions
        const filteredEvents = response.data.data.filter(event => event.description);
        // Show only the top 6 events
        setEvents(filteredEvents.slice(0, 6));
        setErrorMessage('');
      } else if (response.data.message) {
        setEvents([]);
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setErrorMessage('An error occurred while fetching data');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="locationInput">Enter your city, state, or zipcode:</label>
          <input
            type="text"
            id="locationInput"
            value={locationInput}
            onChange={handleLocationChange}
            placeholder="E.g., New York, NY or 10001"
            required
          />
          <button type="submit">Search</button>
        </div>
      </form>
      {errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        <div className="event-container">
          {events.map((event, index) => (
            <div key={index} className="event-card">
            <h3>{event.title}</h3>
            <p>{event.location}</p>
            <p>{event.description}</p>
        </div>
        ))}
        </div>
      )}
    </div>
  );
};

export default ResourcesPage;
