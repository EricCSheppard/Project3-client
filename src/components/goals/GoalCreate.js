import { useState } from 'react'
import { createGoal } from '../../api/goals'
// import { createGoalSuccess, createGoalFailure } from'../shared/AutoDismissAlert/messages'
import GoalForm from '../shared/GoalForm'

import messages from '../shared/AutoDismissAlert/messages'


// bring in the useNavigate hook from react-router-dom
import { useNavigate } from 'react-router-dom'


const GoalCreate = (props) => {

    const { user, msgAlert, } = props

    // set up( pull our navigate function from useNavigate)
    const navigate = useNavigate()
    // console.log('this is navigate', navigate)

    const [goal, setGoal] = useState({
        what: '',
        type: '',
        whenEnd: null,
        why: '',
        isComplete: false,
        completedDate: null,
        isPublic: true
    })

    const onChange = (e) => {
        e.persist()

        setGoal(prevGoal => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            // if (e.target.type === 'number') {
            //     updatedValue = parseInt(e.target.value)
            // }

            // to handle a checkbox, we can check the name, and change the value that is output.  Checkboxes only know if they are checked or not
            if (updatedName === 'isPublic' && e.target.checked) {
                updatedValue = true
            } else if (updatedName === 'isPublic' && !e.target.checked) {
                updatedValue = false
            }
            
            const updatedGoal = {
                [updatedName] : updatedValue
            }
            return {
                ...prevGoal, ...updatedGoal
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        console.log('this is the goal', goal)
        createGoal(user, goal)
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
        <GoalForm
            goal={goal}
            handleChange={onChange}
            handleSubmit={onSubmit}
            heading='Add a new goal!'
        />
    )
}

export default GoalCreate