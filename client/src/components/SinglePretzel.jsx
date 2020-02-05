// Import React, { Component }, Axios, and { Link }
import React, { Component } from 'react'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'

import { Button, Form, FormControl, FormGroup, Input, FormCheck } from 'react-bootstrap'
import { Navbar, Nav } from 'react-bootstrap'


// Create and export SinglePretzel Component
export default class SinglePretzel extends Component {

    // Pretzel Component State
    state = {
        pretzel: {
            restaurantName: String,
            price: Number,
            cheese: Boolean,
            mustard: Boolean,
            ranking: Number,
            photo: String,
            notes: String,
            userId: String
        },
        isRedirect: false
    }


    // componentDidMount() - brings single pretzel data from backend
    componentDidMount = () => {
        axios.get(`/api/pretzel/${this.props.match.params.pretzelId}`)
            .then((res) => {
                this.setState({ pretzel: res.data })
            })
    }


    //  deletes pretzel on click of delete pretzel button
    deletePretzel = () => {
        axios.delete(`/api/pretzel/${this.props.match.params.pretzelId}`)
            .then((res) => {
                this.setState({ isRedirect: true })
            })
    }

    // Rendered in browser
    render() {


        return (

            

            this.state.isRedirect ? <Redirect to="/user" /> :


            <div className='singlePretzelPage'>

                <div>
                    {/* Bootstratp nav bar */}
                    < Navbar bg="dark" variant="dark" >
                        <Navbar.Brand href="/">Pretzel Picker</Navbar.Brand>
                        <Nav className="mr-auto">
                            <Nav.Link href="/user">Users</Nav.Link>
                        </Nav>
                    </Navbar>
                </div>


                <h1>Pretzel Picker</h1>

                <div className='singlePretzelPagePretzelInfo'>

                    <h2>{this.state.pretzel.restaurantName} </h2>
                    <h2>Rank: {this.state.pretzel.ranking}/5</h2>
                    <h2>${this.state.pretzel.price}</h2>
                    <h2>Cheese:{this.state.pretzel.cheese}</h2>
                    <h2>Mustard:{this.state.pretzel.mustard}</h2>
                    <h2>Photo: <img className='singlePretzelPagePhoto' src={this.state.pretzel.photo} alt="pretzel photo" /></h2>
                    <h2>Notes: {this.state.pretzel.notes}</h2>

                </div>

                <button id='deletePretzelButton' onClick={() => this.deletePretzel()}>Delete This Pretzel</button>


            </div>
        )
    }
}
