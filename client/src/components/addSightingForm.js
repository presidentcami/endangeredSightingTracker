import { useReducer } from "react";

// get event handling and submission set up, as well as post request INSERT INTO individuals (nickname, species_id)
// on submit set value to nickname input value and species_id based on species they selected
const initialValue = {
    nickname: '',
    sightingdate: '',
    location: '',
    healthy: '',
    email: ''
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'add':
            return {
                ...state,
                [action.payload.key]: action.payload.value,
            };
        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
};

const AddSighting = ({ individuals, setSightings }) => {
    
    // console.log(individuals)
    const [state, dispatch] = useReducer(reducer, initialValue);

    const inputAction = (event) => {
        event.preventDefault();

        dispatch({
            type: 'add',
            payload: { key: event.target.name, value: event.target.value },
        });
        // console.log(initialValue)
    };

    individuals.sort(function (a, b) {
        var textA = a.nickname.toUpperCase();
        var textB = b.nickname.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });

    //A function to handle the post request
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            fetch("http://localhost:8080/api/addto/sightings/", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(state),
            })
                .then((response) => response.json())
                .then(sightings => {
                    setSightings(sightings);
                    console.log('Sightings fetched when new sighting is added', sightings);
                })
            // console.log(state)
            // window.location = "/"; 
        } catch (error) {
            console.error(error.message)
        }
    }
    

    return (
        <form onSubmit={handleSubmit} id="addSightingForm" >
            {/* <fieldset> */}
                <h3>See a Crystal Gem out in the wild?</h3>
                <label>Nickname</label>
                <select
                    name="nickname"
                    onChange={inputAction}
                >
                    <option></option>
                    {individuals.map((individual) =>
                        <option
                            key={individual.individual_id}
                            name="nickname"
                        >
                            {individual.nickname}
                        </option>)}
                </select>
                <label>Date and Time of Sighting</label>
                <input
                    type="datetime-local"
                    id="sightingdate"
                    name="sightingdate"
                    onChange={inputAction}
                />
                <label>Location</label>
                <input
                    type="text"
                    id="location"
                    name="location"
                    onChange={inputAction}
                />
                <label>Healthy?</label>
                <select
                    name="healthy"
                    onChange={inputAction}
                >
                    <option></option>
                    <option>Yes</option>
                    <option>No</option>
                </select>
                <label>Your Email Address</label>
                <input 
                    type="text"
                    id="email"
                    name="email"
                    onChange={inputAction}
                />
                 <button type="submit">Add</button>
            {/* </fieldset> */}
           
        </form >
    );
}

export default AddSighting;
