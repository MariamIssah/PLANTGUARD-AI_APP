import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Schedule from '../components/Schedule';
import Modal from '../components/Modal';
import './PlantDetails.css';

function PlantDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plant, setPlant] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);

  // Simulated data fetch - replace with actual API call
  useEffect(() => {
    // Mock data - replace with actual data fetching
    const mockPlant = {
      id: 1,
      name: 'Snake Plant',
      species: 'Sansevieria trifasciata',
      health: 'Good',
      lastWatered: '2024-02-28',
      moisture: 65,
      light: 'Medium',
      temperature: 22,
    };
    setPlant(mockPlant);
    setFormData(mockPlant);
  }, [id]);

  const handleWaterPlant = () => {
    setPlant(prev => ({
      ...prev,
      moisture: 100,
      lastWatered: new Date().toISOString().split('T')[0],
      health: 'Good'
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to remove this plant?')) {
      // Delete logic here
      navigate('/plants');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlant(formData);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!plant) return <div>Loading...</div>;

  return (
    <div className="plant-details-page">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate('/plants')}>
          &larr; Back to Plants
        </button>
        <h1>{plant.name}</h1>
      </div>

      <div className="details-grid">
        <div className="main-info">
          <div className="metrics-grid">
            <div className="metric-card">
              <h4>Moisture Level</h4>
              <p className="metric-value">{plant.moisture}%</p>
            </div>
            <div className="metric-card">
              <h4>Light Level</h4>
              <p className="metric-value">{plant.light}</p>
            </div>
            <div className="metric-card">
              <h4>Temperature</h4>
              <p className="metric-value">{plant.temperature}°C</p>
            </div>
          </div>

          <div className="action-buttons">
            <button className="action-btn water" onClick={handleWaterPlant}>
              Water Plant
            </button>
            <button className="action-btn edit" onClick={handleEdit}>
              Edit Details
            </button>
            <button className="action-btn delete" onClick={handleDelete}>
              Remove Plant
            </button>
          </div>
        </div>

        <Schedule plant={plant} />
      </div>

      <Modal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        title="Edit Plant Details"
      >
        <form onSubmit={handleSubmit} className="plant-form">
          <div className="form-group">
            <label htmlFor="name">Plant Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="species">Species</label>
            <input
              type="text"
              id="species"
              name="species"
              value={formData.species}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="light">Light Level</label>
            <select
              id="light"
              name="light"
              value={formData.light}
              onChange={handleChange}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="temperature">Temperature (°C)</label>
            <input
              type="number"
              id="temperature"
              name="temperature"
              value={formData.temperature}
              onChange={handleChange}
              min="0"
              max="40"
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="submit-btn">Save Changes</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default PlantDetails; 