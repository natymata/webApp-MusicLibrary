var Artista;

Artista= function(pId, pNombre) {
	var id= pId;
	var nombre= pNombre;
	var listaAlbums=[];

	this.getId= function () {
		return id;
	};

	this.setNombre= function(pNombre) {
		nombre= pNombre;
	}

	this.getNombre= function  () {
		return nombre;
	};

	this.setAgregarAlbum= function  (objAlbum) {
		listaAlbums.push(objAlbum);
	};

	this.getListaAlbums= function  () {
		return listaAlbums;
	}

	this.getCantidadAlbums= function() {
		var cantidadAlbums=0;
		var arrAlbums= this.getListaAlbums();

		for(i=0;i<arrAlbums.length;i++){
			cantidadAlbums++;
		}
		return cantidadAlbums;
	}

	this.getArrTiempos= function(){
		var albumList= this.getListaAlbums(),
			trackList,
			arrTiempos=[];

		for (i=0; i<albumList.length; i++) {
			trackList=albumList[i].getListaCanciones();
			for(j=0;j<trackList.length;j++){
				arrTiempos.push(trackList[j].getDuracion());
			}
			trackList="";
		}
		return arrTiempos;
	}

	this.getAllSongsAvrLength= function(){
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
	}

	this.buscarAlbum= function(stringUser, listaObjHijos) {
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

}//fin de la clase

