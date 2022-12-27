//gráf helye
let networkDiv = document.getElementById('mynetwork');
let graphDiv = document.getElementById('graphDiv');
var network = null;

fetch("output.json")
    .then(response => response.json())
    .then(outputJson => {

        let graph = {
            nodes: new vis.DataSet(outputJson["nodes"]),
            edges: new vis.DataSet(outputJson["edges"])
        };

        //asszinkorn
        let groupArr = [];
        graph.nodes.array.forEach(element => {
            groupArr = element.group;
        });
        console.log(groupArr);

        //valamiért ezt nem látja
        //forma
        let options = {
            nodes: {
                color: {
                    border: '#77a5fc',
                    background: '#77a5fc',
                    highlight: {
                        border: '#fcca03',
                        background: '#fcca03'
                    }
                }
            },
            edges: {}/*,
            groups: {
                class: {
                    color: { background: '#77a5fc', border: '#77a5fc' },
                    shape: 'circle'
                },
                method: {
                    color: { background: '#77a5fc', border: '#77a5fc' },
                    shape: 'triangleDown'
                }
            }*/
        };

        network = new vis.Network(networkDiv, graph, options);
    });



