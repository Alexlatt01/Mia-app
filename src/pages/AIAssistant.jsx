import { useState, useRef, useEffect } from 'react';
import { Send, Loader, RefreshCw } from 'lucide-react';
import { addAIChat, getAIChats } from '../db/database';
import './AIAssistant.css';

function AIAssistant() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    loadChatHistory();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const loadChatHistory = async () => {
    try {
      const history = await getAIChats(20);
      setChatHistory(history.reverse());
      // Load first 5 messages into the UI
      const recentChats = history.slice(-5).map((chat) => [
        { role: 'user', content: chat.message },
        { role: 'assistant', content: chat.response },
      ]);
      const flatMessages = recentChats.flat();
      setMessages(flatMessages);
    } catch (error) {
      console.error('Error loading chat history:', error);
    }
  };

  const generateResponse = async (userMessage) => {
    // Simple AI responses based on keywords
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('ciao') || lowerMessage.includes('hello')) {
      return 'Ciao! 👋 Come posso aiutarti oggi? Puoi chiedermi di pianificare il tuo studio, gestire le finanze, o consigli di produttività.';
    } else if (
      lowerMessage.includes('studio') ||
      lowerMessage.includes('imparare')
    ) {
      return '📚 Ecco alcuni consigli per lo studio efficace:\n\n1. Usa la tecnica Pomodoro (25 min studio, 5 min pausa)\n2. Prendi appunti a mano\n3. Fai quiz per auto-valutarti\n4. Studia in un ambiente senza distrazioni\n\nVuoi pianificare una sessione di studio?';
    } else if (
      lowerMessage.includes('finanza') ||
      lowerMessage.includes('soldi')
    ) {
      return '💰 Consigli finanziari:\n\n1. Traccia tutte le tue spese\n2. Crea un budget mensile\n3. Distingui spese necessarie da opzionali\n4. Risparmia almeno il 20% delle entrate\n\nVuoi aggiungere una nuova spesa?';
    } else if (
      lowerMessage.includes('stress') ||
      lowerMessage.includes('ansia')
    ) {
      return '🧘 Per ridurre lo stress:\n\n1. Prova la meditazione (anche 5 minuti aiuta)\n2. Fai una passeggiata\n3. Respira profondamente\n4. Parla con qualcuno di fiducia\n\nDesideri avviare una sessione di meditazione?';
    } else if (
      lowerMessage.includes('attività') ||
      lowerMessage.includes('compito')
    ) {
      return '✅ Gestione attività:\n\n1. Prioritizza per importanza\n2. Dividi compiti grandi in sotto-compiti\n3. Stabilisci deadline realistiche\n4. Traccia il progresso\n\nVuoi aggiungere una nuova attività?';
    } else if (lowerMessage.includes('aiuto')) {
      return '🤖 Sono un assistente intelligente! Puoi chiedermi di:\n\n• Consigli di studio\n• Gestione finanze\n• Ridurre stress\n• Pianificare attività\n• Motivazione e produttività\n\nCosa desideri fare?';
    } else {
      return `Ho capito che stai chiedendo: "${userMessage}"\n\nPurtroppo non ho informazioni specifiche su questo argomento. Prova a chiedermi di: studio, finanze, stress, attività o motivazione!`;
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue;
    setInputValue('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const response = await generateResponse(userMessage);
      setMessages((prev) => [...prev, { role: 'assistant', content: response }]);
      // Save to database
      await addAIChat(userMessage, response);
    } catch (error) {
      console.error('Error generating response:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'Scusa, ho riscontrato un errore. Prova di nuovo più tardi.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="ai-assistant">
      <div className="ai-container">
        <div className="ai-header">
          <div className="ai-header-content">
            <h1>🤖 AI Assistant</h1>
            <p>Il tuo assistente personale per productività e benessere</p>
          </div>
          <button className="clear-btn" onClick={clearChat}>
            <RefreshCw size={20} />
          </button>
        </div>

        <div className="chat-messages">
          {messages.length === 0 ? (
            <div className="chat-welcome">
              <div className="welcome-icon">🤖</div>
              <h2>Benvenuto!</h2>
              <p>Sono il tuo assistente AI personale.</p>
              <p>Chiedi aiuto su studio, finanze, produttività o benessere!</p>
              <div className="quick-prompts">
                <button
                  className="quick-prompt"
                  onClick={() => setInputValue('Dammi consigli di studio')}
                >
                  📚 Consigli Studio
                </button>
                <button
                  className="quick-prompt"
                  onClick={() => setInputValue('Come gestisco le finanze?')}
                >
                  💰 Finanze
                </button>
                <button
                  className="quick-prompt"
                  onClick={() => setInputValue('Come ridurre lo stress?')}
                >
                  🧘 Ridurre Stress
                </button>
              </div>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div key={index} className={`message ${msg.role}`}>
                <div className="message-avatar">
                  {msg.role === 'user' ? '👤' : '🤖'}
                </div>
                <div className="message-bubble">
                  <p>{msg.content}</p>
                </div>
              </div>
            ))
          )}
          {loading && (
            <div className="message assistant">
              <div className="message-avatar">🤖</div>
              <div className="message-bubble loading">
                <Loader size={20} className="spinner" />
                <span>Sto pensando...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input-container">
          <textarea
            className="chat-input"
            placeholder="Chiedi aiuto... (premi Enter per inviare)"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            rows={2}
            disabled={loading}
          />
          <button
            className="send-btn"
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || loading}
          >
            <Send size={20} />
          </button>
        </div>

        <div className="ai-footer">
          <p>💡 Suggerimento: Fai domande specifiche per ottenere risposte migliori!</p>
        </div>
      </div>
    </div>
  );
}

export default AIAssistant;
