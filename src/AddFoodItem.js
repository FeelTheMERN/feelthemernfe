import React, { Component } from 'react'
// import Axios from '../../feelthemernbe/node_modules/axios';
import axios from 'axios'

export default class AddFoodItem extends Component {
  state = {
    inputValue: ''
  };  

  handleChange = (e) => {
    const { value } = e.currentTarget;

    this.setState({ inputValue: value })

    const headers = {
      headers: {
        'x-app-id': 'a9b61147',
        'x-app-key': '3f68e69f1b199c1304736e91b6a9d27c'
      }
    }

    axios.get(`https://trackapi.nutritionix.com/v2/search/instant?query=${value}`, headers)
      .then(resp => this.setState({ foods: resp.data.common}))
      .catch(err => console.log(err.response))
  }

  setItem = (food) => {
    this.setState({ inputValue: food.food_name})
  }

  getFood = () => {
    //send a request to the back end for matching food items from the external api
    // should get back object with qty and name
    return "110g"
  }

  submitFood = (e) => {
    e.preventDefault()
    this.props.addFoodToMeal(this.state.foodItem)
    e.target.previousSibling.value = ''//empties the input field when submitted
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
                    <p key={i} onClick={(food)=>this.setItem} >{food.food_name}</p>
                  ) 
                })}
            </div>
        </form>
      </div>
    )
  }
}

