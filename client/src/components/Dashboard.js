import React from 'react';
import { Redirect } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Toggle from 'material-ui/Toggle';
import axios from 'axios'
import toastr from "toastr";
import MetaTags from 'react-meta-tags'

import {
    checkAuth, fetchMaps, fetchUsername, isAuthShown, logout, saveMapUserRestriction,updateUserRestriction
} from '../actions'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            share: null,
            hintText: '',
            props,
            isLoggedIn: props.isLoggedIn,
            value: '',
            response: { success: null }
        }
    }

    copyTextToClipboard(text) {
        const textArea = document.createElement("textarea");
        textArea.style.position = 'fixed';
        textArea.style.top = 0;
        textArea.style.left = 0;
        textArea.style.width = '2em';
        textArea.style.height = '2em';
        textArea.style.padding = 0;
        textArea.style.border = 'none';
        textArea.style.outline = 'none';
        textArea.style.boxShadow = 'none';
        textArea.style.background = 'transparent';
        textArea.value = text;


        document.body.appendChild(textArea);

        textArea.select();

        try {
        const successful = document.execCommand('copy');
        const msg = successful ? 'successful' : 'unsuccessful';

        } catch (err) { }

        document.body.removeChild(textArea);
    }

    handleChange(e) {
        this.setState({ hintText: e.target.value });
    }

    componentDidMount() {
        if (this.props.user !== null) {
            this.props.updateUserRestriction(this.props.user)
        }
        if (this.state.props.config.title !== ''){
            this.setState({ hintText: this.state.props.config.title })
        }
        // document.title = this.state.props.config.title + " | AI.Decider"
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        this.state.props.config.title = nextState.hintText
    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        if(prevState.response.success !== this.state.response.success){
            toastr.success(this.state.response.success).toString()
            this.props.saveMapUserRestriction(this.props.user)
        }
    }


    render() {

    var { items, coeff, consoleStats, config, id } = this.state.props;
    
    // console.log('Dashboard Title', this.state.props.config.title)

    var firstOption = 0;
    var secondOption = 0;
    var overallScore = 0;
    var self = this;

    for (var i = 0; i < items.length; i++) {
      let { score } = items[i];
      score *= Math.pow(coeff, i);

      if (score < 0) firstOption += score;
      if (score > 0) secondOption += score;
      overallScore += Math.abs(score);
    }

    firstOption = (firstOption / overallScore) * 100;
    secondOption = (secondOption / overallScore) * 100;

    function share() {
        self.copyTextToClipboard(`${window.location.host}/share/asdadasdadasdasd`);
        fetch('/api/share', {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(consoleStats([firstOption, secondOption]))
        })
            .then(res=> res.json())
            .then(res => {
                 self.copyTextToClipboard(`${window.location.host}/share/${res.id}`);
                self.setState({ share: res.id });


            });

    }

         let shareRand = () => {
             let randNum = () => {
                    let num = Math.random()*100;
                    let sign = parseInt((Math.random()>0.5?num*(-1):num).toFixed())
                    return sign
                }

                var firstOption = 0;
                var secondOption = 0;
                var overallScore = 0;
                var self = this;
                let newItems = items;
                newItems.map(item=>{
                    item.score = randNum()
                })

                for (var i = 0; i < newItems.length; i++) {
                    let { score } = newItems[i];
                    score *= Math.pow(coeff, i);

                    if (score < 0) firstOption += score;
                    if (score > 0) secondOption += score;
                    overallScore += Math.abs(score);
                }

                firstOption = (firstOption / overallScore) * 100;
                secondOption = (secondOption / overallScore) * 100;
                fetch('/api/share', {
                    method: 'post',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(consoleStats([firstOption, secondOption]))
                })
                    .then(res=> res.json())
                    .then(res => {
                        self.copyTextToClipboard(`${window.location.host}/share/${res.id}`);
                        self.setState({ share: res.id });


                    });


        }

        let checkTouchedMap = () => {
            const data = consoleStats([firstOption, secondOption]);
            const keys = Object.keys(data.results);

            const checkArr = keys.map(item => {
                if (data.results[item] !== 0 ) {
                    return true
                } else {
                    return false
                }
            })

            let res = checkArr.includes(true)

            return res ? share() : shareRand()
        }

    function saveMap() {
            axios.post('/api/map/save', consoleStats([firstOption, secondOption])).then(res=>{
            self.setState({response:res.data})
        })
      // fetch('/api/map/save', {
      //   method: 'post',
      //   headers: {
      //     "Content-Type": "application/json"
      //   },
      //   credentials: 'include',
      //   body: JSON.stringify(consoleStats([firstOption, secondOption]))
      // })
      // .then(res => this.setState({response:res}))
    }

    function changeCase(e, i) {
      config.cases[i] = e.target.value;
    }

    if (this.state.share) return <Redirect to={`/share/${this.state.share}`} />

    return (
      <div>
          <MetaTags>
            <title>{`${this.state.props.config.title + ' | AI.Decider'}`}</title>
            <meta name="og:description" content="Some description" />
            <meta property="og:title" content={`${this.state.props.config.title + ' | AI.Decider'}`} />
          </MetaTags>

        <Paper elevation={1} className="dashboard-paper">
        <Typography component="p">
Test Your Luck! Click on Share button without sliders adjustment! 
        </Typography>
      </Paper>
		<div className="dashboard-buttons">
				
          <div>
              <RaisedButton primary label='Save' disabled={this.props.user === null || this.props.userRestriction.mapsCounter === 0 || this.state.hintText === ''  } onClick={() => saveMap()}/>

              <RaisedButton label="Share" secondary={true} onClick={() => checkTouchedMap()}  />
              <Toggle
                  label="Private"
                  toggled={this.props.toggled}
                  disabled={!this.state.isLoggedIn }
                  name='toggle'
                  onToggle={()=>this.props.changeToggle()}
              />

          </div>

            <TextField
                name="hintText"  
                className="slider-input"
                hintText={this.state.hintText}
                value={this.state.hintText}
                onChange={(e) => this.handleChange(e)}
            />
        </div>

        <div className="dashboard">
            <p>
                <span className="score">{Math.abs(Math.round(firstOption)) || 0}%</span> 
                <input type="text" onChange={(e) => changeCase(e, 0)} placeholder={config.cases[0]} /> 
            </p>
            <p>
                <input type="text" onChange={(e) => changeCase(e, 1)} placeholder={config.cases[1]} /> 
                <span className="score">{Math.abs(Math.round(secondOption)) || 0}%</span> 
            </p>
        </div>

      </div>

    )
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

const mapDispatchToProps = dispatch => bindActionCreators({fetchMaps,checkAuth,logout,isAuthShown,fetchUsername,saveMapUserRestriction,updateUserRestriction},dispatch);

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);