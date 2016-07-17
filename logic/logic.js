/*author:Natalie Mata-2015*/

/*****************************VAR************************************/
/*Botones principales*/
var btnCancion= document.getElementById("btnCancion"),
	btnAlbum= document.getElementById("btnAlbum"),
	btnArtista= document.getElementById("btnArtista"),
	btnDisqueras= document.getElementById("btnDisqueras"),
	btnAnnadidas= document.getElementById("aAnnadidas"),

	btnInicarAddSong= document.getElementById("btnInicarAddSong"),
	btnInicarAddAlbum= document.getElementById("btnInicarAddAlbum"),
	btnInicarAddArtist= document.getElementById("btnInicarAddArtist"),
	btnInicarAddRLabel= document.getElementById("btnInicarAddRLabel"),

	btnSendSong= document.getElementById("btnSendSong"),
	btnSendAlbum= document.getElementById("btnSendAlbum"),
	btnSendArtist= document.getElementById("btnSendArtist"),
	btnSendRlabel= document.getElementById("btnSendRlabel"),

	btnAddSongAlbum= document.getElementById("btnAddSongAlbum"),
	btnAddAlbumArtist= document.getElementById("btnAddAlbumArtist"),
	btnAddArtistRLabel= document.getElementById("btnAddArtistRLabel"),

	btnUserIcon= document.getElementById("btnUserIcon"),
	btnSignIn= document.getElementById("btnSignIn"),

/*Elementos principales DOM*/
	songSection= document.getElementById("songSection"),
	albumSection= document.getElementById("albumSection"),
	artistSection= document.getElementById("artistSection"),
	rLabelSection= document.getElementById("rLabelSection"),
	songResults= document.getElementById("songResults"),
	albumResults= document.getElementById("albumResults"),
	artistResults= document.getElementById("artistResults"),
	rLabelResults= document.getElementById("rLabelResults"),

	songForm= document.getElementById("songForm"),
	albumForm= document.getElementById("albumForm"),
	artistForm= document.getElementById("artistForm"),
	rlabelForm= document.getElementById("rlabelForm"),

	rowAlbum= document.getElementById("rowAlbum"),
	rowArtist= document.getElementById("rowArtist"),
	rowRlabel= document.getElementById("rowRlabel"),

	sltAlbum= document.getElementById("sltAlbum"),
	sltArtista= document.getElementById("sltArtista"),
	sltDisquera=document.getElementById("sltDisquera"),

	searchSongs= document.getElementById("txtSearchSongAlbum"),
	searchAlbums= document.getElementById("txtSearchAlbumArtist"),
	searcgArtists= document.getElementById("txtSearchArtistRLabel"),

	txtAlbumImg=document.getElementById("txtAlbumImg"),

/*otros DOM*/
	arrSections=[songSection, albumSection, artistSection, rLabelSection, songResults, albumResults, artistResults, rLabelResults],
	arrSongSectios=[songSection, songResults],
	arrAlbumSections=[albumSection, albumResults],
	arrArtistSectios=[artistSection, artistResults],
	arrRlabelSections=[rLabelSection, rLabelResults],

/*listas arreglos*/
	listaCanciones=[],
	listaAlbums=[],
	listaArtistas=[],
	listaDisqueras=[],

	listaCancionesSlt=[],
	listaAlbumsSlt=[],
	listaArtistasSlt=[],

/*objetos del usuario*/
	userAlbum,
	userArtist,
	userRlabel,

/*idSetters*/
	nIdSongSetter=1,
	nIdAlbumSetter=1,
	nIdArtistSetter=1,
	nIdRlabelSetter=1,

/*booleans datos quemados*/
	bCancionesAgregadas= false,
	bAlbumsAgregados= false,
	bArtistasAgregados= false,
	bDisquerasAgregadas= false;
/*********************************FIN VAR***************************************/

/******************************START PROGRAM**************************************/

/***funcionaes para manejar el posicionamiento de los divs con respecto al navbar fixed***/
	document.addEventListener("DOMContentLoaded", function() { 
  		document.querySelector(".wrapper").style.visibility = "visible";
	});//ocultar la pagina hasta que carguen la mayoria de los camponentes.

	window.addEventListener("hashchange", function() {
		if(location.hash==="#songSection" || location.hash === "#albumSection" || location.hash === "#artistSection" || location.hash === "#rLabelSection" ){
			scrollBy(0,-175);
		}////empuja hacia abajo los divs para que no los tape la barra fija superior.
		//https://github.com/twbs/bootstrap/issues/1768
		//http://stackoverflow.com/questions/3090478/jquery-hashchange-event
	});

	window.onbeforeunload= function(){
		window.scrollTo(0,-175);
	}//lleva a la posicion inicial cuando se refresca la pagina
