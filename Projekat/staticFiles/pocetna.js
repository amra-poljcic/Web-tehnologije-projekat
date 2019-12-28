var image1 = document.getElementById("slika1");
var image2 = document.getElementById("slika2");
var image3 = document.getElementById("slika3");
var nizSlika = [];
var brojac = 0;
var maksimalniBrojac = 0;

window.onload = function(){
	document.getElementById("prethodni").disabled=true;
	Pozivi.ucitajSlike();
}

function dodajSlike(slika1,slika2,slika3) {
	if(slika1!=null) nizSlika.push(slika1);
	if(slika2!=null) nizSlika.push(slika2);
	if(slika3!=null) nizSlika.push(slika3);
	postaviSlike(slika1, slika2, slika3);
}

function postaviSlike(slika1, slika2, slika3) {
	if(slika1 == null || slika2 == null || slika3==null) {
		document.getElementById("sljedeci").disabled=true;
		if(slika1 == null && slika2 == null && slika3==null)
			return;
	}
	else
		document.getElementById("sljedeci").disabled=false;
	if(slika1!=null){ 
		image1.src = slika1;
		image1.style.display="inline";	
	}
	else image1.style.display="none";	
	if(slika2!=null){ 
		image2.src = slika2;
		image2.style.display="inline";	
	}
	else image2.style.display="none";	
	if(slika3!=null){ 
		image3.src = slika3;
		image3.style.display="inline";	
	}
	else image3.style.display="none";	
}

function getBrojac(){
	return brojac;
}

function sljedeca() {
	brojac+=3;
	if(brojac==0)
		document.getElementById("prethodni").disabled=true;
	else
		document.getElementById("prethodni").disabled=false;
	if(brojac>maksimalniBrojac) Pozivi.ucitajSlike();
	else postaviSlike(nizSlika[brojac],nizSlika[brojac+1],nizSlika[brojac+2]);
	if(maksimalniBrojac<brojac) maksimalniBrojac = brojac;
}

function prethodna() {
	brojac-=3;
	if(brojac==0)
		document.getElementById("prethodni").disabled=true;
	else
		document.getElementById("prethodni").disabled=false;


	postaviSlike(nizSlika[brojac], nizSlika[brojac + 1], nizSlika[brojac+2]);
}