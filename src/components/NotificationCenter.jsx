import { X } from 'lucide-react';
import './NotificationCenter.css';

function NotificationCenter({ notifications, onRemove }) {
  return (
    <div className="notification-container">
      {notifications.map((notif) => (
        <div
          key={notif.id}
          className={`notification toast ${notif.type}`}
          style={{ animation: `slideIn 0.3s ease forwards` }}
        >
          <div className="notification-content">
            <span className="notification-icon">
              {notif.type === 'success' && '✓'}
              {notif.type === 'error' && '✕'}
              {notif.type === 'info' && 'ℹ'}
              {notif.type === 'warning' && '⚠'}
            </span>
            <div className="notification-text">
              <p className="notification-title">{notif.title}</p>
              {notif.message && (
                <p className="notification-message">{notif.message}</p>
              )}
            </div>
          </div>
          <button
            className="notification-close"
            onClick={() => onRemove(notif.id)}
          >
            <X size={18} />
          </button>
          <div className="notification-progress"></div>
        </div>
      ))}
    </div>
  );
}

export default NotificationCenter;
