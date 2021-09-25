let c = new Complex(2.7);

function compute(x) {
	return c.pow(0,x)
} 

let paused = true;
let animationFrame = 0;
let animationStep = 0.01;
function animate() {
	animationFrame += animationStep;
	let complex = compute(animationFrame)
	render(complex);

	if(!paused) {requestAnimationFrame(animate);}
}

ctrlbtn = document.getElementById('control-button');
function toggleAnimation() {
	paused = !paused;
	if(paused) {
		ctrlbtn.className = "";
	} else {
		requestAnimationFrame(animate);
		ctrlbtn.className = "playing";
	}
}