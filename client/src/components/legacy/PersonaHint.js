import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment'

class PersonaHint extends Component {
    constructor(props){
        super(props)

    }

    fun = (time) =>{
        console.log(time)
        const res = new moment.duration(time);
        return (res.asDays()+1).toFixed()

    }
    render() {
        console.log('props',this.props);
        const res = (((this.props.first/15)/2)*100).toFixed(1)
        return (
            <div className="goalt">
                {this.props.time !== null? <p>You have {this.fun(Date.parse(this.props.time)-Date.now())} day(s) left to meet your goal!</p>: null}
                <p>Your goal is {res}% accurate. Please focus on the following unmarked setting criteria.</p>
                {res>=80?<div style={{'backgroundColor':'pink'}}><p>Accuracy of Your Goal-setting is stunning!</p></div>:null}
            </div>
        );
    }
}

PersonaHint.propTypes = {};
PersonaHint.defaultProps = {};

export default PersonaHint;
