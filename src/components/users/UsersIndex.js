//Import Dependencies
import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import { getAllGoals } from '../../api/goals'
//  api index function
import { getAllUsers } from '../../api/user'
import GoalEditModal from '../goals/GoalEditModal'
import messages from '../shared/AutoDismissAlert/messages'

const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const UsersIndex = (props) => {
    const [users, setUsers] = useState(null)
    const [error, setError] = useState(false)
    const [goals, setGoals] = useState(null)
    //props
    const { msgAlert } = props

    //whenn the component mounts
    useEffect(() => {
        //get all the users
        getAllUsers()
            //if success Users = data
            .then(res => setUsers(res.data.users))
            .then(
                getAllGoals()
                .then(res => setGoals(res.data.goals.reverse().filter(goal=>{
                return  goal.isPublic
                })))
                .catch(err => {
                    msgAlert({
                        heading: 'Error getting users',
                        message: messages.cmntCreateEr,
                        variant: 'danger'
                    })
                    //and error=true
                    setError(true)
                })
                )
            //if failed send message
            .catch(err => {
                msgAlert({
                    heading: 'Error getting users',
                    message: messages.cmntCreateEr,
                    variant: 'danger'
                })
                //and error=true
                setError(true)
            })
    }, [])


    console.log('goals in user index :', goals)
    //if (error) display "error"
    if (error) {
        return <p>Error...</p>
    }

    //if there are no users yet display loading msg
    if (!users) {
        return <p>...Loading...</p>
    } else if (users.length === 0) {
        // else if there are no users display msg
        return <p> No users yet... so lonely...</p>
    }

    let arrGoals


    //loop over the users
    const userCards = users.map(user => (
        <Card key={user.id} style={{ width: '90%', margin: '10px' }}>
            <Card.Header>{user.username}</Card.Header>
            <Card.Body>
                <Card.Text>
                    {/* <p>most recent goal added:</p><br/> */}
                   {/* {recentGoal(user.id)} */}
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <Link to={`/users/${user._id}`} className="btn btn-info">View {user.username}'s Profile</Link>
            </Card.Footer>
        </Card>
    ))
    //aah
    // return some jsx, a container with all the user cards
    return (
        <div className='container-md'>
            <h3>Users:</h3>
         {userCards}
        </div>
    )
}

//export component
export default UsersIndex


