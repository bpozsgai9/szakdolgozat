//gráf helye
let networkDiv = document.getElementById('mynetwork');
let graphDiv = document.getElementById('graphDiv');
var network;
var graph;
var options;
var json;

fetch("../src/source/output.json")
    .then(response => response.json())
    .then(outputJson => {

        json = outputJson;
        graph = {
            nodes: new vis.DataSet(json["nodes"]),
            edges: new vis.DataSet(json["edges"])
        };

    }).then(() => {

        const randomColour = () => `rgb(${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)})`;


        let myGroups = {};
        for (let node of json["nodes"]) {
            if (node.group in myGroups) {
                
                console.log("pass");
            
            } else {
                let myColor = randomColour();
                myGroups[node.group] = {
                    color: { background: myColor, border: myColor },
                    shape: 'box'
                };
            }
        }
            
        options = {
            nodes: {
                color: {
                    highlight: {
                        border: '#fcca03',
                        background: '#fcca03'
                    }
                }
            },
            edges: {
                color: {
                    background: '#fcca03'
                },
                arrows: 'to'
            },
            groups: myGroups
        };

        network = new vis.Network(networkDiv, graph, options);

        //kijelölés
        let methodName = '';

        network.on('click', ev => {

            let selectedNodeId = network.getSelection().nodes[0];
            methodName = network.body.nodes[selectedNodeId].options.label;
            console.log(network.body.nodes[selectedNodeId].options.label);

            editor.find(methodName, {
                caseSensitive: true,
                wholeWord: true
            });
        });
    });



