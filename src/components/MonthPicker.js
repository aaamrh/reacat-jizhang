/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { range } from '../utils'



class MonthPicker extends Component {
  constructor(props){
    super(props)
    this.state = {
      isOpen: false,
      selectedYear: this.props.year,
      selectedMonth: this.props.month,
    }
  }

  componentDidMount(){
    document.addEventListener('click', this.handleClick, false)
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, false)
    console.log('will unmount')
  }
  
  handleClick = (event) => {
    // GET
    console.log('this.node', this.node)
    if (this.node.contains(event.target)) {
      return;
    }
    this.setState({
      isOpen: false,
    })
  }

  toggleDropDown = (ev) => {
    ev.preventDefault()
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  selectYear = (ev, yearNum) => {
    ev.preventDefault();
    this.setState({
      selectedYear: yearNum
    })
  }

  selectMonth = (ev, monthNum) => {
    ev.preventDefault()
    this.setState({
      isOpen: !this.state.isOpen,
      selectedMonth: monthNum
    })

    this.props.onChange( this.state.selectedYear, monthNum )
  }

  render() {

    const { year, month } = this.props

    const { selectedYear, selectedMonth } = this.state

    const monthRange = range(12, 1);

    const yearRange = range(9, -4).map( number => number + year )

    return (
      // GET ref, 获取DOM节点
      <div className="dropdown month-picker-component" ref={(ref) => { this.node = ref }}> 
        <h4>选择月份</h4>
        <button 
          className="btn btn-secondary dropdown-toggle" 
          onClick={ this.toggleDropDown }
        >
          { `${ selectedYear } 年 ${ selectedMonth } 月` }
        </button>

        { this.state.isOpen && 
          <div className="dropdown-menu" style={{display: 'block'}}>
            <div className="row">
              <div className="col border-right">
                { yearRange.map( (yearNum, index) => <a key={index} href='#'
                    className={ (yearNum === selectedYear) ? 'dropdown-item active' : 'dropdown-item'}
                    onClick = { (ev) => { this.selectYear(ev, yearNum) } }
                  >
                    { yearNum } 年
                  </a> ) 
                }
              </div>
              <div className="col">
              { monthRange.map( (monthNum, index) => <a key={index} href='#'
                className={ (monthNum === selectedMonth) ? 'dropdown-item active' : 'dropdown-item'}
                onClick = { (ev) => this.selectMonth(ev, monthNum) }
              >
                  { monthNum } 月
                </a> ) }
              </div>
            </div>
          </div>
        }
    </div>
    );
  }
}

export default MonthPicker;