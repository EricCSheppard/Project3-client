import { useState,useEffect } from "react";
import Card from 'react-bootstrap/Card'
import {Link} from 'react-router-dom'

//api function from our api file 
import { getAllGoals } from "../../api/goals";


// need our message from our autodissmissalert directory 

import message from '../shared/AutoDismissAlert/messages'

//GoalsIndex will make a request to the Api for all the goals
//

const GoalsIndex = (props) => {
    const [ goals, setGoals] =useState(null)
    const[error, setError] = useState(false)


    const{msgAlert} = props

    useEffect (() => {
        getAllGoals()
        .then(res =>setGoals (res.data.goals))
        
        .catch(err => {
            msgAlert ({
                heading:'Error getting goals',
                message:'could not find any goals',
                variant: 'danger'
            })
            setError(true)
        })


    },[]
    )

    if(error) {
        return <p> Error!</p>
    }
    if (!goals) {
        return <p> Please Wait </p>
    }else if (goals.length ===0){
        return <p> No Goals Yet Add One</p>
    }

    // returning some jsx 
    const goalCards = goals.map (goal => (
     <Card key={ goal.id}>
        <Card.Body>
            <Card.Text>{goal.what}</Card.Text>
        </Card.Body>
        </Card>
        ))
        return (
            <div className="container-md">
                {goalCards}
            </div>
        )
    }

    // once we have array of goals and loop over them 

export default GoalsIndex 