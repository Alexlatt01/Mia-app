import { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Wind } from 'lucide-react';
import './ZenWidget.css';

function ZenWidget() {
  const [activeTab, setActiveTab] = useState('meditation'); // meditation | quotes
  const [meditationTime, setMeditationTime] = useState(5);
  const [timeLeft, setTimeLeft] = useState(meditationTime * 60);
  const [isActive, setIsActive] = useState(false);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  const quotes = [
    {
      text: "La calma è la virtù dei forti.",
      author: "Napoleon Bonaparte",
    },
    {
      text: "Nel silenzio puoi sentire la tua vera voce.",
      author: "Buddha",
    },
    {
      text: "La meditazione è il percorso verso il benessere.",
      author: "Dalai Lama",
    },
    {
      text: "Ogni giorno è un nuovo inizio. Prendilo con le mani aperte.",
      author: "Ralph Marston",
    },
    {
      text: "La pace nasce quando accetti quello che non puoi controllare.",
      author: "Seneca",
    },
    {
      text: "Il momento presente è un regalo. Per questo si chiama presente.",
      author: "Thich Nhat Hanh",
    },
  ];

  // Meditation timer
  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleMeditationTimeChange = (time) => {
    setMeditationTime(time);
    setTimeLeft(time * 60);
    setIsActive(false);
  };

  const nextQuote = () => {
    setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
  };

  const prevQuote = () => {
    setCurrentQuoteIndex((prev) => (prev - 1 + quotes.length) % quotes.length);
  };

  const currentQuote = quotes[currentQuoteIndex];

  return (
    <div className="zen-widget">
      <div className="zen-header">
        <Wind size={24} className="zen-icon" />
        <h3>Zona Zen</h3>
      </div>

      <div className="zen-tabs">
        <button
          className={`zen-tab ${activeTab === 'meditation' ? 'active' : ''}`}
          onClick={() => setActiveTab('meditation')}
        >
          Meditazione
        </button>
        <button
          className={`zen-tab ${activeTab === 'quotes' ? 'active' : ''}`}
          onClick={() => setActiveTab('quotes')}
        >
          Citazioni
        </button>
      </div>

      <div className="zen-content">
        {activeTab === 'meditation' ? (
          <div className="meditation-section">
            <div className="meditation-timer">
              <svg className="timer-circle" viewBox="0 0 200 200">
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  className="timer-progress"
                  style={{
                    strokeDasharray: `${
                      565 * (1 - timeLeft / (meditationTime * 60))
                    } 565`,
                  }}
                />
              </svg>
              <div className="timer-text">
                <p className="timer-time">{formatTime(timeLeft)}</p>
                <p className="timer-label">minuti</p>
              </div>
            </div>

            <div className="meditation-controls">
              <button
                className="control-btn"
                onClick={() => setIsActive(!isActive)}
              >
                {isActive ? <Pause size={20} /> : <Play size={20} />}
              </button>
            </div>

            <div className="time-presets">
              {[3, 5, 10, 15, 20].map((time) => (
                <button
                  key={time}
                  className={`preset-btn ${meditationTime === time ? 'active' : ''}`}
                  onClick={() => handleMeditationTimeChange(time)}
                  disabled={isActive}
                >
                  {time}m
                </button>
              ))}
            </div>

            <div className="meditation-tips">
              <p>💡 Suggerimento: Respira lentamente e profondamente.</p>
              <p>🎵 Prova a meditare con la musica ambientale.</p>
            </div>
          </div>
        ) : (
          <div className="quotes-section">
            <div className="quote-box">
              <p className="quote-text">"{currentQuote.text}"</p>
              <p className="quote-author">— {currentQuote.author}</p>
            </div>

            <div className="quote-controls">
              <button className="quote-btn" onClick={prevQuote}>
                <SkipBack size={20} />
              </button>
              <button className="quote-btn" onClick={nextQuote}>
                <SkipForward size={20} />
              </button>
            </div>

            <div className="quote-counter">
              {currentQuoteIndex + 1} / {quotes.length}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ZenWidget;
