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
        query: '',
        filteredData: []
    }


    // componentDidMount()
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

    // render in browser
    render() {


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

                {/* search form field for filtering users */}
                <div className="searchForm">
                    <form>
                        <input
                            placeholder="Search for..."
                            value={this.state.query}
                            onChange={this.handleInputChange}
                        />
                    </form>
                    <div className='usersListFilteredSearch'>{this.state.filteredData.map(user =>

                        <Link to={`/user/${user._id}`}>
                            <p>{user.name} <img src={user.photo} alt="user photo" /></p>
                        </Link>
                    )}</div>
                </div>
            </div>
        )
    }
}
