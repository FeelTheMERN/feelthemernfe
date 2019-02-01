import React, { Component } from 'react';
import axios from 'axios'

export default class SearchBar extends Component {

  search = (e) => {
    if (e.currentTarget.value) {
      e.currentTarget.style.background="rgba(0, 0, 0, 0.5)";
    }
      const {value, id} = e.currentTarget;
      this.props.search(value)
  }

  render() {
    return (
      <div>
        <input type="text" id="search" placeHolder="Search" onChange={this.search}/>
      </div>
    )
  }
}
