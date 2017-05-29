const INITIAL_NODE = 0;
const FINAL_NODE = 5000;
const QUANTITY_OF_EDGES = FINAL_NODE;

const nodes = [];
for (let index = INITIAL_NODE; index < FINAL_NODE; index++) {
	nodes.push({ data: { id: index, name: index } } )
}
const edges = [];
for (let index = 0; index < QUANTITY_OF_EDGES; index ++) {
	const sourceNodeId = Math.floor((Math.random() * FINAL_NODE) + INITIAL_NODE);
	const targetNodeId = Math.floor((Math.random() * FINAL_NODE) + INITIAL_NODE);
	edges.push({ data: { source: sourceNodeId, target: targetNodeId } })
}

var cy = cytoscape({
	  container: document.querySelector('#cy'),

	  boxSelectionEnabled: false,
	  autounselectify: true,

	  style: cytoscape.stylesheet()
	    .selector('node')
	      .css({
		              'content': 'data(name)',
		              'text-valign': 'center',
		              'color': 'white',
		              'text-outline-width': 2,
		              'background-color': '#999',
		              'text-outline-color': '#999'
		            })
	    .selector('edge')
	      .css({
		              'curve-style': 'bezier',
		              'target-arrow-shape': 'triangle',
		              'target-arrow-color': '#ccc',
		              'line-color': '#ccc',
		              'width': 1
		            })
	    .selector(':selected')
	      .css({
		              'background-color': 'black',
		              'line-color': 'black',
		              'target-arrow-color': 'black',
		              'source-arrow-color': 'black'
		            })
	    .selector('.faded')
	      .css({
		              'opacity': 0.25,
		              'text-opacity': 0
		            }),

	  elements: {
		      nodes: nodes,
		      edges: edges,
		    },

	  layout: {
		      name: 'grid',
		      padding: 10
		    }
});

cy.on('tap', 'node', function(e){
	  var node = e.cyTarget;
	  var neighborhood = node.neighborhood().add(node);

	  cy.elements().addClass('faded');
	  neighborhood.removeClass('faded');
});

cy.on('tap', function(e){
	  if( e.cyTarget === cy ){
		      cy.elements().removeClass('faded');
		    }
});

