import React, {Component} from 'react';
import DatePicker from 'material-ui/DatePicker';
import GoalHint from "./GoalHint";
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    fetchMapsProfile,fetchUsername, fetchSliderProfile, fetchTreesProfile, postGoal, checkAuth,saveGoalUserRestriction,updateUserRestriction
} from '../actions'
import toastr from "toastr";
import TextField from 'material-ui/TextField';
import { Grid, Row, Col } from 'react-flexbox-grid';
import guid from 'uuid/v1'
import axios from "axios/index";
import { Paper, Typography } from '@material-ui/core';
import MetaTags from 'react-meta-tags'



class GoalMap extends Component {

    constructor(props){
        super(props);
        const minDate = new Date();
        minDate.setFullYear(minDate.getFullYear() );
        minDate.setHours(0, 0, 0, 0);

        this.state = {
            blockOneItem:[{name:'Specific',selected:false},{name:'Measurable',selected:false},{name:'Assignable',selected:false},{name:'Realistic',selected:false},{name:'Time-related',selected:false}],
            blockTwoItem:[{name:'Positively stated',selected:false},{name:'Understood',selected:false},{name:'Relevant',selected:false},{name:'Ethical',selected:false}],
            blockThreeItem:[{name:'Challenging',selected:false},{name:'Legal',selected:false},{name:'Environmentally friendly',selected:false},{name:'Agreed',selected:false},{name:'Recorded',selected:false}],
            value:'',
            selectedArr:[],
            specificArr:[],
            measurableArr:[],
            realisticArr:[],
            assignableArr:[],
            positivelyStatedArr:[],
            understoodArr:[],
            relevantArr:[],
            ethicalArr:[],
            challengingArr:[],
            legalArr:[],
            environmentallyFriendlyArr:[],
            agreedArr:[],
            controlledDate: null,
            minDate: minDate,
            blockOneVar:[],
            blockTwoVar:[],
            blockThreeVar:[],
            date:Date.now(),
            response:{success:null}
        }

    }

    smartGoal = {
        specific:['clear-cut'],
        measurable:['acre'],
        realistic:['businesslike'],
        assignable:['i']
    }

    pureGoal = {
        relevant:['clear-cut'],
        understood:['businesslike'],
        positivelyStated:['abysmal'],
        ethical:['accuse']
    }

    clearGoal = {
        agreed:['acknowledge'],
        legal:['accuse'],
        challenging:['accurate'],
        environmentallyFriendly:['acid rain']
    }




    handleChange = (e) =>{
        this.setState({
            value: e.target.value
        });

        this.setState({
            selectedArr:e.target.value.split(/[,.!?&;:/]| /)
        })


    };

    handleChangeDate = (event, date) => {
        this.setState({
            controlledDate: date
        });
        this.state.blockOneItem[4].selected = true
    };

    componentDidMount() {
        if(this.props.user !== null){
            this.props.updateUserRestriction(this.props.user)
        }

    }




