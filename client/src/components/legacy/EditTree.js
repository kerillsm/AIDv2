import React from 'react';

const EditTree = (props) => {
  const { selectedType, selectedItem, tree, env } = props;
  if (!tree || !tree.body) return (<div></div>)
  const { nodes, edges } = tree.body;
  let node;
  let id;
  const [allEdges, allNodes] = env;
  if (selectedType === 'node') {
    id = selectedItem.nodes[0];
    node = nodes[id];
    console.log(node, "RIGHTNODE");
  }
  console.log(nodes, 'nodes');
  console.log(edges, 'edges');
  console.log(tree.body, 'TREEBODY')
  calculateWeights(calculateBranches(calculatePaths(calculateDestinations(edges))));
  let output;
  let newValueBranch;
  let newValueNode;

  function assemble() {
    calculateWeights(calculateBranches(calculatePaths(calculateDestinations(edges))));
  }


  function calculateDestinations(edges) {
    console.log(typeof edges)
    const keys = Object.keys(edges);
    const destinations = {};

    for (let i = 0; i < keys.length; i++) {
      const { fromId, toId } = edges[keys[i]];

      destinations[fromId] ? destinations[fromId].push(toId) : destinations[fromId] = [toId]
    }

    console.log('paths', destinations);
    return destinations;
  }

  function calculatePaths(path) {
    var sumWays = [];

    recursive(path[0], [0]);

    return sumWays;

    function recursive(data, acc) {
      for (let i = 0; i < data.length; i++) {
        if (!path[data[i]]) sumWays.push([...acc, data[i]]);
        if (path[data[i]]) recursive(path[data[i]], [...acc, data[i]]);
      }
    }
  }

  function calculateBranches(ways) {
    const result = [];

    for (let i = 0; i < ways.length; i++) {
      let way = [];

      for (let j = 0; j < ways[i].length - 1; j++) {
        const [ fromId, toId ] = [ ways[i][j], ways[i][j + 1] ];
        way.push(findBranch(fromId, toId));
      }

      result.push(way);
    }

    return result;

    function findBranch(fromId, toId) {
      const keys = Object.keys(edges);

      for (let i = 0; i < keys.length; i++) {
        if (edges[keys[i]].fromId === fromId && edges[keys[i]].toId === toId) {
          return edges[keys[i]];
        }
      }
    }

  }

  function calculateWeights(branches) {
    const weights = branches.map((el) => {
      return el.map((branch) => +branch.options.label).reduce((acc, el) => acc + el, 0);
    });

    const maxWeight = Math.max.apply(null, weights);
    const maxIndexes = weights.reduce((acc, el, i) => el === maxWeight ? [...acc, i] : acc, []);

    for (let i = 0, keys = Object.keys(edges); i < keys.length; i++) {
      edges[keys[i]].options.color.color = '#ADD8E6';
      edges[keys[i]].options.color.width = 1;
    }

    for (let i = 0; i < maxIndexes.length; i++) {
      let index = maxIndexes[i];

      for (let j = 0; j < branches[index].length; j++) {
        branches[index][j].options.color.color = "#8B0000";
        branches[index][j].options.color.width = 2;
      }

    }

  }

  function addNode() {
    const currentLevel = node.options.level;
    const fromId = id;
    const newNodeId = Math.max.apply(null, Object.keys(nodes)) + 1;

    allNodes.add({
      id: newNodeId,
      label: `newNode ${newNodeId}`,
      level: currentLevel + 1,
    })

    allEdges.add({
      from: fromId,
      to: newNodeId,
      id: guid(),
      label: '5'
    })
    assemble();
  }

  function deleteNode(nodeId) {
    const id = nodeId || selectedItem.nodes[0];
    const currentLevel = node.options.level;
    const edgesCopy = Object.keys(edges).map((el) => ({fromId: edges[el].fromId, toId: edges[el].toId}));

    if (currentLevel === 0) return;
    if (currentLevel === 1 && nodes[0].edges.length === 2) return;

    allNodes.remove({ id })
    deleteEdge(id);

    for (let i = 0; i < edgesCopy.length; i++) {
      let edge = edgesCopy[i];

      if (edge.fromId === id) {
        deleteNode(edge.toId);
      }
    }
    assemble();

    function deleteEdge(fromId) {
      const toDelete = convertToArray(allEdges._data)
        .filter((el) => (el.from === fromId || el.to === fromId))
        .map((el) => el.id);

      for (let i = 0; i < toDelete.length; i++) {
        allEdges.remove({ id: toDelete[i] });
      }
    }
  }

  function editBranch() {
    if (!newValueBranch) return;
    allEdges.update({
      id: selectedItem.edges[0],
      label: newValueBranch
    });
    newValueBranch = '';
    console.log(selectedItem)
    assemble();
  }

  function editNode() {
    console.log(newValueNode, 'newVALUE')
    if (!newValueNode) return;

    console.log(allNodes, '**************88')
    allNodes.update({
      id: selectedItem.nodes[0],
      label: newValueNode
    });
    newValueNode = '';
    console.log(selectedItem)
  }

  function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

  function saveTree() {
    const edges = convertToArray(tree.body.data.edges._data);
    const nodes = convertToArray(tree.body.data.nodes._data);

    fetch('/api/tree/save', {
      method: 'post',
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include',
      body: JSON.stringify({ edges, nodes })
    })
    .then(res => res.json())
    .then(res => console.log(res, "RES"));


  }

  function convertToArray(obj) {
    const result = [];

    for (let i = 0; i < Object.keys(obj).length; i++) {
      let key = Object.keys(obj)[i];
      result.push(obj[key]);
    }

    return result;
  }

  if (selectedType === 'node') {
    output = (
      <div>
        <button onClick={() => addNode()}>Add subnode</button>

        <div className="edit-node">
          <button onClick={() => editNode()}>edit</button>
          <input type="text" onChange={e => {
            newValueNode = e.target.value;
          }} onKeyPress={(e) => console.log(e)}/>
        </div>
        <button onClick={() => deleteNode()}>delete</button>
        <button onClick={() => saveTree()}>SAVE</button>
      </div>
    )
  } else if (selectedType === 'branch') {
    output = (
      <div>
        <button onClick={() => editBranch()}>Edit</button>
        <input type="number" min='0' max="10" onChange={e => {
          newValueBranch = String(Math.abs(+e.target.value) % 11);
        }} onKeyPress={(e) => console.log(e)}/>
      </div>
    )
  }



  return (
    <div className="edit-tree">
      { output }
    </div>
  )
}



export default EditTree;
