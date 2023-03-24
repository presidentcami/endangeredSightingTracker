// import { library, icon } from '@fortawesome/fontawesome-svg-core'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faTrash as solidTrash } from '@fortawesome/free-solid-svg-icons'
import Button from '@mui/material/Button';


const DeleteButton = ({ id, setIndividuals }) => {

    // const { individual_id } = individuals;
    // console.log("id", id)
    const deleteRequest = async (e) => {
        // console.log(id)
        e.preventDefault()
        try {
            fetch(`http://localhost:8080/api/individual/${id}`, {
                method: "DELETE"
            })
                .then((response) => response.json())
                .then(individuals => {
                    setIndividuals(individuals);
                    console.log('individuals fetched when individual is deleted', individuals);
                })
            // console.log(deleteEvent)
        } catch (err) {
            console.err(err.message)
        }
    }

    return (
        <>
            <Button onClick={deleteRequest} variant={"outlined"}>Delete</Button> 
        </>
    )
}

export default DeleteButton;