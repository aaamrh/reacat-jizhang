import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import CategorySelect from '../components/CategorySelect';
import PriceForm from '../components/PriceForm';
import { testCategories } from '../testData'
import { Tabs, Tab } from '../components/Tabs';
import { TYPE_INCOME, TYPE_OUTCOME } from '../utils'
import { AppContext } from '../App'


const tabsText = [ TYPE_OUTCOME, TYPE_INCOME ]

class Create extends Component {
  constructor(props){
    super(props)

    this.state = {
      selectedTab: TYPE_OUTCOME,
      selectedCategory: null,
    }
  }

  cancelSubmit = () => {
    this.props.history.push('/')
  }

  selectCategory = (category) => {
    this.setState({
      selectedCategory: category
    })
  }

  tabChange = (index) => {
    this.setState({
      selectedTab: tabsText[index]
    })
  }

  render() {
    // const filterCategories = testCategories.filter( category => category.type===TYPE_OUTCOME )

    return (
      <AppContext.Consumer>
        { ( {state, actions} )=>{
          const { id } = this.props.match.params;
          const { items, categories } = state;
          const selectedTab = (id && items[id]) ? categories[ items[id].cid ].type : this.state.selectedTab;
          const selectedCategory = (id && items[id]) ? categories[ items[id].cid ] : this.state.selectedCategory

          const editItem = (id && items[id] ) ? items[id] : {}

          const filterCategories = Object.keys(categories)
          .filter( id=>categories[id].type === selectedTab)
          .map(id => categories[id])

          const submitForm = (data, isEditMode) => {
            if ( !isEditMode ){
              actions.createItem(data, selectedCategory.id)
            }else{
        
            }
            this.props.history.push('/')
          }
          
          return (
            
            <div className="create-page py-3 px-3 rounded mt-3" style={{ background: '#fff' }}>
              <Tabs activeIndex={0} onTabChange={ this.tabChange }>
                <Tab>支出</Tab>
                <Tab>收入</Tab>
              </Tabs>

              <CategorySelect categories={filterCategories} 
                onSelectCategory={ this.selectCategory }
                selectedCategory = { selectedCategory }
              />

              <PriceForm 
                onFormSubmit={ submitForm }
                onCancelSubmit={ this.cancelSubmit }
                item={editItem}
              />
            </div>
          )
        } }
      </AppContext.Consumer>

      // <div>
      //   create.js { this.props.match.params.id }
      //   {/* <CategorySelect categories={filterCategories} 
      //     onSelectCategory={this.selectCategory}
      //     selectedCategory={selectedCategory}
      //   /> */}
      //   <PriceForm 
      //     onFormSubmit={this.submitForm}
      //     onCancelSubmit={this.cancelSubmit}
      //     item={{}}
      //   />
      // </div>
    );
  }
}

export default withRouter ( Create );