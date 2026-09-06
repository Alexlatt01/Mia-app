import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { getStudyData, getFinanceData } from '../db/database';
import './Analytics.css';

function Analytics() {
  const [studyData, setStudyData] = useState([]);
  const [financeData, setFinanceData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const study = await getStudyData(7);
      const finance = await getFinanceData(30);

      // Aggregate study data by date
      const studyByDate = aggregateData(study, 'study_hours');
      setStudyData(studyByDate);

      // Aggregate finance data by date
      const financeByDate = aggregateData(finance, 'amount');
      setFinanceData(financeByDate);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const aggregateData = (data, valueKey) => {
    const aggregated = {};
    data.forEach((item) => {
      const date = new Date(item.date).toLocaleDateString('it-IT', {
        month: 'short',
        day: 'numeric',
      });
      if (!aggregated[date]) {
        aggregated[date] = 0;
      }
      aggregated[date] += item[valueKey] || 0;
    });
    return Object.entries(aggregated).map(([date, value]) => ({
      date,
      value: parseFloat(value.toFixed(2)),
    }));
  };

  const mockPieData = [
    { name: 'Categorie Studio', value: 40 },
    { name: 'Pausa', value: 30 },
    { name: 'Attività', value: 20 },
    { name: 'Relax', value: 10 },
  ];

  const COLORS = ['#8ed6ca', '#5fd4d4', '#42c8c8', '#2ebcbc'];

  if (loading) {
    return (
      <div className="analytics">
        <div className="loading">Caricamento dati...</div>
      </div>
    );
  }

  return (
    <div className="analytics">
      <div className="analytics-header">
        <h1>📊 Analytics & Statistiche</h1>
        <p>Analizza i tuoi progressi nel tempo</p>
      </div>

      <div className="analytics-grid">
        {/* Study Progress */}
        <div className="analytics-card">
          <h3>Progressi Studio (7 giorni)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={studyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="date" stroke="rgba(255,255,255,0.6)" />
              <YAxis stroke="rgba(255,255,255,0.6)" />
              <Tooltip
                contentStyle={{
                  background: 'rgba(0,0,0,0.7)',
                  border: '1px solid rgba(142,214,202,0.5)',
                  borderRadius: '8px',
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#8ed6ca"
                strokeWidth={3}
                dot={{ fill: '#8ed6ca', r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Finance Overview */}
        <div className="analytics-card">
          <h3>Spese (30 giorni)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={financeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="date" stroke="rgba(255,255,255,0.6)" />
              <YAxis stroke="rgba(255,255,255,0.6)" />
              <Tooltip
                contentStyle={{
                  background: 'rgba(0,0,0,0.7)',
                  border: '1px solid rgba(142,214,202,0.5)',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="value" fill="#5fd4d4" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Activity Distribution */}
        <div className="analytics-card full-width">
          <h3>Distribuzione Attività</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={mockPieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={80}
                fill="#8ed6ca"
                dataKey="value"
              >
                {mockPieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: 'rgba(0,0,0,0.7)',
                  border: '1px solid rgba(142,214,202,0.5)',
                  borderRadius: '8px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📚</div>
            <div className="stat-info">
              <p className="stat-label">Ore Studio</p>
              <p className="stat-value">
                {studyData.reduce((sum, item) => sum + item.value, 0).toFixed(1)}h
              </p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <div className="stat-info">
              <p className="stat-label">Spesa Totale</p>
              <p className="stat-value">
                €{financeData.reduce((sum, item) => sum + item.value, 0).toFixed(2)}
              </p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🎯</div>
            <div className="stat-info">
              <p className="stat-label">Giorni Attivi</p>
              <p className="stat-value">{studyData.length}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">⚡</div>
            <div className="stat-info">
              <p className="stat-label">Streak</p>
              <p className="stat-value">5</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
