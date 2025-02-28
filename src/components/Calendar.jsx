import { useState } from 'react';
import './Calendar.css';

function Calendar({ schedules }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  const getTasksForDate = (date) => {
    return schedules.filter(schedule => {
      const taskDate = new Date(schedule.nextDue);
      return taskDate.toDateString() === date.toDateString();
    });
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const renderCalendarDays = () => {
    const days = [];
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const today = new Date();

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const tasks = getTasksForDate(date);
      const isToday = date.toDateString() === today.toDateString();
      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();

      days.push(
        <div
          key={day}
          className={`calendar-day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''} ${tasks.length > 0 ? 'has-tasks' : ''}`}
          onClick={() => setSelectedDate(date)}
        >
          <span className="day-number">{day}</span>
          {tasks.length > 0 && (
            <div className="task-indicators">
              {tasks.map((task, index) => (
                <span
                  key={index}
                  className={`task-dot ${task.type}`}
                  title={`${task.type} - ${task.name}`}
                ></span>
              ))}
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={() => navigateMonth(-1)}>&lt;</button>
        <h3>{formatDate(currentDate)}</h3>
        <button onClick={() => navigateMonth(1)}>&gt;</button>
      </div>

      <div className="calendar-weekdays">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="weekday">{day}</div>
        ))}
      </div>

      <div className="calendar-grid">
        {renderCalendarDays()}
      </div>

      {selectedDate && (
        <div className="selected-date-tasks">
          <h4>{selectedDate.toLocaleDateString('en-US', { 
            weekday: 'long',
            month: 'long',
            day: 'numeric'
          })}</h4>
          {getTasksForDate(selectedDate).length > 0 ? (
            <ul className="task-list">
              {getTasksForDate(selectedDate).map((task, index) => (
                <li key={index} className={`task-item ${task.type}`}>
                  <span className="task-type">{task.type}</span>
                  <span className="task-name">{task.name}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-tasks">No tasks scheduled for this day</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Calendar; 