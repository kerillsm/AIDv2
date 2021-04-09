import React from 'react';
import { Redirect,Link,withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchMapsProfile,fetchTreesProfile,fetchSliderProfile,sortAsc,sortDesc,searchMaps,deleteMap,fetchAll,fetchMultiDecisions} from '../actions'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { Grid, Row, Col } from 'react-flexbox-grid';
import axios from "axios";
import {DELETE_MAP} from "../actions/types";

class MapsProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mapsProfile:[],
            open: false,
            id:null,
            type:null

        }


    }



    componentDidMount() {
        console.log('MOUNTED',this.state)

        if(this.props.filter === 'maps'){
            axios.get(`/api/user/maps/all/${this.props.user}`).then(data=>{

            console.log(data);
            this.setState({
                mapsProfile:data.data[0].filter(item=>typeof(item)!== "string")
            })
        })
        }
        if(this.props.filter === 'multiDecision'){

            axios.get(`/api/procon/${this.props.user}/all`).then(data=>{

                console.log(data);
                this.setState({
                    mapsProfile:data.data
                })
            })
        }
        if(this.props.filter === 'trees'){

            axios.get(`/api/movieTree/saved/${this.props.user}`).then(data=>{

                console.log(data);
                this.setState({
                    mapsProfile:data.data
                })
            })
        }

    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        console.log('UPDATE MAPSPROFILE');
        if(prevState.open === true && prevState.open !== this.state.open){
            if(this.props.filter === 'maps'){
                axios.get(`/api/user/maps/all/${this.props.user}`).then(data=>{

                    console.log(data);
                    this.setState({
                        mapsProfile:data.data[0].filter(item=>typeof(item)!== "string")
                    })
                })
            }
            if(this.props.filter === 'multiDecision'){

                axios.get(`/api/procon/${this.props.user}/all`).then(data=>{

                    console.log(data);
                    this.setState({
                        mapsProfile:data.data
                    })
                })
            }
            if(this.props.filter === 'trees'){

                axios.get(`/api/movieTree/saved/${this.props.user}`).then(data=>{

                    console.log(data);
                    this.setState({
                        mapsProfile:data.data
                    })
                })
            }
        }
        if(prevProps.filter !== this.props.filter){
            if(this.props.filter === 'maps'){
                axios.get(`/api/user/maps/all/${this.props.user}`).then(data=>{

                    console.log(data);
                    this.setState({
                        mapsProfile:data.data[0].filter(item=>typeof(item)!== "string")
                    })
                })
            }
            if(this.props.filter === 'multiDecision'){

                axios.get(`/api/procon/${this.props.user}/all`).then(data=>{

                    console.log(data);
                    this.setState({
                        mapsProfile:data.data
                    })
                })
            }
            if(this.props.filter === 'trees'){

                axios.get(`/api/movieTree/saved/${this.props.user}`).then(data=>{

                    console.log(data);
                    this.setState({
                        mapsProfile:data.data
                    })
                })
            }
        }
    }


    handleOpen = (id,type) => {
        this.setState({open: true,id,type});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    sortDesc = () => {
        const res = this.state.mapsProfile.sort((a,b)=>{
            if (a.title > b.title) {
                return 1;
            }
            if (a.title < b.title) {
                return -1;
            }

            return 0;
        }).reverse()
        this.setState({
            mapsProfile:res
        })
    }

    sortAsc = () => {
        const res = this.state.mapsProfile.sort((a,b)=>{
            if (a.title > b.title) {
                return 1;
            }
            if (a.title < b.title) {
                return -1;
            }

            return 0;
        })
        this.setState({
            mapsProfile:res
        })
    }

    search = (req) => {
        if(this.props.filter === 'maps'){
            axios.get(`/api/user/maps/all/${this.props.user}`).then(data=>{

                console.log(data);
                this.setState({
                    mapsProfile:data.data[0].filter(item=>typeof(item)!== "string").filter(item => {
                        return item.title.toLowerCase().includes(req.toLowerCase())
                    })
                })
            })
        }
        if(this.props.filter === 'multiDecision'){

            axios.get(`/api/procon/${this.props.user}/all`).then(data=>{

                console.log(data);
                this.setState({
                    mapsProfile:data.data.filter(item => {
                        return item.title.toLowerCase().includes(req.toLowerCase())
                    })
                })
            })
        }
        if(this.props.filter === 'trees'){

            axios.get(`/api/movieTree/saved/${this.props.user}`).then(data=>{

                console.log(data);
                this.setState({
                    mapsProfile:data.data.filter(item => {
                        return item.title.toLowerCase().includes(req.toLowerCase())
                    })
                })
            })
        }

    }

    deleteMap = (type,id,treesType) => {
        console.log('deleteMap fun');

        console.log('id',id);
        console.log('type',type==='trees')
         if(type === 'maps'){
             console.log('MAPS IS CALLING');
             axios.post(`/api/map/delete`,{id});
         }
        else if(type === 'trees'){
            console.log('TREES IS CALLING',treesType);
             if(treesType === 'movie'){
                 axios.post(`/api2/savedMovieTree/delete/delete`,{id})
             }
             else {
                 axios.post(`/api2/savedBookTree/delete/delete`,{id})
             }

        }
         else {
             console.log('multiDecision IS CALLING');


             axios.post(`/api/multiDecision/delete`,{id});

         }
    }




    render() {
        console.log('State',this.state);
        const customContentStyle = {
            width: '35%',
            maxWidth: 'none',
        };



        if (this.props.isLoggedIn === false ) return <Redirect to="/" />


        return (

            <Grid className="profile">
			    <Row className="profileheader">
					<Col xs>
						<h2><Link to="/me/profile">Profile</Link> | My Decisions</h2>
					</Col>
			    </Row>
                <Row className="maps-list" around='lg'>
                    {this.state.mapsProfile.length === 0? <div>Loading</div> : this.state.mapsProfile.map((el) => {
                        return (
                             
                            <Col lg={2} key={el.id}>
                                <Row>
                                    {this.props.filter === 'trees' ? <Link to={`/savedTree/${el.type}/${el.id}`} >
                                        <div className='lastmap_profile'><p>{el.title}</p></div>
                                    </Link> : <Link to={el.type === 'maps' ? `/maps/${el.id}`:`/multidecision/${el.id}`} >
                                        <div className='lastmap_profile'><p>{el.title}</p></div>
                                    </Link>}

				
                                </Row>
                                <Row>
                                    <RaisedButton label="Delete" onClick={()=>this.handleOpen(el.id,this.props.filter)} style={{'backgroundColor':'red'}}/>
                                </Row>

                                <Dialog
                                    title="Delete this decision?"
                                    actions={[
                                        <FlatButton
                                            label="Cancel"
                                            primary={true}
                                            onClick={()=>this.handleClose}
                                        />,
                                        <FlatButton
                                            label="Delete"
                                            primary={true}
                                            onClick={()=>{this.deleteMap(this.props.filter,this.state.id,el.type);this.handleClose()}}
                                        />,
                                    ]}
                                    contentStyle={customContentStyle}
                                    modal={true}
                                    open={this.state.open}
                                >
                                    Are you sure you want to delete this item? This action cannot be undone.
                                </Dialog>
                            </Col>
                        )
                    })


                    }
                </Row>

                <aside className="overlayed">
                    <div className="block">
                        <h3>Manage decisions</h3>
                        <div className="maps-search-bar">
                            <div className="map-search">
                                <input type="text"
                                       value={this.state.searchReq}
                                       placeholder='Search'
                                       onChange={(event) => this.search(event.target.value)}
                                />
                            </div>
                            <div className="filters-sorting">
                                <label>Filter</label>
                                <div className="filters">
                                    <button onClick={()=>this.props.history.push('/controlCenter/maps')}>Decisions</button>
                                    <button onClick={()=>this.props.history.push('/controlCenter/multiDecision')}>Pros\Cons</button>
                                    <button onClick={()=>this.props.history.push('/controlCenter/trees')}>Trees</button>
                                </div>
                                <label>Sort</label>
                                <div className="sorting">
                                    <button onClick={()=>this.sortAsc()}>Ascending</button>
                                    <button onClick={()=>this.sortDesc()}>Descending</button>
                                </div>
                            </div>
                        </div>
                        <h4>Result: {this.state.mapsProfile.length} decisions</h4>

                    </div>
                </aside>
            </Grid>

        )
    }

}

const mapStateToProps = state => {
    return{
        isLoggedIn:state.isLoggedIn.isAuth,
        user:state.username,
        maps:state.mapsProfile.toJS(),
        delete:state.deleteMap
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({fetchMapsProfile,fetchSliderProfile,fetchTreesProfile,sortAsc,sortDesc,searchMaps,deleteMap,fetchAll,fetchMultiDecisions},dispatch)

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(MapsProfile));