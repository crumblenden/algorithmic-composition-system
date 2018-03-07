inlets = 1;
outlets = 1;

function msg_int(input) {
	var id = input;
	
	var allOdds = new Array(1);
		var octUpOdds = allOdds[0] = 0.5;		//0
		var octDownOdds = allOdds[1] = 0.5;		//1
		var durDblOdds = allOdds[2] = 0.1;		//2
		var durHalfOdds = allOdds[3] = 0.1;		//3
		var stretchDblOdds = allOdds[4] = 0.3;	//4
		var stretchHalfOdds = allOdds[5] = 0.3;	//5
		var shiftHalfOdds = allOdds[6] = 0.3;	//6
		var shiftQtrOdds = allOdds[7] = 0.3;	//7
		var transposeOdds = allOdds[8] = 0.5;	//8
		var fifthUpOdds = allOdds[9] = 0.0;		//9
		var fifthDownOdds = allOdds[10] = 0.0;	//10
		var spreadOdds = allOdds[11] = 1.0; 	//11
		var copyOdds = allOdds[12] = 0.5; 		//12
		var noneOdds = allOdds[13] = 1.2;		//13///NONE
		//if(infoFromSegId(id, 'bars') == 1) ;

		
		
	var oddsMax = 0.0;
	for(var i = 0; i < allOdds.length; i++) {
		oddsMax += allOdds[i];
	}
	var rand = Math.random() * oddsMax;
	var oddsTotal = 0;
	var selectedFunction = 0;
	for(var i = 0; i < allOdds.length; i++) {
		var oldTotal = oddsTotal;
		oddsTotal += allOdds[i];
		if(rand >= oldTotal && rand <= oddsTotal) {
			selectedFunction = i;
		}
	}
	switch(selectedFunction) {
		case 0:
			octaveUp(id);
			post();
			post('SEG: ' + id + ' (' + infoFromSegId(id, 'bars')
 					+ 'bars) .....selected function = octave up');
			break;
		case 1:
			octaveDown(id);	
			post();
			post('SEG: ' + id + ' (' + infoFromSegId(id, 'bars')
 					+ 'bars) .....selected function = octave down');
			break;
		case 2:
			doubleDuration(id);	
			post();
			post('SEG: ' + id + ' (' + infoFromSegId(id, 'bars')
 					+ 'bars) .....selected function = double duration');	
			break;
		case 3:
			halfDuration(id);
			post();
			post('SEG: ' + id + ' (' + infoFromSegId(id, 'bars')
 					+ 'bars) .....selected function = half duration');
			break;
		case 4:
			doubleStretch(id);
			post();
			post('SEG: ' + id + ' (' + infoFromSegId(id, 'bars')
 					+ 'bars) .....selected function = timestretch x 2');
			break;
		case 5:
			halfStretch(id);
			post();
			post('SEG: ' + id + ' (' + infoFromSegId(id, 'bars')
 					+ 'bars) .....selected function = timestretch / 2');	
			break;
		case 6:
			shiftByHalf(id);
			post();
			post('SEG: ' + id + ' (' + infoFromSegId(id, 'bars')
 					+ 'bars) .....selected function = shift position by 1/2 segment');
			break;
		case 7:
			shiftByQuarter(id);
			post();
			post('SEG: ' + id + ' (' + infoFromSegId(id, 'bars')
 					+ 'bars) .....selected function = shift position by 1/4 segment');
			break;
		case 8:
			var transposeAmt = 0;
			do {
			transposeAmt = Math.round(getRandom(-2.5, 2.5));
			} while (transposeAmt == 0)
			transpose(id, transposeAmt);
			post();
			post('SEG: ' + id + ' (' + infoFromSegId(id, 'bars')
 					+ 'bars) .....selected function = transpose within key');
			post();
			post('transpose amount: ' +transposeAmt);
			break;
		case 9:
			fifthUp(id);
			post();
			post('SEG: ' + id + ' (' + infoFromSegId(id, 'bars')
 					+ 'bars) .....selected function = fifth up');
			break;
		case 10:
			fifthDown(id);
			post();
			post('SEG: ' + id + ' (' + infoFromSegId(id, 'bars')
 					+ 'bars) .....selected function = fifth up');	
			break;
		case 11:
			spread(id);
			post();
			post('SEG: ' + id + ' (' + infoFromSegId(id, 'bars')
 					+ 'bars) .....selected function = spread notes evenly throughout segment');
			break;
		case 12:
			if(allSegments[id].length > 1) {
				copy(id);
				post();
				post('SEG: ' + id + ' (' + infoFromSegId(id, 'bars')
 					+ 'bars) .....selected function = copy segment to another');
 			}
			break;
		case 13:
			post();
			post('no function selected');
			break;
		default:
			break;
	}
	post();
	outlet(0, 1);
}

function segmentsReady() {
	createPitchList();
	}

