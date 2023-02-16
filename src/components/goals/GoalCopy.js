import { createGoal } from '../../api/goals'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

const GoalCopy = (props) => {

    const { user, msgAlert, goal } = props

    // set up( pull our navigate function from useNavigate)
    const navigate = useNavigate()
    // console.log('this is navigate', navigate)

    const newGoal = {
        what: goal.what,
        type: goal.type,
        whenEnd: goal.whenEnd,
        why: goal.why,
        isComplete: false,
        completedDate: null,
        isPublic: goal.isPublic
    }

    const onSubmit = (e) => {
        e.preventDefault()
        // console.log('this is the goal', goal)
        createGoal(user, newGoal)
            // first we'll nav to the show page
            .then(res => { navigate(`/goals/${res.data.goal.id}`)})
            // we'll also send a success message
            .then(() => {
                msgAlert({
                    heading: 'Success!',
                    message: "Goal logged, let's do this!",
                    variant: 'success'
                })
            })
            // if there is an error, tell the user
            .catch(() => {
                msgAlert({
                    heading: 'Failure:',
                    message: 'Something went wrong, please try again!',
                    variant: 'danger'
                })
            })
    }

    return (
        <>
        <Form onSubmit={onSubmit} className='col-3'>
            <Button className='m-2' type='submit'>Copy</Button>
        </Form>
        </>
    )

}

export default GoalCopy