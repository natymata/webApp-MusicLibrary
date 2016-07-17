var Album;

Album= function (pId, pTitulo, pGenero, pImagen) {
	var id= pId;
	var titulo= pTitulo;
	var genero= pGenero;
	var imagen= pImagen;
	var listaCanciones=[];

	this.getId= function  () {
		return id;
	};

	this.setTitulo= function  (pTitulo) {
		titulo= pTitulo;
	};

	this.getTitulo= function  () {
		return titulo;
	};

	this.setGenero= function  (pGenero) {
		genero= pGenero;
	};

	this.getGenero= function() {
		return genero;
	};

	this.setImagen= function  (pImagen) {
		imagen= pImagen;
	};

	this.getImagen= function() {
		return imagen;
	};

	this.getListaCanciones= function () {
		return listaCanciones;
	};

	this.setAgregarCancion= function(objCancion) {
		listaCanciones.push(objCancion);
	};

	this.getArrTiempos= function() {
		var arrCanciones= this.getListaCanciones();
		var arrTiempos=[];
		var tiempo;

		for(i=0;i<arrCanciones.length;i++){
			tiempo= arrCanciones[i].getDuracion();
			arrTiempos.push(tiempo);
		}
		return arrTiempos;
	};

	this.getDuracionTotal= function() {
		var arrTiempos= this.getArrTiempos(),
			seconds,
			totalSeconds=0,
			finalResult="";

		for (i=0;i<arrTiempos.length;i++) {
			seconds= this.timeStrToSec(arrTiempos[i]);
			totalSeconds+= seconds;
		}

		finalResult= this.secToString(totalSeconds);
		return finalResult;
	};

	this.getDuracionPromedio= function() {
		var arrTiempos= this.getArrTiempos(),
			seconds,
			totalSeconds=0,
			avrSeconds=0,
			finalResult="";

		for (i=0;i<arrTiempos.length;i++) {
			seconds= this.timeStrToSec(arrTiempos[i]);
			totalSeconds+= seconds;
		}

		if(arrTiempos.length==0){
			avrSeconds=0;
		}else{
			avrSeconds=totalSeconds/arrTiempos.length;
		}

		finalResult= this.secToString(avrSeconds);
		return finalResult;
	};

	this.timeStrToSec = function(timeString){
		var sect = timeString.split(":"),
			seconds;

		if(sect.length==3){
			seconds= Number((sect[0] * 3600)) + Number((sect[1] * 60)) + Number((+sect[2]));
		}else if(sect.length==2){
			seconds= Number((sect[0] * 60)) + Number((+sect[1]));
		}else{
			seconds=Number((+sect[0]));
		}
		return seconds;
	};

	this.secToString= function(seconds) {
		var hrs, min, sec,
			finalResult="";

		hrs= Math.floor(seconds/3600);
     	min= Math.floor((seconds- (3600*hrs))/60);
    	seg= Math.floor(seconds-((hrs*3600)+(min*60)));

    	if(hrs==0 && min!=0){
			finalResult= (min + "m " + seg +"s");
		}else if(hrs==0 && min==0){
			finalResult= (seg +"s");
		}else{
			finalResult= (hrs + "h " + min + "m " + seg +"s");
		}

		return finalResult;
	};

	this.buscarCancion= function(stringUser, listaObjHijos) {
		var pattern=new RegExp(stringUser, "i"),
			arrResults=[],
			objeto="";

		for (i=0;i<listaObjHijos.length;i++) {
			objeto=listaObjHijos[i].getTitulo();
				if(objeto.search(pattern)!= (-1)){
				arrResults.push(listaObjHijos[i]);
			}
		}
			return arrResults;
	}


};




