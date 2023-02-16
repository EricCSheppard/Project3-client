import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
const linkStyle = {
    color: 'gold',
    textDecoration: 'none'
}
const authenticatedOptions = (
	<>
        <Nav.Item className="m-2">
			<Link to='/goals/create' style={linkStyle}>
                Create New Goal
			</Link>
		</Nav.Item>
		<Nav.Item className="m-2">
			<Link to='change-password' style={linkStyle}>
				Change Password
			</Link>
		</Nav.Item>
		<Nav.Item className="m-2">
			<Link to='sign-out' style={linkStyle}>
				Sign Out
			</Link>
		</Nav.Item>
	</>
)

const unauthenticatedOptions = (
	<>
        <Nav.Item className="m-2">
            <Link to='sign-up' style={linkStyle}>Sign Up</Link>
        </Nav.Item>
        <Nav.Item className="m-2">
            <Link to='sign-in' style={linkStyle}>Sign In</Link>
        </Nav.Item>
	</>
)

const alwaysOptions = (
	<>
		<Nav.Item className="m-2">
			<Link to='/' style={linkStyle}>
				User Index
			</Link>
		</Nav.Item>
        <Nav.Item className="m-2">
			<Link to='/goals' style={linkStyle}>
				View All Goals
			</Link>
		</Nav.Item>
	</>
)

const Header = ({ user }) => (
	<Navbar bg='dark' variant='dark' expand='md'>
		<Navbar.Brand className="m-0 p-2">
            <Link to='/' style={linkStyle}>
                3W
            </Link>
        </Navbar.Brand>
		<Navbar.Toggle aria-controls='basic-navbar-nav' />
		<Navbar.Collapse id='basic-navbar-nav'>
			<Nav className='ml-auto'>
				{user && (
					<Link to={`/users/${user._id}`} className='navbar-text mr-2' textDecoration='none'>My goals</Link>
				)}
				{alwaysOptions}
				{user ? authenticatedOptions : unauthenticatedOptions}
			</Nav>
		</Navbar.Collapse>
	</Navbar>
)

export default Header
