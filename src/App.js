import './App.css';
import { useState, useEffect } from 'react';

function App() {

  const [term, setTerm] = useState("")
  const [consejo, setConsejo] = useState("")
  const [consejos, setConsejos] = useState([])
  const handleTermChange = (event) => setTerm(event.target.value);
  const obtenerConsejo = () => {
    fetch("https://api.adviceslip.com/advice")
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        else {
          throw new ("Error")
        }
      })
      .then(data => setConsejo(data["slip"].advice))
      .catch(error => alert("Error:" + error))
  }
  const obtenerConsejos = () => {
    fetch("https://api.adviceslip.com/advice/search/" + term)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        else {
          throw new ("Error")
        }
      })
      .then(data => {
        if (data["slips"]) {
          setConsejos(data["slips"])
        }
        else {
          alert("No se encontraron resultados")
        }
      })
      .catch(error => alert("Error:" + error))
  }
  useEffect(() => {
    obtenerConsejo()
  }, consejo === "")
  return (
    <main>

      <h1>Evaluación React - Requests</h1>
      <h1>Consejos de vida</h1>

      <div>
        <h2>Obtener un consejo aleatorio</h2>
        <button onClick={obtenerConsejo}>Obtener</button>
        <p className="result-box">{consejo}</p>
      </div>

      <div>
        <h2>Buscar un consejo</h2>
        <input type="text" onChange={handleTermChange} />
        <button onClick={obtenerConsejos}>Enviar</button>
        <h3>Resultados de búsqueda:</h3>
        <p className="result-box">{consejos.map((consejo) => <p>{consejo["advice"]}</p>)}</p>
      </div>

    </main>
  );
}

export default App;
