//gráf helye
let networkDiv = document.getElementById('myNetwork');
let graphDiv = document.getElementById('graphDiv');

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
        nodes: {
            shape: "dot",
            scaling: {
              min: 10,
              max: 30,
            },
            font: {
              size: 12,
              face: "Tahoma",
            },
          },
          edges: {
            color: { inherit: true },
            width: 0.15,
            smooth: {
              type: "continuous",
            },
          },
        interaction: {
            hideEdgesOnDrag: true,
            tooltipDelay: 200
        },
        physics: false
    };

    //létrehozás
    let network = new vis.Network(networkDiv, graph, options);
});

