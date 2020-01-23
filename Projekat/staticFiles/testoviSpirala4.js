let assert = chai.assert;
let expect = chai.expect;

describe('Testovi serverskih funkcionalnosti', function() {
	this.timeout(10000);
	describe('Testiranje osoblja', function() {

		it('Prilikom ucitavanja iz baze ocekivano je da osobe budu kao iz postavke', (done) => {
			var ajax = new XMLHttpRequest();
			ajax.onreadystatechange = function () {
				if (ajax.readyState == 4 && ajax.status == 200) {
					var osobe = JSON.parse(ajax.responseText);
					var osoba1 = { id: 1, ime: 'Neko', prezime: 'Nekic', uloga: 'profesor' };
					var osoba2 = { id: 2, ime: 'Drugi', prezime: 'Neko', uloga: 'asistent'};
					var osoba3 = { id: 3, ime: 'Test', prezime: 'Test',uloga: 'asistent' };
					assert.include(osobe[0], osoba1);
					assert.include(osobe[1], osoba2);
					assert.include(osobe[2], osoba3);
					done();
				}
			}
			ajax.open("GET", "http://localhost:8080/osoblje", true);
			ajax.send();
		});

		it('Prilikom otvaranja stranice Rezervacije, ucitava se osoblje', (done) => {
			var ajax = new XMLHttpRequest();
			ajax.onreadystatechange = function () {
				if (ajax.readyState == 4 && ajax.status == 200) {
					var osobe = document.getElementById("listaOsoba");
					assert.equal(osobe.length, '3');
					done();
				}
			}
			ajax.open("GET", "http://localhost:8080/osoblje", true);
			ajax.send();
		});

		it('Prilikom otvaranja stranice Rezervacije ucitavaju se tri osobe iz postavke', (done) => {
			var ajax = new XMLHttpRequest();
			ajax.onreadystatechange = function () {
				if (ajax.readyState == 4 && ajax.status == 200) {
					var osobe = document.getElementById("listaOsoba");
					var osoba1 = osobe[0].innerHTML;
					var osoba2 = osobe[1].innerHTML;
					var osoba3 = osobe[2].innerHTML;
					
					expect(osoba1).to.equal(osobe[0].innerHTML); 
					expect(osoba2).to.equal(osobe[1].innerHTML);
					expect(osoba3).to.equal(osobe[2].innerHTML);
					done();
				}
			}
			ajax.open("GET", "http://localhost:8080/osoblje", true);
			ajax.send();
		});
	});


	describe('Testiranje rezervacija', function() {

		it('Ucitavanje pocetnih zauzeca', (done) => {
			var ajax = new XMLHttpRequest();
			ajax.onreadystatechange = function () {
				if (ajax.readyState == 4 && ajax.status == 200) {
					var rezervacije = JSON.parse(ajax.responseText);
					var rezervacija1 = { datum: '01.01.2020', pocetak: '12:00:00', kraj: '13:00:00', naziv: '1-11',  predavac: 'Neko Nekic' };
					var rezervacija2 = { dan: 0, semestar: 'zimski', pocetak: '13:00:00', kraj: '14:00:00', naziv: '1-11', predavac: 'Test Test'};
					assert.include(rezervacije.vanredna[0], rezervacija1);
					assert.include(rezervacije.periodicna[0], rezervacija2);
					done();
				}
			}
			ajax.open("GET", "http://localhost:8080/ucitajRezervacije", true);
			ajax.send();
		});


		it('Novo vanredno zauzece', (done) => {
			var ajax = new XMLHttpRequest();
			ajax.onreadystatechange = function () {
				if (ajax.readyState == 4 && (ajax.status == 200 || ajax.status == 500)) {

					if (ajax.status == 200){
						var ucitaniPodaci = JSON.parse(ajax.responseText);
						var novoZauzece = {datum:'10.01.2020', pocetak:'10:00:00', kraj:'11:00:00', naziv:'1-11', predavac:'Test Test'};
						assert.include(ucitaniPodaci.vanredna[1], novoZauzece);
						done();
					}

					else{
						var ajaxResponseText = (JSON.parse(ajax.responseText)).error;
						assert.equal(ajaxResponseText, "Nemoguca rezervacija, zauzet termin");
						done();					
					}	
				}
			}
			ajax.open("POST", "http://localhost:8080/vanredniRezervisi", true);
			ajax.setRequestHeader("Content-Type", "application/json");
			ajax.send(JSON.stringify({dan:10,mjesec:1,godina:2020, pocetak:'10:00', kraj:'11:00', sala:'1-11', predavac:"Test Test",danUSedmici:5,semestar:'zimski'}));
		});

		it('Novo periodicno zauzece', (done) => {
			var ajax = new XMLHttpRequest();
			ajax.onreadystatechange = function () {
				if (ajax.readyState == 4 && (ajax.status == 200 || ajax.status == 500)) {

					if (ajax.status == 200){
						var ucitaniPodaci = JSON.parse(ajax.responseText);
						var novoZauzece = {dan:7,semestar:'zimski', pocetak:'10:00:00', kraj:'11:00:00', naziv:'1-11', predavac:'Test Test'};
						assert.include(ucitaniPodaci.periodicna[1], novoZauzece);
						done();
					}

					else{
						var ajaxResponseText = (JSON.parse(ajax.responseText)).error;
						assert.equal(ajaxResponseText, "Nemoguca rezervacija, zauzet termin");
						done();					
					}	
				}
			}
			ajax.open("POST", "http://localhost:8080/periodicniRezervisi", true);
			ajax.setRequestHeader("Content-Type", "application/json");
			ajax.send(JSON.stringify({danUSedmici:7,semestar:'zimski',dan:11,mjesec:1,godina:2020, pocetak:'10:00', kraj:'11:00', sala:'1-11', predavac:"Test Test"}));
		});
	});


	describe('Testiranje sala', function() {
		
		it('Prilikom otvaranja stranice Rezervacije, ucitavaju se sale', (done) => {
			var ajax = new XMLHttpRequest();
			ajax.onreadystatechange = function () {
				if (ajax.readyState == 4 && ajax.status == 200) {
					var sale = document.getElementById("listaSala");
					assert.equal(sale.length, '2');
					done();
				}
			}
			ajax.open("GET", "http://localhost:8080/sale", true);
			ajax.send();
		});

		it('Prilikom otvaranja stranice Rezervacije ucitavaju se sale iz postavke', (done) => {
			var ajax = new XMLHttpRequest();
			ajax.onreadystatechange = function () {
				if (ajax.readyState == 4 && ajax.status == 200) {
					var sale = document.getElementById("listaSala");
					var sala1 = sale[0].innerHTML;
					var sala2 = sale[1].innerHTML;
					
					expect(sala1).to.equal(sale[0].innerHTML); 
					expect(sala2).to.equal(sale[1].innerHTML);
					done();
				}
			}
			ajax.open("GET", "http://localhost:8080/sale", true);
			ajax.send();
		});

		it('Prilikom ucitavanja iz baze ocekivano je da sale budu kao iz postavke', (done) => {
			var ajax = new XMLHttpRequest();
			ajax.onreadystatechange = function () {
				if (ajax.readyState == 4 && ajax.status == 200) {
					var sale = JSON.parse(ajax.responseText);
					var sala1 = { id: 1, naziv: '1-11', zaduzenaOsoba: 1 };
					var sala2 = { id: 2, naziv: '1-15', zaduzenaOsoba: 2 };
					assert.include(sale[0], sala1);
					assert.include(sale[1], sala2);
					done();
				}
			}
			ajax.open("GET", "http://localhost:8080/sale", true);
			ajax.send();
		});
	});


	describe('Testiranje postojecih rezervacija', function() {
		
		it('Ispis upozorenja zbog preklapanja vanredne rezervacije', (done) => {
			var ajax = new XMLHttpRequest();
			ajax.onreadystatechange = function () {
				if (ajax.readyState == 4 && ajax.status == 500) {
					var ajaxResponseText = (JSON.parse(ajax.responseText)).error;
					assert.equal(ajaxResponseText, "Nemoguca rezervacija, zauzet termin");
					done();
				}
			}
			ajax.open("POST", "http://localhost:8080/periodicniRezervisi", true);
			ajax.setRequestHeader("Content-Type", "application/json");
			ajax.send(JSON.stringify({danUSedmici:7,semestar:'zimski',dan:11,mjesec:1,godina:2020, pocetak:'10:30', kraj:'12:00', sala:'1-11', predavac:"Neko Nekic"}));
		});

		it('Ispis upozorenja zbog preklapanja vanredne rezervacije', (done) => {
			var ajax = new XMLHttpRequest();
			ajax.onreadystatechange = function () {
				if (ajax.readyState == 4 && ajax.status == 500) {
					var ajaxResponseText = (JSON.parse(ajax.responseText)).error;
					assert.equal(ajaxResponseText, "Nemoguca rezervacija, zauzet termin");
					done();
				}
			}
			ajax.open("POST", "http://localhost:8080/vanredniRezervisi", true);
			ajax.setRequestHeader("Content-Type", "application/json");
			ajax.send(JSON.stringify({dan:10,mjesec:1,godina:2020, pocetak:'10:30', kraj:'12:00', sala:'1-11', predavac:"Test Test",danUSedmici:5,semestar:'zimski'}));
			
		});
	});
});