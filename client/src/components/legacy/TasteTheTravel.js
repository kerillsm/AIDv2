import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
import axios from 'axios'
import RaisedButton from 'material-ui/RaisedButton';
import {withRouter} from 'react-router-dom'
import MetaTags from 'react-meta-tags'

class TasteTheTravel extends Component {
    constructor(props){
        super(props)
        this.state = {
            region:null,
            type:null,
            countries:[],
            selectedCountry:null,
            allData:[],
            healthyArr:[],
            streetArr:[],
            renderArr:[]
        }


    }

    componentDidMount() {
        this.fetchDataAll()
        const data = []

        sessionStorage.setItem('data', JSON.stringify(data));

    }


    componentDidUpdate(prevProps, prevState, prevContext) {

        if(prevState.region !== this.state.region && this.state.region !== null && this.state.selectedCountry === null){
            axios.get(`/api/countries/${this.state.region}`).then(data=>{
                this.setState({
                    countries:data.data,
                    loading:false
                })
            })
        }
    }

     shouldComponentUpdate(nextProps, nextState) {
         console.log('nextState',nextState);

         return true
     }




    handleRegionChange = (e) => {
        this.setState({
            region:e.target.value,
            selectedCountry:null,
            loading:true
        })
    }

    handleTypeChange = (e) => {
        this.setState({
            type:e.target.value
        })
    }

    fetchDataAll = () => {
        axios.get('/api/taste/all').then(data=>{
            this.setState({
                allData:data.data,
                healthyArr:data.data.filter(item => {
                    return item.cousin === 'healthy'
                }),
                streetArr:data.data.filter(item => {
                    return item.cousin === 'street'
                 })


            })
        })
    }

