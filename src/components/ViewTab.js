import PropTypes from 'prop-types';
import { LIST_VIEW, CHART_VIEW } from '../utils'

import './index.css'

const genLinkClass = ( current, view ) => {
  return (current === view) ? 'active' : '';
}


const ViewTab = ({ activeTab, onTabChange }) => {

  return(
    <div className="m-tab"> 
      <span className={ genLinkClass(activeTab, LIST_VIEW) }
        onClick = { () => onTabChange(LIST_VIEW) }
      > 
        <a href="#!"> 列表模式 </a>
      </span>

      <span className={genLinkClass(activeTab, CHART_VIEW)}
        onClick = { () => onTabChange(CHART_VIEW) }
      > 
        <a href="#!"> 图表模式 </a>
      </span>
    </div>
  )
}


ViewTab.propTypes = {
  onTabChange: PropTypes.func.isRequired
}
ViewTab.defaultProps = {
  onTabChange: ()=>{}
}

export default ViewTab