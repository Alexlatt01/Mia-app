import {useState} from "react";
import {FaEuroSign} from "react-icons/fa";

function Finanza() {
  const [guadagno, setGuadagno] = useState(0);
  const [spesa, setSpesa] = useState(0);
  const saldo = guadagno - spesa;
  const risparmioSettimanale = guadagno * 0.10;
  const formatEuro = (value) =>
    new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
    }).format(value);

  return (
    <div className="card">
      <div className="icons">
        <FaEuroSign className="icon" size={30} color="gold" />
      </div>
      <h2>Sezione Finanza</h2>
      <input type="number" placeholder="Guadagno" value={guadagno} onChange={(e) => setGuadagno(Number(e.target.value))} />
      <input type="number" placeholder="Spesa" value={spesa} onChange={(e) => setSpesa(Number(e.target.value))} />
      <p className="p">Il tuo saldo è: {formatEuro(saldo)}</p>
      <p>Risparmio settimanale consigliato: {formatEuro(risparmioSettimanale)}</p>
    </div>
  );
}

export default Finanza