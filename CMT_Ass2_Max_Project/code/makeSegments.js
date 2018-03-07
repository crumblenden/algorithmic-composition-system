inlets = 1;
outlets = 2;

/*segs16 = new Array(1);
segs8 = new Array(2);
segs4 = new Array(4);
segs2 = new Array(8);
segs1 = new Array(16);
allSegments = new Array(5);  */                                    

function bang() {
	
segs16 = new Array(1);
segs8 = new Array(2);
segs4 = new Array(4);
segs2 = new Array(8);
segs1 = new Array(16);
allSegments = new Array(5);  

		quantise();
		
		var allSegIndex = 0;//1

	for(var a = 0; a <= 4; a++) {
		
		var segsAmt = Math.pow(2, a);
		
		for(var i = 0; i < segsAmt; i++) {
			var segLength = seqLength/segsAmt;
			var segStart = i * (seqLength / segsAmt);
			var segEnd = (i * (seqLength / segsAmt)) + segLength;
			
			var newSeg = new Array(1);
			var k = 0;
			for(var j = 0; j < sequence.length; j++) {			
				if(sequence[j][4] >= segStart && sequence[j][4] < segEnd) {
					newSeg[k+1] = sequence[j];
					k++
				}
			}
			
			if(newSeg.length > 1) {
				newSeg[0] = [(newSeg[1][4]-segStart), 0, 0, 0, 0];
			}
				else {
					newSeg[0] = [segLength, 0, 0, 0, 0];
				}
				
			//post('-----segment ' + i + '------' + 'segsAmt = ' + segsAmt);
			//post()
			//for(var b = 0; b < newSeg.length; b++) {			
			//	post(newSeg[b]);
			//	post();
			//	}
			//post();
			
			allSegments[allSegIndex] = newSeg;
			allSegIndex++;
			
			switch(a) {
				case 0:
					segs16[i] = newSeg;
				break;
				case 1:
					segs8[i] = newSeg;
				break;
				case 2:
					segs4[i] = newSeg;
				break;
				case 3:
					segs2[i] = newSeg;
				break;
				case 4:
					segs1[i] = newSeg;
				break;
				default: break;
			}
		}
	}
	outlet(1, 'make');
}

function postSegments() {
	for(var i = 0; i < allSegments.length; i++) {
		post();
		post('(allSegments) segment ' + i);
		for(var j = 0; j < allSegments[i].length; j++) {
		post();
		post(allSegments[i][j]);
		}
	}
}

function quantise() {
	for(var i = 0; i < sequence.length; i++) {
		var pos = sequence[i][4];
	//	post();	
		//post('oldPos = ' +pos);
		var newPos = 0;
		var msecPer16th = ((60.0/tempo) * 1000) / 4.0;
		var mod = pos % msecPer16th; 
		if(mod < (msecPer16th/2)) {
			newPos = pos - mod;
			}
			else {
			newPos = (pos - mod) + msecPer16th;
			}
			sequence[i][4] = newPos; 
			
		//post();
		//post('mod = ' +mod);
		//post();	
		//post('newPos = ' +newPos);	
		}
		for(var i = 0; i < sequence.length; i++) {
		if(i != sequence.length - 1) {
			sequence[i][0] = sequence[i+1][4] - sequence[i][4];
			}
		}
}