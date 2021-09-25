TESTER = document.getElementById('graph');

let pointPositions = {x: 0, y: 0};
const min = -1;
const max = 1;
Plotly.newPlot(
	TESTER, [{
		x: [pointPositions.x],
		y: [pointPositions.y],
		marker: { color: "#ad3232", size: 10 }
	}],
	{
		margin: { r: 50, t: 50, b: 50, l: 50 },
		xaxis: {range: [min, max]},
      	yaxis: {range: [min, max]}
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
		traces: [0],
		layout: {}
	}, {
		transition: {
			duration: 100,
			easing: 'linear'
		},
		frame: {
			duration: 100,
			redraw: false
		}
	});
}
function move_point(args) {
	if(typeof args.x === 'number' && typeof args.y === 'number') {
		pointPositions = args;
	} else if (typeof args.dx === 'number' && typeof args.dy === 'number') {
		pointPositions.x += args.dx;
		pointPositions.y += args.dy;
	}
	update_point();
}