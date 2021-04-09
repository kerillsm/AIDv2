import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
import {connect} from 'react-redux'
import Toggle from 'material-ui/Toggle';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import axios from 'axios'
import toastr from "toastr";
import {bindActionCreators} from 'redux';
import MetaTags from 'react-meta-tags'
import {
    handleChangeItem,addRow,addColumn,toggleProsConf,handleChangeTitle,deleteRow,deleteColumn,fetchUsername,checkAuth,
    fetchMultiDecision,defaultMultiDecision,saveProsConsUserRestriction,updateUserRestriction,addNew
} from "../actions";
import {SCORE_COLUMN} from "../actions/types";

class MultiDecision extends Component {
    constructor(props) {
        super(props);

        this.state = {
            response: { success: null }
        }
    }

    componentDidMount() {
        // console.log('Props11211221',this.props.data);

        if (this.props.items) {
            this.props.addNew(this.props.items);
        } else if (this.props.match.params.id !== undefined) {
            this.props.fetchMultiDecision(this.props.match.params.id);

            if (this.props.user !== null) {
                 this.props.updateUserRestriction(this.props.user);
             }
        } else {
            this.props.defaultMultiDecision();
            if (this.props.user !== null) {
                this.props.updateUserRestriction(this.props.user);
            }
        }

        // if(this.props.id !== undefined){

        // }
        // else {

        // }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return true;
    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        if (prevState.response.success !== this.state.response.success) {
            toastr.success(this.state.response.success).toString();
            this.props.saveProsConsUserRestriction(this.props.user);
        }
    }

    postData = (data,user,id) => {
        axios.post('/api/procon/save',[data,user,id,Date.now()]).then(res=>this.setState({
            response:res.data
        }));
    }

    buttonStyle = {
        'height':'80px'
    }

    scoreColumn = (column) => {
        let _true = column.childRow.filter(item => item.toggled === true)
        let _all = column.childRow

        let trueSize = _true.length
        // console.log('TRUE',trueSize);
        let falseSize = -(_all.length - trueSize)
        let result = trueSize + falseSize;


        return result
    }

    render() {
        return (
		<div className="proscons">

            <MetaTags>
                <title>Pros and Cons Decision | AI.Decider</title>
                <meta name="og:description" content="Some description" />
                <meta property="og:title" content="Pros and Cons Decision | AI.Decider" />
            </MetaTags>

		      <Paper elevation={1} className="dashboard-paper">
        <Typography component="p">
Pros and Cons decider is ideal decision tool for decisions with multiple options. You can use it for all types of decisions, including this case!
        </Typography>
      </Paper>
		
            <Grid>

			    <Row end='xs'>
				<Col xs>
                    <RaisedButton className="button1" label='Save Decision' disabled={this.props.user === null || this.props.userRestriction.prosConsCounter === 0 } primary onClick={() => this.postData(this.props.data, this.props.user,this.props.id)}/>
				</Col>	
                </Row>
                <Row>
                    {this.props.data.map(item => {
                        return (
                            <Col key={item.columnId} lg={2} >
                                <div className='flexbox__container'>
                                    <div className='column__title'>
                                        <TextField 
                                            hintText="Decision Option"										
                                            value={item.inputTitleValue}
                                            onChange={(event)=> this.props.handleChangeTitle(event,item.columnId)}
                                        />
                                        <h3>{`Score: ${this.scoreColumn(item)}`}</h3>
                                    </div>

                                    {item.childRow.map(child => {
                                        let input = `inputValue${child.rowId}`
                                        // console.log('input', input);

                                        let color = child.toggled === true ? '#fffacd' : 'rgba(0, 188, 212,0.6)'
                                        return (
                                            <div key={child.rowId} className={'column__item'} style={{'backgroundColor':color}}>
                                                {/*<p>{child.input}</p>*/}
                                                <div className="img__delete" onClick={()=>this.props.deleteRow(child.rowId, item.columnId)} >
                                                    <img src="/img/delete-icon.png" width={'10px'} height={'10px'}/>
                                                </div>

                                                <TextField 
                                                    hintText="&nbsp; Type Pros\Cons"
                                                    value={child[input]} 
                                                    onChange={(event) => this.props.handleChangeItem(event, child.rowId, item.columnId)}
                                                />
                                                <div className="toggle">
												<Toggle
                                                    label="Pros"
                                                    toggled={child.toggled}
                                                    name='toggle'
                                                    onToggle={()=>this.props.toggleProsConf(child.toggled, child.rowId, item.columnId)}
                                                />
												</div>
                                            </div>
                                        )
                                    })}
                                </div>
                                <RaisedButton className="button1" label='Add Pro\Con' onClick={()=>this.props.addRow(item.columnId)} />
                                <RaisedButton className="button1" label='DEL Option'  onClick={()=>this.props.deleteColumn(item.columnId)} disabled={this.props.data.length === 1 }/>
                            </Col>

							
                        )
                    })}
                    <Col xs >
                        <RaisedButton fullWidth   className="button1" label='New Option' onClick={()=>this.props.addColumn(this.props.data[this.props.data.length-1].columnId)} disabled={this.props.data.length === 5 }/>
                    </Col>
					
                </Row>
            </Grid>
			
			    <aside className="overlayed">
                    <div className="block">
                        <h4>Pros\Cons Tips</h4>
						<ol type="1">
                        <li>Define up to 5 decision options</li>
                        <li>Add Pros and Cons for each option</li>
						<li>Check scores and define best option</li>
                        <li>Dont forget to save your decision!</li>
						</ol>
                        <h3>Privacy</h3>
                        <p>All Public Pros\Cons decisions are accessible from Internet network for all users</p>
                    </div>
                </aside>
		</div>
        );
    }
}

const mapStateToProps = state => {
    return {
        data: state.multiDecision.toJS(),
        isLoggedIn: state.isLoggedIn.isAuth,
        user: state.username,
        userRestriction: state.userRestriction.toJS()
    }
}


const mapDispatchToProps = dispatch => bindActionCreators({
    handleChangeItem, 
    addRow, 
    addColumn, 
    toggleProsConf, 
    handleChangeTitle, 
    deleteRow, 
    deleteColumn, 
    checkAuth, 
    fetchUsername, 
    fetchMultiDecision, 
    defaultMultiDecision, 
    saveProsConsUserRestriction, 
    updateUserRestriction,
    addNew
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MultiDecision);