import { useEffect } from "react";
import Form from "./addIndividualForm";
import DeleteButton from "./deleteButton";


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
    <>
    <h2> Crystal Gems </h2>
    <div className="individuals">
        <div>
          <h3>See our newest crystal gems here!</h3>
    <table className=".indTableContainer">
      <thead>
        <tr>
          <th>Nickname</th>
          <th>Crystal Gem</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
            {individuals.map((individual) => 
            <tr key={individual.individual_id}> 
            <td>{individual.nickname}</td> 
            <td>{individual.commonname}</td> 
                <td><DeleteButton setIndividuals={setIndividuals} id={individual.individual_id} /></td></tr>)}
      </tbody>
    </table>
    </div>
      <Form setIndividuals={setIndividuals} individuals={individuals} species={species} />
    </div>
  </>
  );
}

export default Individuals;
