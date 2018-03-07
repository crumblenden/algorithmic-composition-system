inlets = 1;
outlets = 31;
velCurve = 1.0;
scaVelObj = this.box;

function list() {
	for(var i = 0; i < arguments.length; i++) {
		//var vel = Math.pow(arguments[i], velCurve);
		outlet(i, Math.pow(arguments[i], velCurve));
		}
};

function msg_float(input) {
	velCurve = input;
};