import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Redirect,Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { updateUserRestriction} from '../actions';
import axios from 'axios'

class Subscribe extends Component {
    constructor(props){
        super(props)
        this.state = {
            loaded:false,
            status:null,
            cancelStatus:null
        }
    }
    componentDidMount() {
        if(this.props.type === 'month' && this.props.user !== null ){
            console.log(this.props.user)
            axios.get(`/api/paypal/checking/month/${this.props.user}/${window.location.href.split('=')[1]}`).then(res=>{
                this.setState({
                    loaded:true,
                    status:res.data
                })
            })
        }
        if(this.props.type === 'year' && this.props.user !== null ){
            console.log(this.props.user)
            axios.get(`/api/paypal/checking/year/${this.props.user}/${window.location.href.split('=')[1]}`).then(res=>{
                this.setState({
                    loaded:true,
                    status:res.data
                })
            })
        }
        if(this.props.type === 'canceling' && this.props.user !== null){
            this.setState({

                cancelStatus:true
            })
        }
    }

    render() {
        console.log('Subscribe State', this.state)
        return (
            <div>
                {(this.state.status && this.state.loaded) === true && <p>Success</p>}
                {(this.state.status) === false && <p>Failure</p>}
                {(this.state.cancelStatus)=== true && <p>Canceling is success</p>}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        isLoggedIn:state.isLoggedIn.isAuth,
        user:state.username,
        userRestriction:state.userRestriction

    }


}

const mapDispatchToProps = dispatch => bindActionCreators({updateUserRestriction},dispatch);

export default connect(mapStateToProps,mapDispatchToProps)(Subscribe);
