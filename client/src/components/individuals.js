import { useState, useEffect } from "react";
import Form from "./form";

function Individuals() {
  
  // this is my original state with an array of students 
  const [individuals, setIndividuals] = useState([]);
  const [species, setSpecies] = useState([]);


  useEffect(() => {
    fetch("http://localhost:8080/api/individuals")
      .then((response) => response.json())
      .then((individuals) => {
        setIndividuals(individuals);
          });

    fetch("http://localhost:8080/api/species")
      .then((response) => response.json())
      .then((species) => {
        setSpecies(species);
      });

    
  }, []);

  const addIndividuals = (newIndividuals) => {
    //console.log(newStudent);
    //postStudent(newStudent);
    setIndividuals((individuals) => [...individuals, newIndividuals]);
  };
console.log("from individuals.js", individuals)

  return (
    <div className="students">
      <h2> List of Individual Animals </h2>
      <ul>
        {individuals.map((individual) => <li key={individual.individual_id}> {individual.nickname} the {individual.commonname} </li>)}
      </ul>
      <Form setIndividuals={addIndividuals} individuals={individuals} species={species} />
    </div>
  );
}

export default Individuals;
