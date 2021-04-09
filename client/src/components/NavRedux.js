import React, {Component} from 'react';
import { slide as Menu } from 'react-burger-menu'
import {List,Map,fromJS} from 'immutable'
import {
    BrowserRouter as Router,
    Route,
    Link,
    NavLink,
    Switch,
    Redirect
} from 'react-router-dom';
import {checkAuth, fetchMaps, fetchUsername, isAuthShown, logout} from "../actions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import axios from 'axios'



let styles = {
    bmBurgerButton: {
        position: 'absolute',
        width: '36px',
        height: '30px',
        left: '20px',
        top: '10px'
    },
    bmBurgerBars: {
        background: ' rgb(0, 188, 212)'
    },
    bmCrossButton: {
        height: '24px',
        width: '24px'
    },
    bmCross: {
        background: 'rgb(255, 64, 129)'
    },
    bmMenu: {
        background: 'rgba(255,255,255,0.95)',
        padding: '1.0em 1.0em 0',
        fontSize: '1.15em'
    },
    bmMorphShape: {
        fill: '#373a47'
    },
    bmItemList: {
        color: ' rgb(0, 188, 212)',
        paddingTop: '50px'
    },
    bmOverlay: {
        background: 'rgba(0, 0, 0, 0.3)',
		
    }
}


class NavRedux extends Component {
    constructor(props) {
        super(props);
            this.state = {
            maps: [],
            isAuthShown: false,
            isOpen: false,
            isRegistration: false,
            isLoggedIn: false,
            items :[],
            login:{},
                fetchedMenu:[]
        };
        this.handleClick = this.handleClick.bind(this)
    }


    componentDidMount() {

        this.props.checkAuth();
        //this.props.fetchUsername()
        axios.get('/api/user/maps/admin').then(data=>{

            this.setState({
                fetchedMenu:[...data.data.map(item=>{
                    return {
                        to:`/maps/${item.id}`,
                        name:`${item.title}`,
                        id:50
                    }
                })]
            })
            this.setState({
                items:[

				    {
                        to:'/personal-decider',
                        name:'Your Personal Decider',
                        id:1
                    },

                    {
                        to:'/multidecision',
                        name:'Pros&Cons Decision',
                        id:2

                    },
                    /*{
                        to:'/goal-map',
                        name:'Set Goal',
                        id:3
                    },
					{
                        to:'/tree/movie',
                        name:'What to Watch?',
                        id:4
                    },
                    {
                        to:'/tree/book',
                        name:'What to Read?',
                        id:5
                    },
                    {
                        to:'/taste-the-travel',
                        name:'Taste The Travel',
                        id:6
			},*/
                    {
                        to:null,
                        child:this.state.fetchedMenu,
                        name:'Make Decision',
                        id:49
                    }


                ].sort((a,b)=>{
                    return a.id-b.id
                })
            })
        })

    }







    handleOpen = () => {
        this.setState({
            isOpen:false
        })
    }



    handleClick = (item) => {

        let _state = List(fromJS(this.state.items));

        let obj = Map(fromJS(item));
        let childArr = obj.get('child')
        if(_state.includes(childArr.get(0))){
            this.setState({
                isOpen:true,
                items:[
					{
                        to:'/personal-decider',
                        name:'Your Personal Decider',
                        id:1
                    },
                    {
                        to:'/multidecision',
                        name:'Pros&Cons Decision',
                        id:2

                    },
                    /*{
                        to:'/goal-map',
                        name:'Set Goal',
                        id:3

                    },
					{
                        to:'/tree/movie',
                        name:'What to Watch?',
                        id:4
                    },
                    {
                        to:'/tree/book',
                        name:'What to Read?',
                        id:5
                    },
                    {
                        to:'/taste-the-travel',
                        name:'Taste The Travel',
                        id:6
                    },*/
                    {
                        to:null,
                        child:this.state.fetchedMenu,
                        name:'Make Decision',
                        id:49
                    }



                ].sort((a,b)=>{
                    return a.id-b.id
                })
            })
        }
        else {

            let _state = List(fromJS(this.state.items));
            let itemIndex = _state.findIndex(data=>data.get('name') === item.name)
            let beforeIndexArr = _state.slice(0,itemIndex)
            let indexArr = List().push(_state.get(itemIndex))

            let afterIndexArr = _state.slice(itemIndex+1,_state.size)
            let res = (beforeIndexArr.toSet().union(indexArr.toSet()).union(childArr.toSet()).union(afterIndexArr.toSet())).toList()


            //const items = List(fromJS(this.state.items)).toSet().union(childArr.toSet()).toList()
            this.setState({
                items:res.sortBy(item=>item.get('id')).toJS(),
                isOpen:true
            })
        }
    }





    render() {

        return (
            <div className={'nav__redux'}>
                <Menu isOpen={ this.state.isOpen} styles={styles} noOverlay >
                    {this.state.items.map(value => {

                        if(value.child === undefined){
                            return (<NavLink key={value.name} to={`${value.to}`} onClick={()=>this.handleOpen()} exact  >{value.name}</NavLink>)
                        }
                        else {
                             return (<p key={value.name} onClick={()=>{this.handleClick(value)}} >{value.name}</p>)
                            //return(<a onClick={ this.showSettings(this.handleClick(value)) } className="menu-item--small" href="">Settings</a>)
                        }
                    })}
                </Menu>
				<div className="links">
                <Link to={'/'} className="logo">AI.Decider</Link>
				<div className="links2">
				{this.props.isLoggedIn === true ? (
                    <NavLink  className="logo" to="/me/profile"
                             onClick={()=>this.handleOpen()}
                    >
                        Profile
                    </NavLink>

                ):null}
                {
                    this.props.isLoggedIn === true? (<a  className="logo" href="#" onClick={() => {
                            this.handleOpen();
                            this.props.logout()
                        }}>
                            Log out

                        </a>)
                        :
                        (
                            <a  className="logo" href="#" onClick={() => {
                                this.handleOpen();
                                this.props.isAuthShown(true);
                            }}>
                                Create an account

                            </a>
                        )
                }
                 </div>
               </div>  
            </div>

        );
    }
}


const mapStateToProps = state => {
    return {
        maps:state.maps.toJS(),
        isLoggedIn:state.isLoggedIn.isAuth,
        user:state.username,
        isAuth:state.isAuthShown,
        login:state.login.status

    }
}

const mapDispatchToProps = dispatch => bindActionCreators({fetchMaps,checkAuth,logout,isAuthShown,fetchUsername},dispatch);


export default connect(mapStateToProps,mapDispatchToProps)(NavRedux);
