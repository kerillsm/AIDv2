import React, { Component } from 'react';
import ReactSVG from 'react-svg';
{/*import GoalMap from './GoalMap.js';
import Goal from './Goal'*/}
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
import {fetchMaps,checkAuth,logout,isAuthShown,fetchUsername,fetchMultiDecision,updateUserRestriction, fetchIsAdmin} from '../actions';
import Smaps from './Smaps'
{/*import { Carousel } from 'react-responsive-carousel';
import toastr from 'toastr';


*/}


import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import jquery from 'jquery';


import Share from './Share.js';
import AboutUs from './AboutUs.js';
import ContactUs from './ContactUs.js';
import Terms from './Terms.js';
import Footer from './Footer.js';
import Aside from './Aside.js';

{/*import Calendar from './Calendar';*/}
import MapsProfile from './MapsProfile'

import Registration from './Registration.js';
import Profile from './Profile.js';
import Decision from './Decision.js';
import FakeDecision from './FakeDecision';
import Page404 from "./Page404";
import MultiDecision from "./MultiDecision";
import NavRedux from "./NavRedux";

import {fromJS} from 'immutable'

/*import Subscribe from "./Subscribe";
import TasteTheTravel from "./TasteTheTravel";
import SavedTree from "./SavedTree";
import NewTree from './NewTree'
import SharedTasteTheTravel from "./SharedTasteTheTravel";*/
import PersonalDecider from './PersonalDecider/PersonalDecider';
import AdminPanel from './AdminPanel';
import DeciderLog from './DeciderLog';



