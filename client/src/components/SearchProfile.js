import React from 'react';
import { Redirect,Link,withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchMapsProfile,fetchTreesProfile,fetchSliderProfile,sortAsc,sortDesc,searchMaps,deleteMap,fetchAll,fetchMultiDecisions} from '../actions'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { Grid, Row, Col } from 'react-flexbox-grid';


class SearchProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            maps:props.maps,
            open: props.open,
            id:props.id

        }


    }





    render() {
        console.log(this.state);
        const customContentStyle = {
            width: '35%',
            maxWidth: 'none',
        };



        if (this.props.loginStatus === false ) return <Redirect to="/" />


        return (
            <Row className="maps-list" around='lg'>
                {this.props.maps === undefined ? <div>Loading</div> : this.props.maps.map((el) => {
                    return (

                        <Col lg={3} key={el.id}>
                            <Row>
                                <Link to={el.type === 'maps' ? `/maps/${el.id}`:`/multidecision/${el.id}`} >{el.title}</Link>
                            </Row>
                            <Row>
                                <RaisedButton label="Delete" onClick={()=>this.handleOpen(el.id)} style={{'backgroundColor':'red'}}/>
                            </Row>


                            <Dialog
                                title="Delete"
                                actions={[
                                    <FlatButton
                                        label="Cancel"
                                        primary={true}
                                        onClick={this.handleClose}
                                    />,
                                    <FlatButton
                                        label="Delete"
                                        primary={true}
                                        onClick={()=>{this.props.deleteMap(this.state.id);this.handleClose()}}
                                    />,
                                ]}
                                contentStyle={customContentStyle}
                                modal={true}
                                open={this.state.open}
                            >
                                Are you sure?
                            </Dialog>
                        </Col>
                    )
                })


                }
            </Row>

        )
    }

}


export default withRouter(SearchProfile);