///////////////////////////////////////////////////////
function octaveUp(id) {
	if(infoFromSegId(id, 'maxPitch') > 95) {
		octaveDown(id);
		return;}
	for(var j = 0; j < allSegments[id].length; j++) {
			var note = allSegments[id][j];
 			note[1] += 12;	
			allSegments[id][j] = note;
	}
}
function octaveDown(id) {
	if(infoFromSegId(id, 'minPitch') < 23) {
		octaveUp(id);
		return;}
	for(var j = 0; j < allSegments[id].length; j++) {
			var note = allSegments[id][j];
 			note[1] -= 12;	
			allSegments[id][j] = note;
	}
}
////////////////////////////////////////////////////////
function fifthUp(id) {
	if(infoFromSegId(id, 'maxPitch') > 100) {
		fifthDown(id);
		return;}
	for(var j = 0; j < allSegments[id].length; j++) {
			var note = allSegments[id][j];
 			note[1] += 7;	
			allSegments[id][j] = note;
	}
}
function fifthDown(id) {
	if(infoFromSegId(id, 'minPitch') < 18) {
		fifthUp(id);
		return;}
	for(var j = 0; j < allSegments[id].length; j++) {
			var note = allSegments[id][j];
 			note[1] -= 7;	
			allSegments[id][j] = note;
	}
}
////////////////////////////////////////////////////////
function doubleDuration(id) {
	if(infoFromSegId(id, 'maxDur') > beatLength * 16) {
		halfDuration(id);
		return;}
	for(var j = 0; j < allSegments[id].length; j++) {
			var note = allSegments[id][j];
			note[3] *= 2;
			allSegments[id][j] = note;
	}
}
function halfDuration(id) {
	if(infoFromSegId(id, 'minDur') < beatLength / 16) {
		doubleDuration(id);
		return;}
	for(var j = 0; j < allSegments[id].length; j++) {
			var note = allSegments[id][j];
			note[3] /= 2;
			allSegments[id][j] = note;
	}
}
////////////////////////////////////////////////////////
function doubleStretch(id) {
	if(infoFromSegId(id, 'lastNotePos') > beatLength * 16) {
		halfStretch(id);
		return;}
	for(var j = 0; j < allSegments[id].length; j++) {
		var note = allSegments[id][j];
		var segStartTime = infoFromSegId(id, 'startTime');
		var noteStartTime = note[4] - segStartTime;
		noteStartTime *= 2;
		note[4] = noteStartTime + segStartTime;		
	}
}
function halfStretch(id) {
	if(infoFromSegId(id, 'lastNotePos') < beatLength/2) {
		doubleStretch(id);
		return;}
	for(var j = 0; j < allSegments[id].length; j++) {
		var note = allSegments[id][j];
		var segStartTime = infoFromSegId(id, 'startTime');
		var noteStartTime = note[4] - segStartTime;
		noteStartTime /= 2;
		note[4] = noteStartTime + segStartTime;	
		allSegments[id][j] = note;
	}
}
////////////////////////////////////////////////////////
function shiftByHalf(id) {
	for(var j = 0; j < allSegments[id].length; j++) {
		var note = allSegments[id][j];
		var segStartTime = infoFromSegId(id, 'startTime');
		var segLength = infoFromSegId(id, 'msec');
		var noteStartTime = note[4] - segStartTime;
		noteStartTime += (segLength/2);
		var newStartTime = noteStartTime % segLength;
		note[4] = newStartTime += segStartTime;
		allSegments[id][j] = note;
	}		
}
function shiftByQuarter(id) {
	for(var j = 0; j < allSegments[id].length; j++) {
		var note = allSegments[id][j];
		var segStartTime = infoFromSegId(id, 'startTime');
		var segLength = infoFromSegId(id, 'msec');
		var noteStartTime = note[4] - segStartTime;
		noteStartTime += (segLength/4);
		var newStartTime = noteStartTime % segLength;
		note[4] = newStartTime += segStartTime;
		allSegments[id][j] = note;
	}		
}
////////////////////////////////////////////////////////
function transpose(id, amount) {	
	for(var j = 0; j < allSegments[id].length; j++) {
		//post('t');
		var note = allSegments[id][j];
		for(var k = 0; k < pitchList.length; k++) {
			if(note[1] == pitchList[k]) {
				//post('pitch before = ' + note[1]);
				if((k + amount) >= 0) {
					note[1] = pitchList[(k + amount) % pitchList.length];
					allSegments[id][j] = note;
					}
				else {
					note[1] = pitchList[pitchList.length + ((k + amount) % pitchList.length)];
					allSegments[id][j] = note;
					}
				//post('pitch after = ' + note[1]);
				break;
			}
		}
	}	
}
////////////////////////////////////////////////////////
function spread(id) {
	var segBars = infoFromSegId(id, 'bars');
	//post('segbars ' + segBars);
	if(segBars <= 4) {
		var segLength = infoFromSegId(id, 'msec');
		for(var j = 0; j < allSegments[id].length; j++) {
			var note = allSegments[id][j];
			note[4] = j % 4 * (segLength/4);
			allSegments[id][j] = note;
		}
	}
}
function getRandom(mini, maxi) {
    return Math.random() * (maxi - mini) + mini;
}
/////////////////////////////////////////////////////////////////
function copy(id) {
		var segBars = infoFromSegId(id, 'bars');
		var rand = 0;
		
			switch(segBars) {
				case 16:
					break;
				case 8:
					rand = Math.floor(getRandom(1, 2.99));
					break;
				case 4:
					rand = Math.floor(getRandom(3, 6.99));
					break;
				case 2:
					rand = Math.floor(getRandom(7, 14.99));
					break;
				case 1:
					rand = Math.floor(getRandom(15, 30.99));
					break;
				default: break;	
			}
			allSegments[rand] = clone(allSegments[id]);
			for(var i = 0; i < allSegments[id].length; i++) {
				var startTime = infoFromSegId(rand, 'startTime');
				note = allSegments[rand][i];
				note[4] += startTime;
			}	
}
function clone (existingArray) {
   var newObj = (existingArray instanceof Array) ? [] : {};
   for (i in existingArray) {
      if (i == 'clone') continue;
      if (existingArray[i] && typeof existingArray[i] == "object") {
         newObj[i] = clone(existingArray[i]);
      } else {
         newObj[i] = existingArray[i];
      }
   }
   return newObj;
}
////////////////////////////////////////////////////////
var pitchList = new Array(1);
function createPitchList() {
	pitchList = new Array(1);
	var pitchListIndex = 0;
	for(var j = 0; j < allSegments[0].length; j++) {
		var note = allSegments[0][j];
		if(note[1] != 0) {		
			var isNew = 1;
			for(var i = 0; i < pitchList.length; i++) {
				if(pitchList[i] == note[1]) {
					isNew = 0;
					}
			}
			if(isNew == 1) {
				pitchList[pitchListIndex] = note[1];
				pitchListIndex++;
				}
		}
	}	
	var swap = 0;
	var tempNote = [0, 0, 0, 0, 0];
	do {
			swap = 0;
			for(var k = 0; k < pitchList.length - 1; k++) {
				if(pitchList[k] > pitchList[k+1]) {
					tempNote = pitchList[k];
					pitchList[k] = pitchList[k+1];
					pitchList[k+1] = tempNote;
					swap = 1;
				}	
			 }
	}
	while(swap != 0);
}
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
function infoFromSegId(id, type) { 
		//type: (length in (bars), (msec), (startTime);
 			  //(maxPitch), (minPitch); (maxDur), (minDur)			
	var length = 0;
	var startTime = 0;
	var beatLength = (60/tempo) * 1000;	
		if(id == 0) {
			length = 16;
			startTime = 0; }
		if(id > 0 && id <= 2) {
			length = 8;
			startTime = (seqLength/2) * (id - 1); }	
		if(id > 2 && id <= 6) {
			length = 4;
			startTime = (seqLength/4) * (id - 3); }
		if(id > 6 && id <= 14) {
			length = 2;
			startTime = (seqLength/8) * (id - 7); }
		if(id > 14 && id <= 31) {
			length = 1;	
			startTime = (seqLength/16) * (id - 15); }
	switch(type) {
		case 'bars':	
			return length; 
				break;
		case 'msec':
			return beatLength * length;
 				break;
		case 'startTime':
			return startTime;
 				break;
		case 'maxPitch':

			var maxPitch = 0;
			for(var j = 0; j < allSegments[id].length; j++) {
				var note = allSegments[id][j];
				if(note[4] != 0) {
					pitch = note[1];			
					if(pitch > maxPitch) {
						maxPitch = pitch;
						}
				}
			}
			return maxPitch;
			break;
		case 'minPitch':
			var minPitch = 127;
			for(var j = 0; j < allSegments[id].length; j++) {
				var note = allSegments[id][j];
				if(note[4] != 0) {
					pitch = note[1];
					if(pitch < minPitch) {
						minPitch = pitch;
						}
				}
			}
			return minPitch;
			break;
		case 'maxDur':
			var maxDur = 0;
			for(var j = 0; j < allSegments[id].length; j++) {
				var note = allSegments[id][j];
				if(note[4] != 0) {
					dur = note[3];
					if(dur > maxDur) {
						maxDur = dur;
						}
				}
			}
			return maxDur;
			break;
		case 'minDur':
			var minDur = beatLength * 24;
			for(var j = 0; j < allSegments[id].length; j++) {
				var note = allSegments[id][j];
				if(note[4] != 0) {
					dur = note[3];
					if(dur < minDur) {
						minDur = dur;
						}
				}
			}
			return minDur;
			break;
		case 'lastNotePos':
			var pos = 0;
			if(allSegments[id].length > 1) {
				var note = allSegments[id][allSegments[id].length-1];
				pos = note[4];
				return pos;
				break;
			} 
			return pos;
			break;
		default: 
			break;
	}
}
			
		


