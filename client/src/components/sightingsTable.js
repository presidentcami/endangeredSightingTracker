import { useState, useEffect } from 'react'
import AddSighting from './addSightingForm';

const Sightings = ({ individuals, species }) => {

    const [sightings, setSightings] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/sightings")
            .then((response) => response.json())
            .then((sightings) => {
                setSightings(sightings);
            });

    }, // eslint-disable-next-line
        []);
    // console.log("sightings", sightings)
    return (
        <>
        <div className='sightings'><AddSighting individuals={individuals} species={species} setSightings={setSightings} /></div>
        <table>
            <thead>
                <tr>
                    <th>Individual Seen</th>
                    <th>Animal Type</th>
                    <th>Date</th>
                    <th>Location</th>
                    <th>Healthy?</th>
                    <th>Scientists' Email</th>
                </tr>
            </thead>
            <tbody>
                {sightings.map((sighting) =>{
                    return (
                        <tr key={sighting.sighting_id}> 
                            <td> {sighting.nickname}</td> 
                            <td> {sighting.commonname}</td>
                            <td> {sighting.sightingdate}</td>
                            <td> {sighting.location}</td>
                            {sighting.healthy?<td>Yes</td>:<td>No</td>}   
                            <td> {sighting.email}</td>
                        </tr>)})}
                                        
                
            </tbody>
        </table>
    </>
  )
}

export default Sightings;