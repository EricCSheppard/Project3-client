import UsersIndex from "./users/UsersIndex"
import { Link } from 'react-router-dom'
import Advice from "../api/quote"
import { Helmet } from "react-helmet"


const Home = (props) => {
	// console.log('props in home: \n', props)
    const {user} = props

	return (

		<div className="mt-3 container-md" style={{textAlign: 'left'}}>
            <Helmet>
                <title>Project 3W</title>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
                <link href="https://fonts.googleapis.com/css2?family=Bad+Script&display=swap" rel="stylesheet"/>
            </Helmet>
            <h1>Welcome to Project 3W!</h1>
            <h4>The best place to keep track of all your goals, and show support to other users!</h4>
            {
                user ?
                <>
                <Link className='btn btn-info mt-2' to={`users/${user._id}`}>Go to my goals</Link>
                </>
            :
            <>
            <p>Please <Link to={'/sign-up'}>sign up</Link> or <Link to={'/sign-in'}> sign in</Link> to continue</p>
            </>
            }
            <br/>
            <br/>
            <div>
                <h5>Your motivational quote of the moment:</h5>
                <Advice/>
            </div>
		</div>
	)
}

export default Home