    componentWillUpdate(nextProps, nextState, nextContext) {
        console.log('Renewing...');
        if(this.state.value.length !== nextState.value.length || this.state.controlledDate !== nextState.controlledDate || this.props.isAuth !== nextProps.isAuth || this.props.isLoggedIn !== nextProps.isLoggedIn || this.props.maps !== nextProps.maps || this.props.login.info !== nextProps.login.info || this.props.login.status !== nextProps.login.status || this.props.login.user !== nextProps.login.user || this.state.register !== nextState.register){
            this.setState({
                specificArr:[],
                measurableArr:[],
                realisticArr:[],
                assignableArr:[],
                positivelyStatedArr:[],
                understoodArr:[],
                relevantArr:[],
                ethicalArr:[],
                challengingArr:[],
                legalArr:[],
                environmentallyFriendlyArr:[],
                agreedArr:[],
                blockOneVar:[],
                blockTwoVar:[],
                blockThreeVar:[]
            })

        }

    }
    postGoal = (goal,user,smart,pure,clear,targetDate,date,id,_public) =>  {
        const publicStatus = _public !== undefined ? _public : false
        const data = {
            goal,
            user,
            smart,
            pure,
            clear,
            enddate:targetDate,
            date,
            id,
            publicStatus
        }
         axios.post(`/api/goal/save`,data).then(res=>{
            this.setState({
                response:res.data
            })
        })

    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        if(prevState.response.success !== this.state.response.success){
            toastr.success(this.state.response.success).toString()
            this.props.saveGoalUserRestriction(this.props.user)
        }


    }


    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.state.value.length !== nextState.value.length || this.state.controlledDate !== nextState.controlledDate || this.props.isAuth !== nextProps.isAuth || this.props.isLoggedIn !== nextProps.isLoggedIn || this.props.maps !== nextProps.maps || this.props.login.info !== nextProps.login.info || this.props.login.status !== nextProps.login.status || this.props.login.user !== nextProps.login.user || this.state.register !== nextState.register || this.state.response.success !== nextState.response.success || this.props.userRestriction.goalsCounter !== nextProps.userRestriction.goalsCounter
    }




    addHover = () => {



        this.state.selectedArr.map((item) => {
            this.state.specificArr.push(this.smartGoal.specific.includes(item.toLowerCase()))
        });
        this.state.specificArr.includes(true) ? this.state.blockOneItem[0].selected = true : this.state.blockOneItem[0].selected = false;

        this.state.selectedArr.map((item) => {
            this.state.measurableArr.push(this.smartGoal.measurable.includes(item.toLowerCase()))
        });
        this.state.measurableArr.includes(true) ? this.state.blockOneItem[1].selected = true : this.state.blockOneItem[1].selected = false;

        this.state.selectedArr.map((item) => {
            this.state.assignableArr.push(this.smartGoal.assignable.includes(item.toLowerCase()))
        });
        this.state.assignableArr.includes(true) ? this.state.blockOneItem[2].selected = true : this.state.blockOneItem[2].selected = false;

        this.state.selectedArr.map((item) => {
            this.state.realisticArr.push(this.smartGoal.realistic.includes(item.toLowerCase()))
        });
        this.state.realisticArr.includes(true) ? this.state.blockOneItem[3].selected = true : this.state.blockOneItem[3].selected = false;



        this.state.selectedArr.map((item) => {
            this.state.positivelyStatedArr.push(this.pureGoal.positivelyStated.includes(item.toLowerCase()))
        });
        if(this.state.selectedArr.length > 1){
            this.state.positivelyStatedArr.includes(true)  ? this.state.blockTwoItem[0].selected = false : this.state.blockTwoItem[0].selected = true;
        }
        if(this.state.selectedArr.length === 1 && this.state.selectedArr.length){
            this.state.blockTwoItem[0].selected = false
        }

        this.state.selectedArr.map((item) => {
            this.state.understoodArr.push(this.pureGoal.understood.includes(item.toLowerCase()))
        });
        this.state.understoodArr.includes(true) ? this.state.blockTwoItem[1].selected = true : this.state.blockTwoItem[1].selected = false;

        this.state.selectedArr.map((item) => {
            this.state.relevantArr.push(this.pureGoal.relevant.includes(item.toLowerCase()))
        });
        this.state.relevantArr.includes(true) ? this.state.blockTwoItem[2].selected = true : this.state.blockTwoItem[2].selected = false;


        this.state.selectedArr.map((item) => {
            this.state.ethicalArr.push(this.pureGoal.ethical.includes(item.toLowerCase()))
        });
        if(this.state.selectedArr.length > 1){
            this.state.ethicalArr.includes(true)  ? this.state.blockTwoItem[3].selected = false : this.state.blockTwoItem[3].selected = true;
        }
        if(this.state.selectedArr.length === 1 && this.state.selectedArr.length){
            this.state.blockTwoItem[3].selected = false
        }


        this.state.selectedArr.map((item) => {
            this.state.challengingArr.push(this.clearGoal.challenging.includes(item.toLowerCase()))
        });
        this.state.challengingArr.includes(true) ? this.state.blockThreeItem[0].selected = true : this.state.blockThreeItem[0].selected = false;


        this.state.selectedArr.map((item) => {
            this.state.legalArr.push(this.clearGoal.legal.includes(item.toLowerCase()))
        });
        if(this.state.selectedArr.length > 1){
            this.state.legalArr.includes(true)  ? this.state.blockThreeItem[1].selected = false : this.state.blockThreeItem[1].selected = true;
        }
        if(this.state.selectedArr.length === 1 && this.state.selectedArr.length){
            this.state.blockThreeItem[1].selected = false
        }

        this.state.selectedArr.map((item) => {
            this.state.environmentallyFriendlyArr.push(this.clearGoal.environmentallyFriendly.includes(item.toLowerCase()))
        });
        this.state.environmentallyFriendlyArr.includes(true) ? this.state.blockThreeItem[2].selected = true : this.state.blockThreeItem[2].selected = false;

        this.state.selectedArr.map((item) => {
            this.state.agreedArr.push(this.clearGoal.agreed.includes(item.toLowerCase()))
        });
        this.state.agreedArr.includes(true) ? this.state.blockThreeItem[3].selected = true : this.state.blockThreeItem[3].selected = false;

        this.state.value.length > 40 ? this.state.blockThreeItem[4].selected = true : this.state.blockThreeItem[4].selected = false;

        if(this.state.value.match(/[0-9]/) !== null){
            this.state.blockOneItem[0].selected = true;
            this.state.blockOneItem[1].selected = true;
            this.state.blockTwoItem[2].selected = true;
        }


        this.state.blockOneItem.filter(item=>{
            if(item.selected === true){
                this.state.blockOneVar.push(item)
            }
        })

        this.state.blockTwoItem.filter(item=>{
            if(item.selected === true){
                this.state.blockTwoVar.push(item)
            }
        })

        this.state.blockThreeItem.filter(item=>{
            if(item.selected === true){
                this.state.blockThreeVar.push(item)
            }
        })






    };

    addH2Style =() => {
        return this.state.blockOneItem.filter(item => {
            return item.selected===true
        }).length === this.state.blockOneItem.length;
    };

    addH22Style =() => {
        return this.state.blockTwoItem.filter(item => {
            return item.selected===true
        }).length === this.state.blockTwoItem.length;
    };

    addH23Style =() => {
        return this.state.blockThreeItem.filter(item => {
            return item.selected===true
        }).length === this.state.blockThreeItem.length;
    };


    saveAndShare = () => {
        const id = guid()
        let promise = new Promise((resolve, reject) => {
            resolve(this.postGoal(this.state.value, this.props.user, this.state.blockOneItem,this.state.blockTwoItem, this.state.blockThreeItem, Date.parse(`${this.state.controlledDate}`),this.state.date,id,true))
        })
        promise.then(this.props.saveGoalUserRestriction(this.props.user)).then(this.props.history.push(`/profile/goal/${id}`))



    }




    render() {
        console.log(this.state )
        return (
            <div className="goal">

		<Paper elevation={1} className="dashboard-paper">
			<Typography component="h5">Let us help you to set high-quality life goals with SMART AI support!</Typography>
			<Typography component="p">Type your goal like: "I would like to learn 500 kanji symbols" and pick milestone for this goal!</Typography>
		</Paper>

                <MetaTags>
                    <title>Set New Goal | AI.Decider</title>
                    <meta name="og:description" content="Set your high-quality life goals with SMART, PURE and CLEAR goal-setting accuracy" />
                    <meta property="og:title" content="Set New Goal | AI.Decider" />
                </MetaTags>

<Grid>
			<Row end="xs">
                <Col xs={3} sm={3} md={3} lg={2}>
                     {this.state.controlledDate === null || this.state.value.length === 0
                        ?<RaisedButton label="Save" primary={true} disabled={true} />
                        :<RaisedButton label="Save" primary={true} disabled={this.props.isLoggedIn === false || this.props.userRestriction.goalsCounter === 0 } onClick={() => this.postGoal(this.state.value, this.props.user, this.state.blockOneItem,this.state.blockTwoItem, this.state.blockThreeItem, Date.parse(`${this.state.controlledDate}`),this.state.date)}/>
                    }
                </Col>
                <Col xs={3} sm={3} md={3} lg={2}>
                   {this.state.controlledDate === null || this.state.value.length === 0
                        ?<RaisedButton label="Share" primary={true} disabled={true} />
                        :<RaisedButton label="Share" primary={true} disabled={this.props.isLoggedIn === false || this.props.userRestriction.goalsCounter === 0 } onClick={() => this.saveAndShare()}/>
                    }
                </Col>

			</Row>
			<Row xs>
		
                        <TextField className="goal-input"
                            hintText="1. Type your Goal here *"
                            onChange={event => this.handleChange(event)}
                            value={this.state.value}
                            onKeyDown={this.addHover()}
                        />

					<DatePicker className="goal-date"
						hintText="2. Set target date *"
						value={this.state.controlledDate}
						onChange={this.handleChangeDate}
						minDate={this.state.minDate}

					/>



			</Row>

			<Row>
                <Col xs>
			    <GoalHint
                    time={this.state.controlledDate}
                    first = {this.state.blockOneVar.length}
                    second = {this.state.blockTwoVar.length}
                    third = {this.state.blockThreeVar.length}
                />
                </Col>
			</Row>
			
			<Row>
                <Col xs>
				<div className="goalt">
                    <h2 className={this.addH2Style() === true ? 'selected':''}>SMART Goal</h2>
                    {this.state.blockOneItem.map(item => <p className={item.selected === true ? 'selected':''} key={item.name}>{item.name}</p>)}
                </div>
                </Col>
                <Col xs>
                <div className="goalt">
                    <h2 className={this.addH23Style() === true ? 'selected':''}>CLEAR Goal</h2>
                    {this.state.blockThreeItem.map(item => <p className={item.selected === true ? 'selected':''} key={item.name}>{item.name}</p>)}
                </div>
                </Col>
                <Col xs>
                <div className="goalt">
                    <h2 className={this.addH22Style() === true ? 'selected':''}>PURE  Goal</h2>
                    {this.state.blockTwoItem.map(item => <p className={item.selected === true ? 'selected':''} key={item.name}>{item.name}</p>)}
                </div>
                </Col>

			</Row>
</Grid>
			    <aside className="overlayed">
                    <div className="block">
                        <h4>Goal Tips</h4>
						<ol type="1">
                        <li>Type your goal</li>
                        <li>Set milestone</li>
						<li>Check your goal setting accuracy</li>
                        <li>Don't forget to share your goal!</li>
						</ol>
                        <h3>Privacy</h3>
					
                        <p>All Shared Goals are accessible from Internet network  for all users, you are sharing your Goal by clicking on Save&Share button</p>
						
                    </div>
                </aside>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn:state.isLoggedIn.isAuth,
        user:state.username,
        isAuth:state.isAuthShown,
        maps:state.maps,
        login:state.login,
        goal:state.goal,
        userRestriction:state.userRestriction.toJS()
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({fetchMapsProfile,postGoal,checkAuth,fetchUsername,saveGoalUserRestriction,updateUserRestriction},dispatch)


export default connect(mapStateToProps,mapDispatchToProps)(GoalMap)
