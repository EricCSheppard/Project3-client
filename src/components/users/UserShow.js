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
    }, [updated])

    if(!profile){
        return <p>loading....</p>
    }




    // Index and filter profile's public goals
    let goalCards 
    //if user === profile show also private goals
    // if there are display them
    //else tell to make more goals

    //index of completed goal cards
    let compCards

    


    return (
        <>
            <Container className="m-2">
                <Card>
                    <Card.Header></Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <div>
                                Profile: {profile.username} Show Page
                            </div>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>

                    </Card.Footer>
                </Card>
            </Container>
            
        </>
    )
}

export default ShowUser