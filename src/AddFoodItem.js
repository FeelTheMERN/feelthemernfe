import React, { Component } from 'react'
// import Axios from '../../feelthemernbe/node_modules/axios';
import axios from 'axios'
require('dotenv').config()

export default class AddFoodItem extends Component {
  state = {
    inputValue: ''
  };  

  handleChange = (e) => {
    const { value } = e.currentTarget;

    this.setState({ inputValue: value })

    const headers = {
      headers: {
        'x-app-id': process.env.NUTRITIONIX_APP_ID,
        'x-app-key': process.env.NUTRITIONIX_APP_KEY
      }
    }

    // NUTRITIONIX_APP_ID=a9b61147
    // NUTRITIONIX_APP_KEY=3f68e69f1b199c1304736e91b6a9d27c

    axios.get(`https://trackapi.nutritionix.com/v2/search/instant?query=${value}`, headers)
      .then(resp => this.setState({ foods: resp.data.common}))
      .catch(err => console.log(err.response))
  }

  setItem = (food) => {
    this.setState({ inputValue: food.food_name})
  }

  submitFood = (e) => {
    e.preventDefault()
    this.props.addFoodToMeal(this.state.inputValue)

    const payload = {
      query: this.state.inputValue
    }

    axios.post('http://localhost:5000/admin/macros', payload)
      .then(resp => console.log(resp))
      .catch(err => console.log(err.response))

    e.target.previousSibling.value = ''//empties the input field when submitted
    this.setState({ foods: null})
  }

  render() {
    const { foods } = this.state
    foods && console.log(foods)
    return (
      <div>
        <form>
            <div>
                <label htmlFor="foodItem">Food Item:</label>
                <input type="text" id="foodItem" value={this.state.inputValue} onChange={this.handleChange}/>
                <button onClick={this.submitFood}>+</button>
                {foods && foods.map((food, i) => {
                  return(
                    <p key={i} onClick={() => this.setItem(food)}>{food.food_name}</p>
                  )
                })}
            </div>
        </form>
      </div>
    )
  }
}