//---------------------------fin funciones posicionamiento--------------------------------//

	displayNoneArray (arrSections);
	startSongs();

	btnCancion.addEventListener("click", startSongs);
	btnAlbum.addEventListener("click", startAlbums);
	btnArtista.addEventListener("click", startArtists);
	btnDisqueras.addEventListener("click", startRLabel);


	btnInicarAddSong.addEventListener("click", function() {
		visibilityVisible(songForm);
		visibilityHidden (this);
	},false);

	btnInicarAddAlbum.addEventListener("click", function() {
		visibilityVisible(albumForm);
		visibilityHidden (this);
	},false);

	btnInicarAddArtist.addEventListener("click", function() {
		visibilityVisible(artistForm);
		visibilityHidden (this);
	},false);

	btnInicarAddRLabel.addEventListener("click", function() {
		visibilityVisible(rlabelForm);
		visibilityHidden (this);
	},false);

	btnSendSong.addEventListener("click", addSong ,false);
	btnSendAlbum.addEventListener("click", addAlbum,false);
	btnSendArtist.addEventListener("click", addArtist,false);
	btnSendRlabel.addEventListener("click", addRLabel,false);

	btnAddSongAlbum.addEventListener("click", fillSelectAlbum, false);
	btnAddAlbumArtist.addEventListener("click",  fillSelectArtist);
	btnAddArtistRLabel.addEventListener("click", fillSelectRlabel, false);

	sltAlbum.addEventListener("change", addSongAlbum,false);
	sltArtista.addEventListener("change", addAlbumArtist,false);
	sltDisquera.addEventListener("change", addArtistRlabel,false);

	searchSongs.addEventListener("input", search);
	searchAlbums.addEventListener("input", search);
	searcgArtists.addEventListener("input", search);

	fillCoverSelect();
	
	txtAlbumImg.addEventListener("click", function(){
		$("#coversModal").modal("show");
	});

	btnAnnadidas.addEventListener("click", datosQuemados);
	btnUserIcon.addEventListener("click", function(){
		$("#userNameModal").modal("show");
	})

	btnSignIn.addEventListener("click", getUserName);
	displayUserName();

/***************************FIN PROGRAM********************************/

/*****************************FUNCTIONS*****************************/

//----------------------FUNCIONES GENERALES--------------------------//
function displayNoneArray(arrElements) {
	for(i=0;i<arrElements.length;i++){
		arrElements[i].classList.remove("displayBlock");
		arrElements[i].classList.add("displayNone");
	}
}//fin function

function displayNone(pElement) {
	pElement.classList.remove("displayBlock");
	pElement.classList.add("displayNone");
}//fin function

function displayBlockArray(arrElements) {
	for(i=0;i<arrElements.length;i++){
		arrElements[i].classList.remove("displayNone");
		arrElements[i].classList.add("displayBlock");
	}
}//fin function

function displayBlock(pElement) {
	pElement.classList.remove("displayNone");
	pElement.classList.add("displayBlock");
}//fin function

function visibilityHidden (pElement) {
	pElement.classList.add("visibilityHidden");
	pElement.classList.remove("visibilityVisible");
}//fin function

function visibilityVisible (pElement) {
	pElement.classList.add("visibilityVisible");
	pElement.classList.remove("visibilityHidden");
}//fin function

function activeClass(btnActivo) {
	var arrBtn= document.querySelectorAll(".sidebar li");
	for(i=0;i<arrBtn.length;i++){
		arrBtn[i].classList.remove("active");
	}
	btnActivo.parentNode.classList.add("active");
}//fin function

//-------------------------VALIDACIONES DE FORMULARIOS-----------------------//
function validarForm(arrImput, arrPatrones, pError) {
	var bError= false;

	for(i=0;i<arrImput.length;i++){
		if(validarPatron(arrImput[i], arrPatrones[i])){
			removeError(arrImput[i]);
		}else{
			addError(arrImput[i]);
			bError= true;
		}
	}

	if(bError==true){
		displayBlock(pError);
		pError.innerHTML="Revise los campos en rojo";
		return false;
	}else{
		displayNone(pError);
		return true;
	}
}//fin function

function validarPatron (pCampo, pPatron) {
	if(pCampo.value==""){ //error, campo en blanco
		return false;
	}
	else{
		if(pPatron.test(pCampo.value)){
			return true; //campo lleno y cumple con el patron
		}else{
			return false; // error, no cumple con el patron
		}
	}
}//fin function

function clearForm(pArrImput) {
	for(i=0;i<pArrImput.length;i++){
			pArrImput[i].value="";
		}
}//fin function

function addError (pCampo) {
	pCampo.classList.add("error");
}//fin function

function removeError (pCampo) {
	pCampo.classList.remove("error");
}//fin function


