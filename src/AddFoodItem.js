import React, { Component } from 'react'

export default class AddFoodItem extends Component {
  state ={};  

  handleChange = (e) => {
    const {value, id} = e.currentTarget;
    this.setState({[id]: value})
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
    return (
      <div>
        <form>
            <div>
                <label htmlFor="foodItem">Food Item:</label>
                <input type="text" id="foodItem" onChange={this.handleChange}/>
                <button onClick={this.submitFood}>+</button>
            </div>
        </form>
      </div>
    )
  }
}

