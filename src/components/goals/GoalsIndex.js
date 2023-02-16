import { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import SearchBar from "../shared/SearchBar";

//api function from our api file 
import { getAllGoals } from "../../api/goals";
import GoalCopy from "./GoalCopy";


// need our message from our autodissmissalert directory 

import message from '../shared/AutoDismissAlert/messages'
import UsersIndex from "../users/UsersIndex";

//GoalsIndex will make a request to the Api for all the goals
const GoalsIndex = (props) => {
    const [goals, setGoals] = useState(null)
    const [error, setError] = useState(false)
    const [searchInput, setSearchInput] = useState("")

    const { msgAlert, profileId, user, isCompleted } = props
    // console.log('user prop: ',user)

    const setBgCondition = (cond) => {
        if (cond == 'Lifestyle') {
            return ({ width: '24rem', backgroundColor: 'lightblue' })
        } else if (cond == 'Finance') {
            return ({ width: '24rem', backgroundColor: 'lightgreen' })
        } else if (cond == 'Health-Fitness') {
            return ({ width: '24rem', backgroundColor: 'pink' })
        }
    }

    useEffect(() => {
        getAllGoals()
            .then(res => {
                let pubGoals = res.data.goals.filter(goal => goal.isPublic || (user && !goal.isPublic && goal.owner._id === user._id))
                // pubGoals = pubGoals.filter(goal => {
                //     return goal.what.toLowerCase().includes(searchInput.toLowerCase()
                //     )
                // })
                if (isCompleted) {
                    const completedGoals = pubGoals.filter(goal => goal.isComplete)
                    if (profileId) {
                        const filteredGoals = completedGoals.filter(goal => goal.owner._id === profileId)
                        setGoals(filteredGoals)
                    } else {
                        setGoals(completedGoals)
                    }
                } else {
                    const incompleteGoals = pubGoals.filter(goal => !goal.isComplete)
                    if (profileId) {
                        const filteredGoals = incompleteGoals.filter(goal => goal.owner._id === profileId)
                        setGoals(filteredGoals)
                    } else {
                        setGoals(incompleteGoals)
                    }
                }
            })
            .catch(err => {
                msgAlert({
                    heading: 'Error getting goals',
                    message: 'could not find any goals',
                    variant: 'danger'
                })
                setError(true)
            })
    }, []
    )

    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
        const searchedGoalsList = goals.filter(goal => {
            return goal.what.toLowerCase().includes(searchInput.toLowerCase())
        })
        // setGoals(searchedGoalsList)
    };

    console.log('searchInput: ', searchInput)
    console.log('goals: ', { goals })

    if (error) {
        return <p> Error!</p>
    }
    if (!goals) {
        return <p> Please Wait </p>
    } else if (goals.length === 0) {
        if (isCompleted) {
            return <p> Keep working! </p>
        } else {
            return <p>No Goals yet, go add some!</p>
        }
    }

    // returning some jsx 
    const goalCards = goals.splice(0).reverse().map(goal => (
        <Card key={goal.id} className="m-2" style={setBgCondition(goal.type)}>
            <Card.Header>{goal.what} - <small>{goal.id}</small> {
                goal.isPublic
                    ?
                    <></>
                    :
                    <span style={{ color: "red" }}>PRIVATE</span>
            }
            </Card.Header>
            <Card.Body>

                <Card.Text>{goal.why}</Card.Text>
            </Card.Body>
            <Card.Footer><small>Owner: {goal.owner.username}</small><Link to={`/goals/${goal._id}`} className="btn btn-info m-2">View Goal Info</Link>
                {user && goal.owner._id !== user._id ?
                    <GoalCopy
                        user={user}
                        msgAlert={msgAlert}
                        goal={goal}
                    />
                    :
                    null
                }
            </Card.Footer>
        </Card>
    ))

    return (
        <div className="container-md">
            {/* {profileId ?
                null
                :
                <SearchBar
                    onChange={handleChange}
                    value={searchInput}
                />
            } */}
            {goalCards}
        </div>
    )
}

// once we have array of goals and loop over them 

export default GoalsIndex 