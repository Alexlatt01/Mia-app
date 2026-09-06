import {useState} from 'react';
import './Login.css';

function Login({ onLogin, onRegistrati }) {
    const [nome, setNome] = useState("");
    
    function handleLogin() {
        if (nome.trim() === "") return;
        onLogin(nome);
    }

    

    return (
        <div className="Background">
        <div className="glass-box">
            
            
            <h2>Accedi</h2> 

            <input
                type="text"
                placeholder="Inserisci il tuo nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
            />
            <button onClick={handleLogin}>Accedi</button>
            <p className="link">
                Non hai un account? <button type="button" onClick={onRegistrati}>Registrati</button>
            </p>
        </div>
        </div>
    );
        }

    export default Login;
  
