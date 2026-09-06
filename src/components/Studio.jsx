import { useState } from 'react'
import {FaBrain} from "react-icons/fa";

function Studio() {
    const [minuti, setMinuti] = useState(0);

    function aumentaMinuti() {
        setMinuti(minuti + 1);
    }

    function resettaMinuti() {
        setMinuti(0);
    }


    return (
        <div className="card">
            <FaBrain className="icon" size={30} color="pink" />
            <h3>Sezione Studio</h3>
            <p className="minuti">Minuti studiati oggi: {minuti}</p>

            <button onClick={aumentaMinuti}>Aumenta Minuti</button>
            <button onClick={resettaMinuti}>Resetta Minuti</button>
           
        </div>
    )
}

export default Studio