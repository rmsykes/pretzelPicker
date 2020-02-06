// imports
import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Form } from 'react-bootstrap'
// import { Button, FormControl, FormGroup, Input, FormCheck } from 'react-bootstrap'

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
            photo: String,
            userId: String
        },
        isHidden: true
    }


    // componentDidMount() - gets this user's info and sets it to state as well as all pretzel info
    componentDidMount() {
        axios.get(`/api/user/${this.props.match.params.userId}`)
            .then((res) => {
                this.setState({ user: res.data })
            })
        this.getPretzelData()
    }


    // gets all pretzel data
    getPretzelData = () => {
        axios.get(`/api/pretzel`)
            .then((res) => {
                this.setState({ pretzelData: res.data })
            })
    }


    // createNewPretzel() on submit of form
    createNewPretzel = (evt) => {
        evt.preventDefault()
        // assigns the userid pulled in from url to the state of newPretzel.userId
        this.state.newPretzel.userId = this.props.match.params.userId
        const newPretzel = this.state.newPretzel

        axios.post('/api/pretzel', newPretzel)
            .then((res) => {
                this.componentDidMount()
            })
    }

    // sets newPretzel state on change of form input field for new pretzel
    handleInputChange = (evt) => {
        const copiedNewPretzel = { ...this.state.newPretzel }
        copiedNewPretzel[evt.target.name] = evt.target.value
        this.setState({ newPretzel: copiedNewPretzel })
    }


    // toggles seeing create form with create form button
    toggleHidden = () => {
        this.setState({
            isHidden: !this.state.isHidden
        })
    }

    pretzelForm = () => {
        return (
            <div className='createPretzelForm'>
                <Form onSubmit={this.createNewPretzel}>
                    <h1>Create New Pretzel</h1>

                    <div className='createPretzelInputField'>
                        <h2>Restaurant Name</h2>
                        <input
                            type="string"
                            name="restaurantName"
                            placeholder="Restaurant Name"
                            onChange={this.handleInputChange}
                            value={this.state.newPretzel.restaurantName} />
                    </div>


                    <div className='createPretzelInputField'>
                        <h2>Ranking</h2>
                        <input
                            type="number"
                            name="ranking"
                            placeholder="Pretzel Ranking"
                            onChange={this.handleInputChange}
                            value={this.state.newPretzel.ranking} />
                    </div>


                    <div className='createPretzelInputField'>
                        <h2>Price</h2>
                        <input
                            type="number"
                            name="price"
                            placeholder="Price"
                            onChange={this.handleInputChange}
                            value={this.state.newPretzel.price} />
                    </div>


                    <div className='createPretzelInputField'>
                        <h2>Cheese</h2>
                        <select
                            type="select"
                            name="cheese"
                            placeholder="Select True/False"
                            onChange={this.handleInputChange}
                            value={this.state.newPretzel.cheese}>
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                        </select>
                    </div>


                    <div className='createPretzelInputField'>
                        <h2>Mustard</h2>
                        <select
                            type="checkbox"
                            name="mustard"
                            placeholder="Select True/False"
                            onChange={this.handleInputChange}
                            value={this.state.newPretzel.mustard}>
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                        </select>
                    </div>


                    <div className='createPretzelInputField'>
                        <h2>Pretzel Photo</h2>
                        <input
                            type="string"
                            name="photo"
                            placeholder="Pretzel Photo URL"
                            onChange={this.handleInputChange}
                            value={this.state.newPretzel.photo} />
                    </div>


                    <div className='createPretzelInputField'>
                        <h2>Notes</h2>
                        <input
                            type="string"
                            name="notes"
                            placeholder="Pretzel Notes"
                            onChange={this.handleInputChange}
                            value={this.state.newPretzel.notes} />
                    </div>


                    <br />
                    <br />
                    <input type="submit" value="Create New Pretzel" />
                </Form>
            </div>
        )
    }

    // render in browser
    render() {

        // FILTER THROUGH ALL PRETZEL INFO AND CHECK THE USERID WITH THE USER'S ID PULLED IN FROM THE URL!!!!
        const filterPretzelByUserId = this.state.pretzelData.filter((singlePretzelData) => singlePretzelData.userId === this.props.match.params.userId)
        const pretzelDataWithUserId = filterPretzelByUserId.map(
            (individualPretzelData) => {
                return <div className='oneUserPretzelListGroup'>
                    <Link to={`/pretzel/${individualPretzelData._id}`}>

                        <img className='oneUserPretzelListGroupImg' src={individualPretzelData.photo} alt="pretzel photo" />
                        <h5>{individualPretzelData.restaurantName} {individualPretzelData.ranking}/5</h5>

                    </Link>
                </div>
            }
        )



        return (
            <div className='oneUsersPage' >

                {/* Bootstrap nav bar */}
                < Navbar bg="dark" variant="dark" >
                    <Navbar.Brand href="/">Pretzel Picker</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/user">Users</Nav.Link>

                    </Nav>
                    {/* <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-info">Search</Button>
                    </Form> */}
                </Navbar>

                <div className='oneUserPageHeader'>
                    <img src={this.state.user.photo} alt="user's photo" />
                    <h1>{this.state.user.name}</h1>
                </div>

                <div className='oneUserPageBody'>
                    <div className='oneUserMyPretzelArea'>
                        <h2>My Pretzels</h2>
                        <div className='oneUserPretzelList'>

                            {/* FILTERED PRETZEL LIST */}
                            {pretzelDataWithUserId}

                        </div>
                    </div>

                    <div className='oneUserCreatePretzelArea'>
                        <h2>Create New Pretzel</h2>
                        <div className='createNewPretzelToggleFormButton'>
                            {/* button that toggles the create pretzel form. */}
                            <button onClick={this.toggleHidden}>Create New Pretzel</button>
                        </div>
                        {this.state.isHidden === false ? this.pretzelForm() : null}

                    </div>
                </div>







            </div >
        )
    }
}
