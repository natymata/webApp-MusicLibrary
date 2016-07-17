var Cancion;

Cancion= function(pId, pTitulo, pDuracion, pLink){
	var id= pId;
	var titulo= pTitulo;
	var duracion= pDuracion;
	var link= pLink;

	this.getId= function  () {
	 	return id;
	};

	this.getTitulo= function  () {
	 	return titulo;
	};

	this.setTitulo= function  (pTitulo) {
	 	titulo= pTitulo;
	};

	this.getDuracion= function  () {
	 	return duracion;
	};

	this.setDuracion= function  (pDuracion) {
	 	duracion= pDuracion;
	};

	this.getLink= function  () {
	 	return link;
	};

	this.setLink= function  (pLink) {
	 	link= pLink;
	};

};





