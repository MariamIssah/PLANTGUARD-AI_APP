import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import './PlantList.css';

function PlantList() {
  const navigate = useNavigate();
  const [plants, setPlants] = useState([
    {
      id: 1,
      name: 'Snake Plant',
      species: 'Sansevieria trifasciata',
      health: 'Good',
      lastWatered: '2024-02-28',
      moisture: 65,
      light: 'Medium',
      temperature: 22,
    },
    {
      id: 2,
      name: 'Peace Lily',
      species: 'Spathiphyllum',
      health: 'Needs attention',
      lastWatered: '2024-02-26',
      moisture: 30,
      light: 'Low',
      temperature: 20,
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    light: 'Medium',
    temperature: 20,
    moisture: 50
  });

  const getHealthStatus = (moisture) => {
    if (moisture >= 60) return 'good';
    if (moisture >= 40) return 'moderate';
    return 'poor';
  };

  const handleAddPlant = () => {
    setFormData({
      name: '',
      species: '',
      light: 'Medium',
      temperature: 20,
      moisture: 50
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPlant = {
      ...formData,
      id: Date.now(),
      health: getHealthStatus(formData.moisture),
      lastWatered: new Date().toISOString().split('T')[0]
    };
    setPlants([...plants, newPlant]);
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="plant-list-page">
      <div className="page-header">
        <h1>My Plants</h1>
        <button className="add-plant-btn" onClick={handleAddPlant}>+ Add New Plant</button>
      </div>

      <div className="plants-grid">
        {plants.map(plant => (
          <div 
            key={plant.id} 
            className="plant-card"
            onClick={() => navigate(`/plant/${plant.id}`)}
          >
            <div className="plant-card-header">
              <h4>{plant.name}</h4>
              <span className={`health-status ${getHealthStatus(plant.moisture)}`}>
                {plant.health}
              </span>
            </div>
            <div className="plant-card-details">
              <p>Species: {plant.species}</p>
              <p>Last Watered: {plant.lastWatered}</p>
              <div className="moisture-bar">
                <div 
                  className="moisture-level"
                  style={{ width: `${plant.moisture}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Plant"
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
          <div className="form-group">
            <label htmlFor="moisture">Moisture Level (%)</label>
            <input
              type="number"
              id="moisture"
              name="moisture"
              value={formData.moisture}
              onChange={handleChange}
              min="0"
              max="100"
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="submit-btn">Add Plant</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default PlantList; 