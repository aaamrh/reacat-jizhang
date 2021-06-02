import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';

import Home from './containers/home';
import Create from './containers/create';
import {testCategories, testItems} from './testData'
import { flatterArr, ID } from './utils'

export const AppContext = React.createContext()


console.log(flatterArr( testItems ) );

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
       items: flatterArr( testItems ),
       categories: flatterArr( testCategories )
    } 
    this.actions = {
      deleteItem: (item) => {
        delete this.state.items[ item.id ]
        this.setState({
          items: this.state.items
        })
      },
      createItem: (data, categoryId) => {
        console.log(data, categoryId)
        const id = ID()

        data.monthCategory = data.date
        data.timestamp = new Date(data.date).getTime()

        const newItem = {...data, id:id, cid: categoryId }
        this.setState({
          items: { ...this.state.items, [id]: newItem }
        })

        console.log(data)
      }
    }
  }

  render() {
    return (
      // GET 使用Context
      <AppContext.Provider value={{
        state : this.state,
        actions : this.actions
      }}>
        <Router>
          <ul>
            <Link to="/">Home</Link>
            <Link to="/create">Create</Link>
            <Link to="/edit/10">Edit</Link>
          </ul>
          <div className="App">
            <Route path='/' exact component={Home} />
            <Route path='/create' exact component={Create} />
            <Route path='/edit/:id' exact component={Create} />
          </div>
        </Router>
      </AppContext.Provider>
      
    );
  }
}


export default App;
