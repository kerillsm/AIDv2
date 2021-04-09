import React from 'react';
import { Redirect } from 'react-router-dom';
import toastr from 'toastr';
import jquery from 'jquery';
import { Grid, Row, Col } from 'react-flexbox-grid';
import {Link} from 'react-router-dom'
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
import MetaTags from 'react-meta-tags'
import Smaps from './Smaps'


class Share extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      config: {},
      error: null,
      match: props.match,
        id:`http://aidecider.com/share/${props.match.params.id}`
    }

    fetch(`/api/share/${props.match.params.id}`).then((data) => data.json()).then((result) => {
      this.setState({
        config: result,
        error: result.error
      });
    });
  }

  componentDidMount() {
    toastr.info('Decide. Share. Discuss')
  }




  render() {

    const { config } = this.state;
    if (this.state.error) return <Redirect to="/" />
    if (!config.total) return (<div></div>);
    console.log('config',config)

    const firstResult = Math.ceil(Math.abs(config.total[0]));
    const secondResult = Math.floor(Math.abs(config.total[1]));
    const results = [firstResult, secondResult];
      console.log(results);

      const winner = (firstResult > secondResult ? 0 : 1);
    const loser = Math.abs(winner - 1);

      console.log('Winner',winner);
      console.log('Loser',loser);
      console.log('Config',config);

      const parity = (firstResult === secondResult);
      const title =  config.cases[loser] + " vs " + config.cases[winner]
	  const titlet = config.title ? config.title:"Decision result for: " + title;
    return (
      <div className='share-page'>

            <MetaTags>
                <title>{`${title} | AI.Decider`}</title>
                <meta name="og:description" content="Shared decision on AI.Decider" />
                <meta property="og:title" content={`${title} | AI.Decider`} />
            </MetaTags>

<Grid>
			    <Row end='xs'  className="profileheader">
				<Col xs>
                    <h2>{titlet}</h2>
				</Col>	
                </Row>	
    <Row end="xs" className="sharebuttons"> 

		<Col>
			<h3>Share. Discuss. Succeed: </h3>
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
                  title={title}
                  className="Demo__some-network__share-button">
                  <RedditIcon
                      size={32}
                      round />
              </RedditShareButton>
        </Col>
        <Col>
              <EmailShareButton
                  url={this.state.id}
                  subject={title}
                  body={this.state.id}
                  className="Demo__some-network__share-button">
                  <EmailIcon
                      size={32}
                      round />
              </EmailShareButton>
        </Col>

    </Row>
</Grid>


        <div className="share-wrapper">
          <div className="scores">
            <p>{ results[loser] }%</p>
            <p className={`${parity ? '' : "winnerName"}`}>{ results[winner] }%</p>
          </div>
        </div>
        <div className="share-wrapper">
          <div className="total-result">
            <p>{ config.cases[loser] }</p>
            <p>{ config.cases[winner] }</p>
          </div>
        </div>




        {Object.keys(config.results).map((el, id) => {
          return (
            <div className="share-wrapper" key={id}>
              <Option name={el} score={config.results[el] } winner={winner}></Option>
            </div>

          )
        })}
		
		<div className="smaps">
			<Smaps />
        </div>
		
	  </div>

	  )
  }
}


const Option = (props) => {
  let { name, score,winner } = props;
    console.log('Score',score);

    return (
        <div>
            {winner === 1 ? <div className="option">
                <p className="option-name">{name}</p>
                <div className="bar">
                    <div className="bar-option left-option"><p>{(score > 0 ? '0' : Math.abs(score))}</p></div>
                    <div className="bar-option right-option"><p>{(score < 0 ? '0' : Math.abs(score))}</p></div>
                </div>
            </div>:<div className="option">
                <p className="option-name">{name}</p>
                <div className="bar">
                    <div className="bar-option left-option"><p>{(score < 0 ? '0' : Math.abs(score))}</p></div>
                    <div className="bar-option right-option"><p>{(score > 0 ? '0' : Math.abs(score))}</p></div>
                </div>
            </div>}
			
        </div>

  )
}

export default Share;
