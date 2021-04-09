
import React, {Component} from 'react';
import Autosuggest from 'react-autosuggest';
import PropTypes from 'prop-types';
import axios from 'axios'
import Tree from 'react-d3-tree';
import {connect} from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';
import RaisedButton from 'material-ui/RaisedButton';
import {withRouter} from 'react-router-dom'
import toastr from "toastr";

import {bindActionCreators} from 'redux';
import {
    saveBooksTreeUserRestriction,saveMoviesTreeUserRestriction,updateUserRestriction
} from "../actions";
import { CircleLoader
} from 'react-spinners';

const client = {
    sandbox:    'ASdmBPmb06IFnk_lnLE7JXNh3dAuzJKzPI7ANRkc_3vlG5SqGGeaX4wjEAnUYj9_A1yBeE-H6-rIR-6V'
}


var ttle = "";

class NodeLabel extends React.PureComponent {
    render() {
        const {className, nodeData,type} = this.props
        //console.log('NODEDATA',nodeData,type)
        return type === 'movie' ? <div className={className}>

            <h4>{nodeData.Title}</h4>
			<p>Genre(s): {nodeData['genres']}</p>
            <p>Year: {nodeData['Year']}</p>
            {/*<img src={nodeData.image} width={100} height={50} alt=""/>*/}
            <p>IMDB Rate:{nodeData["IMDB Rate"]}</p>
        </div> : <div className={className}>
            <h4>{nodeData.Title}</h4>
            <p>Author: {nodeData['author']}</p>
			<p>Year: {nodeData['year']}</p>
            <img src={nodeData.image}  alt=""/>

        </div>

    }
}




class NewTree extends Component {
    constructor() {
        super();

        this.state = {
            value: '',
            suggestions: [],
            films:[],
            treeData:[],
            routeId:null,
            response:{},
            loading:true
        };
    }

    componentDidMount() {
        if(this.props.type === 'movie'){
			ttle="What to Watch";
            document.title = ttle + " | AI.Decider"
            axios.get('/api/listOfFilms').then(data=>{
                this.setState({films:data.data,loading:false})
            })
            if(this.props.user !== null){
                this.props.updateUserRestriction(this.props.user)
            }

        }

        else {
			ttle="What to Read";
            document.title = ttle + " | AI.Decider"
            axios.get('/api/listOfBooks').then(data=>{
                this.setState({films:data.data,loading:false})
            })
            if(this.props.user !== null){
                this.props.updateUserRestriction(this.props.user)
            }

        }
    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        if(prevState.response.success !== this.state.response.success){
            toastr.success(this.state.response.success).toString()
            if(this.props.type === 'movie'){

                this.props.saveMoviesTreeUserRestriction(this.props.user)
            }

            else {
                this.props.saveBooksTreeUserRestriction(this.props.user)
            }
        }

        if(prevProps.type !== this.props.type){
            if(this.props.type === 'movie'){
                axios.get('/api/listOfFilms').then(data=>{
                    this.setState({films:data.data,loading:false,treeData:[],value:''})
                })
                if(this.props.user !== null){
                    this.props.updateUserRestriction(this.props.user)
                }


            }

            else {
                axios.get('/api/listOfBooks').then(data=>{
                    this.setState({films:data.data,loading:false,treeData:[],value:''})
                })
                if(this.props.user !== null){
                    this.props.updateUserRestriction(this.props.user)
                }

            }
        }




    }




