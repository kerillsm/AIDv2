import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
import axios from 'axios'
import MetaTags from 'react-meta-tags'

class SharedTasteTheTravel extends Component {

    constructor(props){
        super(props)
        this.state={
            data:[]
        }
    }

    componentDidMount() {
        axios.get(`/api/taste/share/${this.props.id}`).then(data=>{
            this.setState({
                data:data.data.data

            })
        })
    }

    render() {
        console.log(this.state);
        return (
		<div  className="food-item">

            <MetaTags>
                <title>Taste The Travel | AI.Decider</title>
                <meta name="og:description" content="Some description" />
                <meta property="og:title" content="Taste The Travel | AI.Decider" />
            </MetaTags>
								<h1>Taste the Travel: our food suggestion for your travel</h1>
                {this.state.data.map((arr)=>{
                    return(
                        <Grid key={arr.id}>
						<Row>

						</Row>
                            <Row>
                                <Col sm={3} smOffset={1} md={4} mdOffset={1}>
                                    <h3>{arr.title}</h3>
                                    <br/>
                                    <img src={arr.img} alt=""/>
                                </Col>
                                <Col sm={6} md={6}>
									<p>Cuisine: {arr.type}, {arr.country}</p>
                                    <p>{arr.description}</p>
									<p className="tag">{arr.tag}</p>
                                </Col>
                            </Row>
                        </Grid>
                    )
                })}
            </div>
        );
    }
}

SharedTasteTheTravel.propTypes = {};
SharedTasteTheTravel.defaultProps = {};

export default SharedTasteTheTravel;
