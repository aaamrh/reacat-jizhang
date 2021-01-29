import React, { Component } from 'react';
import PropTypes from 'prop-types';


const PriceList = ({ items, onModifyItem, onDeleteItem }) => {

  return  (
    <ul className='list'>
      {
        items.map( item => {
          return <li key={item.id}>
            <span> { item.category.name} </span>
            <span> { item.title } </span>
            <span> 
              { item.category.type === 'income' ? '+' : '-' }
              { item.price } 
              元 
            </span>
            <span> { item.date } </span>
            <button onClick={ ()=>{ onModifyItem(item) } }> 编辑 </button>
            <button onClick={ ()=>{ onDeleteItem(item) } }> 删除 </button>
          </li>
        } )
      }
    </ul>
  )
}

PriceList.propTypes = {
  items: PropTypes.array.isRequired,
  onModifyItem: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func.isRequired
}

PriceList.defaultProps = {
  items: PropTypes.array.isRequired,
  onModifyItem: ()=>{},
  onDeleteItem: ()=>{}
}
export default PriceList