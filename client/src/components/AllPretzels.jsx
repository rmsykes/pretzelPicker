// Import React, { Component }, Axios, and { Link }
import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Button, Form, FormControl, FormGroup, Input, FormCheck } from 'react-bootstrap'


// Create and export AllPretzelsPage Component
export default class AllPretzels extends Component {

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
        axios.get('/api/pretzel')
            .then((res) => {
                this.setState({ listOfRestaurants: res.data })
            })
    }

    // createNewPretzel() on submit of form
    createNewPretzel = (evt) => {
        evt.preventDefault()
        const newPretzel = this.state.newPretzel

        axios.post('/api/pretzel', newPretzel)
            .then((res) => {
                this.componentDidMount()
            })
    }

    // handleInputChange() on form inputs
    handleInputChange = (evt) => {
        const copiedNewPretzel = { ...this.state.newPretzel }
        copiedNewPretzel[evt.target.name] = evt.target.value
        this.setState({ newPretzel: copiedNewPretzel })
    }

    // Rendered in Browser
    render() {

        const listOfRestaurants = this.state.listOfRestaurants.map(
            (restaurant) => {
                return <div>
                    <Link to={`/pretzel/${restaurant._id}`}>
                        <h5>{restaurant.restaurantName} {restaurant.ranking}/5</h5>
                    </Link>
                </div>
            })



        return (
            <div className='allPretzelsPage'>

                <div className='pageHeader'>
                    <nav>
                        <Link to='/'><button>Home</button></Link>
                    </nav>


                </div>
                <h1>Pretzel Picker</h1>


                <div className='allPretzelsPageSiteExplanation'>
                    <h2>I like pretzels. <br /> I eat them when they are on the menu. <br /> Where are the best pretzels in Atlanta? <br />Let's see...</h2>
                </div>

                <div className='allPretzelsPagePretzelsByRank'>
                    <h3>Restaurants and Pretzel Rank</h3>
                    {listOfRestaurants}
                </div>


                {/* CREATE PRETZEL FORM */}
                <div className='createPretzelForm'>
                    <Form onSubmit={this.createNewPretzel}>
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
                        {/* <input
                            type="checkbox"
                            name="cheese"
                            placeholder="Select True/False"
                            onChange={this.handleInputChange}
                            value={this.state.newPretzel.cheese} /> */}
                        {['checkbox'].map(type => (
                            <div key={`custom-${type}-1`} className="mb-3">
                                <Form.Check
                                    custom
                                    type={type}
                                    id={`custom-${type}-1`}
                                    label=""
                                    name="cheese"
                                    onChange={this.handleInputChange}
                                    value={this.state.newPretzel.cheese}
                                />
                            </div>
                        ))}

                        <h2>Mustard</h2>
                        {/* <input
                            type="checkbox"
                            name="mustard"
                            placeholder="Select True/False"
                            onChange={this.handleInputChange}
                            value={this.state.newPretzel.mustard} /> */}
                        {['checkbox'].map(type => (
                            <div key={`custom-${type}-2`} className="mb-4">
                                <Form.Check
                                    custom
                                    type={type}
                                    id={`custom-${type}-2`}
                                    label=""
                                    name="mustard"
                                    onChange={this.handleInputChange}
                                    value={this.state.newPretzel.mustard}

                                />
                            </div>
                        ))}

                        <h2>Notes</h2>
                        <input
                            type="string"
                            name="notes"
                            placeholder="Pretzel Notes"
                            onChange={this.handleInputChange}
                            value={this.state.newPretzel.notes} />

                        <br />
                        <br />

                        <input type="submit" value="Create New Pretzel" />
                    </Form>


                </div>

            </div>
        )
    }
}
