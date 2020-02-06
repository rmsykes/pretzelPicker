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
        listOfUsers: [],
        query: '',
        filteredData: []
    }

    // componentDidMount() - used to bring in data from backend, don't need data right now, but have it ready to pull in /api/pretzelPicker data but need to change state template
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


                <div className='homePageUserArea'>
                    <div className='homePageUserSearchArea'>
                        {/* search form field for filtering users */}
                        <div className="searchAllUsersForm">
                            <div className='searchAllUserInputField'>
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

                    </div>
                </div>





            </div>
        )
    }
}
