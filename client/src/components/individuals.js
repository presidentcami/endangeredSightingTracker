import { useState, useEffect } from "react";
import Form from "./form";

function Individuals() {
  
  // this is my original state with an array of students 
  const [individuals, setIndividuals] = useState([]);


  useEffect(() => {
    fetch("http://localhost:8080/api/individuals")
      .then((response) => response.json())
      .then((individuals) => {
        setIndividuals(individuals);
          });
  }, []);

  const addStudent = (newIndividuals) => {
    //console.log(newStudent);
    //postStudent(newStudent);
    setIndividuals((individuals) => [...individuals, newIndividuals]);
  };


  return (
    <div className="students">
      <h2> List of Individual Animals </h2>
      <ul>
        {individuals.map((individual) => <li key={individual.id}> {individual.nickname} the {individual.commonname} </li>)}
      </ul>
      <Form saveStudent={addStudent} />
    </div>
  );
}

export default Individuals;
