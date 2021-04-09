import React, { Component } from 'react';
import axios from 'axios';

class DeciderLog extends Component {
    constructor() {
        super();
        this.state = {
            item: {}
        }
    }

    componentDidMount() {
        axios.get(`/api/admin/log/${this.props.match.params.id}`)
            .then(res => {
                this.setState({item: res.data})
            })
    }

    render() {
        console.log(this.state.item.addquestion);
        return (
            <div>
                <ul>
                    <li>input: {this.state.item.input}</li>
                    <li>domain: {this.state.item.domain}</li>
                    <li>addquestion: {this.state.item.addquestion == true && 'true' || 'false'}</li>
                    <li>iskeyfdefined: {this.state.item.iskeyfdefined == true && 'true' || 'false'}</li>
                    <li>outtype: {this.state.item.outtype}</li>
                    <li>user: {this.state.item.user}</li>
                    <li>params: {this.state.item.params}</li>
                    <li>date: {this.state.item.datetime}</li>
                </ul>
            </div>
        );
    }
}

export default DeciderLog;