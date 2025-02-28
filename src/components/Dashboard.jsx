import { useState, useEffect } from 'react';
import Modal from './Modal';
import Schedule from './Schedule';
import Notifications from './Notifications';
import Calendar from './Calendar';
import './Dashboard.css';

function Dashboard() {
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

  const [selectedPlant, setSelectedPlant] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    light: 'Medium',
    temperature: 20,
    moisture: 50
  });

  const [view, setView] = useState('list'); // 'list' or 'calendar'

  const getHealthStatus = (moisture) => {
    if (moisture >= 60) return 'good';
    if (moisture >= 40) return 'moderate';
    return 'poor';
  };

  const handleAddPlant = () => {
    setModalMode('add');
    setFormData({
      name: '',
      species: '',
      light: 'Medium',
      temperature: 20,
      moisture: 50
    });
    setIsModalOpen(true);
  };

  const handleEditPlant = () => {
    if (!selectedPlant) return;
    setModalMode('edit');
    setFormData({
      ...selectedPlant
    });
    setIsModalOpen(true);
  };

  const handleDeletePlant = () => {
    if (!selectedPlant) return;
    if (window.confirm('Are you sure you want to remove this plant?')) {
      setPlants(plants.filter(p => p.id !== selectedPlant.id));
      setSelectedPlant(null);
    }
  };

  const handleWaterPlant = () => {
    if (!selectedPlant) return;
    const updatedPlants = plants.map(p => {
      if (p.id === selectedPlant.id) {
        return {
          ...p,
          moisture: 100,
          lastWatered: new Date().toISOString().split('T')[0],
          health: 'Good'
        };
      }
      return p;
    });
    setPlants(updatedPlants);
    setSelectedPlant({ ...selectedPlant, moisture: 100, health: 'Good' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalMode === 'add') {
      const newPlant = {
        ...formData,
        id: Date.now(),
        health: getHealthStatus(formData.moisture),
        lastWatered: new Date().toISOString().split('T')[0]
      };
      setPlants([...plants, newPlant]);
    } else {
      const updatedPlants = plants.map(p => {
        if (p.id === selectedPlant.id) {
          const updatedPlant = {
            ...p,
            ...formData,
            health: getHealthStatus(formData.moisture)
          };
          setSelectedPlant(updatedPlant);
          return updatedPlant;
        }
        return p;
      });
      setPlants(updatedPlants);
    }
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
    <div className="dashboard">
      <Notifications schedules={schedules} />
      
      <div className="dashboard-header">
        <div className="header-left">
          <h2>Plant Monitor Dashboard</h2>
          <div className="view-toggle">
            <button 
              className={`toggle-btn ${view === 'list' ? 'active' : ''}`}
              onClick={() => setView('list')}
            >
              List View
            </button>
            <button 
              className={`toggle-btn ${view === 'calendar' ? 'active' : ''}`}
              onClick={() => setView('calendar')}
            >
              Calendar View
            </button>
          </div>
        </div>
        <button className="add-plant-btn" onClick={handleAddPlant}>+ Add New Plant</button>
      </div>

      {view === 'list' ? (
        <div className="dashboard-grid">
          <div className="plants-list">
            <h3>My Plants</h3>
            {plants.map(plant => (
              <div 
                key={plant.id} 
                className={`plant-card ${selectedPlant?.id === plant.id ? 'selected' : ''}`}
                onClick={() => setSelectedPlant(plant)}
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

          <div className="plant-details">
            {selectedPlant ? (
              <>
                <h3>{selectedPlant.name} Details</h3>
                <div className="metrics-grid">
                  <div className="metric-card">
                    <h4>Moisture Level</h4>
                    <p className="metric-value">{selectedPlant.moisture}%</p>
                  </div>
                  <div className="metric-card">
                    <h4>Light Level</h4>
                    <p className="metric-value">{selectedPlant.light}</p>
                  </div>
                  <div className="metric-card">
                    <h4>Temperature</h4>
                    <p className="metric-value">{selectedPlant.temperature}°C</p>
                  </div>
                </div>
                <div className="action-buttons">
                  <button className="action-btn water" onClick={handleWaterPlant}>Water Plant</button>
                  <button className="action-btn edit" onClick={handleEditPlant}>Edit Details</button>
                  <button className="action-btn delete" onClick={handleDeletePlant}>Remove Plant</button>
                </div>
                
                <Schedule 
                  plant={selectedPlant}
                  onScheduleUpdate={(schedules) => {
                    console.log('Schedules updated:', schedules);
                  }}
                />
              </>
            ) : (
              <div className="no-selection">
                <p>Select a plant to view details</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <Calendar schedules={schedules} />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalMode === 'add' ? 'Add New Plant' : 'Edit Plant'}
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
            <button type="submit" className="submit-btn">
              {modalMode === 'add' ? 'Add Plant' : 'Save Changes'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Dashboard; 