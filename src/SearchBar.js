import React, { Component } from 'react';
import axios from 'axios'

export default class SearchBar extends Component {

  search = (e) => {
      const {value, id} = e.currentTarget;
      axios.findOne({value})
  }

  render() {
    return (
      <div>
        <input type="text" id="search" placeHolder="Search" onChange={this.search}/>
      </div>
    )
  }
}
