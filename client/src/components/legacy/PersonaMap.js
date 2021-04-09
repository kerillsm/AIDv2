import React, {Component} from 'react';
import DatePicker from 'material-ui/DatePicker';
import GoalHint from "./PersonaHint";
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    fetchMapsProfile,fetchUsername, fetchSliderProfile, fetchTreesProfile, postGoal, checkAuth,saveGoalUserRestriction,updateUserRestriction
} from '../actions'
import toastr from "toastr";
import TextField from 'material-ui/TextField';
import { Grid, Row, Col } from 'react-flexbox-grid';
import guid from 'uuid/v1'
import axios from "axios/index";


class PersonaMap extends Component {

    constructor(props){
        super(props);
        const minDate = new Date();
        minDate.setFullYear(minDate.getFullYear() );
        minDate.setHours(0, 0, 0, 0);

        this.state = {
            blockOne:[
			{name:'relocation',selected:false, cnt:0},
			{name:'names',selected:false, cnt:0},
			{name:'geeks',selected:false, cnt:0},
			{name:'job',selected:false, cnt:0},
			{name:'study',selected:false, cnt:0},
			{name:'investment',selected:false, cnt:0},
			{name:'sport',selected:false, cnt:0},
			{name:'food',selected:false, cnt:0},
			{name:'health',selected:false, cnt:0},
			{name:'alco',selected:false, cnt:0},
			{name:'reading',selected:false, cnt:0},
			{name:'movies',selected:false, cnt:0},
			{name:'social',selected:false, cnt:0},
			{name:'music',selected:false, cnt:0},
			{name:'emergency',selected:false, cnt:0},
			{name:'lifestyle',selected:false, cnt:0},	
			{name:'question',selected:false, cnt:0},	
			{name:'pronouns',selected:false, cnt:0},			
			{name:'opened',selected:false, cnt:0},			
			],
     
            value:'',
            inputArr:[],
            relocationArr:[],
            namesArr:[],
            jobArr:[],
            geeksArr:[],
            studyArr:[],
			investmentArr:[],
			sportArr:[],
			healthArr:[],
			foodArr:[],
			alcoArr:[],
			readingArr:[],
			moviesArr:[],
			socialArr:[],
			musicArr:[],
			emergencyArr:[],
            generalArr:[],
            openedArr:[],
            controlledDate: null,
            minDate: minDate,
            blockOneVar:[],
            blockTwoVar:[],
            date:Date.now(),
            response:{success:null}
        }

    }

    dictOne = {
        relocation:['relocation','location','move','moving','transfer','city','state','country','district','county','transfer','moves','where','live','house'],
        names:['name','naming','names','surname','nickname','baby','pet','child','tag','team'],
        job:['job','work','career','position','assignment','activity','role','profession','careers','promotion'],
        geeks:['hero','superhero','marvel','dc','comics','vertigo','games','game','cosplay','batman','superman','console','boardgame','play','hobby'],
		study:['where','university','institute','universities','institutes','faculty','faculties','graduate','graduation','study','learn','teach','learning','studying','school','college','degree','language'],
        investment:['stock','equity','share','finance','loan','debit','credit','bond','obligation','liability','swap','option','forwards','futures','cds','irs','business','money','fx'],
        sport:['vs','win','won','winner','loser','sport','sports'],
        food:['meal','food','eat','cuisine','street','healthy','sandwich','appetizer','soup','stew','pie','salad','cake','bread','cookie','fermented','hungry','starving','healthily'],
		health:['health','fit','fitness','sport','energy','doctor','sex','healthy','healthily','shape','healthy','healthily','exercise','body','physical','bad','pregnant'],
        alco:['alco','alcohol', 'rum','gin','whiskey', 'vodka', 'beer','ale','booze','drink','ethanol','liquor','methanol','smoke','alky','cocktail','firewater','hootch','intoxicant','moonshine','palliative','rotgut','sauce','spirits','tipple','toddy'],
        reading:['album','booklet','brochure','dictionary','edition','essay','fiction','magazine','manual','novel','pamphlet','paperback','publication','text','textbook','tome','volume','work','writing','atlas','bestseller','codex','compendium','dissertation','encyclopedia','folio','handbook','hardcover','leaflet','lexicon','monograph','nonfiction','octavo','offprint','omnibus','opus','periodical','primer','quarto','reader','reprint','roll','scroll','speller','thesaurus','tract','treatise','opuscule','preprint','softcover','read','book','reading','books','reads','comics','manga','novel','poem','bible'],
        social:['love','friend','friendship','friends','affair','adultery','lover','family','divorce','sex','children','dream','partner','who', 'date','married','lifemate','kid','kids','marriage','toxic','people','girl','girls','boy','boys','like','likes','cheat'],
		movies:['cinema','movie','movies','films','animation','cartoon','watch','anime','media'],
        music:['music','band','song','singer','album','longplay','lp','single','listen','play','musical'],
		emergency:['kill','murder','suicide','harm','desperate','damage','drugs','pain','911','abuse', 'assault','victim','fear','anxiety','suicidal','help'],
		lifestyle:['dress','look','wear','dream','hobby','pet','dreams','pets']			
    }

