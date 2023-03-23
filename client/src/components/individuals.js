import { useEffect } from "react";
import Form from "./addIndividualForm";

function Individuals({ individuals, setIndividuals, species, setSpecies }) {
  



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

    
  }, // eslint-disable-next-line
  []);

console.log("from individuals.js", individuals)

  return (
    <div className="students">
      <h2> List of Individual Animals </h2>
      <ul>
        {individuals.map((individual) => <li key={individual.individual_id}> {individual.nickname} the {individual.commonname} </li>)}
      </ul>
      <Form setIndividuals={setIndividuals} individuals={individuals} species={species} />
    </div>
  );
}

export default Individuals;
