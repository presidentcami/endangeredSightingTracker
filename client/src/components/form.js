import { useState } from "react";

const Form = ({ saveStudent, individuals, species }) => {

// we need a fetch that gets the list of species that are currently in the table - 
// but not the individuals table, just the species table since there can only be one of each species
// done in parent of Form
  console.log(individuals, species)


  // const {initialStudent = {id: null, 
  //                         firstname: "", 
  //                       lastname: ""}} = props;


  // This is the oroginal State with not initial student 
  // const [student, setStudent] = useState(initialStudent);

  //create functions that handle the event of the user typing into the form
  // const handleNameChange = (event) => {
  //   const firstname = event.target.value;
  //   setStudent((student) => ({ ...student, firstname }));
  // };

  // const handleLastnameChange = (event) => {
  //   const lastname = event.target.value;
  //   setStudent((student) => ({ ...student, lastname }));
  // };

  //A function to handle the post request
  // const postStudent = (newStudent) => {
  //   return fetch("http://localhost:8080/api/students", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(newStudent),
  //   })
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log("From the post ", data);
  //       saveStudent(data);
  //     });
  // };

    //A function to handle the Update request
  //   const updateStudent = (existingStudent) =>{
  //     return fetch(`http://localhost:8080/api/students/${existingStudent.id}`, {
  //         method: 'PUT',
  //         headers: {'Content-Type': 'application/json'}, 
  //         body: JSON.stringify(existingStudent)
  //       }).then((response) => {
  //           return response.json()
  //       }).then((data) => {
  //         console.log("From put request ", data);
  //         props.saveStudent(data);
  //     });

  // }


  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if(student.id){
  //     updateStudent(student);
  //   } else{
  //     postStudent(student);
  //   }
    
  // };

  return (
    <form >
      {/* onSubmit={handleSubmit} */}
      <fieldset>
        <label>Nickname</label>
        <input
          type="text"
          id="add-user-name"
          placeholder="First Name"
          required
          value={individuals.nickname}
          // onChange={handleNameChange}
        />
        <label>Animal</label>
        <select>
        {species.map((species) => {
          // const animalName = new Set(individual.commonname)
          return ( <option key={species.individual_id}> {species.commonname} </option>) }
        )
      
      }
</select>
        
        {/* </select> */}
      </fieldset>
      {/* <button type="submit">{!student.id ? "ADD": "SAVE"}</button> */}
    </form>
  );
};

export default Form;
