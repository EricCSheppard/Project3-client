import { useState, useEffect } from 'react'
import { getOneGoal, removeGoal, updateGoal } from '../../api/goals'
import { createComment, removeComment } from '../../api/comments'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Button } from 'react-bootstrap'
import GoalEditModal from './GoalEditModal'
import ShowComment from '../comments/ShowComment'
import CreateComment from '../comments/CreateComment'
import DaysLeftBar from '../shared/ProgressBar'
import GoalMarkComplete from './GoalMarkComplete'


const GoalShow = (props) => {
    const [goal, setGoal] = useState(null)
    const { id } = useParams()
    const navigate = useNavigate()
    // console.log(id)
    const [updated, setUpdated] = useState(false)
    const [editModalShow, setEditModalShow] = useState(false)

    const { user, msgAlert } = props
    console.log('user in GoalShow props', user)
    console.log('msgAlert in GoalShow props', msgAlert)

    useEffect(() => {
        getOneGoal(id)
            .then(res => {
                setGoal(res.data.goal)
            })
            .catch(err => {
                console.log('ERROR in goal show')
                msgAlert({
                    heading: 'Error getting goal',
                    message: 'something went wrong',
                    variant: 'danger'
                })
            })
    }, [updated])


    const setBgCondition = (cond) => {
        if (cond == 'Lifestyle') {
            return({width: '60%', backgroundColor: 'lightblue'})
        } else if (cond == 'Finance') {
            return({width: '60%', backgroundColor: 'lightgreen'})
        } else if (cond == 'Health-Fitness'){
            return({width: '60%', backgroundColor: 'pink'})
        }
    }

    const deleteGoal = () => {
        removeGoal(user, goal.id)
            // upon success, send the appropriate message and redirect users
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: "Goal successfully removed",
                    variant: 'success'
                })
            })
            .then(() => {navigate(`/users/${user._id}`)})
            // upon failure, just send a message, no navigation required
            .catch(err => {
                msgAlert({
                    heading: 'Error',
                    message: 'There has been an error, try again please',
                    variant: 'danger'
                })
            })
    }

    const renderDaysLeft = () => {
        if (goal.daysLeft > 1) {
            return 'days'
        } else if (goal.daysLeft === 1) {
            return 'day'
        } 
    }
    let commentCards
    if (goal) {
        if (goal.comments.length > 0) {
            commentCards = goal.comments.reverse().map(comment => (
                
                <ShowComment
                    key={comment.id}
                    comment={comment}
                    user={user}
                    goal={goal}
                    msgAlert={msgAlert}
                    triggerRefresh={() => setUpdated(prev => !prev)}
                />
                
            ))
        }
    }
    // console.log(commentCards)
    if(!goal){
        return <p>loading....</p>

    
}
// console.log(goal.comments)


    return (
        <>  
            
            <Container className="m-5">
                <Card style={setBgCondition(goal.type)}>
                    <Card.Header>{goal.what}</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <h4>{goal.why}</h4>
                            { goal.daysLeft && goal.daysLeft >= 0 && !goal.isComplete ? 
                            <>
                            <DaysLeftBar
                            goal={goal}
                            />
                            { goal.percentRemain <= 20 ? 
                            <small style={{color: 'red'}}>{goal.daysLeft} {renderDaysLeft()} left out of {goal.daysTotal} total</small>
                            :
                            <small>{goal.daysLeft} {renderDaysLeft()} left out of {goal.daysTotal} total</small>
                            }
                            </>
                            :
                            null
                            }
                            { goal.isComplete ?
                            <small style={{color: 'green'}}>Goal was finished in {goal.finishedDays} days!</small>
                            :
                            null
                            }
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <div className='row'>
                    {
                                goal.owner && user && goal.owner._id === user._id
                                ?
                                <>
                                    { !goal.isComplete ?
                                    <Button 
                                    className='m-2 col-3'
                                    variant='warning'
                                    onClick={() => setEditModalShow(true)}
                                    >
                                        Edit Goal
                                    </Button>
                                    :
                                    null
                                    }
                                    <Button 
                                        className="m-2 col-3" variant="danger"
                                        onClick={() => deleteGoal()}
                                    >
                                        Remove Goal
                                    </Button>
                                    { !goal.isComplete ?
                                    <GoalMarkComplete
                                        goal={goal}
                                        user={user}
                                        msgAlert={msgAlert}
                                    />
                                    :
                                    null
                                    }
                                    <br/>
                                </>
                                :
                                null
                            }
                            
                        {
            goal.isPublic 
            ?
            <></>
            :
            <span style={{color: "red"}}>PRIVATE</span>
        }
        </div>
                    </Card.Footer>
                </Card>
            </Container>
            <Container className='mt-4'>
                <p>Comments</p>

                <hr/>
                { user ?
                <CreateComment
                    goal={goal}
                    user={user}
                    msgAlert={msgAlert}
                    triggerRefresh={() => setUpdated(prev => !prev)}
                />
                :
                <small>Please log in to leave a comment</small>
                }
                <br/>
                <br/>
                { goal.comments.length > 0 ?
                <>
                {commentCards}
                </>
                :
                <small>No comments yet</small>
                }
            </Container>
            <GoalEditModal
            user={user}
            show={editModalShow}
            handleClose={() => setEditModalShow(false)}
            updateGoal={updateGoal}
            msgAlert={msgAlert}
            triggerRefresh={() => setUpdated(prev => !prev)}
            goal={goal}
            />
        </>
    )
}



export default GoalShow



