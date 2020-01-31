// imports
import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Button, Form, FormControl, FormGroup, Input, FormCheck } from 'react-bootstrap'

import { Navbar, Nav } from 'react-bootstrap'


// create and export one user component
export default class OneUsers extends Component {

    // all user state
    state = {
        user: {
            name: '',
            photo: ''
        },
    }


    // componentDidMount()
    componentDidMount() {
        axios.get(`/api/user/${this.props.match.params.userId}`)
            .then((res) => {
                this.setState({ user: res.data })
            })
    }

    // render in browser
    render() {


        return (
            <div className='allUsersPage'>

                {/* Bootstratp nav bar */}
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="/">Pretzel Picker</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/user">Users</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-info">Search</Button>
                    </Form>
                </Navbar>


                <h1>{this.state.user.name}</h1>

                
            </div>
        )
    }
}
