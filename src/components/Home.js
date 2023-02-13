import UsersIndex from "./users/UsersIndex"

const Home = (props) => {
	console.log('props in home: \n', props)

	return (

		<div className="container-md">
			<h2>Project W3 - Home Page</h2>
			<UsersIndex msgAlert={ props.msgAlert } />
		</div>
	)
}

export default Home
