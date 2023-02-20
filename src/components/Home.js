import UsersIndex from "./users/UsersIndex"
import { Link } from 'react-router-dom'
import Advice from "../api/quote"
import { Helmet } from "react-helmet"


const Home = (props) => {
	// console.log('props in home: \n', props)
    const {user} = props

	return (

		<div className="mt-3 container-md" style={{textAlign: 'left', background: 'linear-gradient(to bottom, #b0e0e6, #f0fff0)', minHeight: '100vh', padding: '15px', borderRadius: '20px'}}>



            <Helmet>
                <title>Project 3W</title>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
                <link href="https://fonts.googleapis.com/css2?family=Bad+Script&family=Poppins:wght@300&display=swap" rel="stylesheet"/>
            </Helmet>
            <h1>Welcome to Project 3W!</h1>
            <h4>The best place to keep track of all your goals, and show support to other users!</h4>
            {
                user ?
                <>
                <Link className='btn btn-info m-2' to={`users/${user._id}`}>Go to my goals</Link>
                <Link className='btn btn-info m-2' to={'goals/create'}>Create a new goal</Link>
                <Link className='btn btn-info m-2' to={'users/'}>See other user's goals</Link>
                </>
            :
            <>
            <p>Please <Link to={'/sign-up'}>sign up</Link> or <Link to={'/sign-in'}> sign in</Link> to continue</p>
            </>
            }
            <div className='container-md'>
                <div className='homepagetext'>
                We all know of the 5 Ws: 'Who', 'What', 'Why', 'Where', and 'When'.  Project 3W sets out to help you motivate yourself to accomplish your goals using 3 of these powerful words.  Of course we already know the Who... it's you!  The where can be wherever you feel comfortable.  We are concerned with the remaining 3 Ws!
                <br/>
                <br/>
                When you create a task to trap on Project 3W, you will include the following:
                <br/>
                <br/>
                <span className='first-letter' style={{color: '#ffd700'}}>W</span>HAT - What is the goal you are trying to accomplish?
                <br/>
                <span className='first-letter' style={{color: '#ffd700'}}>W</span>HY  - What is your motivation?  Why do you want to accomplish this goal?
                <br/>
                <span className='first-letter' style={{color: '#ffd700'}}>W</span>HEN - Either set a deadline, or if you want to leave it open-ended, we will track WHEN you finish and let you know how long it took!
                <br/>
                <br/>
                Check out our user list and browse their public goals for inspiration!  You can "copy" any goal you see on their lists and modify it for youself, or just keep it the same!  Remember to leave a comment on their goal, cheering them on!
                </div>
            </div>
            <br/>
            <div>
                <h5>Your motivational quote of the moment:</h5>
                <Advice/>
            </div>
		</div>
	)
}

export default Home