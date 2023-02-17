import { useState, useEffect } from "react";
import { Card, Button } from 'react-bootstrap'
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
            return ({ backgroundColor: 'lightblue' })
        } else if (cond == 'Finance') {
            return ({ backgroundColor: 'lightgreen' })
        } else if (cond == 'Health-Fitness') {
            return ({ backgroundColor: 'pink' })
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
                // setGoals(res.data.goals)
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

    // const handleChange = (e) => {
    //     e.preventDefault();
    //     setSearchInput(e.target.value);
    //     const searchedGoalsList = goals.filter(goal => {
    //         return goal.what.toLowerCase().includes(searchInput.toLowerCase())
    //     })
        
    //     setGoals(searchedGoalsList)
    // }
    

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
    const goalCards = goals.map(goal => (
        <Card key={goal.id} className="m-2" style={{ width: '90%' }}>
            <Card.Header style={setBgCondition(goal.type)}>
                <Card.Title>
                    { goal.owner && user && goal.owner._id === user._id ?
                    <p>I want to: {goal.what}</p>
                    :
                    <p>{goal.owner.username} wants to: {goal.what}</p>
                    }
                    {
            goal.isPublic 
            ?
            <></>
            :
            <img className='ms-1' src='/private.png' alt='private icon' width='24' height='24'></img>
                    }
                </Card.Title>
            </Card.Header>
            <Card.Body>

                <Card.Text>{goal.why}</Card.Text>
            </Card.Body>
                <Card.Footer>
                    <div className='row'>
                        <Link size='sm' to={`/goals/${goal._id}`} className="m-2 col-3 btn btn-info"style={{width: '60%'}}>Details
                        </Link>
                        {user && goal.owner._id !== user._id ?
                            <GoalCopy
                                user={user}
                                msgAlert={msgAlert}
                                goal={goal}
                            />
                            :
                            null
                        }
                    </div>
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
            {goalCards.splice(0).reverse()}
        </div>
    )
}

// once we have array of goals and loop over them 

export default GoalsIndex 