    escapeRegexCharacters(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    getSuggestions(value) {
        const escapedValue = this.escapeRegexCharacters(value.trim());

        if (escapedValue === '') {
            return [];
        }

        const regex = new RegExp('^' + escapedValue, 'i');

        return this.state.films.filter(film => regex.test(film.name));
    }

    getSuggestionValue(suggestion) {
        return suggestion.name;
    }

    renderSuggestion(suggestion) {
        return (
            <span>{suggestion.name}</span>
        );
    }

    onChange = (event, { newValue, method }) => {
        this.setState({
            value: newValue
        });
    };

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    onSuggestionSelected=(event,obj)=>{
        //console.log(obj.suggestion.routeId);
        this.setState({
            routeId:obj.suggestion.routeId
        })
        if(this.props.type === 'movie'){
            axios.get(`/api/movieTree/${obj.suggestion.routeId}`).then(data=>{
                this.setState({treeData:data.data.data})
            })
        }
        else {
            axios.get(`/api/bookTree/${obj.suggestion.routeId}`).then(data=>{
                this.setState({treeData:data.data.data})
            })
        }


    }

    saveTree = (routeId,title,username,publicStatus,type)=>{
        if(this.props.type === 'movie'){

            axios.post('/api/movieTree/save',{
                routeId,
                title,
                username,
                publicStatus,
                type
            }).then(res=>{
                this.setState({
                    response:res.data
                })
            })
        }
        else {
            axios.post('/api/bookTree/save',{
                routeId,
                title,
                username,
                publicStatus,
                type
            }).then(res=>{
                this.setState({
                    response:res.data
                })
            })
        }

    }

    saveTreeAndShare = (routeId,title,username,publicStatus,type)=>{
        if(this.props.type === 'movie'){
            axios.post('/api/movieTree/save',{
                routeId,
                title,
                username,
                publicStatus,
                type
            })
                .then(this.props.saveMoviesTreeUserRestriction(this.props.user))
                .then(res=>{
                this.props.history.push(`/savedTree/${this.props.type}/${res.data.id}`)
            })
        }
        else {
            axios.post('/api/bookTree/save',{
                routeId,
                title,
                username,
                publicStatus,
                type
            })
                .then(this.props.saveBooksTreeUserRestriction(this.props.user))
                .then(res=>{
                this.props.history.push(`/savedTree/${this.props.type}/${res.data.id}`)
            })
        }

    }





    render() {
        console.log('FILM STATE',this.state);
        const { value, suggestions } = this.state;
        const inputProps = {
            placeholder: `Start typing your favorite ${this.props.type} title`,
            value,
            onChange: this.onChange
        };

        const typeRestriction = this.props.type === 'movie' ? this.props.userRestriction.moviesTreeCounter === 0 : this.props.userRestriction.booksTreeCounter === 0
        if(this.state.treeData === undefined){
            return (

                this.state.loading === true ?             
				<Row>
                    <Col center={'md'} style={{'marginTop':'20%'}}>
                        <CircleLoader

                            color={'#3f51b5'}
                            loading={this.state.loading}
                        />
                    </Col>
                </Row>:<Grid className="food"><Row >
                    
					<Col xs={12}>

                    <Autosuggest
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                        getSuggestionValue={this.getSuggestionValue}
                        renderSuggestion={this.renderSuggestion}
                        onSuggestionSelected={(event,suggestion)=>this.onSuggestionSelected(event, suggestion)}
                        inputProps={inputProps} />
                </Col>
				<Col xsOffset={7} xs={2} smOffset={7} sm={2} mdOffset={7} md={2} lgOffset={8} lg={1} className="treeButton">
                        <RaisedButton label="Share" disabled={!this.props.isLoggedIn || this.state.treeData.length === 0 || typeRestriction} onClick={()=>this.saveTreeAndShare(this.state.routeId, this.state.value, this.props.user,true, this.props.type)} />
                    </Col>
                    <Col xs={2} sm={2} md={2} lg={2} className="treeButton">
						<RaisedButton label="Save" disabled={!this.props.isLoggedIn || this.state.treeData.length === 0 || typeRestriction} onClick={()=>this.saveTree(this.state.routeId, this.state.value, this.props.user,false, this.props.type)} />
                        
                    </Col>
                    <Row >
					<Col>
                        <p>I'm going to add this title soon!</p>
                    </Col>
					</Row>

                </Row></Grid>
            )
        }
        return (

            <Grid className="food">
                    {this.state.loading === true ? <Row center={'md'} style={{'marginTop':'20%'}}>
                        <Col md={1}>
                            <CircleLoader

                                color={'#50E3C2'}
                                loading={this.state.loading}
                            />
                        </Col>
                    </Row>:<Row  style={{'marginTop':'2%'}}>
                        
						<Col xs={12} sm={11} md={8} lg={10}>
                            <Autosuggest
                                suggestions={suggestions}
                                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                getSuggestionValue={this.getSuggestionValue}
                                renderSuggestion={this.renderSuggestion}
                                onSuggestionSelected={(event,suggestion)=>this.onSuggestionSelected(event, suggestion)}
                                inputProps={inputProps} />
                        </Col>
						<Col xsOffset={7} xs={2} smOffset={5} sm={2} mdOffset={4} md={2} lgOffset={6} lg={1} className="treeButton">
							<RaisedButton label="Share" disabled={!this.props.isLoggedIn || this.state.treeData.length === 0 || typeRestriction} onClick={()=>this.saveTreeAndShare(this.state.routeId, this.state.value, this.props.user,true, this.props.type)} />
                        </Col>
                        <Col xs={2} sm={2} md={2} lg={2} className="treeButton">
							<RaisedButton label="Save" disabled={!this.props.isLoggedIn || this.state.treeData.length === 0 || typeRestriction} onClick={()=>this.saveTree(this.state.routeId, this.state.value, this.props.user,false, this.props.type)} />
                        

                        </Col>

                    </Row>}




                <div id="treeWrapper" style={{width: '100%', height: '50em'}}>
                    {this.state.treeData.length !== 0 &&
                    <Tree data={this.state.treeData}
                          orientation={'horizontal'}
                          nodeSize={{'x':300,'y':300}}
                          allowForeignObjects
                          nodeLabelComponent={{
                              render: <NodeLabel className='myLabelComponentInSvg' type={this.props.type} />,
                              foreignObjectWrapper: {
                                  y: 10
                              }

                          }}
                          translate={{'x':100,'y':20}}
                          zoom={0.7}
                    />
                    }

                </div>
            </Grid>

        );
    }
}

const mapStateToProps = state => {
    return {
        isAuth:state.isAuthShown,
        isLoggedIn:state.isLoggedIn.isAuth,
        user:state.username,
        userRestriction:state.userRestriction.toJS()

    }
}

const mapDispatchToProps = dispatch => bindActionCreators({saveBooksTreeUserRestriction,saveMoviesTreeUserRestriction,updateUserRestriction},dispatch)

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(NewTree));
