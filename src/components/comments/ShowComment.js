import { Card, Button } from 'react-bootstrap'
// import { useState } from 'react'
import { removeComment } from '../../api/comments'

const ShowComment = (props) => {
    const { comment, user, goal, msgAlert, triggerRefresh } = props
    // const [editModalShow, setEditModalShow] = useState(false)

    // const setBgStyle = (sty) => {
    //     if (sty === 'wood') {
    //         return({width: '18rem', backgroundColor: '#d1b073'})
    //     } else {
    //         return({width: '18rem', backgroundColor: '#969493'})
    //     }
    // }

    const deleteComment = () => {
        removeComment(user, goal.id, comment._id)
            // upon success, send the appropriate message and redirect users
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: "Comment successfully removed",
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            // upon failure, just send a message, no navigation required
            .catch(err => {
                msgAlert({
                    heading: 'Error',
                    message: 'There has been an error, try again please',
                    variant: 'danger'
                })
            })
    }

    console.log('the comment in ShowComment: ', comment)
    return (
        <>
            <Card className='mt-2'>
                <Card.Header>{comment.owner.username} says:
                {
                                comment.owner && user && comment.owner._id === user._id
                                ?
                                <>
                                    <Button 
                                        size='sm' 
                                        className='ms-5' 
                                        variant='danger'
                                        onClick={() => deleteComment()}
                                    >
                                        X
                                    </Button>  <br />
                                </>
                                :
                                null
                            }
                </Card.Header>

                <Card.Body>
                    <Card.Text>
                    {comment.note}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                
                </Card.Footer>
            </Card>
        </>
    )
}

export default ShowComment