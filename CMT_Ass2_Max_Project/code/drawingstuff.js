listAndOuts = new Array(allSegments.length);
var thisObject = this.box;
var bang16bar;
	var r16bang;
var bang8bar;
	var r8bang;
var bang4bar;
	var r4bang;
var bang2bar;
	var r2bang;
var bang1bar;
	var r1bang;

function bang() {




//function make() {
	 bang16bar = this.patcher.newdefault(700, 50, "button");
		r16bang = this.patcher.newdefault(700, 20, "r", "16bang");
		this.patcher.connect(r16bang, 0, bang16bar, 0);
	 bang8bar = this.patcher.newdefault(800, 50, "button");
		r8bang = this.patcher.newdefault(800, 20, "r", "8bang");
		this.patcher.connect(r8bang, 0, bang8bar, 0);
	 bang4bar = this.patcher.newdefault(900, 50, "button");
		r4bang = this.patcher.newdefault(900, 20, "r", "4bang");
		this.patcher.connect(r4bang, 0, bang4bar, 0);
	 bang2bar = this.patcher.newdefault(1000, 50, "button");
		r2bang = this.patcher.newdefault(1000, 20, "r", "2bang");
		this.patcher.connect(r2bang, 0, bang2bar, 0);
	 bang1bar = this.patcher.newdefault(1100, 50, "button");
		r1bang = this.patcher.newdefault(1100, 20, "r", "1bang");
		this.patcher.connect(r1bang, 0, bang1bar, 0);
	
	for(var i = 0; i < allSegments.length; i++) {
		listAndOuts[i] = this.patcher.newdefault(100+(i*100), 400, "listAndOut");
		this.patcher.connect(thisObject, i, listAndOuts[i], 1);
		//this.patcher.connect(bang, 0, listAndOuts[i], 0);
		
		if(i < 1) {this.patcher.connect(bang16bar, 0, listAndOuts[i], 0);}
		if(i >= 1 && i < 3) {this.patcher.connect(bang8bar, 0, listAndOuts[i], 0);}
		if(i >= 3 && i < 7) {this.patcher.connect(bang4bar, 0, listAndOuts[i], 0);}
		if(i >= 7 && i < 15) {this.patcher.connect(bang2bar, 0, listAndOuts[i], 0);}
		if(i >= 15 && i < listAndOuts.length) {this.patcher.connect(bang1bar, 0, listAndOuts[i], 0);}	
		this.patcher.connect(scaVelObj, i, listAndOuts[i], 2);
}
}

function remove() {
		this.patcher.remove(bang16bar);
		this.patcher.remove(bang8bar);
		this.patcher.remove(bang4bar);
		this.patcher.remove(bang2bar);
		this.patcher.remove(bang1bar);
		this.patcher.remove(r16bang);
		this.patcher.remove(r8bang);
		this.patcher.remove(r4bang);
		this.patcher.remove(r2bang);
		this.patcher.remove(r1bang);
	for(var i = 0; i < allSegments.length; i++) {
		this.patcher.remove(listAndOuts[i]);
		}
}

