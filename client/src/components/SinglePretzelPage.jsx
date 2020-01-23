// Import React, { Component }, Axios, and { Link }
import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'



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
            notes: String,
        }

    }

    // componentDidMount() - brings single pretzel data from backend
    componentDidMount() {
        axios.get(`/api/pretzelPicker/${this.props.match.params.pretzelId}`)
            .then((res) => {
                this.setState({ pretzel: res.data })
            })
    }


    // Rendered in browser
    render() {

        
        return (
            <div className='singlePretzelPage'>

                <div className='pageHeader'>
                    <nav>
                        <Link to='/'><button>Home</button></Link>
                    </nav>


                </div>
                <h1>Pretzel Picker</h1>




            </div>
        )
    }
}
