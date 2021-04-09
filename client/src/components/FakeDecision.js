import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { connect } from 'react-redux'

import FakeDashboard from './FakeDashboard.js';
import Slide from './Slide.js';
import Page404 from "./Page404";


import {
    BrowserRouter as Router,
    Route,
    Link,
    NavLink,
    Switch,
    Redirect
} from 'react-router-dom';


const getItems = map => {
    console.log('ku',map);

        return Object.keys(map.options[0]).map((el, id) => {
            return {
                id,
                score: map.options[0][el],
                description: el
            }
        })


    // const res = map.options.map((el, id) => {
    //     return {
    //         id,
    //         score: 0,
    //         description: el
    //     }
    // })
    // console.log('ku',res);
    // return res

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


class FakeDecision extends Component {
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
            otherSmaps:[]
        };


        if (!props.map) {
            fetch(`/api/smaps/${props.id}`).then((data) => data.json()).then((maps) => {
                if (maps.error) {
                    this.setState({ maps });
                    return;
                }
                this.setState({
                    items: getItems(maps),
                    config: maps
                })
                fetch(`/api/testMaps/${this.state.config.category}`).then((data) => data.json()).then((item) => {
                    console.log('itemLOg',item);
                    let res = item.filter(data=>(data.cases[0] === this.state.config.cases[0] ))
                    console.log('Первый результат',res);
                    let res2 = item.filter(data=>(data.cases[1])=== (this.state.config.cases[0] ))
                    let res3 = item.filter(data=>(data.cases[0])=== (this.state.config.cases[1] ))
                    let res4 = item.filter(data=>(data.cases[1])=== (this.state.config.cases[1] ))
                    console.log('ВТорой резульат',res2);
                    let test = [...res,...res2,...res3,...res4].splice(0,5)
                    this.setState({ otherSmaps:test});




                })

            })
        }
        this.onDragEnd = this.onDragEnd.bind(this);

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

    consoleStats(total) {
        const { config } = this.state
        const result = {
            title: config.title,
            cases: config.cases,
            total: total,
            results: {},
            owner:this.props.username,
            id:this.props.match.params.id
        }

        for (var i = 0; i < this.state.items.length; i++) {
            result.results[this.state.items[i].description] = this.state.items[i].score;
        }


        return result;


    }


    render() {
        if(this.state.config.category !== undefined && (this.props.category !== this.state.config.category || this.props.subcategory !== this.state.config.subcategory)){
            return <Redirect to='/404'/>

        }
        console.log('PROPSSS',this.props)
        console.log('STATEEE',this.state)

		return (
            <div>
                <div className='decision-slider'>
                    <div className="middle-line"></div>

                    <FakeDashboard
                        isLoggedIn={this.state.isLoggedIn}
                        items={this.state.items}
                        coeff={this.state.decreasingCoeff}
                        config={this.state.config}
                        consoleStats={(total) => this.consoleStats(total)}
                        key={Math.random()}>
                    </FakeDashboard>
                    
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
		  		<h4>You may also like</h4>
				<ul>
              {this.state.otherSmaps.length !== 0 && this.state.otherSmaps.map(item=>{
                  return <li><Link to={item.subcategory?`/${item.category}/${item.subcategory}/${item.id}`:`/${item.category}/${item.id}`}>{item.title}</Link></li>
              })}
		  </ul>
		  </div>
		  
          <div className="block">
          <h4>Decision Tips</h4>
		  <ol>
            <li>Type your decision</li>
            <li>Set your decision options</li>
            <li>Define decision factors and evaluate them with sliders</li>
			<li>Change order of the sliders, top sliders have higher impact on your decision</li>
            <li>Share your result with friends and family!</li>
          </ol>
		  </div>

        </aside>
            </div>
        );
    }
}

const mapDispatchToProps = (state)=>{
    return {
        isLoggedIn: state.isLoggedIn.isAuth,
        user: state.username,
    }
}

export default connect(mapDispatchToProps, null)(FakeDecision);
