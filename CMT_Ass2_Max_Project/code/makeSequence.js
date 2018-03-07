inlets =  4;
outlets = 2;

tempo = 120.0;
sequence = new Array(1);
seqIndex = 0;
beatLength = (60/tempo) * 1000;
seqLength = beatLength * Math.pow(2, 4);

function msg_float(input) {
	if(inlet == 3) {
	tempo = input;
	beatLength = (60/tempo) * 1000;
	var oldSeqLength = seqLength;
	seqLength = beatLength * Math.pow(2, 4);
	for(var i = 0; i < sequence.length; i++) {
		var oldPos = sequence[i][4]/oldSeqLength;
		var newPos = oldPos * seqLength;
		sequence[i][4] = newPos;
		}
	}
	outlet(1, 1);
}
function list() {
	switch(inlet) {
		case 0: //delta pitch vel dur
			var newNote = new Array(arguments.length);
			for(var i = 0; i < arguments.length; i++) {
				newNote[i] = arguments[i];
				if(newNote[4] < beatLength) {
					newNote[4] = beatLength;
				}
				newNote[4] -= beatLength;
			}
			
			sequence[seqIndex] = newNote;
			seqIndex++;
			post('in1');
			break;
		case 1:		
			var durationData = new Array(arguments.length);
			durationData[0] = arguments[0];
			durationData[1] = arguments[1];
			//post(durationData[0]);
			sequence[durationData[0]][3] = durationData[1];
			post('in2');
			break;
		case 2:		
			var timeData = new Array(arguments.length);
			timeData[0] = arguments[0];
			timeData[1] = arguments[1];
			//post(timeData[0]);
			sequence[timeData[0]][0] = timeData[1];
			post('in3');
			break;
		default: break;
	}
}

function bang() {
	post();
	post('--SEQUENCE CONTENTS--');
	post('length :' + sequence.length); 
	post();
	for(var i = 0; i < sequence.length; i++) {
		post(sequence[i]);
		post();
	}

} 

function clear(input) {
	sequence = new Array(1);
	seqIndex = 0;
	post('--CLEARED--');
}

function send() {
	for(var i = 0; i < sequence.length; i++) {
					var note = new Array(5);
					for(var j = 0; j < note.length; j++) {
						note[j] = sequence[i][j];
						}
					outlet(0, note);

			}
			//outlet(0, note);
			post();
			post('---NOTES SENT---');
			post();
	}