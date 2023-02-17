//import dependencies

import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Button } from 'react-bootstrap'
import { getOneUser } from '../../api/user'
import messages from '../shared/AutoDismissAlert/messages'
import GoalsIndex from '../goals/GoalsIndex'

// const goalCardContainerLayout = {
//     display: 'flex',
//     justifyContent: 'center',
//     flexFlow: 'row wrap'
// }


//function component
const ShowUser = (props) => {
    //import props
const [updated, setUpdated] = useState(false)
    const [profile, setProfile] = useState(null)
    const { id } = useParams()
    const { user, msgAlert } = props
    console.log('user in UserShow props', user)
    console.log('msgAlert in UserShow props', msgAlert)

    useEffect(() => {
        getOneUser(id)
            .then(res => setProfile(res.data.user))
            .catch(err => {
                msgAlert({
                    heading: 'Error getting profiles',
                    message: 'there has been an error, try again please',
                    variant: 'danger'
                })
            })
    }, [updated, msgAlert])

    if(!profile){
        return <p>loading....</p>
    }

    // Index and filter profile's public goals
    // let inProgressGoals = 
    //if user === profile show also private goals
    // if there are display them
    //else tell to make more goals

    //index of completed goal cards
    // let completedGoals = 

    
    return (
        <>
            <Container style={{ width: '80%' }} className='container-lg m-4 row'>
                { user && user._id === profile._id ?
                <h1>My goals:</h1>
                :
                <h1>{profile.username}'s goals:</h1>
                }
                <Card className='col-5 m-2' style={{backgroundColor: 'lightgrey'}}>
                    <Card.Header> 
                            <div>
                                Goals in Progress:
                            </div>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <GoalsIndex 
                            user={user}
                            msgAlert={msgAlert}
                            profileId={profile._id}
                            isCompleted={false}
                            />
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card className='col-5 m-2' style={{backgroundColor: 'lightyellow'}}>
                    <Card.Header> 
                            <div>
                                Completed Goals:
                            </div>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <GoalsIndex 
                            user={user}
                            msgAlert={msgAlert}
                            profileId={profile._id}
                            isCompleted={true}
                            />
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Container>
            
        </>
    )
}

export default ShowUser