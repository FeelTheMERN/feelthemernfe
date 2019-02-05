import React, { Component } from 'react';
import SingleMeal from './SingleMeal';

class ShowMeals extends Component {
  render() {
    const {meals} =  this.props
    console.log(meals)
    return (
      <div>
        {
          meals.map((meal, i) => {
            return (
              <>
              <h4>Meal {i + 1}</h4>
              <SingleMeal meal={meal} />
              </>
            )
          })
        }
      </div>
    );
  }
}

export default ShowMeals;
