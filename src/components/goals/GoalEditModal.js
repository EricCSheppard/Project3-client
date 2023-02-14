import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import GoalForm from '../shared/GoalForm'
import messages from '../shared/AutoDismissAlert/messages'

const GoalEditModal = (props) => {
    // destructure our props
    const { user, show, handleClose, updateGoal, msgAlert, triggerRefresh } = props

    const [goal, setGoal] = useState(props.goal)

    const onChange = (e) => {
        e.persist()

        setGoal(prevGoal => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

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
        updateGoal(user, goal)
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Success!',
                    message: 'Goal updated!',
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch(() => {
                msgAlert({
                    heading: 'Failure',
                    message: 'Something went wrong, try again!',
                    variant: 'danger'
                })
            })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <GoalForm 
                    goal={goal} 
                    handleChange={onChange}
                    handleSubmit={onSubmit}
                    heading='Update Goal'
                    /> 
            </Modal.Body>
        </Modal>
    )
}

export default GoalEditModal