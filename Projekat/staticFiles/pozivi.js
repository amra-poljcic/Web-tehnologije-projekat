let Pozivi = ( function() {
	function ucitajPodatkeImpl () {
		var ajax = new XMLHttpRequest();

		ajax.onreadystatechange = function () {
			if (ajax.readyState == 4 && ajax.status == 200) {
				var ucitaniPodaci = JSON.parse(ajax.responseText);
				Kalendar.ucitajPodatke(ucitaniPodaci.periodicna,ucitaniPodaci.vanredna);
				osvjeziSale();
			}
		}
		ajax.open("GET", "http://localhost:8080/ucitajPodatke", true);
		ajax.send();

	}

	function ucitajSlikeImpl () {
		var ajax = new XMLHttpRequest();

		ajax.onreadystatechange = function () {
			if (ajax.readyState == 4 && ajax.status == 200) {
				var nizSlika = JSON.parse(ajax.responseText);
				dodajSlike(nizSlika[0],nizSlika[1],nizSlika[2]);
			}
		}
		ajax.open("GET", "http://localhost:8080/ucitajSlike?brojac="+getBrojac(), true);
		ajax.send();
	}

	function vanredniRezervisiImpl(dan, mjesec, godina, pocetak, kraj, sala, predavac){
		var ajax = new XMLHttpRequest();
		ajax.onreadystatechange = function() {
			if (ajax.readyState == 4 && ajax.status == 200){
				var ucitaniPodaci = JSON.parse(ajax.responseText);
				Kalendar.ucitajPodatke(ucitaniPodaci.periodicna,ucitaniPodaci.vanredna);
				osvjeziSale();
			}
			if(ajax.readyState == 4 && ajax.status == 500)
				alert("Nije moguće rezervisati salu " + sala+" za navedeni datum "+ 
					dan+ "/"+ mjesec + "/" + godina + " i termin od "+ pocetak + " do " + kraj +"!");	
		}
		ajax.open("POST","http://localhost:8080/vanredniRezervisi",true);
		ajax.setRequestHeader("Content-Type", "application/json");
		ajax.send(JSON.stringify({dan:dan,mjesec:mjesec,godina:godina,pocetak:pocetak,kraj:kraj,sala:sala,predavac:predavac}));
	}

	function periodicniRezervisiImpl(danUSedmici,semestar,dan, mjesec,godina,pocetak,kraj,sala,predavac){
		var ajax = new XMLHttpRequest();
		ajax.onreadystatechange = function() {
			if (ajax.readyState == 4 && ajax.status == 200){
				var ucitaniPodaci = JSON.parse(ajax.responseText);
				Kalendar.ucitajPodatke(ucitaniPodaci.periodicna,ucitaniPodaci.vanredna);
				osvjeziSale();
			}
			if(ajax.readyState == 4 && ajax.status == 500)
				alert("Nije moguće rezervisati salu " + sala+" za navedeni datum "+ 
					dan+ "/"+ mjesec + "/" + godina + " i termin od "+ pocetak + " do " + kraj +"!");	
		}
		ajax.open("POST","http://localhost:8080/periodicniRezervisi",true);
		ajax.setRequestHeader("Content-Type", "application/json");
		ajax.send(JSON.stringify({danUSedmici:danUSedmici,semestar:semestar,dan:dan,mjesec:mjesec,godina:godina,pocetak:pocetak,kraj:kraj,sala:sala,predavac:predavac}));
	}

	function ucitajOsobljeImpl () {
		var ajax = new XMLHttpRequest();

		ajax.onreadystatechange = function () {
			if (ajax.readyState == 4 && ajax.status == 200) {
				
				var osoblje = JSON.parse(ajax.responseText);

				var listaOsoba = document.getElementById("listaOsoba");
				for(var i = 0; i<osoblje.length; i++){
				var vrijednost = document.createElement("option");
				vrijednost.text = osoblje[i].ime + ' ' + osoblje[i].prezime;
				listaOsoba.options.add(vrijednost, 1);
				}
			}
		}
		ajax.open("GET", "http://localhost:8080/osoblje", true);
		ajax.send();
	}


	return {
		ucitajPodatke: ucitajPodatkeImpl,
		ucitajSlike: ucitajSlikeImpl,
		vanredniRezervisi: vanredniRezervisiImpl,
		periodicniRezervisi: periodicniRezervisiImpl,
		ucitajOsoblje: ucitajOsobljeImpl
	}
}
())
;