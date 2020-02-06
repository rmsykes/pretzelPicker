// Import React, { Component }, Axios, and { Link }
import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Button, Form, FormControl, FormGroup, Input, FormCheck, Alert } from 'react-bootstrap'
import { Navbar, Nav } from 'react-bootstrap'



// Create and export HomePage Component
export default class HomePage extends Component {

    // HomePage Component State
    state = {
        listOfUsers: [],
        query: '',
        filteredData: [],
        newUser: {
            name: String,
            photo: String,
        },
        isHidden: true,
    }

    // componentDidMount() - bring in data on user and query result of search
    componentDidMount() {
        axios.get('/api/user')
            .then((res) => {
                this.setState({ listOfUsers: res.data })
            })
        this.getData();
    }

    // sets query state targeting the search input form 
    handleInputChange = event => {
        const query = event.target.value;

        this.setState(prevState => {
            const filteredData = prevState.data.filter(element => {
                return element.name.toLowerCase().includes(query.toLowerCase());
            });

            return {
                query,
                filteredData
            };
        });
    };

    // get data on users and filter and set state of filtered, matching user and search
    getData = () => {
        fetch(`/api/user`)
            .then(response => response.json())
            .then(data => {
                const { query } = this.state;
                const filteredData = data.filter(element => {
                    return element.name.toLowerCase().includes(query.toLowerCase());
                });

                this.setState({
                    data,
                    filteredData
                });
            });
    };


    // posts newUser from state to backend. state updated by handleCreateUserInputChange()
    createNewUser = (evt) => {
        evt.preventDefault()

        const newUser = this.state.newUser
        axios.post('api/user', newUser)
            .then((res) => {
                this.componentDidMount()
            })
    }

    // sets newUser state on change of form input field for new user
    handleCreateUserInputChange = (evt) => {
        const copiedNewUser = { ...this.state.newUser }
        copiedNewUser[evt.target.name] = evt.target.value
        this.setState({ newUser: copiedNewUser })
    }


    // toggles seeing create user form with create form button
    toggleHidden = () => {
        this.setState({
            isHidden: !this.state.isHidden
        })
    }

    alertUserMade = () => {
        alert("User Created! Please search for your page!");
    }

    // new user form to be toggled on click in render
    newUserForm = () => {
        return (
            <div className='createForm'>
                <Form onSubmit={this.createNewUser}>
                    <div className='newUserNameInputHomePage'>
                        <h3>User Name</h3>
                        <input
                            type="string"
                            name="name"
                            // placeholder="User Name"
                            onChange={this.handleCreateUserInputChange}
                            value={this.state.newUser.name} />
                    </div>

                    <div className='newUserPhotoInputHomePage'>
                        <h3>User Photo URL</h3>
                        <input
                            type="string"
                            name="photo"
                            // placeholder="User Photo URL"
                            onChange={this.handleCreateUserInputChange}
                            value={this.state.newUser.photo} />
                    </div>

                    <input className='submitFormButton' onClick={this.alertUserMade} type="submit" value='Submit' />
                </Form>
            </div>
        )
    }


    // Rendered in Browser
    render() {


        return (
            <div className='homePage'>

                {/* Bootstratp nav bar */}
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="/">Pretzel Picker</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Link class='navLink' to={`/user`}>Users</Link>
                        {/* <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="https://rmsykes.github.io/">Creator's Porftolio</Nav.Link> */}
                    </Nav>
                </Navbar>



                <div className='homePageHeader'>
                    <h1>Pretzel Picker</h1>


                    <div className='homePageSiteExplanation'>
                        <h2>Do you like pretzels? <br />You're in the right place! <br/> Keep track of the best pretzels</h2>
                    </div>
                </div>



                <div className='homePageUserArea'>
                    <div className='homePageUserSearchArea'>
                        <h2>Existing Users</h2>
                        {/* search form field for filtering users */}
                        <div className="searchAllUsersForm">
                            <div className='searchAllUserHomePageInputField'>
                                <form>
                                    <input
                                        placeholder="Search for..."
                                        value={this.state.query}
                                        onChange={this.handleInputChange}
                                    />
                                </form>
                            </div>
                            <div className='usersListFilteredSearch'>{this.state.filteredData.map(user =>

                                <Link to={`/user/${user._id}`}>
                                    <p><img src={user.photo} alt="user photo" /> <br /> {user.name}   </p>
                                </Link>
                            )}</div>
                        </div>
                    </div>


                    <div className='homePageCreateUserArea'>
                        <h2>Create New User</h2>
                        <div className='createNewFormToggleButton'>
                            <button onClick={this.toggleHidden}>New User Form</button>
                        </div>
                        {this.state.isHidden === false ? this.newUserForm() : null}
                    </div>
                </div>





            </div>
        )
    }
}
