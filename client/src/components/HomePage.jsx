// Import React, { Component }, Axios, and { Link }
import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'



// CREATE AND EXPORT HOMEPAGE COMPONENT
export default class HomePage extends Component {

    // HomePage Component State
    state = {
        message: ''
    }

    // componentDidMount() - used to bring in data from backend, don't need data right now, but have it ready to pull in /api/pretzelPicker data but need to change state template
    componentDidMount() {
        axios.get('/api/pretzelPicker')
            .then((res) => {
                this.setState({ message: res.data })
            })
    }

    // Rendered in Browser
    render() {
        return (
            <div className='homePage'>

                <div className='pageHeader'>
                    <nav>
                        <Link to='/'><button>Home</button></Link>
                        <Link to='/players'><button>Players</button></Link>
                        <Link to='/scores'><button>Scores</button></Link>
                        <Link to='/about'><button>About</button></Link>
                    </nav>

                    <h1>Pretzel Picker</h1>
                </div>
            </div>
        )
    }
}
