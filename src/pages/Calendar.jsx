import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from '../components/Calendar';
import './CalendarPage.css';

function CalendarPage() {
  const navigate = useNavigate();
  const [schedules, setSchedules] = useState([
    {
      id: 1,
      type: 'watering',
      plantId: 1,
      plantName: 'Snake Plant',
      nextDue: '2024-03-05'
    },
    {
      id: 2,
      type: 'fertilizing',
      plantId: 1,
      plantName: 'Snake Plant',
      nextDue: '2024-03-15'
    },
    {
      id: 3,
      type: 'watering',
      plantId: 2,
      plantName: 'Peace Lily',
      nextDue: '2024-03-03'
    }
  ]);

  const handleTaskClick = (taskId) => {
    const task = schedules.find(s => s.id === taskId);
    if (task) {
      navigate(`/plant/${task.plantId}`);
    }
  };

  return (
    <div className="calendar-page">
      <div className="page-header">
        <h1>Care Schedule</h1>
        <button className="view-plants-btn" onClick={() => navigate('/plants')}>
          View Plants
        </button>
      </div>

      <Calendar 
        schedules={schedules}
        onTaskClick={handleTaskClick}
      />
    </div>
  );
}

export default CalendarPage; 