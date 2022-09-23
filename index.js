//gráf helye
let networkDiv = document.getElementById('myNetwork');
networkDiv.style.width = window.innerWidth + "px";
networkDiv.style.height = window.innerHeight + "px";

fetch("output.json")
  .then(response => response.json())
  .then(outputJson => {
    
    //console.log(typeof outputJson);
    //console.log(outputJson);

    //gráf
    let graph = {
        nodes: new vis.DataSet(outputJson["nodes"]),
        edges: new vis.DataSet(outputJson["edges"])
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
        interaction: {
            hideEdgesOnDrag: true
        },
        physics: false,
        groups: {
            group_1: {
                color:'blue',
                shape:'box'
            }
        }
    };

    //létrehozás
    let network = new vis.Network(networkDiv, graph, options);
});



