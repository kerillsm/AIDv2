import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import toastr from 'toastr';
import jquery from 'jquery';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Dashboard from './Dashboard.js';

import Slide from './Slide.js';

import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
  Switch,
  Redirect
} from 'react-router-dom';


const getItems = map => {

  if (map.owner !== undefined) {

     return Object.keys(map.options[0]).map((el, id) => {
       return {
         id,
         score: map.options[0][el],
         description: el
       }
    })
  }

  const res = map.options.map((el, id) => {
    return {
      id,
      score: 0,
      description: el
    }
  })

    return res
}


const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const grid = 8;
const getItemStyle = (draggableStyle, isDragging) => ({
  userSelect: 'none',
  margin: `0 0 ${20}px 0`,
  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  padding: grid,
  width: '100%',
  margin: 'auto'
});


class Decision extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: props.map ? getItems(props.map) : [],
      isMovable: true,
      decreasingCoeff: 0.9,
      id: props.id,
      maps: props.map,
      config: props.map ? props.map : {cases: []},
      isLoggedIn: props.isLoggedIn,
      username:props.username,
      toggled:true
    };

    this.onDragEnd = this.onDragEnd.bind(this);
  }

    componentDidMount() {
        if(!this.props.map){
            fetch(`/api/maps/${this.props.id}`).then((data) => data.json()).then((maps) => {
                if (maps.error) {
                    this.setState({ maps });

                    return;
                }
                this.setState({
                    items: getItems(maps),
                    config: maps,
                    toggled:maps.private
                })
            });
        }
    }


    componentWillMount() {
    // this.checkAuth(this);
  }

  checkAuth(self) {
    fetch('/api/islogged', {
      method: 'GET',
      credentials: 'include'
    })
    .then(res => {
      return res.json()
    })
    .then(res => {
        self.setState({isLoggedIn: res.isAuth})
    });
  }


  deleteSlide(id) {
    let { items } = this.state;
    items.splice(id, 1);

    this.setState({ items });
  }

  addSlider() {
    let { items } = this.state;
    let slider = {
      id: items.length+1,
      score: 0,
      description: `Decision Factor ${items.length+1}`
    };

    this.setState({
      items: [...items, slider]
    })
  }

  onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items,
    });
  }

  changeItemScore(id, score) {
    var { items } = this.state;
    items[id].score= score;

    this.setState({
      items
    })
  }

  changeItemDescription(id, description) {
    var { items } = this.state;
    items[id].description = description;

    this.setState({
      items
    })
  }

  changeToggle = (event,bool) => {

      this.setState({
        toggled: !this.state.toggled
      })
  }

  consoleStats(total) {
    const { config } = this.state
    const result = {
      title: config.title,
      cases: config.cases,
      total: total,
      results: {},
        owner: this.props.user,
        // id:this.props.match.params.id,
        status: this.state.toggled
    }

    for (var i = 0; i < this.state.items.length; i++) {
      result.results[this.state.items[i].description] = this.state.items[i].score;
    }


    return result;


  }


  render() {
    // console.log('Decision State',this.state)

    if (this.state.maps && this.state.maps.error) return <Redirect to="/" />
      if(this.props.isLoggedIn !== undefined && this.state.config.private === true && this.state.config.owner !== this.props.user){

          return <Redirect to='/'/>
      }
      
    return (
      <div>
        <div className='decision-slider'>
          <div className="middle-line"></div>

          <Dashboard
            isLoggedIn={this.state.isLoggedIn}
            items={this.state.items}
            coeff={this.state.decreasingCoeff}
            config={this.state.config}
            consoleStats={(total) => this.consoleStats(total)}
            changeToggle={()=>this.changeToggle()}
            toggled={this.state.toggled}
            key={Math.random()}>
          </Dashboard>

          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}>
                  {this.state.items.map((item, id) => (
                    <Draggable key={item.id} draggableId={id} isDragDisabled={!this.state.isMovable}>
                      {(provided, snapshot) => (
                        <Slide
                          id={id}
                          provided={provided}
                          coeff={this.state.decreasingCoeff}
                          items={this.state.items}
                          getItemStyle={getItemStyle}
                          toggleMovable={() => this.setState({isMovable: !this.state.isMovable})}
                          changeScore={(a, b) => this.changeItemScore(a, b)}
                          changeDescription={(a, b) => this.changeItemDescription(a, b)}
                          deleteSlide={(id) => this.deleteSlide(id)}>
                        </Slide>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          <div className='add-slider' onClick={() => this.addSlider()}><i className="fa fa-plus fa-2x" aria-hidden="true"></i></div>

        </div>

        <aside className="overlayed">
          <div className="block">
          <h4>Tips</h4>
		  <ol>
            <li>Type your decision</li>
            <li>Set your decision options</li>
            <li>Define decision factors and evaluate them with sliders</li>
			<li>Change order of the sliders, top sliders have higher impact on your decision</li>
            <li>Share your result with friends and family!</li>
          </ol>
		  </div>
		  <div className="block">
                    <h3>Live a full Life</h3>
<p class="tag_cloud">
<Link to="/maps/relocation">Travel</Link> <sub><Link to="/maps/new-job">Work</Link></sub> <sup><Link to="maps/geeks-zone">Bet</Link></sup> <Link to="/maps/investment">Invest</Link> <sub><Link to="/taste-the-travel">Enjoy food</Link></sub> <sup><Link to="/tree/movie">Watch Movies</Link></sup> <Link to="/tree/book">Read Books</Link> <sup><Link to="/maps/yes-or-no-decision">Say Yes&No</Link></sup> <Link to="/maps/partner-love">Love</Link>  <sub><Link to="/maps/choose-diet">Diet</Link></sub> <Link to="/maps/go-no-go">Party</Link> <sup><Link to="/maps/christian-against-hell-to-heaven">Believe</Link></sup> <Link to="/goal-map">Set Goals</Link> <sup><Link to="/maps/pick-game">Play</Link></sup> <Link to="/maps/pick-pet">Pet</Link> <sup><Link to="/maps/when-get-pregnant">Give a Birth</Link></sup> <sub><Link to="/maps/buy-present">Give</Link></sub> <sup><Link to="/maps/call-or-not">Talk</Link></sup> <sub><Link to="/maps/dev-language">Code</Link></sub> <sup><Link to="/maps/sport-to-choose">Sport</Link></sup> <Link to="/maps/choose-hobby">Collect</Link> <sup><Link to="/maps/pick-color">Express</Link></sup> <Link to="/maps/pick-baby-name">Name your baby</Link> <sub><Link to="/maps/pick-commute">Commute</Link></sub> <sup><Link to="/maps/what-to-drink">Drink</Link></sup> <Link to="/maps/choose-vacation">Rest</Link> <sub><Link to="/maps/choose-art">Create</Link></sub>
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

const mapDispatchToProps = (state) => {
    return { 
        isLoggedIn:state.isLoggedIn.isAuth,
        user:state.username
      }
}

export default connect(mapDispatchToProps, null)(Decision);