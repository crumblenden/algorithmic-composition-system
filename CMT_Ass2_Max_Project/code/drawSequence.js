inlets = 1;
outlets = 2;

winSizeX = 480;
winSizeY = 255;

function drawSequence() {
	for(var a = 0; a < 4; a++) {
		add4 = ((seqLength/4/4)/seqLength) * winSizeX;
		var newLine = new Array(4);
		newLine[0] = Math.floor((((seqLength/4) * a)/seqLength) * winSizeX);
		newLine[1] = 0;
		newLine[2] = newLine[0] + 3;
		newLine[3] = winSizeY;
		outlet(1, newLine);
		for(var b = 0; b < 4; b++) {
			var new4Line = new Array(4);
			new4Line[0] = Math.floor(( ( (seqLength/4/4) * b) /seqLength) * winSizeX + newLine[0]);
			new4Line[1] = 0;
			new4Line[2] = new4Line[0] + 2;
			new4Line[3] = winSizeY;
			outlet(1, new4Line);
			for(var c = 0; c < 4; c++) {
				var new16Line = new Array(4);
				new16Line[0] = Math.floor(( ( (seqLength/4/4/4) * c) /seqLength) * winSizeX + new4Line[0]);
				new16Line[1] = 0;
				new16Line[2] = new16Line[0] + 1;
				new16Line[3] = winSizeY;
				outlet(1, new16Line);
			}
		}
	}
	for(var i = 0; i < sequence.length; i++) {
		var newNote	= sequence[i];
	//	post('length = ' + newNote.length);
		var noteToDraw = new Array(4);
		
		noteToDraw[0] = Math.round((newNote[4]/seqLength) * winSizeX);
		//post((newNote[4]/8000) * 480);
		noteToDraw[1] = winSizeY - (Math.floor((newNote[1]/127) * 127) * 2);
		noteToDraw[2] = Math.round(noteToDraw[0] + ((newNote[3]/seqLength)*winSizeY));
		noteToDraw[3] = Math.round(noteToDraw[1] + 2);
		
		outlet(0, noteToDraw);
	}
}

function drawSegments() {
	for(var a = 0; a < 4; a++) {
		add4 = ((seqLength/4/4)/seqLength) * winSizeX;
		var newLine = new Array(4);
		newLine[0] = Math.floor((((seqLength/4) * a)/seqLength) * winSizeX);
		newLine[1] = 0;
		newLine[2] = newLine[0] + 3;
		newLine[3] = winSizeY;
		outlet(1, newLine);
		for(var b = 0; b < 4; b++) {
			var new4Line = new Array(4);
			new4Line[0] = Math.floor(( ( (seqLength/4/4) * b) /seqLength) * winSizeX + newLine[0]);
			new4Line[1] = 0;
			new4Line[2] = new4Line[0] + 2;
			new4Line[3] = winSizeY;
			outlet(1, new4Line);
			for(var c = 0; c < 4; c++) {
				var new16Line = new Array(4);
				new16Line[0] = Math.floor(( ( (seqLength/4/4/4) * c) /seqLength) * winSizeX + new4Line[0]);
				new16Line[1] = 0;
				new16Line[2] = new16Line[0] + 1;
				new16Line[3] = winSizeY;
				outlet(1, new16Line);
			}
		}
	}
	for(var i = 0; i < allSegments.length; i++) {
		for(var j = 0; j < allSegments[i].length; j++) {
			var newNote	= allSegments[i][j];
	//	post('length = ' + newNote.length);
			var noteToDraw = new Array(4);
		
			noteToDraw[0] = Math.round((newNote[4]/seqLength) * winSizeX);
			//post((newNote[4]/8000) * 480);
			noteToDraw[1] = winSizeY - (Math.floor((newNote[1]/127) * 127) * 2);
			noteToDraw[2] = Math.round(noteToDraw[0] + ((newNote[3]/seqLength)*winSizeY));
			noteToDraw[3] = Math.round(noteToDraw[1] + 2);
		
		outlet(0, noteToDraw);
		}
	}
}