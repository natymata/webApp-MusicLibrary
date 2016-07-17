var Disquera;

Disquera= function(pId, pNombre) {
	var id= pId;
	var nombre= pNombre;
	var listaArtistas=[];

	this.getId= function () {
		return id;
	};

	this.setNombre= function(pNombre) {
		nombre= pNombre;
	}

	this.getNombre= function  () {
		return nombre;
	};

	this.getlistaArtistas= function  () {
		return listaArtistas;
	}

	this.setAgregarArtista= function  (objArtista) {
		listaArtistas.push(objArtista);
	};

	this.getCantidadArtistas= function() {
		var cantidadArtistas=0;
		var arrArtistas= this.getlistaArtistas();

		for(i=0;i<arrArtistas.length;i++){
			cantidadArtistas++;
		}
		return cantidadArtistas;
	};

	this.buscarArtista= function(stringUser, listaObjHijos) {
		var pattern=new RegExp(stringUser, "i"),
			arrResults=[],
			objeto="";

		for (i=0;i<listaObjHijos.length;i++) {
			objeto=listaObjHijos[i].getNombre();
				if(objeto.search(pattern)!= (-1)){
				arrResults.push(listaObjHijos[i]);
			}
		}
			return arrResults;
	}
}
