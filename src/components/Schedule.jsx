import { useState } from 'react';
import './Schedule.css';

function Schedule({ plant, onScheduleUpdate }) {
  const [schedules, setSchedules] = useState([
    {
      id: 1,
      type: 'watering',
      frequency: 7, // days
      lastDone: new Date().toISOString().split('T')[0],
      nextDue: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    },
    {
      id: 2,
      type: 'fertilizing',
      frequency: 30, // days
      lastDone: new Date().toISOString().split('T')[0],
      nextDue: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    }
  ]);

  const [newSchedule, setNewSchedule] = useState({
    type: 'watering',
    frequency: 7
  });

  const calculateNextDue = (lastDone, frequency) => {
    const nextDate = new Date(lastDone);
    nextDate.setDate(nextDate.getDate() + parseInt(frequency));
    return nextDate.toISOString().split('T')[0];
  };

  const handleAddSchedule = (e) => {
    e.preventDefault();
    const today = new Date().toISOString().split('T')[0];
    const newTask = {
      id: Date.now(),
      ...newSchedule,
      lastDone: today,
      nextDue: calculateNextDue(today, newSchedule.frequency)
    };
    setSchedules([...schedules, newTask]);
    setNewSchedule({ type: 'watering', frequency: 7 });
  };

  const handleTaskComplete = (taskId) => {
    const today = new Date().toISOString().split('T')[0];
    const updatedSchedules = schedules.map(schedule => {
      if (schedule.id === taskId) {
        return {
          ...schedule,
          lastDone: today,
          nextDue: calculateNextDue(today, schedule.frequency)
        };
      }
      return schedule;
    });
    setSchedules(updatedSchedules);
    if (onScheduleUpdate) {
      onScheduleUpdate(updatedSchedules);
    }
  };

  const getDaysUntil = (date) => {
    const today = new Date();
    const dueDate = new Date(date);
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusClass = (daysUntil) => {
    if (daysUntil < 0) return 'overdue';
    if (daysUntil === 0) return 'due-today';
    if (daysUntil <= 2) return 'due-soon';
    return 'upcoming';
  };

  return (
    <div className="schedule-container">
      <div className="schedule-header">
        <h3>Care Schedule</h3>
        <form onSubmit={handleAddSchedule} className="add-schedule-form">
          <select
            value={newSchedule.type}
            onChange={(e) => setNewSchedule({ ...newSchedule, type: e.target.value })}
          >
            <option value="watering">Watering</option>
            <option value="fertilizing">Fertilizing</option>
            <option value="pruning">Pruning</option>
            <option value="rotating">Rotating</option>
          </select>
          <input
            type="number"
            min="1"
            max="365"
            value={newSchedule.frequency}
            onChange={(e) => setNewSchedule({ ...newSchedule, frequency: e.target.value })}
            placeholder="Days"
          />
          <button type="submit">Add Schedule</button>
        </form>
      </div>

      <div className="schedule-list">
        {schedules.map(schedule => {
          const daysUntil = getDaysUntil(schedule.nextDue);
          const statusClass = getStatusClass(daysUntil);
          
          return (
            <div key={schedule.id} className={`schedule-item ${statusClass}`}>
              <div className="schedule-info">
                <h4>{schedule.type.charAt(0).toUpperCase() + schedule.type.slice(1)}</h4>
                <p>Every {schedule.frequency} days</p>
                <p className="next-due">
                  {daysUntil === 0 ? 'Due today' :
                   daysUntil < 0 ? `Overdue by ${Math.abs(daysUntil)} days` :
                   `Due in ${daysUntil} days`}
                </p>
              </div>
              <button 
                className="complete-btn"
                onClick={() => handleTaskComplete(schedule.id)}
              >
                Mark Complete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Schedule; 