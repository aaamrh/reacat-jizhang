import PropTypes from 'prop-types';


const TotalPrice = ({income, outcome}) => {
  return(
    <div>
      <span>收入: <span style={{color: 'red'}} >{income}</span></span>
      <span>支出: <span style={{color: '#4caf50'}} >{outcome}</span> </span>
    </div>
  )
}

TotalPrice.propTypes = {
  income: PropTypes.number.isRequired,
  outcome: PropTypes.number.isRequired,
}

TotalPrice.defaultProps = {
  income: 0,
  outcome: 0
}

export default TotalPrice