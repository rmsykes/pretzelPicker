// imports
import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


// create and export all users component
export default class AllUsers extends Component {

    // all user state
    state = {
        message: ''
    }
    

    // componentDidMount()
    componentDidMount() {
        axios.get('/api/helloworld')
            .then((res) => {
                this.setState({message: res.data})
            })
    }

    // render in browser
    render() {
        return (
            <div>
                {/* Accessing the value of message from the state object */}
                <h1>{this.state.message}</h1>
            </div>
        )
    }
}
