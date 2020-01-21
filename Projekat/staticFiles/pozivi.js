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
		ajax.open("GET", "http://localhost:8080/ucitajRezervacije", true);
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

	function vanredniRezervisiImpl(dan, mjesec, godina, pocetak, kraj, sala, predavac, danUSedmici, semestar){
		var ajax = new XMLHttpRequest();
		ajax.onreadystatechange = function() {
			if (ajax.readyState == 4 && ajax.status == 200){
				var ucitaniPodaci = JSON.parse(ajax.responseText);
				Kalendar.ucitajPodatke(ucitaniPodaci.periodicna,ucitaniPodaci.vanredna);
				osvjeziSale();
			}
			if(ajax.readyState == 4 && ajax.status == 500) {
				ucitajPodatkeImpl();
				alert("Salu " + sala+" za navedeni datum "+ 
					dan+ "/"+ mjesec + "/" + godina + " i termin od "+ pocetak + " do " + kraj +" rezervisala je osoba " + predavac+"!");	
			}
		}
		ajax.open("POST","http://localhost:8080/vanredniRezervisi",true);
		ajax.setRequestHeader("Content-Type", "application/json");
		ajax.send(JSON.stringify({dan:dan,mjesec:mjesec,godina:godina,pocetak:pocetak,kraj:kraj,sala:sala,predavac:predavac,danUSedmici:danUSedmici,semestar:semestar}));
	}

	function periodicniRezervisiImpl(danUSedmici,semestar,dan, mjesec,godina,pocetak,kraj,sala,predavac){
		var ajax = new XMLHttpRequest();
		ajax.onreadystatechange = function() {
			if (ajax.readyState == 4 && ajax.status == 200){
				var ucitaniPodaci = JSON.parse(ajax.responseText);
				Kalendar.ucitajPodatke(ucitaniPodaci.periodicna,ucitaniPodaci.vanredna);
				osvjeziSale();
			}
			if(ajax.readyState == 4 && ajax.status == 500) {
				ucitajPodatkeImpl();
				alert("Salu " + sala+" za navedeni datum "+ 
					dan+ "/"+ mjesec + "/" + godina + " i termin od "+ pocetak + " do " + kraj +" rezervisala je osoba " + predavac+"!");
			}
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

	function ucitajSaleImpl () {
		var ajax = new XMLHttpRequest();

		ajax.onreadystatechange = function () {
			if (ajax.readyState == 4 && ajax.status == 200) {
				
				var sale = JSON.parse(ajax.responseText);

				var listaSala = document.getElementById("listaSala");
				for(var i = 0; i<sale.length; i++){
					var vrijednost = document.createElement("option");
					vrijednost.text = sale[i].naziv;
					listaSala.options.add(vrijednost, 1);
				}
			}
		}
		ajax.open("GET", "http://localhost:8080/sale", true);
		ajax.send();
	}

	function listaOsobljaImpl () {
		var ajax = new XMLHttpRequest();
		console.log('Provjera');
		ajax.onreadystatechange = function () {
			if (ajax.readyState == 4 && ajax.status == 200) {
				
				var osoblje = JSON.parse(ajax.responseText);

				var tabelaOsobe = document.getElementById("tabelaOsobe");
				tabelaOsobe.innerHTML = '<tr id="Naslov"><td>OSOBA</td><td>SALA</td></tr>';
				for(var i = 0; i<osoblje.length; i++){
					var tr = tabelaOsobe.insertRow(i+1) 
					var cell1 = tr.insertCell(0);
					var cell2 = tr.insertCell(1);
					cell1.innerHTML = osoblje[i].osoba;
					cell2.innerHTML = osoblje[i].sala;
				}
			}
		}
		ajax.open("GET", "http://localhost:8080/listaOsoblja", true);
		ajax.send();
	}	


	return {
		ucitajPodatke: ucitajPodatkeImpl,
		ucitajSlike: ucitajSlikeImpl,
		vanredniRezervisi: vanredniRezervisiImpl,
		periodicniRezervisi: periodicniRezervisiImpl,
		ucitajOsoblje: ucitajOsobljeImpl,
		ucitajSale: ucitajSaleImpl,
		listaOsoblja: listaOsobljaImpl
	}
}
())
;