// imports
import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Button, Form, FormControl, FormGroup, Input, FormCheck } from 'react-bootstrap'

import { Navbar, Nav } from 'react-bootstrap'


// create and export all users component
export default class AllUsers extends Component {

    // all user state
    state = {
        listOfUsers: [],
    }


    // componentDidMount()
    componentDidMount() {
        axios.get('/api/user')
            .then((res) => {
                this.setState({ listOfUsers: res.data })
            })
    }

    // render in browser
    render() {


        const listOfUsers = this.state.listOfUsers.map(
            (user) => {
                return <div>
                    <Link to={`/user/${user._id}`}>
                        <h5 className='allUsersUserListNameAndPhoto'><img src={user.photo} alt="user's photo"/> <br/> {user.name} </h5>
                    </Link>
                </div>
            }
        )


        return (
            <div className='allUsersPage'>

                {/* Bootstratp nav bar */}
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="/">Pretzel Picker</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/user">Users</Nav.Link>
                        
                    </Nav>
                    
                </Navbar>


                <h1>Pretzel People</h1>

                {listOfUsers}
            </div>
        )
    }
}
