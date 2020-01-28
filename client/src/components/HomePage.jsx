// Import React, { Component }, Axios, and { Link }
import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'



// Create and export HomePage Component
export default class HomePage extends Component {

    // HomePage Component State
    state = {
        listOfRestaurants: [],
        newPretzel: {
            restaurantName: String,
            ranking: Number,
            price: Number,
            cheese: Boolean,
            mustard: Boolean,
            notes: String,
        }
    }

    // componentDidMount() - used to bring in data from backend, don't need data right now, but have it ready to pull in /api/pretzelPicker data but need to change state template
    componentDidMount() {
        axios.get('/api/pretzelPicker')
            .then((res) => {
                this.setState({ listOfRestaurants: res.data })
            })
    }

    // createNewPretzel() on submit of form
    createNewPretzel = (evt) => {
        evt.preventDefalut()
        const newPretzel = this.state.newPretzel

        axios.post('/api/pretzelPicker', newPretzel)
            .then((res) => {
                this.componentDidMount()
            })
    }

    // handleInputChange() on form inputs
    handleInputChange = (evt) => {
        const copiedNewPretzel = this.state.newPretzel
        copiedNewPretzel[evt.target.name] = evt.target.value
        this.setState({ newPretzel: copiedNewPretzel })
    }

    // Rendered in Browser
    render() {

        const listOfRestaurants = this.state.listOfRestaurants.map(
            (restaurant) => {
                return <div>
                    <Link to={`/${restaurant._id}`}>
                        <h5>{restaurant.restaurantName} {restaurant.ranking}/5</h5>
                    </Link>
                </div>
            })



        return (
            <div className='homePage'>

                <div className='pageHeader'>
                    <nav>
                        <Link to='/'><button>Home</button></Link>
                    </nav>


                </div>
                <h1>Pretzel Picker</h1>


                <div className='homePageSiteExplanation'>
                    <h2>I like pretzels. <br /> I eat them when they are on the menu. <br /> Where are the best pretzels in Atlanta? <br />Let's see...</h2>
                </div>

                <div className='homePagePretzelsByRank'>
                    <h3>Restaurants and Pretzel Rank</h3>
                    {listOfRestaurants}
                </div>


                {/* CREATE PRETZEL FORM */}
                <div className='createPretzelForm'>
                    <form onSubmit={this.createNewPretzel}>
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
                        <input
                            type="checkbox"
                            name="cheese"
                            placeholder="Select True/False"
                            onChange={this.handleInputChange}
                            value={this.state.newPretzel.cheese} />

                        <h2>Mustard</h2>
                        <input
                            type="checkbox"
                            name="mustard"
                            placeholder="Select True/False"
                            onChange={this.handleInputChange}
                            value={this.state.newPretzel.mustard} />

                        <h2>Notes</h2>
                        <input
                            type="string"
                            name="notes"
                            placeholder="Pretzel Notes"
                            onChange={this.handleInputChange}
                            value={this.state.newPretzel.notes} />
                        
                        <br/>
                        <br/>

                        <input type="submit" value="Create New Pretzel"/>
                    </form>

                </div>

            </div>
        )
    }
}
