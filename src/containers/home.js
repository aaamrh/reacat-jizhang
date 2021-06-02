import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

import { LIST_VIEW, CHART_VIEW, parseToYearAndMonth } from '../utils'
import logo from '../logo.svg';

import PriceList from '../components/PriceList';
import ViewTab from '../components/ViewTab';
import TotalPrice from '../components/TotalPrice';
import MonthPicker from '../components/MonthPicker';
import CreateBtn from '../components/CreateBtn';
import { Tabs, Tab } from '../components/Tabs'
import { AppContext } from '../App'
import { withContext } from '../withContext'

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

const tabText = [LIST_VIEW, CHART_VIEW]

class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      items,
      currentDate: parseToYearAndMonth(),
      tabView: tabText[0],
      // tabView: tabText[0],
    }
  }


  changeView = (index) => {
    this.setState({
      tabView: tabText[ index ]
    })
  }


  changeDate = (year, month) => {
    this.setState({
      currentDate: {year, month}
    })
  }


  createItem = () => {
    // GET 跳转页面
    this.props.history.push('/create')
    // ** 添加 newItem （假数据）
    // this.setState({
    //   items: [newItem, ...this.state.items]
    // })
  }

  modifyItem = (modifiedItem) => {
    this.props.history.push(`/edit/${ modifiedItem.id }`)


    // ** 只修改title验证组件功能
    // const modifiedItems = this.state.items.map( item => {
    //   if( item.id === modifiedItem.id ){
    //     return { ...item, title: '被修改' }
    //   }
    //   return item
    // } )
    // this.setState({
    //   items: modifiedItems
    // })
  }
   
  deleteItem = (item) => {
    this.props.actions.deleteItem(item)

    // ** 从数据中意出该数据
    // const filteredItems = this.state.items.filter( item => item.id !== deletedItem.id )

    // this.setState({
    //   items: filteredItems
    // })
  }

  render() {
    const {data} = this.props;

    const { items, categories } = data;

    const { currentDate, tabView} = this.state;

    const itemsWithCategory = Object.keys(items).map(id => {
      items[id].category = categories[ items[id].cid ] 
      return items[id]
    }).filter( item=>{
      return item.date.includes(`${currentDate.year}-${currentDate.month}`) || item.date.includes(`${currentDate.year}-0${currentDate.month}`)
    } )

    // const itemsWithCategory = items.map( item => {
    //   item.category = categories[ item.cid ]
    //   return item
    // } ).filter( item => item.date.includes(`${currentDate.year}-${currentDate.month}`) )

    let totalIncome = 0, totalOutcome=0;
    itemsWithCategory.forEach( item => {
      if( item.category.type === 'outcome' ){
        totalOutcome += item.price
      }else{
        totalIncome += item.price
      }
    } )


    console.log(itemsWithCategory)

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

        <Tabs 
          activeIndex={0} 
          onTabChange={this.changeView}
        >
          <Tab>列表模式</Tab>
          <Tab>图表模式</Tab>
        </Tabs>

        {/* <ViewTab 
          activeTab = { tabView }
          onTabChange = { this.changeView }
        /> */}
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
        <hr/>
      </>
    );
  }
}

export default  withRouter( withContext(Home) ); 