/**--MUESTRAN EL PANEL CORRESPONDIENTE A LA CATEGORIA ESCOGIDA POR EL USUARIO--**/
function startSongs() {
	displayNoneArray (arrSections);
	displayBlockArray(arrSongSectios);
	visibilityHidden(songForm);
	visibilityVisible(btnInicarAddSong);
	activeClass(btnCancion);
}//fin function

function startAlbums() {
	displayNoneArray (arrSections);
	displayBlockArray(arrAlbumSections);
	visibilityHidden(albumForm);
	displayNone(rowAlbum);
	visibilityVisible(btnInicarAddAlbum);
	activeClass(btnAlbum);
}//fin function

function startArtists() {
	displayNoneArray (arrSections);
	displayBlockArray(arrArtistSectios);
	visibilityHidden(artistForm);
	displayNone(rowArtist);
	visibilityVisible(btnInicarAddArtist);
	activeClass(btnArtista);
}//fin function

function startRLabel() {
	displayNoneArray (arrSections);
	displayBlockArray(arrRlabelSections);
	visibilityHidden(rlabelForm);
	displayNone(rowRlabel);
	visibilityVisible(btnInicarAddRLabel);
	activeClass(btnDisqueras);
}//fin function


/***************************FUNCIONES PRINCIPALES******************************/

