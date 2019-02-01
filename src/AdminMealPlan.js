import React, { Component } from 'react'
import axios from 'axios';
import './css/mealplan.scss'
import ShowMeals from './ShowMeals'

class UserSessions extends Component {
  state = {
    dayOneBtn: true,
    dayTwoBtn: true,
    dayThreeBtn: true,
    dayFourBtn: true,
    dayFiveBtn: true,
    daySixBtn: true,
    daySevenBtn: true,
    mealPlan: {
      day1:[[{food: "apple"}, {food: "apple"}], [{food: "apple"}, {food: "apple"}], [{food: "apple"}, {food: "apple"}]],
      day2:[[{food: "banana"}, {food: "banana"}], [{food: "banana"}, {food: "banana"}], [{food: "banana"}, {food: "banana"}]],
      day3:[[{food: "orange"}, {food: "orange"}], [{food: "orange"}, {food: "orange"}], [{food: "orange"}, {food: "orange"}]]
    }
  }
    
  componentDidMount() {
    const config = { headers: {token: localStorage.getItem('token')}}
    const { id } = this.props.match.params
    axios.get(`http://localhost:5000/user/users/${id}`, config)
      .then(resp => this.setState({user: resp.data}))
      .catch(err => console.log(err));
  }

  showMeals = (dayNum) => {
    const {mealPlan} = this.state
    const day = `day${dayNum}`
    // console.log(mealPlan[day])
    this.setState({showMealPlan: <ShowMeals meals={mealPlan[day]}/>, addMealBtn: false})
  }

  render() {
    const {user, dayOneBtn, dayTwoBtn, dayThreeBtn, dayFourBtn, dayFiveBtn, daySixBtn, daySevenBtn, showMealPlan } = this.state;
    console.log(user)
    if(!user) return <h1>Loading...</h1>
    return (
      <div className="main-container">
        <div className="content-container">
          <h1>Meal Plan</h1>
          <div className="btn-container">
            { dayOneBtn && <button onClick={() => this.showMeals(1)}>Day 1</button>}
            { dayTwoBtn && <button onClick={() => this.showMeals(2)}>Day 2</button>}
            { dayThreeBtn && <button onClick={() => this.showMeals(3)}>Day 3</button>}
            { dayFourBtn && <button onClick={() => this.showMeals(4)}>Day 4</button>}
            { dayFiveBtn && <button onClick={() => this.showMeals(5)}>Day 5</button>}
            { daySixBtn && <button onClick={() => this.showMeals(6)}>Day 6</button>}
            { daySevenBtn && <button onClick={() => this.showMeals(7)}>Day 7</button>}
            { showMealPlan && <>{showMealPlan}</>}
          </div>
        </div>
      </div>
    )
  }  
}

export default UserSessions;