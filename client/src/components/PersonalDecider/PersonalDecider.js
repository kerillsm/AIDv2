import React, { Component, Fragment } from 'react';
import { CircleLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import { AppBar, Tabs, Tab, Button, Input, Paper, Typography } from '@material-ui/core';
import axios from 'axios';
import { findResult, findKeywords, getMax, forLog, toArray, makeMultiDecObj } from './find.js';
import { options, dictOne, makeOption, randJoke } from './domains.js';

import DeciderMap from './DeciderMap';

import Decision from '../Decision';
/*
import GoalMap from '../GoalMap';
import TasteTheTravel from '../TasteTheTravel';
import NewTree from '../NewTree';*/

import './PersonalDecider.css';

class PersonalDecider extends Component {
    constructor() {
        super();
        this.state = {
            text: '',
            domain: '',
            keywords: '',
            joke: '',
            value: 0,
            multiDec: [],
            isLoad: false,
            options: {},
            topquestion: '',
            decOption: {
                "title": 'Yes or No',
                "category": '',
                "owner": "user",
                "options": [{
                "Positive outcome": 0,
                "Negative outcome": 0,
                "Neutral outcome": 0,
                "Wildcard": 0
                }],
                "cases": ['Yes','No']
            }
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(e) {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }

    sendLog(log) {
        axios.post('/api/assistant/savelog', log);
    }

    callApi(text, domain) {
        var finded = [];
        var sendLog = {};
        var domParams = [];

        this.setState({isLoad: true});
        
        if (domain.length == 1) {
            if (domain[0] === 'dou') {
                var joke = randJoke();
                sendLog = forLog(finded, text, domain[0]);

                this.setState({
                    domain: domain[0],
                    isLoad: false,
                    joke: joke
                });
console.log(domParams);
                sendLog.user = 'user';
                sendLog.input = text;

                this.sendLog(sendLog);
            } else {
                axios.post(`/api/assistant/`, { domain: domain[0], text: text })
                    .then(res => {
                        
                        res.data.map(item => {
                            finded.push(item.value);
                            domParams.push(item.data[0]);
                        });
                    
                        if (finded.length > 2) {
                            var multiDecItems = makeMultiDecObj(res.data);
                            this.setState({ multiDec: multiDecItems})
                        }

                        var option = makeOption(domain[0], domParams);

                        this.setState({
                            domain: domain[0],
                            keywords: finded,
                            isLoad: false,
                            options: option
                        });

                        if (this.state.keywords.length > 1) {
                            sendLog = forLog(finded, text, domain[0]);
                            sendLog.user = 'user';
            
                            this.sendLog(sendLog);
                        }
                })
                .catch(err => console.log(err));
            }
        } else if (domain.length > 1 || domain.length == 0) {
            var sendApi = { text: text.toLowerCase(), domain: domain }
            this.setState({isLoad: true});

            axios.post('/api/assistant/all', sendApi)
                .then(res => {
                    var max = getMax(res.data);
                    if (Object.keys(res.data).length > 0) {
                        for (var key in max) {
                            var finded = [];
                            var domParams = [];

                            if (key === 'dou') {
                                var joke = randJoke();
                                this.setState({joke: joke});
                            } else {
                                max[key].map(item => {
                                    finded.push(item.value);
                                    domParams.push(item.data[0]);
                                });

                                if (finded.length > 2) {
                                    var multiDecItems = makeMultiDecObj(max[key]);
                                    this.setState({multiDec: multiDecItems})
                                }
                                var option = makeOption(key, domParams);
                            }

                            this.setState({ domain: key, keywords: finded, isLoad: false, options: option });
                            
                            if (this.state.keywords.length > 1) {
                                sendLog = forLog(finded, text, key);
                                sendLog.user = 'user';
        
                                this.sendLog(sendLog);
                            }
                        }
                    } else {
                        this.setState({ domain: false, decOption: {...this.state.decOption, title: text}, isLoad: false })

                        sendLog = forLog('', text, false);
                        sendLog.user = 'user';
                        this.sendLog(sendLog);
                    }
                 })
                .catch(err => console.log(err));
        }
    }



    handleSubmit(e) {
        e.preventDefault();
        this.setState({domain: ''})

        if (this.state.text.length <= 0) {
            this.setState({domain: 'empty'})
        } else if (this.state.text.length <= 4) {
            this.setState({domain: 'length'});
        } else {
            var text = this.state.text;
            var domain = findResult(text.toLowerCase(), dictOne);

            axios.post('/api/assistant/topquestion', { text: text.toLowerCase() })
                .then(res => {
                    if (res.data == false) {
                        this.callApi(text, domain);
                    } else {
                        this.setState({ domain: 'topquestion', topquestion: res.data.answer });
                        var sendLog = {};
                        
                        sendLog = forLog('', text, 'topquestion');
                        sendLog.user = 'user';
                        this.sendLog(sendLog);
                    }
                })
        }
    }

    handleTabChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { value, domain, keywords, isLoad, options, decOption, topquestion } = this.state;

        document.title = "Decision Maker | AI.Decider";

        return (
            <div className="personal-decider">
                <AppBar position="static">
                    <Tabs value={value} onChange={this.handleTabChange}>
                        <Tab label="Make Decision" />

                    </Tabs> 
                </AppBar>

                {value === 0 && (
                    <Fragment>
<br/>
				<h3>Decisions never have been easier</h3>	
        <Paper elevation={1} className="dashboard-paper">
			<Typography component="h5">Pick decision type from the menu or type your decision question below. Popular decision types:</Typography>
<Typography component="p">Pick <Link to="/maps/relocation">RELOCATION</Link> and <Link to="/maps/choose-vacation">VACATION</Link> destionations, or just <Link to="/maps/new-job"> choose new WORK </Link></Typography>
<Typography component="p">Find your <Link to="/maps/partner-love"> LOVE </Link>  or <Link to="/maps/pick-pet"> pick a PET </Link></Typography>
<Typography component="p"><Link to="/maps/call-or-not">Should I CALL?</Link> or <Link to="/maps/go-no-go">should I GO?</Link> and <Link to="/maps/buy-present"> pick a PRESENT </Link>! </Typography>
<Typography component="p">And <Link to="maps/geeks-zone"> who would WIN? </Link>, or simply <Link to="/maps/yes-or-no-decision"> YES or NO </Link>, <Link to="/multidecision"> PROS and CONS </Link> 
</Typography>
		</Paper>
				
                        <form className="deciderForm" onSubmit={this.handleSubmit}>
                            <Input 
                                className="deciderInput" 
                                placeholder="Type your decision question" 
                                name='text' 
                                value={this.state.text} 
                                onChange={this.handleChange} />
                            <Button type="submit" variant="contained" color="primary" className="deciderButton">Make Decision</Button>
                        </form>
                        {isLoad && <div className="CircleLoader"><CircleLoader color={'#3f51b5'} /></div>}

                        {/* Если нет домена */}
                        {domain === false && <Decision map={decOption} />}
						{domain === 'food' && <Decision map={decOption} />}
						{domain === 'reading' && <Decision map={decOption} />}
						{domain === 'movies' && <Decision map={decOption} />}
                        
                        {domain === 'topquestion' && <Paper elevation={1} className="dashboard-paper"><Typography component="p">{topquestion}</Typography></Paper>}

                        {domain === 'empty' && <Paper elevation={1} className="dashboard-paper"><Typography component="p">Come on, don't be so lazy! Type at least something.</Typography></Paper>}

                        {domain === 'length' && <Paper elevation={1} className="dashboard-paper"><Typography component="p">I can't think of any real decision question with less than 5-symbols length ...</Typography></Paper>}
            
			{domain === 'relocation' && <DeciderMap options={options} paramText='Location ' category={domain} params={keywords} text={this.state.text} multiDec={this.state.multiDec} />}
            
			{domain === 'names' && <DeciderMap options={options} paramText='Name ' category={domain} params={keywords} text={this.state.text} multiDec={this.state.multiDec} />}
            
			{domain === 'job' && <DeciderMap options={options} paramText='Career ' category={domain} params={keywords} text={this.state.text} multiDec={this.state.multiDec} />}
            
			{domain === 'geeks' && <DeciderMap options={options} paramText='Hero ' category={domain} params={keywords} text={this.state.text} multiDec={this.state.multiDec} />}
            
			{domain === 'study' && <DeciderMap options={options} paramText='University\Course ' category={domain} params={keywords} text={this.state.text} multiDec={this.state.multiDec} />}
            
			{domain === 'investment' && <DeciderMap options={options} paramText='Investment ' category={domain} params={keywords} text={this.state.text} multiDec={this.state.multiDec} />}
            
			{domain === 'sport' && <DeciderMap options={options} paramText='Team\Athlete ' category={domain} params={keywords} text={this.state.text} multiDec={this.state.multiDec} />}
            
                        {/* TasteTheTravel 
                        {domain === 'food' && <div> <Paper elevation={1} className="dashboard-paper">
						<Typography component="p">Ok, you are looking for something tasty! I have special module to suggest best meals around the world based on your location and what you prefer!</Typography></Paper>
						<TasteTheTravel /> </div>}*/}
            
			{domain === 'health' && <DeciderMap options={options} paramText='Treatment\Medicine ' category={domain} params={keywords} text={this.state.text} multiDec={this.state.multiDec} />}
            
			{domain === 'alco' && <DeciderMap options={options} paramText='Liquer ' category={domain} params={keywords} text={this.state.text} multiDec={this.state.multiDec} />}
            
                        {/* Reading & movies 
                        {domain === 'reading' && <div> <Paper elevation={1} className="dashboard-paper">
						<Typography component="p">I got it, you are looking for something interesting to read. I have special module to suggest best available books based on what you like!</Typography></Paper>
						<NewTree type='book' /> </div>}
						
                        {domain === 'movies' &&  <div><Paper elevation={1} className="dashboard-paper">
						<Typography component="p">I got it, you are looking for something interesting to watch. I have special module to suggest best available movies based on what you like!</Typography></Paper>
						<NewTree type='movie' /></div>}*/}
            
			{domain === 'social'  && <DeciderMap options={options} paramText='Partner\Friend ' category={domain} params={keywords} text={this.state.text} multiDec={this.state.multiDec} />}
            
          
			{domain === 'music' && <DeciderMap options={options} paramText='Genre\Instrument ' category={domain} params={keywords} text={this.state.text} multiDec={this.state.multiDec} />}
            
			{domain === 'emergency' && <Paper elevation={1} className="dashboard-paper">
				<Typography component="p">It sounds like you are having a really dificult time right now. If you need a little extra emotional support, please call the National Suicide Prevention Lifeline: <a href="tel:+18002738255">1-800-273-TALK</a> or  <a href="http://www.suicidepreventionlifeline.org/GetHelp/LifelineChat.aspx">Online Chat</a>. The call is free and confidential, and crisis workers are there 24/7 to assist you. The Lifeline is there for everyone.</Typography></Paper>}
            
			{domain === 'lifestyle' && <DeciderMap options={options} paramText='Hobby ' category={domain} params={keywords} text={this.state.text} multiDec={this.state.multiDec} />}
			
			{domain === 'internet' && <DeciderMap options={options} paramText='Site\App ' category={domain} params={keywords} text={this.state.text} multiDec={this.state.multiDec} />}
			
			{domain === 'beauty' && <DeciderMap options={options} paramText='Style ' category={domain} params={keywords} text={this.state.text} multiDec={this.state.multiDec} />}
			
			{domain === 'games' && <DeciderMap options={options} paramText='Game ' category={domain} params={keywords} text={this.state.text} multiDec={this.state.multiDec} />}
			
			{domain === 'religion' && <DeciderMap options={options} paramText='Belief ' category={domain} params={keywords} text={this.state.text} multiDec={this.state.multiDec} />}
			
			{domain === 'art' && <DeciderMap options={options} paramText='Art skill ' category={domain} params={keywords} text={this.state.text} multiDec={this.state.multiDec} />}	
			
			{domain === 'buy' && <DeciderMap options={options} paramText='Product ' category={domain} params={keywords} text={this.state.text} multiDec={this.state.multiDec} />}
			
			{domain === 'election' && <DeciderMap options={options} paramText='Candidate ' category={domain} params={keywords} text={this.state.text} multiDec={this.state.multiDec} />}							
			
			{domain === 'dou' && <Paper elevation={1} className="dashboard-paper">
					<Typography component="p">{this.state.joke}</Typography>	
					<Typography> Just try our <Link to="/maps/yes-or-no-decision">Yes or No decision map</Link></Typography></Paper>}

            
			{domain === 'dev' && <DeciderMap options={options} paramText='Technology ' category={domain} params={keywords} text={this.state.text} multiDec={this.state.multiDec} />}	

			{domain === 'transport' && <DeciderMap options={options} paramText='Commute ' category={domain} params={keywords} text={this.state.text} multiDec={this.state.multiDec} />}	
			
			{domain === 'pet' && <DeciderMap options={options} paramText='Pet ' category={domain} params={keywords} text={this.state.text} multiDec={this.state.multiDec} />}	


			{domain === 'child' && <DeciderMap options={options} paramText='Right time ' category={domain}  text={this.state.text} multiDec={this.state.multiDec} />}

			{domain === 'yesno' && <DeciderMap options={options} paramText='Yes\No ' category={domain}  text={this.state.text} multiDec={this.state.multiDec} />}
			
			{domain === 'fit' && <DeciderMap options={options} paramText='Fitness activity ' category={domain} params={keywords} text={this.state.text} multiDec={this.state.multiDec} />}	
			
			{domain === 'vacation' && <DeciderMap options={options} paramText='Destination ' category={domain} params={keywords} text={this.state.text} multiDec={this.state.multiDec} />}
						
			{domain === 'sex' && <DeciderMap options={options} paramText='Seduction ' category={domain}  text={this.state.text} multiDec={this.state.multiDec} />}
			
			{domain === 'service' && <DeciderMap options={options} paramText='Service Provider ' category={domain} params={keywords} text={this.state.text} multiDec={this.state.multiDec} />}
			
			{domain === 'diet' && <DeciderMap options={options} paramText='Diet ' category={domain} params={keywords} text={this.state.text} multiDec={this.state.multiDec} />}	
			
			{domain === 'holiday' && <DeciderMap options={options} paramText='Present ' category={domain} params={keywords} text={this.state.text} multiDec={this.state.multiDec} />}	
			
			{domain === 'color' && <DeciderMap options={options} paramText='Color ' category={domain} params={keywords} text={this.state.text} multiDec={this.state.multiDec} />}		
			
			{domain === 'gonogo' && <DeciderMap options={options} paramText='Go\No-Go ' category={domain} params={keywords} text={this.state.text} multiDec={this.state.multiDec} />}
			
			{domain === 'contact' && <DeciderMap options={options} paramText="Do/Don't " category={domain} params={keywords} text={this.state.text} multiDec={this.state.multiDec} />}				
			</Fragment>

                )}
                {/*value === 1 && <GoalMap />*/}    
				
				<aside className="overlayed">
                <div className="block">
                    <h4>How it works</h4>
					<ol type="1">
					<li>Pick decision type from menu OR</li>
                    <li>Type your Decision</li>
                    <li>Set decision options</li>
					<li>Adjust sliders for each decision factor</li>
                    </ol>
					<p><sup>As simple as that - share your decision with Friends&Family!</sup></p>
                </div>
					
				<div className="block">
                    <h3>Live a full Life</h3>
<p class="tag_cloud">
<Link to="/maps/relocation">Travel</Link> <sub><Link to="/maps/new-job">Work</Link></sub> <sup><Link to="maps/geeks-zone">Bet</Link></sup> <Link to="/maps/investment">Invest</Link> <sub><Link to="/taste-the-travel">Enjoy food</Link></sub> <sup><Link to="/tree/movie">Watch Movies</Link></sup> <Link to="/tree/book">Read Books</Link> <sup><Link to="/maps/yes-or-no-decision">Say Yes&No</Link></sup> <Link to="/maps/partner-love">Love</Link>  <sub><Link to="/maps/choose-diet">Diet</Link></sub> <Link to="/maps/go-no-go">Party</Link> <sup><Link to="/maps/christian-against-hell-to-heaven">Believe</Link></sup>  <sup><Link to="/maps/pick-game">Play</Link></sup> <Link to="/maps/pick-pet">Pet</Link> <sup><Link to="/maps/when-get-pregnant">Give a Birth</Link></sup> <sub><Link to="/maps/buy-present">Give</Link></sub> <sup><Link to="/maps/call-or-not">Talk</Link></sup> <sub><Link to="/maps/dev-language">Code</Link></sub> <sup><Link to="/maps/sport-to-choose">Sport</Link></sup> <Link to="/maps/choose-hobby">Collect</Link> <sup><Link to="/maps/pick-color">Express</Link></sup> <Link to="/maps/pick-baby-name">Name your baby</Link> <sub><Link to="/maps/pick-commute">Commute</Link></sub> <sup><Link to="/maps/what-to-drink">Drink</Link></sup> <Link to="/maps/choose-vacation">Rest</Link> <sub><Link to="/maps/choose-art">Create</Link></sub>
</p>
					<h3>Privacy</h3>
					<p>
                    <sup>All Shared Decisions are accessible from Internet network  for all users, you are sharing your Decision by clicking on Share button</sup></p>
                </div>
                </aside>
            </div>
        );
    }
}

export default PersonalDecider;