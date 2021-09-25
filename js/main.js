

let funcString = "e.pow(0, x)";
const e = new Complex(2.718281828459045);
const pi = new Complex(3.141592653589793);
const i = new Complex(0,1);
function Re(z) {return z.re}
function Im(z) {return z.im}
function compute(x) {
	return eval(funcString);
} 

let paused = true;
let xValue = 0;
let previousTimestamp = 0;
let variation = 0.001;
function animate(timestamp) {
	xValue += variation*(timestamp-previousTimestamp);
	previousTimestamp = timestamp;

	let complex = compute(xValue);
	render(complex);

	if(!paused) {loopId = requestAnimationFrame(animate);}
}

ctrlbtn = document.getElementById('control-button');
let lastPause;
function toggleAnimation() {
	paused = !paused;
	if(paused) {
		ctrlbtn.className = "";
		lastPause = new Date().getTime();
	} else {
		if(lastPause) {
			let afkTimestamp = new Date().getTime() - lastPause;
			xValue -= afkTimestamp*variation;
		}
		ctrlbtn.className = "playing";
		requestAnimationFrame(animate);
	}
}

function update_settings() {
	variation = Number(document.getElementById("variation").value)/1000;
	funcString = document.getElementById("func-string").value;
}