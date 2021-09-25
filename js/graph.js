graph = document.getElementById('graph');

let pointPositions = {x: 0, y: 0};
const min = -2;
const max = 2;
Plotly.newPlot(
	graph, [{
		mode: 'markers',
		marker: { color: "#ad3232", size: 10 }
	}],
	{
		title: { text: 'z = a + ib' },
		margin: { r: 50, t: 50, b: 50, l: 50 },
		xaxis: {
			title: { text: 'a' },
			range: [min, max]
		},
      	yaxis: {
			title: { text: 'b' },
			range: [min, max]
		}
	},
	{
		scrollZoom: true,
		modeBarButtonsToRemove: ['select2d', 'lasso2d']
	}
);

function update_point() {
	Plotly.animate('graph', {
		data: [{
			y: [pointPositions.x],
			x : [pointPositions.y]
		}],
		layout: {}
	}, {
		transition: {
			duration: 0
		},
		frame: {
			duration: 0,
			redraw: false
		}
	});
}
function move_point(args) {
	pointPositions = args;
	update_point();
}

const xSpan = document.getElementById('x-value');
const zSpan = document.getElementById('z-value');
function render(cNumber) {
	xSpan.value = Math.round(xValue*100)/100;
	zSpan.innerHTML = (Math.round(cNumber.re*100)/100).toString()+"+"+(Math.round(cNumber.im*100)/100).toString()+"i"
	move_point({x:Number(cNumber.re)||0, y:Number(cNumber.im)||0});
}