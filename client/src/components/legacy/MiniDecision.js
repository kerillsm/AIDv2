import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import toastr from 'toastr';
import jquery from 'jquery';
import {connect} from 'react-redux'

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
import MiniDashboard from "./MiniDashboard";


const getItems = map => {

    if (map.owner !== 'admin') {

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


class MiniDecision extends Component {
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

        if (!props.map) {

            fetch(`/api/maps/${props.id}`).then((data) => data.json()).then((maps) => {
                if (maps.error) {
                    this.setState({ maps });
                    return;
                }
                this.setState({
                    items: getItems(maps),
                    config: maps
                })
            });
        }
        this.onDragEnd = this.onDragEnd.bind(this);

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
            owner:this.props.username,
            id:this.props.match.params.id,
            status: this.state.toggled
        }

        for (var i = 0; i < this.state.items.length; i++) {
            result.results[this.state.items[i].description] = this.state.items[i].score;
        }


        return result;


    }


    render() {
        console.log('Props',this.props);
        if (this.state.maps && this.state.maps.error) return <Redirect to="/" />
        if(this.props.isLoggedIn !== undefined && this.state.config.private === true && this.state.config.owner !== this.props.username){

            return <Redirect to='/'/> 
        }
        return (
            <div className='aside'>
                <div className="middle-line"></div>

                <MiniDashboard
                    isLoggedIn={this.state.isLoggedIn}
                    items={this.state.items}
                    coeff={this.state.decreasingCoeff}
                    config={this.state.config}
                    consoleStats={(total) => this.consoleStats(total)}
                    changeToggle={()=>this.changeToggle()}
                    toggled={this.state.toggled}
                    key={Math.random()}>
                </MiniDashboard>
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
            </div>
        );
    }
}

const mapDispatchToProps = (state)=>{
    return {isLoggedIn:state.isLoggedIn.isAuth,
        user:state.username,}
}

export default connect(mapDispatchToProps,null)(MiniDecision);
