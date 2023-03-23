import "./App.css";
import { useState } from "react";
import Individuals from "./components/individuals";
import Sightings from "./components/sightingsTable";
import AddSighting from "./components/addSightingForm";

function App() {

  const [individuals, setIndividuals] = useState([]);
  const [species, setSpecies] = useState([]);

  return (
    <div className="App">
      Hello from Techtonica
      <Individuals individuals={individuals} setIndividuals={setIndividuals} species={species} setSpecies={setSpecies} />
      <AddSighting individuals={individuals} species={species} />
      <Sightings />
    </div>
  );
}

export default App;
