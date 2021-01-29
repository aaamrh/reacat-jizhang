import React from 'react'
import PropTypes from 'prop-types'

const CreateBtn = ({ onClick }) => (
  <button
    className="btn btn-primary" 
    onClick={ (e) => { onClick() } }
  >
    记账
  </button>
)

CreateBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
}
export default CreateBtn