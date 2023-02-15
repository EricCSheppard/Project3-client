import { Card, Button } from 'react-bootstrap'
import { useState } from 'react'

const ShowCommentTwo = (props) => {
    const { comment, user, goal, msgAlert, triggerRefresh } = props
    // const [editModalShow, setEditModalShow] = useState(false)

    // const setBgStyle = (sty) => {
    //     if (sty === 'wood') {
    //         return({width: '18rem', backgroundColor: '#d1b073'})
    //     } else {
    //         return({width: '18rem', backgroundColor: '#969493'})
    //     }
    // }

    // const destroyBox = () => {
    //     deleteBox(user, mic.id, box._id)
    //         .then(() => {
    //             msgAlert({
    //                 heading: 'Box Deleted',
    //                 message: 'Box removed',
    //                 variant: 'success'
    //             })
    //         })
    //         .then(() => triggerRefresh())
    //         .catch(() => {
    //             msgAlert({
    //                 heading: 'Oh no.',
    //                 message: 'Something went wrong, please try again.',
    //                 variant: 'danger'
    //             })
    //         })
    // }

    console.log('the comment in ShowComment: ', comment)
    return (
        <>
            <Card>
                <Card.Header></Card.Header>
                <Card.Body>
                    {comment.note}
                </Card.Body>
                <Card.Footer>
                </Card.Footer>
            </Card>
        </>
    )
}

export default ShowCommentTwo