import React, { Component } from 'react';
import Vis from 'vis';


import EditTree from './EditTree.js';


class Tree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPopUpShown: false,
      selectedType: null,
      selectedItem: null,
      network: null,
      edgesNodes: []
    }

    const self = this;

    fetch('/api/tree/1d131811-ad3c-5fa3-0690-da063258efb0')
      .then(res => res.json())
      .then((res) => {
        const { nodes, edges } = res;
        self.setState({ nodes, edges }, self.initVis);
      })

  }

  initVis() {
    var self = this;
    var network = null;

    function destroy() {
        if (network !== null) {
            network.destroy();
            network = null;
        }
    }
    function draw() {
        destroy();
        var { nodes, edges } = self.state;

        nodes = new Vis.DataSet(nodes);
        edges = new Vis.DataSet(edges);

        // create a network
        self.setState({
          edgesNodes: [edges, nodes]
        })
        var container = document.getElementById('mynetwork');
        var data = {
            nodes: nodes,
            edges: edges
        };
        var options = {
            edges: {
                smooth: {
                    type: 'cubicBezier',
                    forceDirection: 'vertical',
                    roundness: 0.4
                },
                label: '5',
                font: {
                  size: 24,
                  align: 'top'
                },
                color: {
                  color: '#925252',
                  value: 2,
                }

            },
            layout: {
                hierarchical: {
                    direction: 'UD'
                }
            },
            nodes: {
              shape: 'box',
              font: {
                size: 24
              }
            },
            physics: true,
            interaction:{hover:true},
        };
        network = new Vis.Network(container, data, options);

        self.setState({ network })

        network.on("select", function (params) {
          console.log(params)
            const { edges, nodes } = params;

            if (edges.length === 1 && nodes.length === 0 ) {
              console.log('you clicked on branch');
              self.setState({
                selectedType: 'branch',
                selectedItem: params,
              });
            } else if (nodes.length > 0) {
              console.log('you clicked on node')
              self.setState({
                selectedType: 'node',
                selectedItem: params,
              });
            } else {
              console.log(params, "PARAMS")
              console.log('click event, getNodeAt returns: ' + this.getNodeAt(params.pointer.DOM));
              self.setState({
                selectedType: 'null',
                selectedItem: null,
              });
            }

        });


    }

    draw()
  }

  componentDidMount() {


  }

  render() {
    return (
      <div className="tree-wrapper">
        <div id="mynetwork"></div>

        <p id="selection"></p>
        <EditTree
          selectedType={this.state.selectedType}
          selectedItem={this.state.selectedItem}
          tree={this.state.network}
          env={this.state.edgesNodes}>

        </EditTree>
      </div>

    )
  }
}


export default Tree;
