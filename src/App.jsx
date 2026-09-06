import { useState, useEffect } from 'react'
import './App.css'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Registrazione from './pages/Registrazione'
import Analytics from './pages/Analytics'
import AIAssistant from './pages/AIAssistant'
import Navbar from './components/Navbar'
import NotificationCenter from './components/NotificationCenter'

function App() {
  const [utente, setUtente] = useState(null);
  const [pagina, setPagina] = useState('login');
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Check if user is already logged in
    const utenteLoggato = localStorage.getItem('utenteLoggato');
    if (utenteLoggato) {
      setUtente(utenteLoggato);
      setPagina('dashboard');
    }
  }, []);

  function handleLogout() {
    setUtente(null);
    setPagina('login');
    localStorage.removeItem('utenteLoggato');
    addNotification('Logout effettuato', 'Arrivederci!', 'success');
  }

  function handleLogin(nome) {
    setUtente(nome);
    setPagina('dashboard');
    localStorage.setItem('utenteLoggato', nome);
    addNotification('Benvenuto!', `Ciao ${nome}! 👋`, 'success');
  }

  function handleRegistrazione(utente) {
    setUtente(utente.email);
    setPagina('dashboard');
    localStorage.setItem('utenteLoggato', utente.email);
    addNotification('Account creato', 'Registrazione completata! 🎉', 'success');
  }

  function addNotification(title, message, type = 'info') {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, title, message, type }]);
  }

  function removeNotification(id) {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  }

  function handleNavigate(pageId) {
    setPagina(pageId);
  }

  return (
    <>
      {utente ? (
        <>
          <Navbar 
            utente={utente} 
            onLogout={handleLogout}
            currentPage={pagina}
            onNavigate={handleNavigate}
            notificationsCount={notifications.length}
          />
          <div className="main-content">
            {pagina === 'dashboard' && <Dashboard utente={utente} onLogout={handleLogout} />}
            {pagina === 'analytics' && <Analytics />}
            {pagina === 'ai-assistant' && <AIAssistant />}
          </div>
          <NotificationCenter 
            notifications={notifications}
            onRemove={removeNotification}
          />
        </>
      ) : pagina === 'login' ? (
        <Login 
          onLogin={handleLogin} 
          onRegistrati={() => setPagina('registrazione')} 
        />
      ) : (
        <Registrazione
          onRegistrazione={handleRegistrazione}
          onTornaLogin={() => setPagina('login')}
        />
      )}
    </>
  );
}

export default App