    renderFood = () => {

        const firstArr = this.state.allData.filter(item=>{
            return item.type === 'apetizer'||item.type ==='sandwich'//?item.type === 'apetizer'||item.type ==='sandwich':item.type === 'bread'
        })
        const secondArr = this.state.allData.filter(item=>{
            return item.type === 'soup'||item.type === 'stew'||item.type ==='junky food'//?item.type === 'soup'||item.type === 'stew'||item.type ==='junky food':item.type === 'bread'
        })
        const thirdArr = this.state.allData.filter(item=>{
            return item.type === 'salad'||item.type ==='pie'//?item.type === 'salad'||item.type ==='pie':item.type === 'bread'
        })
        const fourthArr = this.state.allData.filter(item=>{
            return item.type === 'bread'||item.type ==='cake'//?item.type === 'bread'||item.type ==='cake':item.type === 'bread'
        })
        const fifthArr = this.state.allData.filter(item=>{
            return item.type === 'fermented'||item.type ==='cookie'//?item.type === 'fermented'||item.type ==='cookie':item.type === 'bread'
        })

        if(this.state.selectedCountry !== null){
            //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            if(this.state.type === null){
                return (
                    <Grid>

                        {this.renderItem(firstArr.filter(item=>item.country=== this.state.selectedCountry)[this.randomValue(firstArr.filter(item=>item.country=== this.state.selectedCountry))])}
                        {this.renderItem(secondArr.filter(item=>item.country=== this.state.selectedCountry)[this.randomValue(secondArr.filter(item=>item.country=== this.state.selectedCountry))])}
                        {this.renderItem(thirdArr.filter(item=>item.country=== this.state.selectedCountry)[this.randomValue(thirdArr.filter(item=>item.country=== this.state.selectedCountry))])}
                        {this.renderItem(fourthArr.filter(item=>item.country=== this.state.selectedCountry)[this.randomValue(fourthArr.filter(item=>item.country=== this.state.selectedCountry))])}
                        {this.renderItem(fifthArr.filter(item=>item.country=== this.state.selectedCountry)[this.randomValue(fifthArr.filter(item=>item.country=== this.state.selectedCountry))])}
                    </Grid>
                )
            }

            if(this.state.type !== null && this.state.region !== null){
                ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                if(this.state.type === 'street'){
                    const sandwichArr = this.state.streetArr.filter(item=>{
                        return item.type === 'sandwich'?item.type === 'sandwich':item.type === 'bread'
                    })

                    const junkyFoodArr = this.state.streetArr.filter(item=>{
                        return item.type === 'junky food'?item.type === 'junky food':item.type === 'bread'
                    })


                    const pieArr = this.state.streetArr.filter(item=>{
                        return item.type === 'pie'?item.type === 'pie':item.type === 'bread'
                    })

                    const cakeArr = this.state.streetArr.filter(item=>{
                        return item.type === 'cake'?item.type === 'cake':item.type === 'bread'
                    })

                    const cookieArr = this.state.streetArr.filter(item=>{
                        return item.type === 'cookie'?item.type === 'cookie':item.type === 'bread'
                    })

                    return (
                        <Grid>

                            {this.renderItem(sandwichArr.filter(item=>item.country=== this.state.selectedCountry)[this.randomValue(sandwichArr.filter(item=>item.country=== this.state.selectedCountry))])}
                            {this.renderItem(junkyFoodArr.filter(item=>item.country=== this.state.selectedCountry)[this.randomValue(junkyFoodArr.filter(item=>item.country=== this.state.selectedCountry))])}
                            {this.renderItem(pieArr.filter(item=>item.country=== this.state.selectedCountry)[this.randomValue(pieArr.filter(item=>item.country=== this.state.selectedCountry))])}
                            {this.renderItem(cakeArr.filter(item=>item.country=== this.state.selectedCountry)[this.randomValue(cakeArr.filter(item=>item.country=== this.state.selectedCountry))])}
                            {this.renderItem(cookieArr.filter(item=>item.country=== this.state.selectedCountry)[this.randomValue(cookieArr.filter(item=>item.country=== this.state.selectedCountry))])}
                        </Grid>
                    )
                }
                else {
                    const apetizerArr = this.state.healthyArr.filter(item=>{
                        return item.type === 'apetizer'?item.type === 'apetizer':item.type === 'bread'
                    })

                    const soupOrStewArr = this.state.healthyArr.filter(item=>{
                        return item.type === 'soup'||item.type === 'stew'?item.type === 'soup'||item.type === 'stew':item.type === 'bread'
                    })


                    const saladArr = this.state.healthyArr.filter(item=>{
                        return item.type === 'salad'?item.type === 'salad':item.type === 'bread'
                    })

                    const breadArr = this.state.healthyArr.filter(item=>{
                        return item.type === 'bread'?item.type === 'bread':item.type === 'fermented'
                    })

                    const fermentedArr = this.state.healthyArr.filter(item=>{
                        return item.type === 'fermented'?item.type === 'fermented':item.type === 'bread'||item.type === 'salad'
                    })


                    return (
                        <Grid>

                            {this.renderItem(apetizerArr.filter(item=>item.country=== this.state.selectedCountry)[this.randomValue(apetizerArr.filter(item=>item.country=== this.state.selectedCountry))])}
                            {this.renderItem(soupOrStewArr.filter(item=>item.country=== this.state.selectedCountry)[this.randomValue(soupOrStewArr.filter(item=>item.country=== this.state.selectedCountry))])}
                            {this.renderItem(saladArr.filter(item=>item.country=== this.state.selectedCountry)[this.randomValue(saladArr.filter(item=>item.country=== this.state.selectedCountry))])}
                            {this.renderItem(breadArr.filter(item=>item.country=== this.state.selectedCountry)[this.randomValue(breadArr.filter(item=>item.country=== this.state.selectedCountry))])}
                            {this.renderItem(fermentedArr.filter(item=>item.country=== this.state.selectedCountry)[this.randomValue(fermentedArr.filter(item=>item.country=== this.state.selectedCountry))])}
                        </Grid>
                    )
                }

            }



        }

        if(this.state.type === null && this.state.region !== null){
            return (
                <Grid>

                    {this.renderItem(firstArr.filter(item=>item.region=== this.state.region)[this.randomValue(firstArr.filter(item=>item.region=== this.state.region))])}
                    {this.renderItem(secondArr.filter(item=>item.region=== this.state.region)[this.randomValue(secondArr.filter(item=>item.region=== this.state.region))])}
                    {this.renderItem(thirdArr.filter(item=>item.region=== this.state.region)[this.randomValue(thirdArr.filter(item=>item.region=== this.state.region))])}
                    {this.renderItem(fourthArr.filter(item=>item.region=== this.state.region)[this.randomValue(fourthArr.filter(item=>item.region=== this.state.region))])}
                    {this.renderItem(fifthArr.filter(item=>item.region=== this.state.region)[this.randomValue(fifthArr.filter(item=>item.region=== this.state.region))])}
                </Grid>
            )
        }

