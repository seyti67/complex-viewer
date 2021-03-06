examples = [
	{
		name: 'exp(iθ)',
		func: 'e.pow(0,x)',
		latex: 'e^{i\\theta}'
	},
	{
		name: 'exp(iπx/2)',
		func: 'e.pow(0,pi*x/2)',
		latex: 'e^{i\\pi \\theta\\div 2}'
	},
	{
		name: 'i^θ',
		func: 'i.pow(x)',
		latex: 'i^\\theta'
	},
	{
		name: 'Re(exp(iθ))² + Im(exp(iθ))²',
		func: 'new Complex(Math.pow(Re(e.pow(0,x)),2)+Math.pow(Im(e.pow(0,x)),2))',
		latex: 'Re(e^{i\\theta})^2 + Im(e^{i\\theta})^2'
	}
]
let examplesStr = '';
examples.forEach((example, index) => {
	examplesStr += `<option value="${index}">${example.name}</option>`;
});
document.getElementById('example-list').innerHTML = examplesStr;

function change_example(index) {
	document.getElementById("func-string").value = examples[index].func;
	document.getElementById('latex').innerHTML = '\\(z='+examples[index].latex+'\\)';
	MathJax.typeset();
	update_settings();
}

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
let lastPause = new Date().getTime();
function toggleAnimation() {
	paused = !paused;
	if(paused) {
		ctrlbtn.className = "";
		ctrlbtn.title = "Démarrer";
		lastPause = new Date().getTime();
	} else {
		let afkTimestamp = new Date().getTime() - lastPause;
		xValue -= afkTimestamp*variation;

		ctrlbtn.title = "Arrêter";
		ctrlbtn.className = "playing";
		requestAnimationFrame(animate);
	}
}

function update_settings() {
	variation = Number(document.getElementById("variation").value)/1000;
	funcString = document.getElementById("func-string").value;
}