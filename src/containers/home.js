import React, { Component } from 'react';

import { LIST_VIEW, CHART_VIEW, parseToYearAndMonth } from '../utils'
import logo from '../logo.svg';

import PriceList from '../components/PriceList'
import ViewTab from '../components/ViewTab';
import TotalPrice from '../components/TotalPrice';
import MonthPicker from '../components/MonthPicker';
import CreateBtn from '../components/CreateBtn';


export const categories = {
  '0': {
    'id': 0,
    'name': '工资',
    'type': 'income'   
  },
  '1':{
    'id': 1,
    'name': '旅行',
    'type': 'outcome'   
  },
  '2':{
    'id': 2,
    'name': '零食',
    'type': 'outcome'   
  }

}

export const items = [
  {
    'id': 0,
    'title': '工资',
    'price': 5000,
    'date': '2020-12-10',
    'cid': 0
  },
  {
    'id': 1,
    'title': '去云南旅游',
    'price': 25,
    'date': '2021-1-11',
    'cid':1
  },
  {
    'id': 2,
    'title': '车票',
    'price': 115,
    'date': '2021-1-15',
    'cid':2
  }
]

const newItem = {
  'id': 4,
  'title': '新纪录',
  'price': 280,
  'date': '2021-1-18',
  'cid':1
}

class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      items,
      currentDate: parseToYearAndMonth(),
      tabView: LIST_VIEW
    }
  }


  changeView = (view) => {
    this.setState({
      tabView: view
    })
  }

  changeDate = (year, month) => {
    this.setState({
      currentDate: {year, month}
    })
  }

  createItem = () => {
    this.setState({
      items: [newItem, ...this.state.items]
    })
  }

  modifyItem = (modifiedItem) => {
    const modifiedItems = this.state.items.map( item => {
      if( item.id === modifiedItem.id ){
        return { ...item, title: '被修改' }
      }
      return item
    } )

    this.setState({
      items: modifiedItems
    })
  }
   
  deleteItem = (deletedItem) => {
    const filteredItems = this.state.items.filter( item => item.id !== deletedItem.id )

    this.setState({
      items: filteredItems
    })
  }

  render() {
    const {items, currentDate, tabView} = this.state;

    let totalIncome = 0, totalOutcome = 0;

    const itemsWithCategory = items.map( item => {
      item.category = categories[ item.cid ]
      return item
    } ).filter( item => item.date.includes(`${currentDate.year}-${currentDate.month}`) )

    items.forEach( item => {
      if( item.category.type === 'outcome' ){
        totalOutcome += item.price
      }else{
        totalIncome += item.price
      }
    } )

    return (
      <>
         <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>

        <MonthPicker 
          year={currentDate.year}
          month={currentDate.month}
          onChange = { this.changeDate }
        />

        <TotalPrice 
          income = {totalIncome}
          outcome = {totalOutcome}
        />

        <CreateBtn onClick={ this.createItem } />

        <ViewTab 
          activeTab = { tabView }
          onTabChange = { this.changeView }
        />
        {
          tabView === LIST_VIEW && 
          <PriceList items={itemsWithCategory} 
            onModifyItem = {this.modifyItem}
            onDeleteItem = {this.deleteItem}
          />
        }
        {
          tabView === CHART_VIEW && 
          <h1>图表</h1>
        }
      </>
    );
  }
}

export default Home;