    dictTwo = {	
	question:['who','when','where','what','which','how','why','whose'],
    opened:['what should I do'],
	pronouns: ['i','me','my ','mine','we','us','our ','ours','you','your','yours','he','she','it','him','her','it','his','her  ','hers','its','they','them','their','theirs']
	}

    handleChange = (e) =>{
        this.setState({
            value: e.target.value
        });

        this.setState({
            inputArr:e.target.value.split(/[,.!?&]| /)
        })


    };

    handleChangeDate = (event, date) => {
        this.setState({
            controlledDate: date
        });
        this.state.blockOne[4].selected = true
    };

    componentDidMount() {
        document.title = "Personal Assistant | AI.Decider"
        if(this.props.user !== null){
            this.props.updateUserRestriction(this.props.user)
        }

    }




    componentWillUpdate(nextProps, nextState, nextContext) {
        console.log('Renewing...');
        if(this.state.value.length !== nextState.value.length || this.state.controlledDate !== nextState.controlledDate || this.props.isAuth !== nextProps.isAuth || this.props.isLoggedIn !== nextProps.isLoggedIn || this.props.maps !== nextProps.maps || this.props.login.info !== nextProps.login.info || this.props.login.status !== nextProps.login.status || this.props.login.user !== nextProps.login.user || this.state.register !== nextState.register){
            this.setState({
                relocationArr:[],
                namesArr:[],
                jobArr:[],
                geeksArr:[],
				studyArr:[],
				investmentArr:[],
				sportArr:[],
				healthArr:[],
				foodArr:[],
				alcoArr:[],
				readingArr:[],
				moviesArr:[],
				socialArr:[],
				musicArr:[],
                emergencyArr:[],
                generalArr:[],
                openedArr:[],
                challengingArr:[],
                legalArr:[],
                environmentallyFriendlyArr:[],
                agreedArr:[],
                blockOneVar:[],
                blockTwoVar:[],
            })

        }

    }
    postGoal = (goal,user,smart,pure,clear,targetDate,date,id,_public) =>  {
        const publicStatus = _public !== undefined ? _public : false
        const data = {
            goal,
            user,
            smart,
            pure,
            clear,
            enddate:targetDate,
            date,
            id,
            publicStatus
        }
         axios.post(`/api/goal/save`,data).then(res=>{
            this.setState({
                response:res.data
            })
        })

    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        if(prevState.response.success !== this.state.response.success){
            toastr.success(this.state.response.success).toString()
            this.props.saveGoalUserRestriction(this.props.user)
        }


    }


    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.state.value.length !== nextState.value.length || this.state.controlledDate !== nextState.controlledDate || this.props.isAuth !== nextProps.isAuth || this.props.isLoggedIn !== nextProps.isLoggedIn || this.props.maps !== nextProps.maps || this.props.login.info !== nextProps.login.info || this.props.login.status !== nextProps.login.status || this.props.login.user !== nextProps.login.user || this.state.register !== nextState.register || this.state.response.success !== nextState.response.success || this.props.userRestriction.goalsCounter !== nextProps.userRestriction.goalsCounter
    }




    parseInput = () => {

this.state.blockOne[0].cnt=this.state.inputArr.filter(value => -1 !== this.dictOne.relocation.indexOf(value.toLowerCase())).length;
this.state.blockOne[1].cnt=this.state.inputArr.filter(value => -1 !== this.dictOne.names.indexOf(value.toLowerCase())).length;
this.state.blockOne[2].cnt=this.state.inputArr.filter(value => -1 !== this.dictOne.geeks.indexOf(value.toLowerCase())).length;
this.state.blockOne[3].cnt=this.state.inputArr.filter(value => -1 !== this.dictOne.job.indexOf(value.toLowerCase())).length;
this.state.blockOne[4].cnt=this.state.inputArr.filter(value => -1 !== this.dictOne.study.indexOf(value.toLowerCase())).length;
this.state.blockOne[5].cnt=this.state.inputArr.filter(value => -1 !== this.dictOne.investment.indexOf(value.toLowerCase())).length;
this.state.blockOne[6].cnt=this.state.inputArr.filter(value => -1 !== this.dictOne.sport.indexOf(value.toLowerCase())).length;
this.state.blockOne[7].cnt=this.state.inputArr.filter(value => -1 !== this.dictOne.food.indexOf(value.toLowerCase())).length;
this.state.blockOne[8].cnt=this.state.inputArr.filter(value => -1 !== this.dictOne.health.indexOf(value.toLowerCase())).length;
this.state.blockOne[9].cnt=this.state.inputArr.filter(value => -1 !== this.dictOne.alco.indexOf(value.toLowerCase())).length;
this.state.blockOne[10].cnt=this.state.inputArr.filter(value => -1 !== this.dictOne.reading.indexOf(value.toLowerCase())).length;
this.state.blockOne[11].cnt=this.state.inputArr.filter(value => -1 !== this.dictOne.movies.indexOf(value.toLowerCase())).length;
this.state.blockOne[12].cnt=this.state.inputArr.filter(value => -1 !== this.dictOne.social.indexOf(value.toLowerCase())).length;
this.state.blockOne[13].cnt=this.state.inputArr.filter(value => -1 !== this.dictOne.music.indexOf(value.toLowerCase())).length;
this.state.blockOne[14].cnt=this.state.inputArr.filter(value => -1 !== this.dictOne.emergency.indexOf(value.toLowerCase())).length;
this.state.blockOne[15].cnt=this.state.inputArr.filter(value => -1 !== this.dictOne.lifestyle.indexOf(value.toLowerCase())).length;


this.state.blockOne[16].cnt=this.state.inputArr.filter(value => -1 !== this.dictTwo.question.indexOf(value.toLowerCase())).length;
this.state.blockOne[17].cnt=this.state.inputArr.filter(value => -1 !== this.dictTwo.pronouns.indexOf(value.toLowerCase())).length;

var a = Math.max(
this.state.blockOne[0].cnt,
this.state.blockOne[1].cnt,
this.state.blockOne[2].cnt,
this.state.blockOne[3].cnt,
this.state.blockOne[4].cnt,
this.state.blockOne[5].cnt,
this.state.blockOne[6].cnt,
this.state.blockOne[7].cnt,
this.state.blockOne[8].cnt,
this.state.blockOne[9].cnt,
this.state.blockOne[10].cnt,
this.state.blockOne[11].cnt,
this.state.blockOne[12].cnt,
this.state.blockOne[13].cnt,
this.state.blockOne[14].cnt,
this.state.blockOne[15].cnt
)

    };

    addH2Style =() => {
        return this.state.blockOne.filter(item => {
            return item.selected===true
        }).length === this.state.blockOne.length;
    };



    saveAndShare = () => {
        const id = guid()
        let promise = new Promise((resolve, reject) => {
            resolve(this.postGoal(this.state.value, this.props.user, this.state.blockOne, Date.parse(`${this.state.controlledDate}`),this.state.date,id,true))
        })
        promise.then(this.props.saveGoalUserRestriction(this.props.user)).then(this.props.history.push(`/profile/goal/${id}`))



    }




    render() {
        console.log(this.state )
		        console.log(this.state.inputArr )
        return (
            <div className="goal">
<Grid>
	<Row className="profileheader" xs>
        <Col xs>
                        <h2>Personal Assistant</h2>
        </Col>
    </Row>
			<Row end="xs">
                <Col xs={4} sm={3}>
                     {this.state.controlledDate === null || this.state.value.length === 0
                        ?<RaisedButton label="Save" primary={true} disabled={true} />
                        :<RaisedButton label="Save" primary={true} disabled={this.props.isLoggedIn === false || this.props.userRestriction.goalsCounter === 0 } onClick={() => this.postGoal(this.state.value, this.props.user, this.state.blockOne,this.state.blockTwo,  Date.parse(`${this.state.controlledDate}`),this.state.date)}/>
                    }
                </Col>
                <Col xs={4} sm={3}>
                   {this.state.controlledDate === null || this.state.value.length === 0
                        ?<RaisedButton label="Save&Share" primary={true} disabled={true} />
                        :<RaisedButton label="Save&Share" primary={true} disabled={this.props.isLoggedIn === false || this.props.userRestriction.goalsCounter === 0 } onClick={() => this.saveAndShare()}/>
                    }
                </Col>

			</Row>
			<Row middle="xs">
                <Col xs>			
                        <TextField
                            hintText="Type your decision or question here"
                            onChange={event => this.handleChange(event)}
                            value={this.state.value}
                            onKeyDown={this.parseInput()}
                        />
                </Col>

			</Row>

			<Row>
                <Col xs>
			    <GoalHint
                    time={this.state.controlledDate}
                    first = {this.state.blockOneVar.length}
                    second = {this.state.blockTwoVar.length}
                />
                </Col>
			</Row>
			
			<Row>
                <Col xs>
				<div className="goalt">
                    <h2 className={this.addH2Style() === true ? 'selected':''}>Main dictionary</h2>
                    {this.state.blockOne.map(item => <p className={item.selected === true ? 'selected':''} key={item.name+' = '+item.cnt}>{item.name+' = '+item.cnt}</p>)}
                </div>
                </Col>


			</Row>
</Grid>
			    <aside className="overlayed">
                    <div className="block">
                        <h4>Goal Tips</h4>
						<ol type="1">
                        <li>Type your goal</li>
                        <li>Set milestone</li>
						<li>Check your goal setting accuracy</li>
                        <li>Don't forget to share your goal!</li>
						</ol>
                        <h3>Privacy</h3>
					
                        <p>All Shared Goals are accessible from Internet network  for all users, you are sharing your Goal by clicking on Save&Share button</p>
						
                    </div>
                </aside>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn:state.isLoggedIn.isAuth,
        user:state.username,
        isAuth:state.isAuthShown,
        maps:state.maps,
        login:state.login,
        goal:state.goal,
        userRestriction:state.userRestriction.toJS()
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({fetchMapsProfile,postGoal,checkAuth,fetchUsername,saveGoalUserRestriction,updateUserRestriction},dispatch)


export default connect(mapStateToProps,mapDispatchToProps)(PersonaMap)