import React, { Component } from 'react';
import { Button, Input, Paper } from '@material-ui/core';
import MultiDecision from '../MultiDecision';
import axios from 'axios';
import Decision from '../Decision';
import { makeOption } from './domains.js';
import { forLog } from './find.js';

class DeciderMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            param1: props.params[0],
            param2: props.params[1],
            params: props.params,
            option: {
                "title": props.text,
                "category": props.category,
                "owner": "user",
                "options": [
                    props.options,
                ],
                "cases": [
                    props.params[0],
                    props.params[1]
                ]
            },
            noInfo: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    
    handleSubmit(e) {
        e.preventDefault();
        let { param1, param2 } = this.state;
        
        if (!param1) {
            alert('Please provide first decision option')
        } else if (!param2) {
            alert('Please provide second decision option')
        } else {
            var text = param1 + ' ' + param2;
            axios.post('/api/assistant/', { domain: this.props.category, text: text })
                .then(res => {
                    if (res.data.length == 0) {
                        this.setState({noInfo: `Our AI wasn't able to find these options in the database, sorry!`})
						 var newParams = [param1, param2];

                    } else if (res.data.length == 1) {
                        if (res.data[0].value.toLowerCase() == param1.toLowerCase()) {
                            this.setState({noInfo: `Sorry, our AI never heard of the ${param2}`})
                            var newParams = [param1, param2];
                        } else if (res.data[0].value.toLowerCase() == param2.toLowerCase()) {
                            this.setState({noInfo: `Sorry, our AI never heard of the ${param1}`})
                            var newParams = [param2, param1];
                        }
                    } else {
                        if (res.data[0].value.toLowerCase() == param1.toLowerCase()) {
                            var newParams = [param1, param2];
                        } else if (res.data[0].value.toLowerCase() == param2.toLowerCase()) {
                            var newParams = [param2, param1];
                        }
                    }

                    var domParams = [];
                    res.data.map(item => {
                        domParams.push(item.data[0]);
                    });
                  
                    var option = makeOption(this.props.category, domParams);
                    
                    this.setState({params: newParams, option: { ...this.state.option, cases: newParams, options: [option] }});

                    /////////////////////////////////////////////////////////////
                    var sendLog = {};
                    
                    sendLog = forLog(this.state.params, this.props.text, this.props.category, this.state.params);
                    sendLog.user = 'user';
                    /////////////////////////////////////////////////////////
                    axios.post('/api/assistant/savelog', sendLog);
                })
        }
    }

    render() {
        let dopInp;
        var { params, noInfo } = this.state;

        if (params.length == 0 || params.length == 1) {
            dopInp = (
                <form onSubmit={this.handleSubmit} className="deciderPlaceholder">
                    <p className="deciderText">Our AI wasn't able to parse your decision options, please type them here:</p>
                    <span className="deciderLabel">{`${this.props.paramText}1`}: </span>
                    <Input className="deciderParam" name='param1' onChange={this.handleChange} defaultValue={this.state.param1} />
                    <span className="deciderLabel">{`${this.props.paramText}2`}: </span>
                    <Input className="deciderParam" name='param2' onChange={this.handleChange} defaultValue={this.state.param2} />
                    <Button type="submit" variant="contained">Decide</Button>
                </form>
              )
        } else if (params.length == 2) {
            dopInp = (
                <div>
                    {noInfo && <Paper className="dashboard-paper">{noInfo}</Paper>}
                    <Decision config={this.state.cases} map={this.state.option} />
                </div>
            )
        } else if (params.length > 2) {
            dopInp = (<MultiDecision items={this.props.multiDec} />)
        }

        return (
            <div>
                {dopInp}
            </div>
        );
    }
}

DeciderMap.defaultProps = {
    params: []
};

export default DeciderMap;