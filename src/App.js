import React from 'react';
import data from './data'

export default class App extends React.Component {

  state = {
    item: null,
    found: false,
    searches: 0
  }

  linearSearch = (data, item) => {
    let searches = 0;
    for (let i = 0; i < data.length; i++) {
      searches++;
      if (data[i] === item) {
        return { item, found: true, searches }
      }
    }
    return { item, found: false, searches }
  }

  binarySearch = (data, item, start = 0, end = data.length - 1, searches = 0) => {
    searches++;
    if (start > end) {
      return { item, found: false, searches }
    }

    const index = Math.floor((start + end) / 2);
    const value = data[index];

    console.log('Start and end:', start, end);

    if (item === value) {
      return { item, found: true, searches }
    } else if (item < value) {
      return this.binarySearch(data, value, index + 1, end, searches);
    } else if (item > value) {
      return this.binarySearch(data, value, start, index - 1, searches);
    }
  };


  handleSubmit = (e) => {
    e.preventDefault();

    const item = parseInt(e.target.numberInput.value)
    console.log(item);

    const searchType = e.target.searchType.value;
    if (searchType === 'linear') {
      this.setState(this.linearSearch(data, item))
    }
    if (searchType === 'binary') {
      const sorted = data.sort((a, b) => a - b)
      this.setState(this.linearSearch(sorted, item))
    }
  }

  render() {
    return (
      <main className='App'>
        <form onSubmit={e => this.handleSubmit(e)}>
          <label htmlFor='dataInput'>Input</label>
          <input id='numberInput' type='number' name='dataInput' />
          <label htmlFor='linear'>Linear</label>
          <input type='radio' name='searchType' id='linear' value='linear' />
          <label htmlFor='binary'>Binary</label>
          <input type='radio' name='searchType' id='binary' value='binary' />
          <button type='submit'>Submit</button>
        </form>
        {this.state.item !== null &&
          (<div>
            <p>Searching for {this.state.item}</p>
            <p>Found: {this.state.found ? 'True' : 'False'}</p>
            <p>{this.state.searches} Searches</p>
          </div>)}
      </main>
    );
  }
}