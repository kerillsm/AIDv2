import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios'
import FlatButton from 'material-ui'
import { Paper  } from '@material-ui/core';
import {Link} from 'react-router-dom'
import { Grid, Row, Col } from 'react-flexbox-grid';
import {connect} from 'react-redux'

class Smaps extends Component {
    constructor(props){
        super(props);
        this.state = {
            sport:[],
            name:[],
            relocation:[],
            geekzone:[],
            job:[],
            lastPublicMaps:[]
        }
    }

    componentDidMount() {
        this.fetchSport();
        this.fetchName();
        this.fetchRelocation();
        this.fetchGeekzone();
        this.fetchJob();
        this.fetchPublicMaps();
    }

    fetchSport() {
        axios.get(`/api/migration/sport`).then(data => {
            if (this.unmounted) return; 
            this.setState({sport:data.data})
        });
        //return data.data
    }
    fetchName = () => {
        axios.get(`/api/migration/name`).then(data => { 
            if (this.unmounted) return;  
            this.setState({name:data.data})
        });
        //return data.data
    }
    fetchRelocation = () => {
        axios.get(`/api/migration/relocation`).then(data => {
            if (this.unmounted) return; 
            this.setState({relocation:data.data})
        });
        //return data.data
    }
    fetchGeekzone = () => {
        axios.get(`/api/migration/geekzone`).then(data => {
            if (this.unmounted) return;
            this.setState({geekzone:data.data})
        });
        //return data.data
    }
    fetchJob = () => {
        axios.get(`/api/migration/job`).then(data => {
            if (this.unmounted) return;
            this.setState({job:data.data})
        });
        //return data.data
    }
    fetchPublicMaps = () => {
        axios.get(`/api/shares`).then(data => {
            if (this.unmounted) return;
            this.setState({lastPublicMaps:data.data})
        });
    }

    componentWillUnmount() {
        this.unmounted = true;
    }


    render() {
        // console.log('State',this.state);
        var key = 0;
        return (


            <Grid className="smaps">
								<Row xs>
                	<Col className="sblock"><Paper>
                    <h3>Relocation Decisions</h3>
					<ul>
                    {this.state.relocation.map(item=>{
                        const url = item.subcategory === undefined?`/${item.category}/${item.id}`:`/${item.category}/${item.subcategory}/${item.id}`
                        return(
                                <li key={key++}><Link  to={url}>{item.title}</Link></li>
                        )
                    })}
					</ul>
					</Paper></Col>
					<Col className="sblock"><Paper>
                    <h3>New Job Decision</h3>
					<ul>
                    {this.state.job.map(item=>{
                        const url = item.subcategory === undefined?`/${item.category}/${item.id}`:`/${item.category}/${item.subcategory}/${item.id}`
                        return <li key={key++}><Link to={url}>{item.title}</Link></li>
                    })}
                </ul>
				</Paper></Col>

                </Row>

                <Row xs> 					
                   
						<Col className="sblock"> 
				<Paper >
									<h3>Shared Decisions</h3>
					   <ul>              
                       
                        {this.state.lastPublicMaps.map(item=>{
                            return(
                                   <li key={key++}> <Link  to={`/share/${item.id}`}>{item.title?item.title:item.cases[0]+" vs " + item.cases[1]}</Link></li>
                            )
                        })}
                       </ul>
				</Paper>
                    </Col>                 
				<Col className="sblock"><Paper>
                        <h3>Pick Baby's Name</h3>
						<ul>
                        {this.state.name.map(item=>{
                            const url = item.subcategory === undefined?`/${item.category}/${item.id}`:`/${item.category}/${item.subcategory}/${item.id}`
                            return(
                                   <li key={key++}> <Link  to={url}>{item.title}</Link></li>
                            )
                        })}
						</ul>
                    </Paper></Col>
					</Row>
                <Row xs>

					    <Col className="sblock"><Paper>
                        <h3>Who Would Win</h3>
						<ul>
                        {this.state.geekzone.map(item=>{
                            const url = item.subcategory === undefined?`/${item.category}/${item.id}`:`/${item.category}/${item.subcategory}/${item.id}`
                            return(
                                   <li key={key++}> <Link  to={url}>{item.title}</Link></li>
                            )
                        })}
						</ul>
                    </Paper></Col>
				<Col className="sblock"><Paper>
                        <h3>Sport Odds</h3>
						<ul>
                        {this.state.sport.map(item=>{
                            const url =  item.subcategory === undefined?`/${item.category}/${item.id}`:`/${item.category}/${item.subcategory}/${item.id}`
                            return(
                                   <li key={key++}> <Link  to={url}>{item.title}</Link></li>
                            )
                        })}
						</ul>
						</Paper></Col>  	


				</Row>					

            </Grid>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn:state.isLoggedIn.isAuth,
        user:state.username,
    }
}

export default connect(mapStateToProps,null)(Smaps);
