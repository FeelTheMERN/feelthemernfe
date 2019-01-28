import React, { Component } from 'react'
import Meal from './Meal'
import DisplayMeal from './DisplayMeal'

export default class MealPlan extends Component {
    state = {
        formPage: 1,
        mealPlan: {
            day1:[],
            day2:[],
            day3:[],
            day4:[],
            day5:[],
            day6:[],
            day7:[]
        },
        mealSaved: true
    };

    deleteMeal = (day, i) => {
        // const dayIndex = day.split('').pop()
        this.state.mealPlan[day].splice(i, 1)
        this.setState({})
    }

    deleteFood = (day, mealIndex, foodIndex) => {
        //day: [[{}],[{},{}]] got to find the meal array the food is in day[x] => get array back
        //then find the food item in the meal array mealPlan[day][mealIndex].splice[foodIndex, 1]
        const {mealPlan} = this.state
        mealPlan[day][mealIndex].splice(foodIndex, 1)
        if(mealPlan[day][mealIndex].length === 0) mealPlan[day].splice(mealIndex, 1)
    }

    addMealtoDay = (meal) => {
        const {formPage, mealPlan} = this.state
        const day = `day${formPage}`

        mealPlan[day].push(meal)
        this.setState({ displayMeal: <DisplayMeal key={Math.random()} day={mealPlan[day]} dayIndex={formPage} deleteMeal={this.deleteMeal} deleteFood={this.deleteFood}/>})
        
        this.mealSavedTrue()
        this.setState({message: null})
    }

    componentDidMount() {
        const formPage = 1
        const a = "currentPage"
        this.setState({ formPage, a })
    }

    nextForm = (e) => {
        e.preventDefault();
        const { formPage, mealSaved, mealPlan } = this.state;
        
        if(!mealSaved) return this.setState({message: "You need to save meal first"})

        const newformPage = formPage + 1
        const day = `day${formPage + 1}`
        this.setState({ formPage: newformPage, displayMeal: <DisplayMeal day={mealPlan[day]} deleteMeal={this.deleteMeal} deleteFood={this.deleteFood} dayIndex={formPage + 1} key={Math.random()}/> }, () => {
            this.changeClassNext()
        }) 
    }

    backForm = (e) => {
        e.preventDefault();
        const { formPage, mealSaved, mealPlan } = this.state;
        
        if(!mealSaved) return this.setState({message: "You need to save meal first"})

        const newformPage = formPage - 1
        const day = `day${formPage - 1}`
        this.setState({ formPage: newformPage, displayMeal: <DisplayMeal day={mealPlan[day]} deleteMeal={this.deleteMeal} deleteFood={this.deleteFood} dayIndex={formPage - 1} key={Math.random()}/> }, () => {
            this.changeClassBack()
        }) 
    }

    changeClassNext = () => {
        const { formPage } = this.state
        if(formPage === 2) return this.setState({ a: null, b: "currentPage"})
        if(formPage === 3) return this.setState({ b: null, c: "currentPage"})
        if(formPage === 4) return this.setState({ c: null, d: "currentPage"})
        if(formPage === 5) return this.setState({ d: null, e: "currentPage"})
        if(formPage === 6) return this.setState({ e: null, f: "currentPage"})
        if(formPage === 7) return this.setState({ f: null, g: "currentPage"})
    }

    changeClassBack = () => {
        const { formPage } = this.state
        if(formPage === 1) return this.setState({ b: null, a: "currentPage"})
        if(formPage === 2) return this.setState({ c: null, b: "currentPage"})
        if(formPage === 3) return this.setState({ d: null, c: "currentPage"})
        if(formPage === 4) return this.setState({ e: null, d: "currentPage"})
        if(formPage === 5) return this.setState({ f: null, e: "currentPage"})
        if(formPage === 6) return this.setState({ g: null, f: "currentPage"})
    }

    redirectUser = () => {
        this.props.history.goBack()
    }

    mealSavedTrue = () => {
        this.setState({mealSaved: true, message: null})
    }

    mealSavedFalse = () => {
        this.setState({mealSaved: false, message: null})
    }

    render() {
        const { formPage, displayMeal, message, a, b, c, d, e, f, g } = this.state
        console.log(this.state.mealPlan)
        return (
            <>
                <div className="mealPlanDays">
                    <h4 className={a}>Day 1</h4> 
                    <h4 className={b}>Day 2</h4> 
                    <h4 className={c}>Day 3</h4> 
                    <h4 className={d}>Day 4</h4> 
                    <h4 className={e}>Day 5</h4> 
                    <h4 className={f}>Day 6</h4> 
                    <h4 className={g}>Day 7</h4> 
                </div>
                <h1>Day {formPage}</h1>
                { displayMeal && <>{displayMeal}</> }
                <Meal addMealtoDay={this.addMealtoDay} mealSavedFalse={this.mealSavedFalse} mealSavedTrue={this.mealSavedTrue}/> 
                <div>
                    { formPage > 1 && <button onClick={this.backForm}>back</button>}
                    { formPage === 1 && <button onClick={this.redirectUser}>back</button>}
                    { formPage !== 7 && <button onClick={this.nextForm}>next</button>}
                    { formPage === 7 && <button onClick={this.submitForm}>Submit</button>}
                    { message && <>{message}</>}
                </div>
            </>
        )
    }
}
