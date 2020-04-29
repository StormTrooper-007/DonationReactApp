import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {setCompletedToggle} from  '../../actions/completedActions'
import './Completed.css'

class Completed extends Component {
    completedToggler = () => {
        const {setCompletedToggle} = this.props
        setCompletedToggle()
    }
   
    render() {
        const {completedToggle} = this.props.completed
        return (
            
            <label className="switch">
                <input 
                type="checkbox" 
                data-toggle="toggle"
                checked={!!completedToggle} 
                onChange={this.completedToggler}/>
                <span className="slider round"></span>
            </label>
        )
    }
}

Completed.propTypes = {
    completed:PropTypes.object.isRequired,
    setCompletedToggle:PropTypes.func.isRequired,
}

export default connect((state, props) => ({
    auth:state.firebase.auth,
    completed:state.completed
}), {setCompletedToggle})(Completed)

