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
            photo: '',
            userId: '',
        },
        pretzelData: [],
        newPretzel: {
            restaurantName: String,
            ranking: Number,
            price: Number,
            cheese: Boolean,
            mustard: Boolean,
            notes: String,
            userId: String
        }
    }


    // componentDidMount()
    componentDidMount() {
        axios.get(`/api/user/${this.props.match.params.userId}`)
            .then((res) => {
                this.setState({ user: res.data })
            })
        this.getPretzelData()
    }


    // getting pretzel data
    getPretzelData = () => {
        axios.get(`/api/pretzel`)
            .then((res) => {
                this.setState({ pretzelData: res.data })
            })
    }

    // createNewPretzel() on submit of form
    createNewPretzel = (evt) => {
        evt.preventDefault()
        const newPretzel = this.state.newPretzel

        axios.post('/api/pretzel', newPretzel)
            .then((res) => {
                this.componentDidMount()
            })
    }

    // handleInputChange() on form inputs
    handleInputChange = (evt) => {
        const copiedNewPretzel = { ...this.state.newPretzel }
        copiedNewPretzel[evt.target.name] = evt.target.value
        this.setState({ newPretzel: copiedNewPretzel })
    }


    // render in browser
    render() {


        const pretzelData = this.state.pretzelData.map(
            (individualPretzelData) => {
                    return <div>
                        <h4>{individualPretzelData.restaurantName} {individualPretzelData.ranking}</h4>
                    </div>
            })




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

                <h2>my pretzels</h2>

                {pretzelData}

                {/* CREATE PRETZEL FORM */}
                <div className='createPretzelForm'>
                    <Form onSubmit={this.createNewPretzel}>
                        <h1>Create New Pretzel</h1>


                        <h2>Restaurant Name</h2>
                        <input
                            type="string"
                            name="restaurantName"
                            placeholder="Restaurant Name"
                            onChange={this.handleInputChange}
                            value={this.state.newPretzel.restaurantName} />

                        <h2>Ranking</h2>
                        <input
                            type="number"
                            name="ranking"
                            placeholder="Pretzel Ranking"
                            onChange={this.handleInputChange}
                            value={this.state.newPretzel.ranking} />

                        <h2>Price</h2>
                        <input
                            type="number"
                            name="price"
                            placeholder="Price"
                            onChange={this.handleInputChange}
                            value={this.state.newPretzel.price} />

                        <h2>Cheese</h2>
                        {/* <input
                            type="checkbox"
                            name="cheese"
                            placeholder="Select True/False"
                            onChange={this.handleInputChange}
                            value={this.state.newPretzel.cheese} /> */}
                        {['checkbox'].map(type => (
                            <div key={`custom-${type}-1`} className="mb-3">
                                <Form.Check
                                    custom
                                    type={type}
                                    id={`custom-${type}-1`}
                                    label=""
                                    name="cheese"
                                    onChange={this.handleInputChange}
                                    value={this.state.newPretzel.cheese}
                                />
                            </div>
                        ))}

                        <h2>Mustard</h2>
                        {/* <input
                            type="checkbox"
                            name="mustard"
                            placeholder="Select True/False"
                            onChange={this.handleInputChange}
                            value={this.state.newPretzel.mustard} /> */}
                        {['checkbox'].map(type => (
                            <div key={`custom-${type}-2`} className="mb-4">
                                <Form.Check
                                    custom
                                    type={type}
                                    id={`custom-${type}-2`}
                                    label=""
                                    name="mustard"
                                    onChange={this.handleInputChange}
                                    value={this.state.newPretzel.mustard}

                                />
                            </div>
                        ))}

                        <h2>Notes</h2>
                        <input
                            type="string"
                            name="notes"
                            placeholder="Pretzel Notes"
                            onChange={this.handleInputChange}
                            value={this.state.newPretzel.notes} />

                        <br />
                        <br />


                        <input className='userFieldToHide'
                            type='string'
                            name='userId'
                            placeholder={this.state.user.name}
                            // onChange={this.handleInputChange}
                            value={this.props.match.params.userId}

                        />


                        <br />
                        <br />
                        <input type="submit" value="Create New Pretzel" />
                    </Form>
                </div>


            </div>
        )
    }
}
