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
        }
    };

    addMealtoDay = (meal) => {
        const {formPage} = this.state
        if(formPage === 1){
            const { day1 } = this.state.mealPlan
            day1.push(meal)
            this.setState({day1, displayMeal: <DisplayMeal day={day1}/>})
        }
        if(formPage === 2){
            const { day2 } = this.state.mealPlan
            day2.push(meal)
            this.setState({day2, displayMeal: <DisplayMeal day={day2}/>})
        }
        if(formPage === 3){
            const { day3 } = this.state.mealPlan
            day3.push(meal)
            this.setState({day3, displayMeal: <DisplayMeal day={day3}/>})
        }
        if(formPage === 4){
            const { day4 } = this.state.mealPlan
            day4.push(meal)
            this.setState({day4, displayMeal: <DisplayMeal day={day4}/>})
        }
        if(formPage === 5){
            const { day5 } = this.state.mealPlan
            day5.push(meal)
            this.setState({day5, displayMeal: <DisplayMeal day={day5}/>})
        }
        if(formPage === 6){
            const { day6 } = this.state.mealPlan
            day6.push(meal)
            this.setState({day6, displayMeal: <DisplayMeal day={day6}/>})
        }
        if(formPage === 7){
            const { day7 } = this.state.mealPlan
            day7.push(meal)
            this.setState({day7, displayMeal: <DisplayMeal day={day7}/>})
        }
    }

    componentDidMount() {
        const formPage = 1
        const a = "currentPage"
        this.setState({ formPage, a })
    }

    nextForm = (e) => {
        e.preventDefault();
        const { formPage } = this.state;
        
        if(formPage === 1) {
            const newformPage = formPage + 1
            const { day2 } = this.state.mealPlan
            this.setState({ a: null, b: "currentPage", formPage: newformPage, displayMeal: <DisplayMeal day={day2}/> }) 
        }
        if(formPage === 2) {
            const newformPage = formPage + 1
            const { day3 } = this.state.mealPlan
            this.setState({ b: null, c: "currentPage", formPage: newformPage, displayMeal: <DisplayMeal day={day3}/> }) 
        }
        if(formPage === 3) {
            const newformPage = formPage + 1
            const { day4 } = this.state.mealPlan
            this.setState({ c: null, d: "currentPage", formPage: newformPage, displayMeal: <DisplayMeal day={day4}/> }) 
        }
        if(formPage === 4) {
            const newformPage = formPage + 1
            const { day5 } = this.state.mealPlan
            this.setState({ d: null, e: "currentPage", formPage: newformPage, displayMeal: <DisplayMeal day={day5}/> }) 
        }
        if(formPage === 5) {
            const newformPage = formPage + 1
            const { day6 } = this.state.mealPlan
            this.setState({ e: null, f: "currentPage", formPage: newformPage, displayMeal: <DisplayMeal day={day6}/> }) 
        }
        if(formPage === 6) {
            const newformPage = formPage + 1
            const { day7 } = this.state.mealPlan
            this.setState({ f: null, g: "currentPage", formPage: newformPage, displayMeal: <DisplayMeal day={day7}/> }) 
        }
    }

    //this funtion runs when the back button is clicked. it will check what page the form is currently on and will render the previous component and update the page number acordingly  .
    backForm = (e) => {
        e.preventDefault();
        const { formPage } = this.state;

        if(formPage === 2){
            const newformPage = formPage - 1
            const { day1 } = this.state.mealPlan
            this.setState({ a: "currentPage", b: null, formPage: newformPage, displayMeal: <DisplayMeal day={day1}/>})
        }
        if(formPage === 3){
            const newformPage = formPage - 1
            const { day2 } = this.state.mealPlan
            this.setState({ b: "currentPage", c: null, formPage: newformPage, displayMeal: <DisplayMeal day={day2}/> })
        }
        if(formPage === 4){
            const newformPage = formPage - 1
            const { day3 } = this.state.mealPlan
            this.setState({ c: "currentPage", d: null, formPage: newformPage, displayMeal: <DisplayMeal day={day3}/> })
        }
        if(formPage === 5){
            const newformPage = formPage - 1
            const { day4 } = this.state.mealPlan
            this.setState({ d: "currentPage", e: null, formPage: newformPage, displayMeal: <DisplayMeal day={day4}/> })
        }
        if(formPage === 6){
            const newformPage = formPage - 1
            const { day5 } = this.state.mealPlan
            this.setState({ e: "currentPage", f: null, formPage: newformPage, displayMeal: <DisplayMeal day={day5}/> })
        }
        if(formPage === 7){
            const newformPage = formPage - 1
            const { day6 } = this.state.mealPlan
            this.setState({ f: "currentPage", g: null, formPage: newformPage, displayMeal: <DisplayMeal day={day6}/> })
        }
    }

    render() {
        const { formPage, displayMeal, a, b, c, d, e, f, g } = this.state
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
                { displayMeal && <>{displayMeal}</> }
                <Meal addMealtoDay={this.addMealtoDay}/> 
                <div>
                    { formPage > 1 && <button onClick={this.backForm}>back</button>}
                    { formPage !== 7 && <button onClick={this.nextForm}>next</button>}
                    { formPage === 7 && <button onClick={this.submitForm}>Submit</button>}
                </div>
            </>
        )
    }
}
