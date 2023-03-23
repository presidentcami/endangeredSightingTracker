import "./App.css";
import { useState } from "react";
import Individuals from "./components/individuals";
import Sightings from "./components/sightingsTable";

function App() {

  const [individuals, setIndividuals] = useState([]);
  const [species, setSpecies] = useState([]);

  return (
    <div className="App">
      Hello from Techtonica
      <Individuals individuals={individuals} setIndividuals={setIndividuals} species={species} setSpecies={setSpecies} />
      <Sightings individuals={individuals} species={species}/>
    </div>
  );
}

export default App;