        if(this.state.type !== null && this.state.region !== null){
            ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            if(this.state.type === 'street'){
                const sandwichArr = this.state.streetArr.filter(item=>{
                    return item.type === 'sandwich'?item.type === 'sandwich':item.type === 'bread'
                })

                const junkyFoodArr = this.state.streetArr.filter(item=>{
                    return item.type === 'junky food'?item.type === 'junky food':item.type === 'bread'
                })


                const pieArr = this.state.streetArr.filter(item=>{
                    return item.type === 'pie'?item.type === 'pie':item.type === 'bread'
                })

                const cakeArr = this.state.streetArr.filter(item=>{
                    return item.type === 'cake'?item.type === 'cake':item.type === 'bread'
                })

                const cookieArr = this.state.streetArr.filter(item=>{
                    return item.type === 'cookie'?item.type === 'cookie':item.type === 'bread'
                })

                return (
                    <Grid>
                        {this.renderItem(sandwichArr.filter(item=>item.region=== this.state.region)[this.randomValue(sandwichArr.filter(item=>item.region=== this.state.region))])}
                        {this.renderItem(junkyFoodArr.filter(item=>item.region=== this.state.region)[this.randomValue(junkyFoodArr.filter(item=>item.region=== this.state.region))])}
                        {this.renderItem(pieArr.filter(item=>item.region=== this.state.region)[this.randomValue(pieArr.filter(item=>item.region=== this.state.region))])}
                        {this.renderItem(cakeArr.filter(item=>item.region=== this.state.region)[this.randomValue(cakeArr.filter(item=>item.region=== this.state.region))])}
                        {this.renderItem(cookieArr.filter(item=>item.region=== this.state.region)[this.randomValue(cookieArr.filter(item=>item.region=== this.state.region))])}
                    </Grid>
                )
            }
            else {
                const apetizerArr = this.state.healthyArr.filter(item=>{
                    return item.type === 'apetizer'?item.type === 'apetizer':item.type === 'bread'
                })

                const soupOrStewArr = this.state.healthyArr.filter(item=>{
                    return item.type === 'soup'||item.type === 'stew'?item.type === 'soup'||item.type === 'stew':item.type === 'bread'
                })


                const saladArr = this.state.healthyArr.filter(item=>{
                    return item.type === 'salad'?item.type === 'salad':item.type === 'bread'
                })

                const breadArr = this.state.healthyArr.filter(item=>{
                    return item.type === 'bread'?item.type === 'bread':item.type === 'fermented'
                })

                const fermentedArr = this.state.healthyArr.filter(item=>{
                    return item.type === 'fermented'?item.type === 'fermented':item.type === 'bread'||item.type === 'salad'
                })


                return (
                    <Grid>

                        {this.renderItem(apetizerArr.filter(item=>item.region=== this.state.region)[this.randomValue(apetizerArr.filter(item=>item.region=== this.state.region))])}
                        {this.renderItem(soupOrStewArr.filter(item=>item.region=== this.state.region)[this.randomValue(soupOrStewArr.filter(item=>item.region=== this.state.region))])}
                        {this.renderItem(saladArr.filter(item=>item.region=== this.state.region)[this.randomValue(saladArr.filter(item=>item.region=== this.state.region))])}
                        {this.renderItem(breadArr.filter(item=>item.region=== this.state.region)[this.randomValue(breadArr.filter(item=>item.region=== this.state.region))])}
                        {this.renderItem(fermentedArr.filter(item=>item.region=== this.state.region)[this.randomValue(fermentedArr.filter(item=>item.region=== this.state.region))])}
                    </Grid>
                )
            }

        }




