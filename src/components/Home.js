import UsersIndex from "./users/UsersIndex"

const Home = (props) => {
	console.log('props in home: \n', props)

	return (

		<div className="container-md">
			<h2>Project 3W Users:</h2>
			<UsersIndex msgAlert={ props.msgAlert } />
		</div>
	)
}

export default Home
