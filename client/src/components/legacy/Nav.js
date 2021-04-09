import React, { Component } from 'react';
import ReactSVG from 'react-svg';
import GoalMap from './GoalMap.js';
import {
    BrowserRouter as Router,
    Route,
    Link,
    NavLink,
    Switch,
    Redirect
} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchMaps,checkAuth,logout,isAuthShown,fetchUsername} from '../actions';







import Share from './Share.js';
import AboutUs from './AboutUs.js';
import ContactUs from './ContactUs.js';
import Terms from './Terms.js';
import Footer from './Footer.js';
import Aside from './Aside.js';

import Registration from './Registration.js';
import Profile from './Profile.js';
import Decision from './Decision.js';


class Nav extends Component {
    constructor(props) {
        super(props);

        this.state = {
            maps: [],
            isAuthShown: false,
            isRegistration: false,
            isLoggedIn: false,
        };
    }


    componentWillMount() {


        this.props.fetchMaps();
        this.props.checkAuth();
        this.props.fetchUsername()

    }



    componentWillUpdate(nextProps, nextState, nextContext) {
        if (this.props.isLoggedIn === nextState.isLoggedIn.isAuth){
            return false
        }

        if(this.props.username === nextState.username){
            return false
        }
        //if(nextState.login !== undefined){toastr.success(nextState.login.info)}
    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        this.props.fetchUsername()
        this.props.checkAuth();
    }




    render() {

        return (
            <nav class="main-menu">
                <ul>
                    <li>
                        <Link to={'/'}>
                            <ReactSVG path="/img/home.svg"/>
                            <span class="nav-text">
                          Home
                        </span></Link>


                    </li>
                    <li>
                        <Link to={'/multidecision'}>
                            <ReactSVG path="/img/levels-controls.svg"/>
                            <span class="nav-text">
                          Pros\Cons
                        </span></Link>


                    </li>

                    <li class="has-subnav">
                        <a>
                            <ReactSVG path="/img/decision.svg"/>
                            <span class="nav-text">
                              Make Decision
                          </span>
                        </a>
                        <div className="li-div">
                            {this.props.maps.length>0 && this.props.maps.map((el, id) => {
                                return <Link to={`/maps/${el.id}`} key={id}>{el.title}</Link>
                            })}
                        </div>

                    </li>
                    <li>
                        <Link to={'/goal-map'}>
                            <ReactSVG path="/img/levels-controls.svg"/>
                            <span class="nav-text">
                          Set Goal
                        </span></Link>


                    </li>
                    {/*   <li>
                      <a>
                          <ReactSVG path="/img/levels-controls.svg"/>
                          <span class="nav-text">
                              Data tree
                          </span>
                      </a>
                   </li> */}

                    {this.props.isLoggedIn ? (
                            <li class="has-subnav">
                                <Link to="/me/profile">
                                    <ReactSVG path="/img/avatar.svg"/>
                                    <span class="nav-text">
                                Profile
                            </span>
                                </Link>
                            </li>
                        )
                        :
                        ' '}

                    <li>
                        {this.props.isLoggedIn ? (<a href="#" onClick={() => {
                                this.props.logout()
                            }}>
                                <ReactSVG path="/img/logout.svg"/>
                                <span class="nav-text">
                              Logout
                          </span>
                            </a>)
                            :
                            (<li class="has-subnav">
                                <a href="#" onClick={() => {
                                    //console.log('this state', this.state.isAuthShown);
                                    this.props.isAuthShown(true);
                                }}>
                                    <ReactSVG path="/img/login.svg"/>
                                    <span class="nav-text">
                                Log In
                            </span>
                                </a>
                            </li>)}
                    </li>
                </ul>
            </nav>
        )
    }

}






const mapStateToProps = state => {
    return {
        maps:state.maps,
        isLoggedIn:state.isLoggedIn.isAuth,
        isAuth:state.isAuthShown,
        user:state.login.user

    }
}

const mapDispatchToProps = dispatch => bindActionCreators({fetchMaps,checkAuth,logout,isAuthShown,fetchUsername},dispatch);


export default connect(mapStateToProps,mapDispatchToProps)(Nav);
