// imports
import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


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
                        <h5>{user.name} {user.photo}</h5>
                    </Link>
                </div>
            }
        )


        return (
            <div>
                <h1>Pretzel Pros</h1>

                <h2>users</h2>
                {listOfUsers}
            </div>
        )
    }
}