class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            maps: [],
            isAuthShown: false,
            isRegistration: false,
            isLoggedIn: false,
        };
    }



    componentDidMount() {

        this.props.checkAuth();
        this.props.fetchUsername();
        this.props.fetchIsAdmin();

        const footer = document.querySelector('footer');
        const nav = document.querySelector('nav');
        const aside = document.querySelector('aside.overlayed');
        const windowHeight = window.innerHeight;
        const liDiv = document.querySelectorAll('.li-div');
        document.title = "Your Personal Decider | AI.Decider"

 

    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        if(prevProps.loginStatus !== this.props.loginStatus){
            this.props.checkAuth();
            this.props.fetchUsername()
        }
        if(prevProps.user === null && prevProps.user !== this.props.user){
            this.props.updateUserRestriction(this.props.user)
        }
        // console.log('APP UPDATING');
    }




    render() {
        return (
            <Router>
                <MuiThemeProvider>
                    <div>


                    <Registration
                        isShown={ this.props.isAuth}
                        appState={this}></Registration>


                    <div className="main" id="outer-container">
                        {/*<Nav/>*/}
                        <NavRedux/>

                        <main id="page-wrap">
                            <Switch>
                                <Route exact path="/" component={({ match }) => {
                                    return (<div>
                                        <PersonalDecider />
                                        {/*<Carousel showStatus={false} autoPlay infiniteLoop transitionTime={700} showThumbs={false}>
										     <div>
                                                <img src="/img/header.jpg" alt="AI.Decider - intelligent decision maker!" />
                                            </div>		
                                            <div>
                                                <img src="/img/slide1.png" alt="AI.Decider features: decision sliders" />
                                            </div>
                                            <div>
                                                <img src="/img/slide2.png" alt="AI.Decider features: SMATRT goals setting" />
                                            </div>											
                                            <div>
                                                <img src="/img/slide3.png" alt="AI.Decider features: books and movies suggestion" />
                                            </div>
                                            <div>
                                                <img src="/img/slide4.png" alt="AI.Decider features: Pros and Cons multi-options decision" />
                                            </div>		
                                        </Carousel>*/}
										<div className="smaps">
                                            <Smaps match={match}/>
										</div>
										</div>)
                                }} />
                                
                                <Route path="/controlCenter/:filter" component={({ match }) => {

                                    const { filter } = match.params;

                                    return <MapsProfile filter={filter} match={match}/>
                                }}/>

                                <Route path="/maps/:id" component={({ match }) => {
                                    const self = this;
                                    const { id } = match.params;
                                    const item = this.state.maps.filter((el) => el.id === id)[0];
                                    
                                    return <Decision 
                                                isLoggedIn={this.props.isLoggedIn}
                                                match={match} 
                                                key={Math.random()}
                                                map={item}
                                                id={id}
                                                username={`${this.props.user}`}
                                                >
                                            </Decision>
                                }}/>

								{/* <Route path="/subscribe/:type" component={({ match }) => {
                                    const self = this;
                                    const { type } = match.params;

                                    return <Subscribe type={type} match={match}/>
                                }}/> */}

                                <Route path="/multidecision/:id" component={({ match }) => {

                                    const { id } = match.params;
                                    return <MultiDecision match={match}></MultiDecision>
                                }}/>

                                <Route path="/logs/:id" component={({ match }) => {
                                    return <DeciderLog match={match}></DeciderLog>
                                }} />

                                <Route path="/multidecision" component={MultiDecision} />
                                <Route path="/contact-us" component={ContactUs}/>
                                <Route path="/about" component={AboutUs}/>
                                <Route path="/terms-of-service" component={Terms}/>
                                <Route path="/share/:id" component={Share}/>
                                <Route path="/personal-decider" component={PersonalDecider} />
                                <Route path="/me/profile" component={()=>{

                                    return (<div>
                                        <Profile/>
                                            </div>)                                }}/>

                                {/*<Route path="/goal-map" component={GoalMap}/>
                                <Route path="/calendar" component={Calendar}/>
                                 <Route path="/taste-the-travel/:id" component={({ match }) => {
                                    const { id ,category,subcategory} = match.params;
                                    return <SharedTasteTheTravel id={id}/>
                                }}/>
                                <Route path='/taste-the-travel' component={TasteTheTravel}/>



                                <Route path="/tree/:type" component={({ match }) => {
                                    const { type ,category,subcategory} = match.params;
                                    return <NewTree type={type}/>
                                }}/>

                                <Route path="/savedTree/:type/:id" component={({ match }) => {
                                    const { id ,type,category,subcategory} = match.params;
                                    return <SavedTree id={id} type={type}/>
							   }}/>*/}

                                <Route path="/profile/:goal/:id" component={({ match }) => {
                                    const { id ,category,subcategory} = match.params;
                                    return <Goal isAdmin={this.props.isAdmin} id={id}/>
                                }}/>

                                <Route path="/:category/:subcategory/:id" component={({ match }) => {
                                    const self = this;
                                    const { id ,category,subcategory} = match.params;
                                    const item = this.state.maps.filter((el) => el.id === id)[0];
                                    return <FakeDecision isLoggedIn match={match} key={Math.random()} map={item} id={id} category={category} subcategory={subcategory} username={`${this.props.user}`}></FakeDecision>
                                }}/>

                                <Route path="/:category/:id" component={({ match }) => {
                                    const self = this;
                                    const { id ,category} = match.params;
                                    const item = this.state.maps.filter((el) => el.id === id)[0];
                                    return <FakeDecision 
                                                isLoggedIn 
                                                match={match} 
                                                key={Math.random()} 
                                                map={item} 
                                                id={id} 
                                                category={category} 
                                                username={`${this.props.user}`}>
                                            </FakeDecision>
                                }}/>

                                <Route path="/admin" component={() => <AdminPanel isAdmin={this.props.isAdmin} />} />

                                <Route path='/404' component={Page404}/>
                            </Switch>

                        </main>
                        <Aside/>
                    </div>
                    <Footer></Footer>
                    </div>
                </MuiThemeProvider>
            </Router>
        )
    }

}




const NoFound = ({ match }) => (
    <div>
        <h3>Error 404 page not found</h3>
    </div>
)

const mapStateToProps = state => {
    return {
        isAuth:state.isAuthShown,
        isLoggedIn:state.isLoggedIn.isAuth,
        user:state.username,
        loginStatus:state.login.status,
        isAdmin: state.isAdmin
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({fetchMaps,checkAuth,logout,isAuthShown,fetchUsername,fetchIsAdmin,updateUserRestriction},dispatch);


export default connect(mapStateToProps,mapDispatchToProps)(App);
