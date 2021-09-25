let c = new Complex(2.7);

function render(cNumber) {
	move_point({x:cNumber.re, y:cNumber.im});
}

function compute(x) {
	return c.pow(0,x)
} 

let paused = false;
let animationFrame = 0;
let animationStep = 0.1;
function animate() {
	animationFrame += animationStep;
	let complex = compute(animationFrame)
	render(complex);

	if(!paused) {requestAnimationFrame(animate);}
}
requestAnimationFrame(animate);
//let loop = window.setInterval(animate, 100);