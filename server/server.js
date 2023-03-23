const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./db/db-connection.js');

const app = express();

const PORT = 8080;
app.use(cors());
app.use(express.json());

// creates an endpoint for the route /api
app.get('/', (req, res) => {
  res.json({ message: 'Hello from My template ExpressJS' });
});

// create the get request for the individuals with other info
app.get('/api/individuals', cors(), async (req, res) => {
 try {
   const { rows: individuals } = await db.query('SELECT * FROM individuals JOIN species ON species.species_id=individuals.species_id;');
   res.send(individuals);
  } catch (e) {
    return res.status(400).json({ e });
  } 
});  

app.get('/api/justindividuals', cors(), async (req, res) => {
  try {
    const { rows: individuals } = await db.query('SELECT * FROM individuals;');
    res.send(individuals);
  } catch (e) {
    return res.status(400).json({ e });
  }
});  

// get request for the species
app.get('/api/species', cors(), async (req, res) => {
  try {
    const { rows: species } = await db.query('SELECT * FROM species');
    res.send(species);
  } catch (e) {
    return res.status(400).json({ e });
  }
}); 

// create the POST request
app.post('/api/addto/individuals', cors(), async (req, res) => {
  const { nickname, commonname } = req.body;
  const speciesId = await db.query('SELECT species_id FROM species WHERE commonname=$1;', [commonname]) 
  console.log(nickname, commonname, speciesId);
  const result = await db.query(
    'INSERT INTO individuals(nickname, species_id) VALUES($1,$2) RETURNING *',
    [nickname, speciesId.rows[0].species_id]
  );
 
  let response = result.rows[0];
  const { rows: individuals } = await db.query('SELECT * FROM individuals JOIN species ON species.species_id=individuals.species_id;');
  res.send(individuals);
  // console.log(result.rows[0]);
  // res.json(result.rows[0]);
});


// post request to add to sightings api/addto/sightings/
//INSERT INTO sightings (sightingdate, location, healthy, email, individual_id) VALUES ('02-14-2023', 'Philadelphia', 'Yes', 'camiwills325@gmail.com', 1);
app.post('/api/addto/sightings', cors(), async (req, res) => {
  const {nickname, sightingdate, location, healthy, email } = req.body;
  const individualId = await db.query('SELECT individual_id FROM individuals WHERE nickname=$1;', [nickname])
  console.log("backend add to sightings nickname and id", nickname, individualId.rows[0].individual_id);
  const result = await db.query(
    'INSERT INTO sightings (sightingdate, location, healthy, email, individual_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [sightingdate, location, healthy, email, individualId.rows[0].individual_id]
  );

  let response = result.rows[0];
  const { rows: sightings } = await db.query(
    `SELECT sighting_id, sightingdate, location, healthy, email, nickname, commonname, scientificname, living, status FROM sightings 
      JOIN individuals ON sightings.individual_id=individuals.individual_id JOIN species ON individuals.species_id=species.species_id`);
  res.send(sightings);
  // console.log(result.rows[0]);
  // res.json(result.rows[0]);
});

//get sightings data

app.get('/api/sightings', cors(), async (req, res) => {
  try {
    const { rows: sightings } = await db.query(
      `SELECT sighting_id, sightingdate, location, healthy, email, nickname, commonname, scientificname, living, status FROM sightings 
      JOIN individuals ON sightings.individual_id=individuals.individual_id JOIN species ON individuals.species_id=species.species_id`);
    res.send(sightings);
  } catch (e) {
    return res.status(400).json({ e });
  }
});  

// delete an individual animal 

app.delete("/api/individual/:id", async (req, res) => {
  try {
    // console.log(req.params)
    const { id } = req.params;
    const deleteIndividual = await db.query("DELETE FROM individuals WHERE individual_id = $1", [id])
    // res.json("Event was deleted")

    const { rows: individuals } = await db.query('SELECT * FROM individuals JOIN species ON species.species_id=individuals.species_id;');
    res.send(individuals);
  } catch (error) {
    console.error(error.message)
  }
})

//A put request - Update a student 
// app.put('/api/students/:studentId', cors(), async (req, res) =>{
//   console.log(req.params);
//   //This will be the id that I want to find in the DB - the student to be updated
//   const studentId = req.params.studentId
//   const updatedStudent = { id: req.body.id, firstname: req.body.firstname, lastname: req.body.lastname}
//   console.log("In the server from the url - the student id", studentId);
//   console.log("In the server, from the react - the student to be edited", updatedStudent);
//   // UPDATE students SET lastname = "something" WHERE id="16";
//   const query = `UPDATE students SET lastname=$1, firstname=$2 WHERE id=${studentId} RETURNING *`;
//   const values = [updatedStudent.lastname, updatedStudent.firstname];
//   try {
//     const updated = await db.query(query, values);
//     console.log(updated.rows[0]);
//     res.send(updated.rows[0]);

//   }catch(e){
//     console.log(e);
//     return res.status(400).json({e})
//   }
// })



// console.log that your server is up and running
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
