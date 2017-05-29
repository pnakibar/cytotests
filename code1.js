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
		      nodes: [
			            { data: { id: 'a', name: 'a' } },
			            { data: { id: 'b', name: 'b' } },
			            { data: { id: 'c', name: 'c' } },
			            { data: { id: 'd', name: 'd' } },
			            { data: { id: 'e', name: 'e' } }
			          ],
		      edges: [
			            { data: { source: 'a', target: 'b' } },
			            { data: { source: 'a', target: 'c' } },
			            { data: { source: 'a', target: 'd' } },
			            { data: { source: 'a', target: 'e' } },

			            { data: { source: 'b', target: 'c' } },
			            { data: { source: 'b', target: 'e' } },

			            { data: { source: 'c', target: 'd' } },
			            { data: { source: 'c', target: 'e' } },
			          ]
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

