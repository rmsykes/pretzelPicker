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
                <h1>Pretzel Pros</h1>
            </div>
        )
    }
}
