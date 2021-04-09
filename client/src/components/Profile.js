import React from 'react';
import { Redirect,Link,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchLastMaps,fetchTreesProfile,fetchSliderProfile,sortAsc,sortDesc,searchMaps,deleteMap,fetchPie,fetchGoalsBar,fetchGoals,fetchLastMultiDecision,fetchLastSavedTrees,updateUserRestriction,fetchAchievements} from '../actions'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import PieProfile from './dumb/PieProfile'
import BarProfile from './dumb/BarProfile'
import { Grid, Row, Col } from 'react-flexbox-grid';
import Aside from "./Aside";
import axios from 'axios'


class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        mapsProfile:[],
        openMonth: false,
        openYear: false,
        id:null,
        goals:null,
        lastMaps:null,
        cancelStatusMonth:null,
        cancelStatusYear:null

    }


  }


    componentDidMount() {
        if(this.props.user !== null){
            this.props.fetchLastMaps(`${this.props.user}`)
            this.props.fetchPie(this.props.user)
            this.props.fetchGoalsBar(this.props.user)
            this.props.fetchGoals(this.props.user)
            this.props.fetchLastMultiDecision(this.props.user)
            this.props.fetchLastSavedTrees(this.props.user)
            this.props.updateUserRestriction(this.props.user)
            this.props.fetchAchievements(this.props.user)
        }
    }



    componentDidUpdate(prevProps, prevState, prevContext) {
        if(prevProps.user !== this.props.user){
            this.props.fetchLastMaps(`${this.props.user}`)
            this.props.fetchPie(this.props.user)
            this.props.fetchGoalsBar(this.props.user)
            this.props.fetchGoals(this.props.user)
            this.props.fetchLastMultiDecision(this.props.user)
            this.props.fetchLastSavedTrees(this.props.user)
            this.props.updateUserRestriction(this.props.user)
            this.props.fetchAchievements(this.props.user)
        }
        if(prevProps.delete.status !== this.props.delete.status){
            this.props.fetchLastMaps(`${this.props.user}`)
            this.props.fetchPie(this.props.user)
            this.props.fetchGoalsBar(this.props.user)
            this.props.fetchGoals(this.props.user)
            this.props.fetchLastMultiDecision(this.props.user)
            this.props.fetchLastSavedTrees(this.props.user)
            this.props.fetchAchievements(this.props.user)
        }
        if(prevState.open === true && prevState.open !== this.state.open){
            this.props.fetchLastMaps(`${this.props.user}`)
            this.props.fetchPie(this.props.user)
            this.props.fetchGoalsBar(this.props.user)
            this.props.fetchGoals(this.props.user)
            this.props.fetchLastMultiDecision(this.props.user)
            this.props.fetchLastSavedTrees(this.props.user)
            this.props.fetchAchievements(this.props.user)
        }


    }

    handleOpenMonth = () => {
        this.setState({openMonth: true});
    };

    handleCloseMonth = () => {
        this.setState({openMonth: false});
    };

    cancelSubscribeMonth = () => {
        axios.get(`/api/paypal/canceling/month/${this.props.user}/${this.props.userRestriction.billingAgreementAfterExecute.id}`).then(res=>{
            if(res.data === true){
                this.setState({
                    cancelStatusMonth:true
                })
            }
        })
    }

    handleOpenYear = () => {
        this.setState({openYear: true});
    };

    handleCloseMonth = () => {
        this.setState({openYear: false});
    };

    cancelSubscribeYear = () => {
        axios.get(`/api/paypal/canceling/year/${this.props.user}/${this.props.userRestriction.billingAgreementAfterExecute.id}`).then(res=>{
            if(res.data === true){
                this.setState({
                    cancelStatusYear:true
                })
            }
        })
    }

    renderGoals = (data) => {
        console.log('GOALS',data)
        if(data.loading === true){
            return (<p>Loading Goals</p>)
        }
        else {
            return(
                this.props.goals.data.length === 0 ? 'You have no saved goals':<Row middle='lg'>
                    <Col md={10} lg={12} sm={6}><BarProfile data={this.props.bar}/></Col>
						{/*<Col md={4} lg={4} >
                        <div >{this.props.goals.data.map(item=>{
                            return <div style={{'marginTop':`${this.props.bar.length>3?'10px':'20px'}`}}><Link to={`/profile/goal/${item.id}`} key={item.id} replace>{item.title}</Link><br/></div>
                        })}</div>
		</Col>*/}


                </Row>
            )
        }
    }

    renderLastMultiDecision = (data) => {
        if(data.loading === true){
            return(<p>Loading Pros&Cons desicions</p>)
        }
        else{
            return this.props.multiDecision.length === 0 ? <p>You have no saved Pros&Cons decisions</p> : this.props.multiDecision.data.map((el) => {
                return (
                    <Col xs key={el.id}>
                        <div className='lastmap_profile' onClick={()=>this.props.history.push(`/multiDecision/${el.id}`)}>
                            <p>{el.title}</p>
                        </div>


                    </Col>
                )
            })


        }
    }

    renderLastMaps = (data) => {
        if(data.loading === true){
            return(<p>Loading</p>)
        }
        else{
            return this.props.maps.data.length === 0 ? <p>You have no saved decisions</p> : this.props.maps.data.map((el) => {
                return (
                    <Col xs key={el.id}>
                        <div className='lastmap_profile' onClick={()=>this.props.history.push(`/maps/${el.id}`)}>
                            <p>{el.title}</p>
                        </div>


                    </Col>
                )
            })

        }
    }

    renderLastTrees = (data) => {
        if(data.loading === true){
            return(<p>Loading media trees</p>)
        }
        else{
            return this.props.trees.data.length === 0 ? <p>You have no saved media trees</p> : this.props.trees.data.map((el) => {
                return (
                    <Col xs key={el.id}>
                        <div className='lastmap_profile' onClick={()=>this.props.history.push(`/savedTree/${el.type}/${el.id}`)}>
                            <p>{el.title}</p>
                        </div>


                    </Col>
                )
            })

        }
    }

    renderAchievements = (data) => {
        if(this.props.achievements.loading === false){
            return (
                <div>
					<Row center="xs">
						{data.firstMaps === true ? <img src="/img/achieve/ach6.png" title='First Decision' alt="First Decision is done" height={100} width={100} style={{'margin':'2px'}}/> : <img src="/img/achieve_bw/ach6.png" alt="First Decision isnt done" width={100} height={100} style={{'margin':'2px'}}/>}
						{data.firstGoal === true ? <img src="/img/achieve/ach4.png" title='First Goal' alt="First Goal is done" height={100} width={100} style={{'margin':'2px'}}/> : <img src="/img/achieve_bw/ach4.png" alt="First Goal isnt done" width={100} height={100} style={{'margin':'2px'}}/>}
						{data.firstMultiDecision === true ? <img src="/img/achieve/ach3.png" title='First Decision' alt="First Decision is done" height={100} width={100} style={{'margin':'2px'}}/> : <img src="/img/achieve_bw/ach3.png" alt="First Decision isnt done" width={100} height={100} style={{'margin':'2px'}}/>}
					</Row>	
					<Row center="xs">
						{data.firstMovieTree === true ? <img src="/img/achieve/ach2.png" title='First Movie pick ' alt="First Movie pick  is done" height={100} width={100} style={{'margin':'2px'}}/> : <img src="/img/achieve_bw/ach2.png" alt="First Movie pick " width={100} height={100} style={{'margin':'2px'}}/>}
						{data.firstBookTrees === true ? <img src="/img/achieve/ach1.png" title='First Book pick ' alt="First Book pick  is done" height={100} width={100} style={{'margin':'2px'}}/> : <img src="/img/achieve_bw/ach1.png" alt="First Book pick " width={100} height={100} style={{'margin':'2px'}}/>}
					
					</Row>
					<Row center="xs">
						{data.goalPioneer === true ? <img src="/img/achieve/ach8.png" title='Goal Pioneer ' alt="Goal Pioneer" height={100} width={100} style={{'margin':'2px'}}/> : <img src="/img/achieve_bw/ach8.png" alt="Goal Pioneer isnt done" width={100} height={100} style={{'margin':'2px'}}/>}
						{data.goalExpert === true ? <img src="/img/achieve/ach7.png" title='Goal Expert ' alt="Goal Expert" height={100} width={100} style={{'margin':'2px'}}/> : <img src="/img/achieve_bw/ach7.png" alt="Goal Expert isnt done" width={100} height={100} style={{'margin':'2px'}}/>}
						{data.goalPro === true ? <img src="/img/achieve/ach9.png" title='Goal Pro ' alt="Goal Pro" height={100} width={100} style={{'margin':'2px'}}/> : <img src="/img/achieve_bw/ach9.png" alt="Goal Pro isnt done" width={100} height={100} style={{'margin':'2px'}}/>}
					
					</Row>
					<Row center="xs">
						{data.decisionPioneer === true ? <img src="/img/achieve/ach12.png" title='Decision Pioneer ' alt="Decision Pioneer" height={100} width={100} style={{'margin':'2px'}}/> : <img src="/img/achieve_bw/ach12.png" alt="Decision Pioneer isnt done" width={100} height={100} style={{'margin':'2px'}}/>}
						{data.decisionExpert === true ? <img src="/img/achieve/ach10.png" title='Decision Expert ' alt="Decision Expert" height={100} width={100} style={{'margin':'2px'}}/> : <img src="/img/achieve_bw/ach10.png" alt="Decision Expert isnt done" width={100} height={100} style={{'margin':'2px'}}/>}
						{data.decisionPro === true ? <img src="/img/achieve/ach11.png" title='Decision Pro ' alt="Decision Pro" height={100} width={100} style={{'margin':'2px'}}/> : <img src="/img/achieve_bw/ach11.png" alt="Decision Pro isnt done" width={100} height={100} style={{'margin':'2px'}}/>}

					</Row>
				</div>
            )
        }
    }


  render() {
	       if (this.props.isLoggedIn === false ) return <Redirect to="/" />
	  {/*   let stringAction = `/api/paypal/month/${this.props.user}`
      let stringAction2 = `/api/paypal/year/${this.props.user}`


      if(this.state.cancelStatusMonth === true) return <Redirect to='/subscribe/canceling'/>
      if(this.state.cancelStatusYear === true) return <Redirect to='/subscribe/canceling'/>*/}
      console.log('STETE',this.props.goals.loading && this.props.maps.loading  && this.props.multiDecision.loading && this.props.goals.loading)
	  
      return(
          (this.props.goals.loading || this.props.maps.loading  || this.props.multiDecision.loading )===true ? <p>Loading</p>:<div><Grid>

		  
		      <Row className="profileheader">
					<Col xs>
						<h2>Profile | User: {this.props.user}</h2>
					</Col>
			  </Row>
              <Row className="profileheader">
					<Col xs={12} lg={6}>
						<h3>My Stats</h3>
							{//this.props.pieChartData.data.length !==0 && this.renderLastMaps(this.props.maps)
							}
							{this.props.pieChartData.data.loading === true ? <p>Loading Your Profile</p>:<PieProfile data={this.props.pieChartData.data}/>}
							
					</Col>
					<Col xs={12} lg={6}>
						<h3>My Achievements</h3>
							{this.renderAchievements(this.props.achievements.data)}
					</Col>
			  </Row>
			  <Row className="profileheader">
					<Col xs>
						<h3>My Current Decisions</h3>
					</Col>
			  </Row>
              <Row around='lg' className="maps-list">
                  {this.renderLastMaps(this.props.maps)}
				  <Col xs>
                              {this.props.maps.data.length === 0  ? null :<RaisedButton  className="maps-list-button" label="All Decisions" onClick={()=>this.props.history.push('/controlCenter/maps')}/>}
				  </Col>
              </Row>

              <Row around='lg' className="maps-list">
                  {this.renderLastTrees(this.props.trees)}
                  <Col xs>
                      {this.props.trees.data.length === 0  ? null :<RaisedButton  className="maps-list-button" label="Books&Movies" onClick={()=>this.props.history.push('/controlCenter/trees')}/>}
                  </Col>
              </Row>

              <Row around='lg' className="maps-list">
                  {this.renderLastMultiDecision(this.props.multiDecision)}
				  <Col xs>
                              {this.props.maps.data.length === 0  ? null :<RaisedButton  className="maps-list-button" label="Pros&Cons" onClick={()=>this.props.history.push('/controlCenter/multiDecision')}/>}
				  </Col>
              </Row>


              <Row className="profileheader">
					<Col xs>
						<h3>My Goals</h3>
					</Col>
			  </Row>
                   { this.renderGoals(this.props.goals)}
          </Grid>
                <aside className='overlayed'>{/*
                    {this.props.userRestriction.status === 'bronze' && <div className="block">
                        <h2>You can't subscribe at this time</h2>
						<h3>Monthly Subscription</h3>
                        <form action={stringAction} method="post" >
                            <input type="hidden" name="cmd" value="_s-xclick"/>
                            <input type="hidden" name="hosted_button_id" value="2CYF3J4E8WLCU"/>
                            <input type="image" src="https://www.sandbox.paypal.com/en_US/i/btn/btn_subscribeCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!"/>
                            <img alt="" border="0" src="https://www.sandbox.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1"/>
                        </form>
                        <h3>Annual Subscription</h3>
                        <form action={stringAction2}  method="post" >
                            <input type="hidden" name="cmd" value="_s-xclick"/>
                            <input type="hidden" name="hosted_button_id" value="2CYF3J4E8WLCU"/>
                            <input type="image" src="https://www.sandbox.paypal.com/en_US/i/btn/btn_subscribeCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!"/>
                            <img alt="" border="0" src="https://www.sandbox.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1"/>
                        </form>
                    </div>}
                    {
                        this.props.userRestriction.status === 'goldMonth' && <div className="block">
                            <h3>Your status is month subscribe</h3>
                            <RaisedButton label="Cancel" onClick={()=>this.handleOpenMonth()} style={{'backgroundColor':'red'}}/>
                        </div>

                    }
                    {
                        this.props.userRestriction.status === 'goldYear' && <div className="block">
                            <h3>Your status is year subscribe</h3>
                            <RaisedButton label="Cancel" onClick={()=>this.handleOpenYear()} style={{'backgroundColor':'red'}}/>
                        </div>

                    }
                    <Dialog
                        title="Cancel?"
                        actions={[
                            <FlatButton
                                label="Cancel"
                                primary={true}
                                onClick={()=>this.handleCloseMonth}
                            />,
                            <FlatButton
                                label="Ok"
                                primary={true}
                                onClick={()=>{this.cancelSubscribeMonth();this.handleCloseMonth()}}
                            />,
                        ]}

                        modal={true}
                        open={this.state.openMonth}
                    >
                        Are you sure you want to cancel? This action cannot be undone.
                    </Dialog>
                    <Dialog
                        title="Cancel?"
                        actions={[
                            <FlatButton
                                label="Cancel"
                                primary={true}
                                onClick={()=>this.handleCloseYear}
                            />,
                            <FlatButton
                                label="Ok"
                                primary={true}
                                onClick={()=>{this.cancelSubscribeYear();this.handleCloseYear()}}
                            />,
                        ]}

                        modal={true}
                        open={this.state.openYear}
                    >
                        Are you sure you want to cancel? This action cannot be undone.
                    </Dialog>
				*/}
                </aside>
</div>
		  )
  }

}

const mapStateToProps = state => {
    return{
        isLoggedIn:state.isLoggedIn.isAuth,
        user:state.username,
        maps:state.lastMaps.toJS(),
        delete:state.deleteMap,
        pieChartData:state.pieChart.toJS(),
        bar:state.barProfile.toJS(),
        goals:state.goals.toJS(),
        multiDecision:state.lastMultiDecision.toJS(),
        login:state.login.status,
        trees:state.lastSavedTrees.toJS(),
        userRestriction: state.userRestriction.toJS(),
        achievements: state.achievements.toJS()
    }


}

const mapDispatchToProps = dispatch => bindActionCreators(
        {fetchLastMaps,fetchSliderProfile,fetchTreesProfile,sortAsc,sortDesc,searchMaps,deleteMap,fetchPie,fetchGoalsBar,fetchGoals,fetchLastMultiDecision,fetchLastSavedTrees,updateUserRestriction,fetchAchievements}
    ,dispatch)

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Profile));