// Import React, { Component }, Axios, and { Link }
import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Button, Form, FormControl, FormGroup, Input, FormCheck } from 'react-bootstrap'
import { Navbar, Nav } from 'react-bootstrap'



// Create and export HomePage Component
export default class HomePage extends Component {

    // HomePage Component State
    state = {

    }

    // componentDidMount() - used to bring in data from backend, don't need data right now, but have it ready to pull in /api/pretzelPicker data but need to change state template
    componentDidMount() {
        axios.get('/')
            .then((res) => {
                this.setState({})
            })
    }


    // Rendered in Browser
    render() {


        return (
            <div className='homePage'>

                {/* Bootstratp nav bar */}
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="/">Pretzel Picker</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/user">Users</Nav.Link>
                        {/* <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="https://rmsykes.github.io/">Creator's Porftolio</Nav.Link> */}
                    </Nav>
                    
                </Navbar>



            
                <h1>Pretzel Picker</h1>


                <div className='homePageSiteExplanation'>
                    <h2>Do you like pretzels? <br /> Want to keep track of the best pretzels? <br /> You're in the right place! </h2>
                </div>



                <div className='homePageCreateUserArea'>
                        
                </div>

                


            </div>
        )
    }
}
