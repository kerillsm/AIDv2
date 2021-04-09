import React, {Component} from 'react';
import PropTypes from 'prop-types';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import '../react-big-calendar.css'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchCalendarEvents} from "../actions";
import { Redirect,Link } from 'react-router-dom';
import { Grid, Row, Col } from 'react-flexbox-grid';

BigCalendar.momentLocalizer(moment);



class Calendar extends Component {
    constructor(props){
        super(props);
        this.state = {
            date: Date.now()
        }
    }

    componentDidMount() {
        this.props.fetchCalendarEvents(this.props.user)
    }


    render() {

 
        if (this.props.isLoggedIn === false ) return <Redirect to="/" />
        return (
            <div style={{'height':'900px'}}>
					    <Grid className="profile">
			    <Row className="profileheader">
					<Col xs>
						<h2><Link to="/me/profile">Profile</Link> | My Calendar</h2>
					</Col>
			    </Row>
							</Grid>
				<div style={{'height':'800px','margin':'10px 10px 20px 10px'}}>
                <BigCalendar
                    events={this.props.data}
                    views={['month']}
                    step={60}
                    showMultiDayTimes
                    defaultDate={new Date()}
                    popup={true}
                    onSelectEvent={e=>{if(e.type === 'goals'){
                        this.props.history.push(`profile/goal/${e.id}`)
                    }
                        if(e.type === 'maps'){
                            this.props.history.push(`maps/${e.id}`)
                        }
                        if(e.type === 'procon'){
                            this.props.history.push(`multidecision/${e.id}`)
                        }
                    }}
                />
            </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn:state.isLoggedIn.isAuth,
        user:state.username,
        isAuth:state.isAuthShown,
        data:state.calendarEvents.toJS()
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({fetchCalendarEvents},dispatch)

export default connect(mapStateToProps,mapDispatchToProps)(Calendar);