//AGREGAN NUEVAS CANCIONES, ALBUMS, ARTISTAS, DISQUERAS A LAS LISTAS DE OBJETOS//
function addSong() {
	var arrImput= document.querySelectorAll("#songForm input[type=text]"),
		tblSong= document.querySelector("#tblSong tbody"),
		arrPatrones=[/^([A-Za-z0-9ñ_=:%@-\s\/\?\#\&\$\.]*)$/, /^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/, /^([A-Za-z0-9ñ_=:%-\/\?\#\&\.]*)$/],
		pSongError= document.getElementById("pSongError");

	if(validarForm(arrImput, arrPatrones, pSongError)){
		var objCancion= newCancion(arrImput[0].value, arrImput[1].value, arrImput[2].value);
		llenarTablaCanciones(tblSong, listaCanciones);
		clearForm (arrImput);
	}
}//fin function

function newCancion(pTitulo, pDuracion, pLink) {
	var objCancion= new Cancion(nIdSongSetter, pTitulo, pDuracion, pLink);
	listaCanciones.push(objCancion);
	listaCancionesSlt.push(objCancion);
	nIdSongSetter++;
}//fin function

function addAlbum() {
	var arrImput= document.querySelectorAll("#albumForm input[type=text]"),
		tblAlbum= document.querySelector("#tblAlbum tbody"),
		arrPatrones=[/^([A-Za-z0-9ñ_=:%@-\s\/\?\#\&\$\.]*)$/, /^([A-Za-z0-9ñ_-\s\/\&]*)$/, /^([A-Za-z0-9ñ_=:%-\/\?\#\&\.]*)$/],
		pAlbumError= document.getElementById("pAlbumError"),
		pClase="album";
	
	if(validarForm(arrImput, arrPatrones, pAlbumError)){
		var objAlbum= newAlbum(arrImput[0].value, arrImput[1].value, arrImput[2].value);
		llenarTabla(listaAlbums, tblAlbum, pClase);
		clearForm (arrImput);
	}
}//fin function

function newAlbum (pTitulo, pGenero, pImagen) {
	var objAlbum= new Album(nIdAlbumSetter, pTitulo, pGenero, pImagen);
	listaAlbums.push(objAlbum);
	listaAlbumsSlt.push(objAlbum);
	nIdAlbumSetter++;
}//fin function

function addArtist() {
	var arrImput= document.querySelectorAll("#artistForm input[type=text]"),
		tblArtist=document.querySelector("#tblArtist tbody"),
		arrPatrones=[/^([A-Za-z0-9ñ_-\s\&]*)$/],
		pArtistError= document.getElementById("pArtistError"),
		pClase="artista";

	if(validarForm(arrImput, arrPatrones, pArtistError)){
		var objArtista= newArtista(arrImput[0].value);
		llenarTabla(listaArtistas, tblArtist, pClase);
		clearForm (arrImput);
	}
}//fin function

function newArtista(pNombre) {
	var objArtista= new Artista(nIdArtistSetter, pNombre);
	listaArtistas.push(objArtista);
	listaArtistasSlt.push(objArtista);
	nIdArtistSetter++;
}//fin function

function addRLabel() {
	var arrImput= document.querySelectorAll("#rlabelForm input[type=text]"),
		tblRlabel=document.querySelector("#tblRlabel tbody"),
		arrPatrones=[/^([A-Za-z0-9ñ_-\s\&]*)$/],
		pRlabelError=document.getElementById("pRlabelError"),
		pClase="disquera";

	if(validarForm(arrImput, arrPatrones, pRlabelError)){
		var objDisquera= newDisquera(arrImput[0].value);
		llenarTabla(listaDisqueras, tblRlabel, pClase);
		clearForm (arrImput);
	}
}//fin function

function newDisquera(pNombre) {
	var objDisquera= new Disquera(nIdRlabelSetter, pNombre);
	listaDisqueras.push(objDisquera);
	nIdRlabelSetter++;
}//fin function


//***************LLENAR TABLAS PRINCIPALES*********************//

//-----Llena solo las tablas de canciones-----//
function llenarTablaCanciones (pElementTable, pListaCanciones) {
	pElementTable.innerHTML="";

	for(i=0; i<pListaCanciones.length;i++){
		var newRow= document.createElement("tr"),
			newBtn= document.createElement("input"),
			newSpan= document.createElement("span"),
			newTxtNode,
			cellTitulo= document.createElement("td"),
			cellDuracion= document.createElement("td"),
			cellLink= document.createElement("td"),
			newLink= document.createElement("a");

		//btn Eleminar de la lsta	
		if(pElementTable.parentNode.id!="tblSong"){
			newBtn.type="button";
			newBtn.title="Eliminar de esta lista";
			newBtn.classList.add("btnDelete");
			newBtn.value="-";
			newBtn.addEventListener("click", removeSongAlbum);
			cellTitulo.appendChild(newBtn);
		}
		//span que guarda el id
		newSpan.classList.add("displayNone");
		newSpan.innerHTML= (pListaCanciones[i].getId());
		cellTitulo.appendChild(newSpan);
		//text node que almacena y muestra ek titulo de la cancion
		newTxtNode= document.createTextNode(pListaCanciones[i].getTitulo());
		cellTitulo.appendChild(newTxtNode);
		//td que almacena y muestra la duaracion de la cancion
		cellDuracion.innerHTML=(pListaCanciones[i].getDuracion());
		//td que almacena y muestra el link.
		newLink.innerHTML=(pListaCanciones[i].getLink());
		newLink.href= "https://"+(pListaCanciones[i].getLink());
		newLink.target="_blank";
		cellLink.appendChild(newLink);
		//appends
		newRow.appendChild(cellTitulo);
		newRow.appendChild(cellDuracion);
		newRow.appendChild(cellLink);

		pElementTable.appendChild(newRow);
	}
}//fin function	

//Llena tablas principales de las demas clases//
function llenarTabla(pListaObjetos, pElementTable, pClase) {
	pElementTable.innerHTML="";

	for(i=0; i<pListaObjetos.length;i++){
		var newRow= document.createElement("tr"),
			newTd= document.createElement("td"),
			newAnchor= document.createElement("a"),
			newTextNode;

		if(pClase=="album"){
			newTextNode=document.createTextNode(pListaObjetos[i].getTitulo());
		}
		else{
			newTextNode=document.createTextNode(pListaObjetos[i].getNombre());
		}
		newAnchor.appendChild(newTextNode);
		
		if(pClase=="album"){
			newAnchor.id= "album"+pListaObjetos[i].getId();
		}else if(pClase=="artista"){
			newAnchor.id="artista"+pListaObjetos[i].getId();
		}else{
			newAnchor.id="disquera"+pListaObjetos[i].getId();
		}
		newTd.appendChild(newAnchor);
		newRow.appendChild(newTd);
		pElementTable.appendChild(newRow);

		if(pClase=="album"){
			newAnchor.addEventListener("click", mostrarAlbum, false);
			newAnchor.href="#rowAlbum";
			
		}else if(pClase=="artista"){
			newAnchor.addEventListener("click", mostrarArtista, false);
			newAnchor.href="#rowArtist";
			userArtist=pListaObjetos[i];
		}else{
			newAnchor.addEventListener("click", mostrarDisquera, false);
			newAnchor.href="#rowRlabel";
			userRlabel=pListaObjetos[i];
		}
	}
}//fin function

//MOSTRAR Y LLENAR PANEL DE ELEMENTOS ELEGIDOS
//--------------------ALBUM--------------------//
//Info del album elegido
function mostrarAlbum() {
	var albumImg= document.querySelector("#rowAlbum img"),
		albumTitulo= document.querySelector("#h2NombreAlbum"),
		albumGenero= document.querySelector("#spanGenre"),
		albumAvrSongLength= document.querySelector("#spanAvrLength"),
		albumTotalLength= document.querySelector("#spanTotalLength");
		selectControlAlbum= document.getElementById("selectControlAlbum"),
		userAlbumId=this.id,
		tableSxAlbum= document.querySelector("#rowAlbum tbody");

	for(i=0;i<listaAlbums.length;i++){
		if(userAlbumId===("album"+listaAlbums[i].getId())){
			userAlbum= listaAlbums[i];
		}
	}
	
	displayBlock(rowAlbum);
	visibilityHidden(selectControlAlbum);

	albumImg.src= userAlbum.getImagen();  
	albumTitulo.innerHTML= userAlbum.getTitulo();
	albumGenero.innerHTML= userAlbum.getGenero();
	albumAvrSongLength.innerHTML= userAlbum.getDuracionPromedio();
	albumTotalLength.innerHTML= userAlbum.getDuracionTotal();
	llenarTablaCanciones (tableSxAlbum, userAlbum.getListaCanciones());
}//fin function

//drop down del album elegido
function fillSelectAlbum() {
	var selectControlAlbum= document.getElementById("selectControlAlbum"), 
		sltAlbum= document.getElementById("sltAlbum"),
		newOptionDefault=document.createElement("option"),
		newTextNode,
		newOption;

	visibilityVisible(selectControlAlbum);
	sltAlbum.innerHTML="";
	newOptionDefault.innerHTML="--Seleccione--";
	sltAlbum.appendChild(newOptionDefault);

	for(i=0;i<listaCancionesSlt.length;i++){
		newOption=document.createElement("option");
		newOption.value=listaCancionesSlt[i].getId();
		newTextNode=document.createTextNode(listaCancionesSlt[i].getTitulo());
		newOption.appendChild(newTextNode);
		sltAlbum.appendChild(newOption);
	}
}//fin function

//agrega cancones al album
function addSongAlbum() {
	var sltAlbum= document.getElementById("sltAlbum"),
		tableSxAlbum= document.querySelector("#rowAlbum tbody"),
		albumAvrSongLength= document.querySelector("#spanAvrLength"),
		albumTotalLength= document.querySelector("#spanTotalLength");

	for(i=0;i<listaCancionesSlt.length;i++){
		if(sltAlbum.value==listaCancionesSlt[i].getId()){
			userAlbum.setAgregarCancion(listaCancionesSlt[i]);
			listaCancionesSlt.splice([i],1);
		}
	}
	llenarTablaCanciones (tableSxAlbum, userAlbum.getListaCanciones());
	fillSelectAlbum();
	albumAvrSongLength.innerHTML= userAlbum.getDuracionPromedio();
	albumTotalLength.innerHTML= userAlbum.getDuracionTotal();
}//fin function

//------------ARTISTA--------------------------//
//info del artista elegido
function mostrarArtista() {
	var artistName= document.querySelector("#h2NombreArtista"),
		cantAlbums= document.querySelector("#spanCantAlbums"),
		songAvrLength= document.querySelector("#spanPromLengthxArtista"),
		selectControlArtist=document.querySelector("#selectControlArtist"),
		userArtistId= this.id,
		pClase="album",
		tableAlbxArtist= document.querySelector("#rowArtist tbody");

	for(i=0;i<listaArtistas.length;i++){
		if(userArtistId===("artista"+listaArtistas[i].getId())){
			userArtist= listaArtistas[i];
		}
	}

	displayBlock(rowArtist);
	visibilityHidden(selectControlArtist);

	artistName.innerHTML= userArtist.getNombre();
	cantAlbums.innerHTML= userArtist.getCantidadAlbums();
	songAvrLength.innerHTML= userArtist.getAllSongsAvrLength();
	fillSecondaryTable (tableAlbxArtist, userArtist.getListaAlbums(),pClase);
}//fin function

//drop down del artista elegido
function fillSelectArtist() {
	var selectControlArtist= document.getElementById("selectControlArtist"),
		sltArtista= document.getElementById("sltArtista"),
		newOptionDefault=document.createElement("option"),
		newTextNode,
		newOption;

	visibilityVisible(selectControlArtist);
	sltArtista.innerHTML="";
	newOptionDefault.innerHTML="--Seleccione--";
	sltArtista.appendChild(newOptionDefault);

	for(i=0;i<listaAlbumsSlt.length;i++){
		newOption=document.createElement("option");
		newOption.value=listaAlbumsSlt[i].getId();
		newTextNode=document.createTextNode(listaAlbumsSlt[i].getTitulo());
		newOption.appendChild(newTextNode);
		sltArtista.appendChild(newOption);
	}
}//fin function

//agrega albums al artista
function addAlbumArtist () {
	var sltArtista= document.getElementById("sltArtista"),
		tableAlbxArt=document.querySelector("#rowArtist tbody"),
		cantAlbums= document.querySelector("#spanCantAlbums"),
		songAvrLength= document.querySelector("#spanPromLengthxArtista"),
		pClase="album";

		for(i=0;i<listaAlbumsSlt.length;i++){
			if(sltArtista.value==listaAlbumsSlt[i].getId()){
				userArtist.setAgregarAlbum(listaAlbumsSlt[i]);
				listaAlbumsSlt.splice([i],1);
			}
		}
		
		fillSecondaryTable (tableAlbxArt, userArtist.getListaAlbums(),pClase);
		fillSelectArtist();
		cantAlbums.innerHTML= userArtist.getCantidadAlbums();
		songAvrLength.innerHTML= userArtist.getAllSongsAvrLength();
}//fin function

//-----------------DISQUERA--------------------------//
//info de la disuqera elegida
function mostrarDisquera() {
	var rLabelName= document.getElementById("h2rLabelName"),
		cantArtistas= document.getElementById("spanCantidadArtist"),
		selectControlRlabel= document.getElementById("selectControlDisquera"),
		userRlabelId= this.id,
		tableArtxDisquera= document.querySelector("#rowRlabel tbody"),
		pClase="artista";

	for(i=0;i<listaDisqueras.length;i++){
		if(userRlabelId===("disquera"+listaDisqueras[i].getId())){
			userRlabel=listaDisqueras[i];
		}
	}

	displayBlock(rowRlabel);
	visibilityHidden(selectControlDisquera);

	rLabelName.innerHTML=userRlabel.getNombre();
	cantArtistas.innerHTML=userRlabel.getCantidadArtistas();
	fillSecondaryTable(tableArtxDisquera, userRlabel.getlistaArtistas(), pClase);
}//fin function

//drop down de la disquera
function fillSelectRlabel() {
	var selectControlRlabel= document.getElementById("selectControlDisquera"),
		sltDisquera=document.getElementById("sltDisquera"),
		newOptionDefault=document.createElement("option"),
		newTextNode,
		newOption;

	visibilityVisible(selectControlRlabel);
	sltDisquera.innerHTML="";
	newOptionDefault.innerHTML="--Seleccione--";
	sltDisquera.appendChild(newOptionDefault);

	for(i=0;i<listaArtistasSlt.length;i++){
		newOption=document.createElement("option");
		newOption.value=listaArtistasSlt[i].getId();
		newTextNode=document.createTextNode(listaArtistasSlt[i].getNombre());
		newOption.appendChild(newTextNode);
		sltDisquera.appendChild(newOption);
	}
}//fin function

//agrega artistas a la disquera elegida
function addArtistRlabel () {
	var sltDisquera=document.getElementById("sltDisquera"),
		tableArtxDisquera= document.querySelector("#rowRlabel tbody"),
		cantArtistas= document.getElementById("spanCantidadArtist"),
		pClase="artista";

	for (i=0;i<listaArtistasSlt.length; i++) {
		if(sltDisquera.value==listaArtistasSlt[i].getId()){
			userRlabel.setAgregarArtista(listaArtistasSlt[i]);
			listaArtistasSlt.splice([i],1);
		}
	}
	fillSecondaryTable(tableArtxDisquera, userRlabel.getlistaArtistas(), pClase);
	fillSelectRlabel();
	cantArtistas.innerHTML=userRlabel.getCantidadArtistas();
}//fin function


//---------llenar tablas secundarias o tablas de elementos hijos------------//
function fillSecondaryTable (pElementTable, pListaObjetos, pClase) {
	pElementTable.innerHTML="";

	for(i=0; i<pListaObjetos.length;i++){
		var newRow= document.createElement("tr"),
			newBtn= document.createElement("input"),
			newSpan= document.createElement("span"),
			newTd= document.createElement("td"),
			newTextNode;

		newBtn.type="button";
		newBtn.title="Eliminar de esta lista";
		newBtn.classList.add("btnDelete");
		newBtn.value="-";
		newTd.appendChild(newBtn);

		newSpan.classList.add("displayNone");
		newSpan.innerHTML= (pListaObjetos[i].getId());
		newTd.appendChild(newSpan);

		if(pClase=="artista"){
			newTextNode=document.createTextNode(pListaObjetos[i].getNombre());
			newBtn.addEventListener("click", removeArtistRlabel);
		}else{
			newTextNode=document.createTextNode(pListaObjetos[i].getTitulo());
			newBtn.addEventListener("click", removeAlbumArtist);
		}
			newTd.appendChild(newTextNode);
			newRow.appendChild(newTd);
			pElementTable.appendChild(newRow);
		}
}//fin function

//funcion de busquedas
function search () {
	var id= this.id,
		stringUser= this.value,
		listaObjHijos,
		table,
		pClase,
		arrResults=[];

	switch (id){
		case "txtSearchSongAlbum":
			listaObjHijos=userAlbum.getListaCanciones();
			table=document.querySelector("#rowAlbum tbody");
			arrResults=userAlbum.buscarCancion(stringUser, listaObjHijos);
			llenarTablaCanciones (table, arrResults);	
		break;
		case "txtSearchAlbumArtist":
			listaObjHijos=userArtist.getListaAlbums();
			table=document.querySelector("#rowArtist tbody");
			arrResults=userArtist.buscarAlbum(stringUser, listaObjHijos);
			fillSecondaryTable (table, arrResults);
		break;
		case "txtSearchArtistRLabel":
			listaObjHijos=userRlabel.getlistaArtistas();
			table=document.querySelector("#rowRlabel tbody");
			pClase="artista";
			arrResults=userRlabel.buscarArtista(stringUser, listaObjHijos);
			fillSecondaryTable (table, arrResults, pClase);
		break;	
	}		
}//fin function


/***********************FUNCIONES COMPLEMENTARIAS****************************/

//MODALES//
//llena el modal de covers con las imagenes
function fillCoverSelect () {
	var imgBox= document.getElementById("imgBox"),
		arrCovers=["images/albumCover/cover1.jpg", "images/albumCover/cover2.jpg", "images/albumCover/cover3.jpg", "images/albumCover/cover4.jpg", "images/albumCover/cover5.jpg", "images/albumCover/cover6.jpg", "images/albumCover/cover7.jpg", "images/albumCover/cover8.jpg", "images/albumCover/cover9.jpg", "images/albumCover/cover10.jpg", "images/albumCover/cover11.jpg", "images/albumCover/cover12.jpg", "images/albumCover/cover13.jpg", "images/albumCover/cover14.jpg", "images/albumCover/cover15.jpg"],
		newImg;

	for(i=0;i<arrCovers.length;i++){
		newImg= document.createElement("img");
		newFigcaption= document.createElement("figcaption");
		newFigcaption.innerHTML="images/albumCover/cover"+(i+1)+".jpg";
		newImg.src=arrCovers[i];
		newImg.width=113;
		newImg.height=113;
		newImg.appendChild(newFigcaption);
		imgBox.appendChild(newImg);
		newImg.addEventListener("click", chooseCover);
	}
}//fin function

//seleccioner el cover
function chooseCover () {
	var img= this,
		arrImgs= document.querySelector("#imgBox").childNodes,
		txtAlbumImg= document.getElementById("txtAlbumImg");
			
		for(i=0;i<arrImgs.length;i++){
			arrImgs[i].classList.remove("imgBorder");
			arrImgs[i].classList.remove("selected");
		}
		this.classList.add("imgBorder");
		this.classList.add("selected");

		txtAlbumImg.value= this.firstChild.innerHTML;
		$("#coversModal").modal("hide");
}//fin function


/******agregar adatos quemados mediante boton --"añadidas recientemente"--*****/
function datosQuemados() {
	var sectionBtnId= document.querySelector(".active").firstChild.id,
		table,
		arrObjetos=[],
		pClase,
		newObjet;

	switch(sectionBtnId){
		case "btnCancion":
				table=document.querySelector("#tblSong tbody");
				arrObjetos= [["Dog days are over", "3:08", "www.youtube.com/watch?v=PGrx6etMl0w"],["Summer 2015", "3:26", "www.youtube.com/watch?v=u4zb6LUehwY"],["Am I wrong", "5:04", "www.youtube.com/watch?v=bg1sT4ILG0w"],["You've got the love", "5:05", "www.youtube.com/watch?v=PQZhN65vq9E"],["You & Me", "4:45", "www.youtube.com/watch?v=_zPlr-o-YEQ"],["The Hills", "3:54", "www.youtube.com/watch?v=yzTuBuRdAyA"],["Thank U", "6:55", "www.youtube.com/watch?v=OOgpT5rEKIU"],["Ironic", "4:15", "www.youtube.com/watch?v=E1ILlhZPAoc"],["Hip-Hop Mashup", "3:10", "www.youtube.com/watch?v=lvoz-fSze8s"],["Are you still mad", "7:02", "www.youtube.com/watch?v=gL_0g4onX1k"],["That I would be good", "3:12", "www.youtube.com/watch?v=QMZReI2QrlQ"],["You learn", "4:24", "www.youtube.com/watch?v=T1tOHz2l0qE"],["Ship to wreck", "3:38", "www.youtube.com/watch?v=B9v8jLBrvug"]];

				if(bCancionesAgregadas==false){
					for(i=0;i<arrObjetos.length;i++){
						newObjet=newCancion(arrObjetos[i][0],arrObjetos[i][1],arrObjetos[i][2]);
					}
					llenarTablaCanciones(table, listaCanciones);
					bCancionesAgregadas=true;
				}
		break;
		case "btnAlbum":
				pClase="album";
				table=document.querySelector("#tblAlbum tbody");
				arrObjetos=[["Supposed Former Infatuation Junkie", "Pop/Rock", "images/albumCover2/cover19.jpg"],["Collection 2015", "Pop/Hip-hop/Eclectique", "images/albumCover2/cover21.jpg"],["How Big, How Blue, How Beautiful", "Indie Rock", "images/albumCover2/cover17.jpg"],["Jagged Little Pill", "Dance pop", "images/albumCover2/cover16.jpg"]];

				if(bAlbumsAgregados==false){
					for(i=0;i<arrObjetos.length;i++){
						newObjet=newAlbum(arrObjetos[i][0],arrObjetos[i][1],arrObjetos[i][2]);
					}
					llenarTabla(listaAlbums, table, pClase);
					bAlbumsAgregados=true;
				}
		break;
		case "btnArtista":
				pClase="artista";
				table= document.querySelector("#tblArtist tbody");
				arrObjetos=["Alanis Morissette", "L.E.J.","Florence + The Machine"];
				if(bArtistasAgregados==false){
					for(i=0;i<arrObjetos.length;i++){
						newObjet=newArtista(arrObjetos[i]);
					}
					llenarTabla(listaArtistas, table, pClase);
					bArtistasAgregados=true;
				}
		break;
		case "btnDisqueras":
				pClase="disquera";
				table=document.querySelector("#tblRlabel tbody");
				arrObjetos=["Universal","Emy"];
				if(bDisquerasAgregadas==false){
					for(i=0;i<arrObjetos.length;i++){
						newObjet=newDisquera(arrObjetos[i]);
					}
					llenarTabla(listaDisqueras, table, pClase);
					bDisquerasAgregadas=true;
				}
		break;
	}
}//fin function

//Modal nombre usuario y funcion de desplegar el nombre del usuario
function getUserName() {
	var arrImput= document.querySelectorAll("#userNameModal input[type=text]"),
		arrPatron=[/^([A-Za-z0-9ñ_-\s\&]*)$/],
		userNameError= document.getElementById("userNameError"),
		btnSignIn= document.getElementById("btnSignIn");

	if(validarForm(arrImput, arrPatron, userNameError)){
		localStorage.setItem("usuario", arrImput[0].value);
		displayUserName();
		$("#userNameModal").modal("hide");
	}
	clearForm(arrImput);
}//fin function

function displayUserName () {
	var pUserName= document.getElementById("pUserName"),
		userName= localStorage.getItem("usuario");
	pUserName.innerHTML= userName;
}//fin function


//--------------REMOVER ELEMENTOS DE LAS LISTAS-------------------------//
function removeSongAlbum () {
	var songId= this.nextSibling.textContent,
		albumAvrSongLength= document.querySelector("#spanAvrLength"),
		albumTotalLength= document.querySelector("#spanTotalLength"),
		listaCancionesAlbum= userAlbum.getListaCanciones(),
		cancionId;

	for(i=0;i<listaCanciones.length;i++){
		if(songId==listaCanciones[i].getId()){
			listaCancionesSlt.push(listaCanciones[i]);
		}
	}

	for(i=0;i<listaCancionesAlbum.length;i++){
		cancionId= listaCancionesAlbum[i].getId();
		if(songId==cancionId){
			listaCancionesAlbum.splice([i],1);
		}
	}

	fillSelectAlbum();
	albumAvrSongLength.innerHTML= userAlbum.getDuracionPromedio();
	albumTotalLength.innerHTML= userAlbum.getDuracionTotal();
	this.parentNode.parentNode.remove();
	
}//fin function

function removeAlbumArtist() {
	var albumId= this.nextSibling.textContent,
		cantAlbums= document.querySelector("#spanCantAlbums"),
		songAvrLength= document.querySelector("#spanPromLengthxArtista"),
		listaAlbumsArtista= userArtist.getListaAlbums(),
		discoId;

	for(i=0;i<listaAlbums.length;i++){
		if(albumId==listaAlbums[i].getId()){
			listaAlbumsSlt.push(listaAlbums[i]);
		}
	}

	for(j=0;j<listaAlbumsArtista.length;j++){
		discoId= listaAlbumsArtista[j].getId();
		if(albumId==discoId){
			listaAlbumsArtista.splice([j],1);
		}
	}

	fillSelectArtist();
	cantAlbums.innerHTML= userArtist.getCantidadAlbums();
	songAvrLength.innerHTML= userArtist.getAllSongsAvrLength();
	this.parentNode.parentNode.remove();
}//fin function

function removeArtistRlabel() {
	var artistId= this.nextSibling.textContent,
		cantArtistas= document.getElementById("spanCantidadArtist"),
		listaArtistasDisquera=userRlabel.getlistaArtistas(),
		cantanteId;

	for(i=0;i<listaArtistas.length;i++){
		if(artistId==listaArtistas[i].getId()){
			listaArtistasSlt.push(listaArtistas[i]);
		}
	}

	for(i=0;i<listaArtistasDisquera.length;i++){
		cantanteId= listaArtistasDisquera[i].getId();
		if(artistId==cantanteId){
			listaArtistasDisquera.splice([i],1);
		}
	}

	fillSelectRlabel();
	cantArtistas.innerHTML=userRlabel.getCantidadArtistas();
	this.parentNode.parentNode.remove();

}//fin  function