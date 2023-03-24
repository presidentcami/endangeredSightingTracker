import { useReducer } from "react";

  // get event handling and submission set up, as well as post request INSERT INTO individuals (nickname, species_id)
// on submit set value to nickname input value and species_id based on species they selected
  const initialValue = {
    nickname: '',
    commonname: '',
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

const Form = ({ setIndividuals, individuals, species }) => {

// we need a fetch that gets the list of species that are currently in the table - 
// but not the individuals table, just the species table since there can only be one of each species
// done in parent of Form
  // console.log(individuals, species)

  const [state, dispatch] = useReducer(reducer, initialValue);

  const inputAction = (event) => {
    event.preventDefault();

    dispatch({
      type: 'add',
      payload: { key: event.target.name, value: event.target.value },
    });
    // console.log(initialValue)
  };

  console.log("species", species)

  // found this function via stackoverflow to sort my array of objects (species) by commonname so the drop down would display it properly
  species.sort(function (a, b) {
    var textA = a.commonname.toUpperCase();
    var textB = b.commonname.toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
  });

  //A function to handle the post request
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      fetch("http://localhost:8080/api/addto/individuals/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(state),
      })
        .then((response) => response.json())
        .then(individuals => {
          setIndividuals(individuals);
          console.log('Events fetched when new event is added', individuals);

        })
      // console.log(state)
      // window.location = "/"; 
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} id="individualsForm" >
      {/* <fieldset> */}
        <h3>Add a New Crystal Gem</h3>
        <label>Nickname</label>
        <input
          type="text"
          id="add-user-name"
          name="nickname"
          required
          value={individuals.nickname}
          onChange={inputAction}
        />
        <label>Gem</label>
        <select
          name="commonname"
          onChange={inputAction}
        >
          <option></option>
          {species.map((species) => 
          <option 
            key={species.species_id} 
            name="commonname" 
            // value={species.commonname}
          > 
          {species.commonname} 
          </option>) }
        </select>
        <button type="submit">Add</button>
      {/* </fieldset> */}
      
    </form>
  );
};

export default Form;
