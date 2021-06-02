import React, { Component } from 'react';
import { categories } from '../containers/home';

class CategorySelect extends Component {
  constructor(props){
    super(props)
    this.state={
      selectedCategoryId: props.selectedCategory && props.selectedCategory.id
    }
  }

  selectCategory = (event, category) => {
    this.setState({
      selectedCategoryId: category.id
    })
    
    this.props.onSelectCategory(category)

    event.preventDefault()
  }

  render() {
    const {categories, selectedCategory } = this.props;
    const selectedCategoryId = selectedCategory && selectedCategory.id

    return (
      <div>
        <div className="category-select-component">
          <div className="row">
            {
              categories.map((category, index) =>{

                const activeClassName = (selectedCategoryId === category.id)
                ? 'category-item col-3 active' : 'category-item col-3'
              
                return (
                  <div className={activeClassName} key={index}
                    onClick={(event)=>this.selectCategory(event, category)}
                  >
                    {category.name}
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

export default CategorySelect;