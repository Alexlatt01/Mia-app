import { useState } from 'react';
import { Menu, Home, BarChart3, Brain, Settings, Bell, LogOut } from 'lucide-react';
import './Navbar.css';

function Navbar({ utente, onLogout, currentPage, onNavigate, notificationsCount = 0 }) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'ai-assistant', label: 'AI Assistant', icon: Brain },
    { id: 'settings', label: 'Impostazioni', icon: Settings },
  ];

  const handleNavClick = (pageId) => {
    onNavigate(pageId);
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <div className="brand-icon">✨</div>
          <h2>DashPro</h2>
        </div>

        <button className="nav-toggle" onClick={() => setIsOpen(!isOpen)}>
          <Menu size={24} />
        </button>

        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <li key={item.id}>
                <button
                  className={`nav-link ${currentPage === item.id ? 'active' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                >
                  <IconComponent size={20} />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="navbar-right">
          <button className="notification-bell" title="Notifiche">
            <Bell size={20} />
            {notificationsCount > 0 && (
              <span className="notification-badge">{notificationsCount}</span>
            )}
          </button>

          <div className="user-info">
            <span className="username">{utente}</span>
            <button className="logout-btn" onClick={onLogout} title="Logout">
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
