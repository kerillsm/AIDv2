import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios'
import Tree from 'react-d3-tree';
import {connect} from 'react-redux';
import { Redirect,Link} from 'react-router-dom';
import { Grid, Row, Col } from 'react-flexbox-grid';
import RaisedButton from 'material-ui/RaisedButton';
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

class NodeLabel extends React.PureComponent {
    render() {
        const {className, nodeData,type} = this.props
        console.log('NODEDATA',nodeData,type)
        return type === 'movie' ? <div className={className}>

            <h4>{nodeData.Title}</h4>
			<p>Genre(s): {nodeData['genres']}</p>
            <p>Year: {nodeData['Year']}</p>
            {/*<img src={nodeData.image} width={100} height={50} alt=""/>*/}
            <p>IMDB Rate:{nodeData["IMDB Rate"]}</p>
        </div> : <div className={className}>
            <h4>{nodeData.Title}</h4>
            <p>Author: {nodeData['author']}</p>
			<p>Year: {nodeData['year']}</p>
            <img src={nodeData.image}  alt=""/>

        </div>

    }
}

class SavedTree extends Component {
    constructor(props){
        super(props);
        this.state = {
            data:{},
            id:`http://localhost:8080/savedTree/${props.type}/${props.id}`
        }
    }
    componentDidMount() {
        if(this.props.type === 'movie'){
            axios.get(`/api/savedMovieTree/${this.props.id}`).then(data=>{
                this.setState({
                    data:data.data
                })
            })
        }
        else{
            axios.get(`/api/savedBookTree/${this.props.id}`).then(data=>{
                this.setState({
                    data:data.data
                })
            })
        }
    }

    share = (id) => {
        if(this.props.type === 'movie'){
            axios.post('/api/movieTree/updatePublicStatus',{id})
        }
        else {
            axios.post('/api/bookTree/updatePublicStatus',{id})
        }

    }

    render() {

        if(this.state.data.dataFilm !== undefined){
            console.log('CHECK',this.state.data.dataUser.publicStatus === false,this.state.data.dataUser.owner !== this.props.user);
            if(this.state.data.dataUser.public === false && this.state.data.dataUser.owner !== this.props.user){
                return (<Redirect to='/'/>)
            }


        }
        return (
            <Grid>
			<Row>
			<Col xs>
			<h2>Your {this.props.type} tree</h2>
			</Col>
			</Row>
                {this.state.data.dataFilm !== undefined &&
                <Row end="xs" onClick={()=>this.share(this.props.id)}>
					<Col>
		                <p>Share your {this.props.type} tree: </p>
		            </Col> 
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
                            title={this.state.data.dataUser.title}
                            className="Demo__some-network__share-button">
                            <RedditIcon
                                size={32}
                                round />
                        </RedditShareButton>
                    </Col>
                    <Col>
                        <EmailShareButton
                            url={this.state.id}
                            subject={this.state.data.dataUser.title}
                            body={this.state.id}
                            className="Demo__some-network__share-button">
                            <EmailIcon
                                size={32}
                                round />
                        </EmailShareButton>
                    </Col>
                </Row>
                }



                <div id="treeWrapper" style={{width: '100%', height: '50em'}}>
                    {this.state.data.dataFilm !== undefined &&
                        <Tree data={this.state.data.dataFilm.data}
                              orientation={'horizontal'}
                              nodeSize={{'x':300,'y':300}}
                              allowForeignObjects
                              nodeLabelComponent={{
                                  render: <NodeLabel className='myLabelComponentInSvg' />,
                                  foreignObjectWrapper: {
                                      y: 10
                                  }

                              }}
                              translate={{'x':100,'y':20}}
                              zoom={0.7}
                        />



                    }

                </div>
            </Grid>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuth:state.isAuthShown,
        isLoggedIn:state.isLoggedIn.isAuth,
        user:state.username

    }
}

export default connect(mapStateToProps,null)(SavedTree);
