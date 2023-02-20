import { markGoalComplete } from '../../api/goals'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

import messages from '../shared/AutoDismissAlert/messages'


const GoalMarkComplete = (props) => {

    const { goal, user, msgAlert } = props

    // set up( pull our navigate function from useNavigate)
    const navigate = useNavigate()
    // console.log('this is navigate', navigate)
    const goalId = goal.id
    const completeGoal = {
        isComplete: true,
        completedDate: Date.now()
    }

    const onSubmit = (e) => {
        e.preventDefault()
        // console.log('this is the goal', goal)
        markGoalComplete(user, completeGoal, goalId)
            // first we'll nav to the show page
            .then(res => { navigate(`/users/${user._id}`)})
            // we'll also send a success message
            .then(() => {
                msgAlert({
                    heading: 'Success!',
                    message: messages.goalCompleted,
                    variant: 'success'
                })
            })
            // if there is an error, tell the user
            .catch(() => {
                msgAlert({
                    heading: 'Failure:',
                    message: messages.goalCopyFailure,
                    variant: 'danger'
                })
            })
    }

    return (
        <>
        <Form className='col-3' onSubmit={onSubmit}>
            <Button className='mt-2' variant='success' type='submit'>✓</Button>
        </Form>
        </>
    )

}

export default GoalMarkComplete