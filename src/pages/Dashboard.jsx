import Studio from '../components/Studio'
import Attivita from '../components/Attivita'
import Finanza from '../components/Finanza'
import ZenWidget from '../components/ZenWidget'
import './Dashboard.css'
import '../components/Studio.css'
import '../components/Attivita.css'
import '../components/Finanza.css'

function Dashboard({utente, onLogout}) {
  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <div className="dashboard-welcome">
          <h1>Benvenuto, <span className="username-highlight">{utente}</span>! 👋</h1>
          <p>Ecco il tuo riepilogo personale di oggi</p>
        </div>

        <div className="dashboard-grid">
          {/* Main Widgets */}
          <div className="widget-row">
            <div className="widget-item">
              <Studio />
            </div>
            <div className="widget-item">
              <Attivita />
            </div>
            <div className="widget-item">
              <Finanza />
            </div>
          </div>

          {/* Zen Widget */}
          <div className="widget-full">
            <ZenWidget />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard