import { useState, useEffect } from 'react'
import { getOneGoal, removeGoal, updateGoal } from '../../api/goals'
import { createComment, removeComment } from '../../api/comments'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Button } from 'react-bootstrap'
import GoalEditModal from './GoalEditModal'
import ShowComment from '../comments/ShowComment'
import CreateComment from '../comments/CreateComment'


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
            .then(() => {navigate('/')})
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
            commentCards = goal.comments.map(comment => (
                
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
    console.log(commentCards)
    if(!goal){
        return <p>loading....</p>
}
// console.log(goal.comments)

// console.log('Goal after useEffect(): \n', goal)
    return (
        <>  
            
            <Container className="m-5">
                <Card>
                    <Card.Header>{goal.what}</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <small>{goal.why}</small>
                            { goal.daysLeft && goal.daysLeft >= 0 ? 
                            <>
                            <br/>
                            { goal.daysLeft <= 7 ? 
                            <small style={{color: 'red'}}>{goal.daysLeft} {renderDaysLeft()} left!</small>
                            :
                            <small>{goal.daysLeft} {renderDaysLeft()} left!</small>
                            }
                            </>
                            :
                            null
                            }
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                    {
                                goal.owner && user && goal.owner._id === user._id
                                ?
                                <>
                                    <Button 
                                    className='m-2'
                                    variant='warning'
                                    onClick={() => setEditModalShow(true)}
                                    >
                                        Edit Goal
                                    </Button>
                                    <Button 
                                        className="m-2" variant="danger"
                                        onClick={() => deleteGoal()}
                                    >
                                        Remove Goal
                                    </Button>  <br />
                                </>
                                :
                                null
                            }
                            
                        <small>User: {goal.owner.username}</small>
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



