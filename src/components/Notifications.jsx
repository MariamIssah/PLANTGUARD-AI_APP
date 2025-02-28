import { useState, useEffect } from 'react';
import './Notifications.css';

function Notifications({ schedules }) {
  const [notifications, setNotifications] = useState([]);
  const [permission, setPermission] = useState(Notification.permission);

  useEffect(() => {
    // Check for due tasks and create notifications
    const checkSchedules = () => {
      const today = new Date();
      const notifications = schedules.filter(schedule => {
        const dueDate = new Date(schedule.nextDue);
        const diffTime = dueDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 2; // Show notifications for tasks due within 2 days
      });
      setNotifications(notifications);
    };

    checkSchedules();
    const interval = setInterval(checkSchedules, 1800000); // Check every 30 minutes

    return () => clearInterval(interval);
  }, [schedules]);

  const requestNotificationPermission = async () => {
    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      if (result === 'granted') {
        showNotification('Notifications enabled!', 'You will now receive plant care alerts.');
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    }
  };

  const showNotification = (title, body) => {
    if (permission === 'granted') {
      new Notification(title, {
        body,
        icon: '/plant-icon.png', // Add a plant icon to your public folder
      });
    }
  };

  const handleDismiss = (taskId) => {
    setNotifications(notifications.filter(n => n.id !== taskId));
  };

  return (
    <div className="notifications-container">
      {permission !== 'granted' && (
        <div className="notification-permission">
          <p>Enable notifications to receive plant care alerts</p>
          <button onClick={requestNotificationPermission}>
            Enable Notifications
          </button>
        </div>
      )}
      
      <div className="notifications-list">
        {notifications.map(task => (
          <div key={task.id} className="notification-item">
            <div className="notification-content">
              <div className="notification-header">
                <h4>{task.type.charAt(0).toUpperCase() + task.type.slice(1)} Required</h4>
                <button 
                  className="dismiss-btn"
                  onClick={() => handleDismiss(task.id)}
                >
                  ×
                </button>
              </div>
              <p>Task is due {
                new Date(task.nextDue).toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric'
                })
              }</p>
            </div>
            <div className="notification-progress">
              <div 
                className="progress-bar"
                style={{
                  width: '100%',
                  animation: 'progress 30s linear'
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notifications; 