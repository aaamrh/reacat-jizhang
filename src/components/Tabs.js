import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LIST_VIEW, CHART_VIEW } from '../utils'


const genLinkClass = ( current, view ) => {
  return (current === view) ? 'active' : '';
}

export class Tabs extends Component {
  static propTypes={
    activeIndex: PropTypes.number.isRequired,
    onTabChange: PropTypes.func.isRequired
  }

  constructor(props){
    super(props)
    this.state = {
      activeIndex: props.activeIndex
    }
  }

  tabChange = (event, index) => {
    event.preventDefault()
    this.setState({
      activeIndex: index
    })

    this.props.onTabChange(index)
  }
  
  render() {
    const {children} = this.props;
    const { activeIndex } = this.state
    return (
      <ul className="nav nav-tabs nav-fill">
        { React.Children.map(children, (child, index) => {
          const activeClassName = (activeIndex === index) ? 'nav-link active' : 'nav-link'
          return (
            <li className={ activeClassName }
              onClick = { (event) => {this.tabChange(event, index)} }
            > 
              <a href="#!"> {child} </a>
            </li>
          )
        }) }  
      </ul>
    );
  }
}


export const Tab = ({children}) => <>
  { children }
</>