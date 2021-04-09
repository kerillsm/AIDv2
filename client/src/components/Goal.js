import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchGoal,checkAuth} from "../actions";
import moment from "moment/moment";
import { Redirect,Link} from 'react-router-dom';
import { Grid, Row, Col } from 'react-flexbox-grid';
import axios from 'axios'
import MetaTags from 'react-meta-tags'

import {
    FacebookShareCount,
    GooglePlusShareCount,
    LinkedinShareCount,
    PinterestShareCount,
    VKShareCount,
    OKShareCount,
    RedditShareCount,
    TumblrShareCount,
    FacebookShareButton,
    GooglePlusShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    PinterestShareButton,
    VKShareButton,
    OKShareButton,
    TelegramShareButton,
    WhatsappShareButton,
    RedditShareButton,
    EmailShareButton,
    TumblrShareButton,
    LivejournalShareButton,
    MailruShareButton,
    FacebookIcon,
    TwitterIcon,
    GooglePlusIcon,
    LinkedinIcon,
    PinterestIcon,
    VKIcon,
    OKIcon,
    TelegramIcon,
    WhatsappIcon,
    RedditIcon,
    TumblrIcon,
    MailruIcon,
    EmailIcon,
    LivejournalIcon,
} from 'react-share';


class Goal extends Component {
    constructor(props){
        super(props)
        this.state = {
            goal:[],
            id:`http://aidecider.com/profile/goal/${props.id}`,
            fetchId:null
        }
    }

    componentDidMount() {
        this.props.fetchGoal(this.state.fetchId)
    }
    static getDerivedStateFromProps(props, state) {
        return {
            fetchId:props.id
        }
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        if(this.props.data.title === undefined){
            this.props.fetchGoal(this.props.id)
        }
        console.log('nextProps',nextProps)
    }


    componentDidUpdate(prevProps, prevState, prevContext) {
        console.log('Goal was updated');
    }





    // componentWillUpdate(nextProps, nextState, nextContext) {
    //     if(this.props.id !== nextProps.id || this.props.data.length < 1){
    //         this.props.fetchGoal(this.props.id)
    //     }
    // }


    addH2Style =() => {
        return this.props.data.smart.filter(item => {
            return item.selected===true
        }).length === this.props.data.smart.length;
    };

    addH22Style =() => {
        return this.props.data.pure.filter(item => {
            return item.selected===true
        }).length === this.props.data.pure.length;
    };

    addH23Style =() => {
        return this.props.data.clear.filter(item => {
            return item.selected===true
        }).length === this.props.data.clear.length;
    };

    timeParser = (time) =>{
        console.log(time)
        const res = new moment.duration(time);
        return (res.asDays()+1).toFixed()

    }

    accurate = (data) => {
        const first =  data.smart.filter(item=>item.selected === true).length;
        const second =  data.pure.filter(item=>item.selected === true).length;
        const third =  data.clear.filter(item=>item.selected === true).length;
        const res = (((first/5+ second/4 + third/5)/3)*100).toFixed(1);
        return res
    }

    changePublicStatus = (id) => {
        'working...'
        axios.post('/api/goal/updatePublicStatus',{id})
    }


    renderGoal(data){

        if(data.title !== undefined){

            return(

                <div className="goal" onClick={()=>this.changePublicStatus(this.props.id)}>
                        
            <MetaTags>
                <title>Set New Goal | AI.Decider</title>
                <meta name="og:description" content="Some description" />
                <meta property="og:title" content="Set New Goal | AI.Decider" />
            </MetaTags>
<Grid>
	<Row className="profileheader" xs>
        <Col xs>
            <h2>Your Goal: {this.props.data.title}</h2>
        </Col>
    </Row>
    <Row end="xs"> 
        <Col> 
                        <FacebookShareButton
                            url={this.state.id}

                        >
                            <FacebookIcon
                                size={32}

                                round />

                        </FacebookShareButton>

        </Col>
        <Col>
                        <TwitterShareButton
                            url={this.state.id}
                        >
                            <TwitterIcon
                                size={32}
                                round />
                        </TwitterShareButton>

        </Col>
        <Col> 
                        <RedditShareButton
                            url={this.state.id}
                            title={this.props.data.title}
                            className="Demo__some-network__share-button">
                            <RedditIcon
                                size={32}
                                round />
                        </RedditShareButton>
        </Col>
        <Col>
                        <EmailShareButton
                            url={this.state.id}
                            subject={this.props.data.title}
                            body={this.state.id}
                            className="Demo__some-network__share-button">
                            <EmailIcon
                                size={32}
                                round />
                        </EmailShareButton>
        </Col>
    </Row>
	<Row start="xs">
        <Col xs>
                    <div className="goalt">
                        {this.timeParser(data.end-Date.now())>0?<p>You have {this.timeParser(data.end-Date.now())} day(s) left to meet your goal!</p>:<p>Time to meet Your Goal is up</p>}
                        <p>Your goal is {this.accurate(data)}% accurate</p>
                        {this.accurate(data)>=80?<div style={{'backgroundColor':'pink'}}><p>Accuracy of Your Goal-setting is stunning!</p></div>:null}
                    </div>
        </Col>
    </Row>
	<Row end="xs">
                <Col xs>
                <div className="goalt">
                            <h2 className={this.addH2Style() === true ? 'selected':''}>SMART Goal</h2>
                            {data.smart && data.smart.map(item => <p className={item.selected === true ? 'selected':''} key={item.name}>{item.name}</p>)}
                        </div>
                </Col>

                <Col xs>
                <div className="goalt">
                            <h2 className={this.addH23Style() === true ? 'selected':''}>CLEAR Goal</h2>
                            {data.clear && data.clear.map(item => <p className={item.selected === true ? 'selected':''} key={item.name}>{item.name}</p>)}
                        </div>
                </Col>
                <Col xs>
                <div className="goalt">
                            <h2 className={this.addH22Style() === true ? 'selected':''}>PURE  Goal</h2>
                            {data.pure && data.pure.map(item => <p className={item.selected === true ? 'selected':''} key={item.name}>{item.name}</p>)}
                        </div>
                </Col>
    </Row>

</Grid>

			    <aside className="overlayed">
                    <div className="block">
                        <h4>Goal Privacy</h4>
                        <p>All Shared Goals are accessible from Internet network  for all users</p>
                    </div>
                </aside>
                </div>
            )
        }

    }


    render() {
        console.log('owner',this.props.data.owner !== this.props.login);
        console.log('test',this.props.login !== this.props.data.owner && this.props.data.public === false);
        if (this.props.user !== this.props.data.owner && this.props.data.public === false && this.props.isAdmin === false  ) return <Redirect to="/" />

        const {data} = this.props;
        return (<div>{this.renderGoal(data)}</div>)

    }
}



const mapDispatchToProps = dispatch => bindActionCreators({fetchGoal,checkAuth},dispatch)
const mapStateToProps = state => {
    return {
        isLoggedIn:state.isLoggedIn.isAuth,
        user:state.username,
        data:state.goal
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Goal);



