import { useState, useEffect } from 'react'
import { getOneGoal, removeGoal, updateGoal } from '../../api/goals'
import { useParams } from 'react-router-dom'
import { Container, Card, Button } from 'react-bootstrap'



const GoalShow = (props) => {
    const [goal, setGoal] = useState({})
    const { id } = useParams()
    // const navigate = useNavigate()
    // console.log(id)
    const [updated, setUpdated] = useState(false)

    const { user, msgAlert } = props
    console.log('user in GoalShow props', user)
    console.log('msgAlert in GoalShow props', msgAlert)

    useEffect(() => {
        getOneGoal(id)
            .then(res => {
                setGoal(res.data.goal)
                console.log('data of res: ', goal)
            })
            .catch(err => {
                console.log('ERROR in goal show')
                msgAlert({
                    heading: 'Error getting goal',
                    message: 'something went wrong',
                    variant: 'danger'
                })
            })
    }, [])

    // here's where our removeHome function will be called
    // const setGoalFree = () => {
    //     removeGoal(user, goal.id)
    //         // upon success, send the
    //         .then(() => {
    //             msgAlert({
    //                 heading: 'Success',
    //                 message: messages.removeGoalSuccess,
    //                 variant: 'success'
    //             })
    //         })
    //         .then(() => {navigate('/')})
    //         // upon failure, just send a message, no navigation required
    //         .catch(err => {
    //             msgAlert({
    //                 heading: 'Error',
    //                 message: messages.removeGaolFailure,
    //                 variant: 'danger'
    //             })
    //         })
    // }

    return (

        <Container className="m-2">
            <Card>
                <Card.Header>{goal.what}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <div><small>{goal.why}</small></div>


                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <small>- {goal.owner.username}</small>
                </Card.Footer>
            </Card>
        </Container>


    )
}



export default GoalShow



