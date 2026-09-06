import {useState} from "react";
import './Registrazione.css';

function Registrazione({ onRegistrazione, onTornaLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleRegistrazione() {
        if (!email || !password)   return;
       
        const nuovoUtente = {
            email: email,
            password: password
        };
      localStorage.setItem("utente", JSON.stringify(nuovoUtente));

      onRegistrazione(nuovoUtente);
    }

    return (
        <div className="registration-page">
        <div className="registration-panel">
            <p className="registration-eyebrow">Area personale</p>
            <h2>Crea il tuo account</h2>
            <p className="registration-intro">Inserisci i tuoi dati per iniziare a usare l'app.</p>
            <div className="registration-form">
                <div className="registration-field">
                    <label htmlFor="registration-email">Email</label>
                    <input
                        id="registration-email"
                        type="email"
                        placeholder="nome@esempio.it"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="registration-field">
                    <label htmlFor="registration-password">Password</label>
                    <input
                        id="registration-password"
                        type="password"
                        placeholder="Inserisci una password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className="registration-submit" onClick={handleRegistrazione}>Registrati</button>
                <button className="registration-login-link" type="button" onClick={onTornaLogin}>
                    Hai già un account? Accedi
                </button>
            </div>
        </div>
        </div>
    );
}

export default Registrazione;