//gráf helye
let networkDiv = document.getElementById('myNetwork');
networkDiv.style.width = window.innerWidth + "px";
networkDiv.style.height = window.innerHeight + "px";

//gráf
let graph = {
    nodes: new vis.DataSet([
        {id: 1, label: 'A', group:'group_1'},
        {id: 2, label: 'B', group:'group_1'},
        {id: 3, label: 'C'},
        {id: 4, label: 'D'},
        {id: 5, label: 'E'}
    ]),
    edges: new vis.DataSet([
        {from: 1, to: 3},
        {from: 1, to: 2},
        {from: 2, to: 4},
        {from: 2, to: 5}
    ])
};

//forma
let options = {
    autoResize: true,
    nodes:{
        color: {
            border: 'red',
            background: 'red'
        },
        font: '12px arial white',
        shadow: true
      },
      edges:{
        arrows: 'to',
        color: 'black',
        font: '20px arial',
        shadow: true
      },
      groups: {
        group_1: {
            color:'blue',
            shape:'box'
        }
      }
};

//létrehozás
let network = new vis.Network(networkDiv, graph, options);