        if(this.state.type === null && this.state.region === null) {
            return (
                <Grid >

                    {this.renderItem(firstArr[this.randomValue(firstArr)])}
                    {this.renderItem(secondArr[this.randomValue(secondArr)])}
                    {this.renderItem(thirdArr[this.randomValue(thirdArr)])}
                    {this.renderItem(fourthArr[this.randomValue(fourthArr)])}
                    {this.renderItem(fifthArr[this.randomValue(fifthArr)])}
                </Grid>
            )


        }






        if(this.state.type !== null && this.state.region === null) {
            if(this.state.type === 'street'){
                const sandwichArr = this.state.streetArr.filter(item=>{
                    return item.type === 'sandwich'?item.type === 'sandwich':item.type === 'bread'
                })

                const junkyFoodArr = this.state.streetArr.filter(item=>{
                    return item.type === 'junky food'?item.type === 'junky food':item.type === 'bread'
                })


                const pieArr = this.state.streetArr.filter(item=>{
                    return item.type === 'pie'?item.type === 'pie':item.type === 'bread'
                })

                const cakeArr = this.state.streetArr.filter(item=>{
                    return item.type === 'cake'?item.type === 'cake':item.type === 'bread'
                })

                const cookieArr = this.state.streetArr.filter(item=>{
                    return item.type === 'cookie'?item.type === 'cookie':item.type === 'bread'
                })

                return (
                    <Grid>
						{this.renderItem(sandwichArr[this.randomValue(sandwichArr)])}
                        {this.renderItem(junkyFoodArr[this.randomValue(junkyFoodArr)])}
                        {this.renderItem(pieArr[this.randomValue(pieArr)])}
                        {this.renderItem(cakeArr[this.randomValue(cakeArr)])}
                        {this.renderItem(cookieArr[this.randomValue(cookieArr)])}
                    </Grid>
                )
            }
            else {
                const apetizerArr = this.state.healthyArr.filter(item=>{
                    return item.type === 'apetizer'?item.type === 'apetizer':item.type === 'bread'
                })

                const soupOrStewArr = this.state.healthyArr.filter(item=>{
                    return item.type === 'soup'||item.type === 'stew'?item.type === 'soup'||item.type === 'stew':item.type === 'bread'
                })


                const saladArr = this.state.healthyArr.filter(item=>{
                    return item.type === 'salad'?item.type === 'salad':item.type === 'bread'
                })

                const breadArr = this.state.healthyArr.filter(item=>{
                    return item.type === 'bread'?item.type === 'bread':item.type === 'fermented'
                })

                const fermentedArr = this.state.healthyArr.filter(item=>{
                    return item.type === 'fermented'?item.type === 'fermented':item.type === 'bread'||item.type === 'salad'
                })


                return (
                    <Grid>
                        {this.renderItem(apetizerArr[this.randomValue(apetizerArr)])}
                        {this.renderItem(soupOrStewArr[this.randomValue(soupOrStewArr)])}
                        {this.renderItem(saladArr[this.randomValue(saladArr)])}
                        {this.renderItem(breadArr[this.randomValue(breadArr)])}
                        {this.renderItem(fermentedArr[this.randomValue(fermentedArr)])}
                    </Grid>
                )
            }


        }

    }

    handleCountry = (country) => {
        this.setState({
            selectedCountry:country
        })
    }


    randomValue = (arr) => {
        let len = arr.length;
        let value = Math.floor(Math.random()*len);

        return value
    }

    refresh = () => {
        this.setState({
            region:null,
            type:null,
            countries:[],
            selectedCountry:null
        })
    }

    renderItem = (arr) => {
        let t = JSON.parse(sessionStorage.getItem('data'))
        console.log('len',t.length)
        if(t.length === 5){
            console.log('tut');
            sessionStorage.removeItem('data')
            // const emArr = []
            // sessionStorage.setItem('data', JSON.stringify(emArr));
        }
        t.push(arr)

        console.log('sessionStorage',t)
        sessionStorage.setItem('data', JSON.stringify(t));
        //let renderArr = [].push(arr)
        //console.log('renderArr',[].push(arr))
        //this.setState((state)=>({renderArr:[...state.renderArr,...arr]}))
        return (
		<div  className="food-item">
            <Grid key={arr.id}>
                <Row lg>
								<Col md={12} lg={12}>
				{//   <Col md={5}>
                 //       <img src={arr.img} alt=""/>
                 //   </Col>
                }    
				 <h5>{arr.title}</h5>
				 </Col>
                </Row>
				<Row lg>
				<Col md={12} lg={12}>
                        <p>Cuisine: {arr.type}, {arr.country}</p>
                        <p>{arr.description}</p>
                        <p className="tag">{arr.tag}</p>
                    </Col>
                </Row>
            </Grid>
			</div>
        )
    }

    share = () => {
        axios.post('/api/taste/share',{data:JSON.parse(sessionStorage.getItem('data'))}).then(data=>{
             this.props.history.push(`/taste-the-travel/${data.data.id}`)
        })

    }

    render() {
        console.log('State taste',this.state);

        return (

            <Grid className="food">


            <MetaTags>
                <title>Taste The Travel | AI.Decider</title>
                <meta name="og:description" content="AI.Decider wil help you to pick healthy or street food all around the world!" />
                <meta property="og:title" content="Taste The Travel | AI.Decider" />
            </MetaTags>
                  <Row className="travelButton" end="xs" start="md">
                    <Col xs={3} sm={3} mdOffset={4} md={2} lgOffset={6} lg={2}>

                        <RaisedButton label="Refresh" secondary={true}  onClick={()=>this.refresh()} />
                    </Col>
                    <Col xs={3} sm={3} md={2} lg={2}>
                        <RaisedButton label="Share" secondary={false}  onClick={()=>this.share()} />
                    </Col>
                </Row>
                <Row>
                    <Col sx={12} sm={12} md={3} lgOffset={1} lg={3}>
						<div className="travelMenu">	
							<div>
								<h3>Cuisine type:</h3>
								<div className="radio">
									<label>
										<input type="radio" value="street"
											   checked={this.state.type === 'street'}
											   onChange={this.handleTypeChange} />
										Street Food
									</label>
								</div>
								<div className="radio">
									<label>
										<input type="radio" value="healthy"
											   checked={this.state.type === 'healthy'}
											   onChange={this.handleTypeChange} />
										Healthy Food
									</label>
								</div>
							</div>
							<h3>Region:</h3>
							<div className='region'>
								<div className="radio">
									<label>
										<input type="radio" value="Europe"
											   checked={this.state.region === 'Europe'}
											   onChange={this.handleRegionChange} />
										Europe
									</label>
								</div>
								<div className="radio">
									<label>
										<input type="radio" value="United States"
											   checked={this.state.region === 'United States'}
											   onChange={this.handleRegionChange} />
										United States
									</label>
								</div>
								<div className="radio">
									<label>
										<input type="radio" value="America (other)"
											   checked={this.state.region === 'America (other)'}
											   onChange={this.handleRegionChange} />
										America (other)
									</label>
								</div>
								<div className="radio">
									<label>
										<input type="radio" value="Asia"
											   checked={this.state.region === 'Asia'}
											   onChange={this.handleRegionChange} />
										Asia
									</label>
								</div>
								<div className="radio">
									<label>
										<input type="radio" value="Middle East&Africa"
											   checked={this.state.region === 'Middle East&Africa'}
											   onChange={this.handleRegionChange} />
										Middle East\Africa
									</label>
								</div>
							</div>
							<div className='countries'>
								<h3>Country\State:</h3>
								{this.state.countries.length !== 0 && this.state.countries[0].countries.map((item)=>{
									return(
										<p style={{'cursor':'pointer'}} onClick={()=>this.handleCountry(item)}>{item}</p>
									)
								})}
								{this.state.countries.length === 0 && <p>Choose region first</p>}
							</div>
						</div>
                    </Col>
                    <Col xs={12} sm={12} md={3} lg={7} >
                        <Row>

                            <Col xs={12} sm={12} md={11} lg={11}>
                                {this.state.allData.length === 0 || (this.state.countries.length === 0 && this.state.region !== null)|| this.state.loading=== true ?<p>Loading... </p> : this.renderFood()}

                            </Col>

                        </Row>


                    </Col>

                </Row>
            </Grid>
        );
    }
}

TasteTheTravel.propTypes = {};
TasteTheTravel.defaultProps = {};

export default withRouter(TasteTheTravel);
