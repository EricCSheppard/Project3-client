import { useState } from 'react'
import { createComment } from '../../api/comments'
// import { createGoalSuccess, createGoalFailure } from'../shared/AutoDismissAlert/messages'
import CommentForm from '../shared/CommentForm'

// bring in the useNavigate hook from react-router-dom
import { useNavigate } from 'react-router-dom'


const CreateComment = (props) => {

    const { user, goal, msgAlert, triggerRefresh } = props

    const goalId = goal.id

    // set up( pull our navigate function from useNavigate)
    const navigate = useNavigate()
    // console.log('this is navigate', navigate)

    const [comment, setComment] = useState({
        note: ''
    })

    const onChange = (e) => {
        e.persist()

        setComment(prevComment => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            // if (e.target.type === 'number') {
            //     updatedValue = parseInt(e.target.value)
            // }

            // to handle a checkbox, we can check the name, and change the value that is output.  Checkboxes only know if they are checked or not
            
            const updatedComment = {
                [updatedName] : updatedValue
            }
            return {
                ...prevComment, ...updatedComment
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        console.log('this is the comment', comment)
        createComment(user, goalId, comment)
            // first we'll nav to the show page
            .then(() => triggerRefresh())
            // we'll also send a success message
            // .then(() => {
            //     msgAlert({
            //         heading: 'Success!',
            //         message: 'Comment created',
            //         variant: 'success'
            //     })
            // })
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
        <CommentForm
            comment={comment}
            handleChange={onChange}
            handleSubmit={onSubmit}
            // heading='Add a new comment.'
        />
    )
}

export default CreateComment