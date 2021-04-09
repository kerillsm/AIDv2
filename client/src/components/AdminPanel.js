import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { Paper } from '@material-ui/core';
import { Grid, Row, Col } from 'react-flexbox-grid';

class AdminPanel extends Component {
    constructor() {
        super();
        this.state = {
            logs: [],
            userList: [],
            shares: [],
            smaps: [],
            goals: [],
            multidecision: []
        }
    }
    componentDidMount() {
        this.fetchLogs();
        this.fetchUsers();
        this.fetchShares();
        this.fetchSmaps();
        this.fetchGoals();
        this.fetchMultidecision();
    }

    fetchLogs = () => {
        axios.get('/api/admin/logs')
            .then(res => {
                if (this.unmounted) return;
                this.setState({ logs: res.data })
            });
    }

    fetchUsers = () => {
        axios.get('/api/admin/userlist')
            .then(res => {
                if (this.unmounted) return;
                this.setState({ userList: res.data })
            })
            .catch(err => console.log(err));
    }

    fetchShares = () => {
        axios.get('/api/admin/sharelist')
            .then(res => {
                if (this.unmounted) return;
                this.setState({ shares: res.data })
            })
    }

    fetchSmaps = () => {
        axios.get('/api/admin/smaps')
            .then(res => {
                if (this.unmounted) return;
                this.setState({ smaps: res.data })
            });
    }

    fetchGoals = () => {
        axios.get('/api/admin/goals')
            .then(res => {
                if (this.unmounted) return;
                this.setState({ goals: res.data })
            })
    }

    fetchMultidecision = () => {
        axios.get('/api/admin/multidecision')
            .then(res => {
                if (this.unmounted) return;
                this.setState({ multidecision: res.data })
            });
    }

    componentWillUnmount() {
        this.unmounted = true;
    }
    
    render() {
        const { isAdmin } = this.props;

        return (
            !isAdmin ? <p>You don't have permission to access this page</p> : (
                <Grid className="smaps">
                    <Row xs='true'>
                        <Col className="sblock">
                            <Paper>
                                <h3>Users</h3>
                                <ul>
                                    {this.state.userList.map(user => (
                                        <li key={user._id}>{user.username}</li>
                                    ))}
                                </ul>
                            </Paper>
                        </Col>
                        <Col className="sblock">
                            <Paper>
                                <h3>Shared Decisions</h3>
                                <ul>
                                    {this.state.shares.map(item => (
                                         <li key={item.id}> <Link to={`/share/${item.id}`}>{item.title?item.title:item.cases[0]+" vs " + item.cases[1]}</Link></li>
                                    ))}
                                </ul>
                            </Paper>
                        </Col>
                        <Col className="sblock">
                            <Paper>
                                <h3>Decider logs</h3>
                                <ul>
                                    {this.state.logs.map(item => {
                                         return (<li key={item._id}> <Link to={`logs/${item._id}`} params={item}>{item.input}</Link></li>)
                                    })}
                                </ul>
                            </Paper>
                        </Col>
                        <Col className="sblock">
                            <Paper>
                                <h3>Public sliders</h3>
                                <ul>
                                    {this.state.smaps.map(item => {
                                         const url = item.subcategory === undefined?`/${item.category}/${item.id}`:`/${item.category}/${item.subcategory}/${item.id}`
                                         return (<li key={item.id}> <Link to={url}>{item.title}</Link></li>)
                                    })}
                                </ul>
                            </Paper>
                        </Col>
                        <Col className="sblock">
                            <Paper>
                                <h3>Goals</h3>
                                <ul>
                                    {this.state.goals.map(item => {
                                         return (<li key={item.id}> <Link to={`profile/goal/${item.id}`}>{item.title}</Link></li>)
                                    })}
                                </ul>
                            </Paper>
                        </Col>
                        <Col className="sblock">
                            <Paper>
                                <h3>Multidecision</h3>
                                <ul>
                                    {this.state.multidecision.map(item => {
                                         return (<li key={item.id}> <Link to={`multidecision/${item.id}`}>{item.title}</Link></li>)
                                    })}
                                </ul>
                            </Paper>
                        </Col>

                    </Row>
                </Grid>
            )
        );
    }
}

export default AdminPanel;