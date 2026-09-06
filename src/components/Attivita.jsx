import { useState } from 'react'
import {FaCheckCircle} from "react-icons/fa";
import {FaTimesCircle} from "react-icons/fa";

function Attivita() {

   const [attivita, setAttivita] = useState(["Studiare React, Temperatura pc,"]);
   const [nuovaAttivita, setNuovaAttivita] = useState("");

    function aggiungi() {
    
  if (nuovaAttivita.trim() === "") return;

  setAttivita([...attivita, nuovaAttivita ]);
  setNuovaAttivita("");
}

 

    
    return (
        <div className="card">
          <FaCheckCircle className="icon" size={30} color="green" />
          <FaTimesCircle className="icon" size={30} color="red" />
            <h2>Sezione Attivita'</h2>
        

            <input className="input-attivita"
                    type="text" 
                    value={nuovaAttivita} 
                    onChange={(e) => setNuovaAttivita(e.target.value)} />

<button onClick={aggiungi}>Aggiungi</button>
<ul>
  {attivita.map((item, index) => (
    <li key={index}>{item}</li>
  ))}
</ul>


        </div>
    )
}

export default Attivita