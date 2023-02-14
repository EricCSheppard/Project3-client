//Import Dependencies
import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
//  api index function
import { getAllUsers } from '../../api/user'
import messages from '../shared/AutoDismissAlert/messages'

const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const UsersIndex = (props) => {
    const [users, setUsers] = useState(null)
    const [error, setError]= useState(false)
    //props
    const { msgAlert } = props

    //whenn the component mounts
    useEffect(() => {
        //get all the users
        getAllUsers()
        //if success Users = data
            .then(res => setUsers(res.data.users))
            //if failed send message
            .catch(err => {
                msgAlert({
                    heading: 'Error getting users',
                    message: "there has been an error, please try again",
                    variant: 'danger'
                })
                //and error=true
                setError(true)
            })
    }, [])

//if (error) display "error"
if (error){
    return <p>Error...</p>
}

//if there are no users yet display loading msg
if (!users){
    return <p>...Loading...</p>
} else if (users.length === 0){
    // else if there are no users display msg
    return <p> No users yet... so lonely...</p>
}

//loop over the users
const userCards = users.map(user=>(
    <Card key={ user.id } style={{ width: '30%', margin: 5 }}>
            <Card.Header>{ user.username }</Card.Header>
            <Card.Body>
                <Card.Text>
                    <Link to={`/users/${user._id}`} className="btn btn-info">View { user.username } Profile</Link>
                </Card.Text>
            </Card.Body>
        </Card>
))
//aah
 // return some jsx, a container with all the user cards
 return (
    <div className="container-md" style={ cardContainerStyle }>
        { userCards }
    </div>
)
}

//export component
export default UsersIndex


