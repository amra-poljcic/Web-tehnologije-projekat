let assert = chai.assert;

describe('Kalendar', function() {
	describe('Zadatak 1 - Testovi', function() {
		it('Pozivanje obojiZauzeca kada podaci nisu učitani: očekivana vrijednost da se ne oboji niti jedan dan', function() {
			var kalendarRef = document.getElementById('tabelaKalendar');
			Kalendar.iscrtajKalendar(kalendarRef, 5);
			Kalendar.obojiZauzeca(kalendarRef, 5, "VA", "09:00", "12:00");
			var n = 0;

			for (var i = 1; i < kalendarRef.rows.length; i++) {
				for (var j = 0; j <= 6; j++) {
					if (kalendarRef.rows[i].cells[j].className === "slobodna" && kalendarRef.rows[i].cells[j].innerHTML != "")
						n++;
				}
			}

			assert.equal(n, 30); 
		});

		
		it('Pozivanje obojiZauzeca gdje u zauzecima postoje duple vrijednosti za zauzeće istog termina:očekivano je da se dan oboji bez obzira što postoje duple vrijednosti', function() {
			var kalendarRef = document.getElementById('tabelaKalendar');
			var stalni = [{dan: 4, semestar: "ljetni", pocetak: "12:00", kraj: "15:00", naziv: "VA", predavac: "Dzery"}];
			var privremeni = [{datum: "21.11.2019", pocetak: "09:00", kraj: "10:00", naziv: "MA", predavac: "Pepeljuga"},
			{datum: "21.11.2019", pocetak: "09:00", kraj: "10:00", naziv: "MA", predavac: "Merlin"}];
			
			Kalendar.iscrtajKalendar(kalendarRef, 10);
			Kalendar.ucitajPodatke(stalni,privremeni);
			Kalendar.obojiZauzeca(kalendarRef, 10, "MA", "09:00", "10:00");
			var n = 0;

			for (var i = 1; i < kalendarRef.rows.length; i++) {
				for (var j = 0; j <= 6; j++) {
					if (kalendarRef.rows[i].cells[j].className === "zauzeta")
						n++;
				}
			}

			assert.equal(n, 1); 
		});

		it('Pozivanje obojiZauzece kada u podacima postoji periodično zauzeće za drugi semestar: očekivano je da se ne oboji zauzeće', function() {
			var kalendarRef = document.getElementById('tabelaKalendar');
			var stalni = [{dan: 4, semestar: "ljetni", pocetak: "12:00", kraj: "15:00", naziv: "VA", predavac: "Dzery"}];
			var privremeni = [{datum: "21.09.2019", pocetak: "09:00", kraj: "10:00", naziv: "MA", predavac: "Pepeljuga"},
			{datum: "21.09.2019", pocetak: "09:00", kraj: "10:00", naziv: "MA", predavac: "Merlin"}];
			
			Kalendar.iscrtajKalendar(kalendarRef, 0); //januar
			Kalendar.ucitajPodatke(stalni,privremeni);
			Kalendar.obojiZauzeca(kalendarRef, 0, "VA", "12:00", "15:00");
			var n = 0;

			for (var i = 1; i < kalendarRef.rows.length; i++) {
				for (var j = 0; j <= 6; j++) {
					if (kalendarRef.rows[i].cells[j].className === "zauzeta")
						n++;
				}
			}

			Kalendar.iscrtajKalendar(kalendarRef, 10); //novembar
			Kalendar.ucitajPodatke(stalni,privremeni);
			Kalendar.obojiZauzeca(kalendarRef, 10, "VA", "12:00", "15:00");

			for (var i = 1; i < kalendarRef.rows.length; i++) {
				for (var j = 0; j <= 6; j++) {
					if (kalendarRef.rows[i].cells[j].className == "zauzeta")
						n++;
				}
			}
			
			Kalendar.iscrtajKalendar(kalendarRef, 11); //decembar
			Kalendar.ucitajPodatke(stalni,privremeni);
			Kalendar.obojiZauzeca(kalendarRef, 11, "VA", "12:00", "15:00");

			for (var i = 1; i < kalendarRef.rows.length; i++) {
				for (var j = 0; j <= 6; j++) {
					if (kalendarRef.rows[i].cells[j].className === "zauzeta")
						n++;
				}
			}

			Kalendar.iscrtajKalendar(kalendarRef, 9); //oktobar
			Kalendar.ucitajPodatke(stalni,privremeni);
			Kalendar.obojiZauzeca(kalendarRef, 9, "VA", "12:00", "15:00");

			for (var i = 1; i < kalendarRef.rows.length; i++) {
				for (var j = 0; j <= 6; j++) {
					if (kalendarRef.rows[i].cells[j].className === "zauzeta")
						n++;
				}
			}

			assert.equal(n, 0); 
		});


		it('Pozivanje obojiZauzece kada u podacima postoji zauzeće termina ali u drugom mjesecu: očekivano je da se ne oboji zauzeće', function() {
			var kalendarRef = document.getElementById('tabelaKalendar');
			var stalni = [{dan: 4, semestar: "ljetni", pocetak: "12:00", kraj: "15:00", naziv: "VA", predavac: "Dzery"}];
			var privremeni = [{datum: "21.10.2019", pocetak: "09:00", kraj: "10:00", naziv: "MA", predavac: "Pepeljuga"}];
			
			Kalendar.iscrtajKalendar(kalendarRef, 10);
			Kalendar.ucitajPodatke(stalni,privremeni);
			Kalendar.obojiZauzeca(kalendarRef, 10, "MA", "09:00", "10:00");
			var n = 0;

			for (var i = 1; i < kalendarRef.rows.length; i++) {
				for (var j = 0; j <= 6; j++) {
					if (kalendarRef.rows[i].cells[j].className === "zauzeta")
						n++;
				}
			}

			assert.equal(n, 0); 
		});


		it('Pozivanje obojiZauzece kada su u podacima svi termini u mjesecu zauzeti: očekivano je da se svi dani oboje', function() {
			var kalendarRef = document.getElementById('tabelaKalendar');
			var stalni = [{dan: 4, semestar: "zimski", pocetak: "12:00", kraj: "15:00", naziv: "VA", predavac: "Dzery"},
			{dan: 3, semestar: "zimski", pocetak: "12:00", kraj: "15:00", naziv: "VA", predavac: "Dzery"},
			{dan: 2, semestar: "zimski", pocetak: "12:00", kraj: "15:00", naziv: "VA", predavac: "Dzery"},
			{dan: 1, semestar: "zimski", pocetak: "12:00", kraj: "15:00", naziv: "VA", predavac: "Dzery"},
			{dan: 0, semestar: "zimski", pocetak: "12:00", kraj: "15:00", naziv: "VA", predavac: "Dzery"},
			{dan: 5, semestar: "zimski", pocetak: "12:00", kraj: "15:00", naziv: "VA", predavac: "Dzery"},
			{dan: 6, semestar: "zimski", pocetak: "12:00", kraj: "15:00", naziv: "VA", predavac: "Dzery"}];
			var privremeni = [{datum: "21.02.2019", pocetak: "09:00", kraj: "10:00", naziv: "MA", predavac: "Pepeljuga"}];
			
			Kalendar.iscrtajKalendar(kalendarRef, 10);
			Kalendar.ucitajPodatke(stalni,privremeni);
			Kalendar.obojiZauzeca(kalendarRef, 10, "VA", "12:00", "15:00");
			var n = 0;

			for (var i = 1; i < kalendarRef.rows.length; i++) {
				for (var j = 0; j <= 6; j++) {
					if (kalendarRef.rows[i].cells[j].className === "zauzeta" && kalendarRef.rows[i].cells[j].innerHTML != "")
						n++;
				}
			}

			assert.equal(n, 30); 
		});
		
		it('Dva puta uzastopno pozivanje obojiZauzece: očekivano je da boja zauzeća ostane ista', function() {
			var kalendarRef = document.getElementById('tabelaKalendar');
			var stalni = [{dan: 4, semestar: "zimski", pocetak: "12:00", kraj: "15:00", naziv: "VA", predavac: "Dzery"}];
			var privremeni = [{datum: "21.12.2019", pocetak: "09:00", kraj: "10:00", naziv: "MA", predavac: "Pepeljuga"}];
			
			Kalendar.iscrtajKalendar(kalendarRef, 11);
			Kalendar.ucitajPodatke(stalni,privremeni);
			Kalendar.obojiZauzeca(kalendarRef, 11, "MA", "09:00", "10:00");
			Kalendar.obojiZauzeca(kalendarRef, 11, "MA", "09:00", "10:00");
			var n = 0;

			for (var i = 1; i < kalendarRef.rows.length; i++) {
				for (var j = 0; j <= 6; j++) {
					if (kalendarRef.rows[i].cells[j].className === "zauzeta")
						n++;
				}
			}
			assert.equal(n, 1); 
		});
		

		it('Pozivanje ucitajPodatke, obojiZauzeca, ucitajPodatke - drugi podaci, obojiZauzeca: očekivano da se primjenjuju se samo posljednje učitani podaci', function() {
			var kalendarRef = document.getElementById('tabelaKalendar');
			var stalni = [{dan: 4, semestar: "zimski", pocetak: "12:00", kraj: "15:00", naziv: "VA", predavac: "Dzery"}];
			var privremeni = [{datum: "21.12.2019", pocetak: "09:00", kraj: "10:00", naziv: "MA", predavac: "Pepeljuga"},
			{datum: "22.12.2019", pocetak: "12:00", kraj: "14:00", naziv: "VA", predavac: "Pepeljuga"}];
			
			Kalendar.iscrtajKalendar(kalendarRef, 11);
			Kalendar.ucitajPodatke(stalni,privremeni);
			Kalendar.obojiZauzeca(kalendarRef, 11, "MA", "09:00", "10:00");

			Kalendar.ucitajPodatke(stalni,privremeni);
			Kalendar.obojiZauzeca(kalendarRef, 11, "VA", "12:00", "14:00");
			
			var n = 0;

			for (var i = 1; i < kalendarRef.rows.length; i++) {
				for (var j = 0; j <= 6; j++) {
					if (kalendarRef.rows[i].cells[j].className === "zauzeta")
						n++;
				}
			}
			assert.equal(n, 1); 
		});

		it('Nevalidni podaci: očekivano da se ništa ne oboji', function() {
			var kalendarRef = document.getElementById('tabelaKalendar');
			var stalni = [{dan: 4, semestar: "proljetni", pocetak: "12:00", kraj: "15:00", naziv: "VA", predavac: "Dzery"}];
			var privremeni = [{datum: "38.10.2019", pocetak: "09:00", kraj: "10:00", naziv: "MA", predavac: "Pepeljuga"},
			{datum: "16.16.2019", pocetak: "09:00", kraj: "10:00", naziv: "MA", predavac: "Pepeljuga"}];
			
			Kalendar.iscrtajKalendar(kalendarRef, 9);
			Kalendar.ucitajPodatke(stalni,privremeni);
			Kalendar.obojiZauzeca(kalendarRef, 9, "MA", "09:00", "10:00");
			Kalendar.obojiZauzeca(kalendarRef, 9, "VA", "12:00", "14:00");
			
			var n = 0;

			for (var i = 1; i < kalendarRef.rows.length; i++) {
				for (var j = 0; j <= 6; j++) {
					if (kalendarRef.rows[i].cells[j].className === "zauzeta")
						n++;
				}
			}
			assert.equal(n, 0); 
		});

		it('Raspust: očekivano je da se ništa ne oboji van semestara', function() {
			var kalendarRef = document.getElementById('tabelaKalendar');
			var stalni = [{dan: 4, semestar: "ljetni", pocetak: "12:00", kraj: "15:00", naziv: "VA", predavac: "Dzery"},
			{dan: 1, semestar: "zimski", pocetak: "12:00", kraj: "15:00", naziv: "VA", predavac: "MikiMaus"}];
			var privremeni = [{datum: "21.09.2019", pocetak: "09:00", kraj: "10:00", naziv: "MA", predavac: "Pepeljuga"}];
			
			Kalendar.iscrtajKalendar(kalendarRef, 6); //juli
			Kalendar.ucitajPodatke(stalni,privremeni);
			Kalendar.obojiZauzeca(kalendarRef, 6, "VA", "12:00", "15:00");
			var n = 0;

			for (var i = 1; i < kalendarRef.rows.length; i++) {
				for (var j = 0; j <= 6; j++) {
					if (kalendarRef.rows[i].cells[j].className === "zauzeta")
						n++;
				}
			}

			Kalendar.iscrtajKalendar(kalendarRef, 7); //august
			Kalendar.ucitajPodatke(stalni,privremeni);
			Kalendar.obojiZauzeca(kalendarRef, 7, "VA", "12:00", "15:00");

			for (var i = 1; i < kalendarRef.rows.length; i++) {
				for (var j = 0; j <= 6; j++) {
					if (kalendarRef.rows[i].cells[j].className === "zauzeta")
						n++;
				}
			}
			
			Kalendar.iscrtajKalendar(kalendarRef, 8); //septembar
			Kalendar.ucitajPodatke(stalni,privremeni);
			Kalendar.obojiZauzeca(kalendarRef, 8, "VA", "12:00", "15:00");

			for (var i = 1; i < kalendarRef.rows.length; i++) {
				for (var j = 0; j <= 6; j++) {
					if (kalendarRef.rows[i].cells[j].className === "zauzeta")
						n++;
				}
			}

			assert.equal(n, 0); 
		});

	});

describe('Zadatak 2 - Testovi', function() {
	it('Pozivanje iscrtajKalendar za mjesec sa 30 dana: očekivano je da se prikaže 30 dana', function() {
		var kalendarRef = document.getElementById('tabelaKalendar');
		Kalendar.iscrtajKalendar(kalendarRef, 3);
		var n = 0;

		for (var i = 1; i < kalendarRef.rows.length; i++) {
			for (var j = 0; j < kalendarRef.rows[i].cells.length; j++) {
				if (kalendarRef.rows[i].cells[j].innerHTML != "")
					n++;
			}
		}

		assert.equal(n, 30); 
	});


	it('Pozivanje iscrtajKalendar za mjesec sa 31 dana: očekivano je da se prikaže 31 dana', function() {
		var kalendarRef = document.getElementById('tabelaKalendar');
		Kalendar.iscrtajKalendar(kalendarRef, 0);
		var n = 0;

		for (var i = 1; i < kalendarRef.rows.length; i++) {
			for (var j = 0; j < kalendarRef.rows[i].cells.length; j++) {
				if (kalendarRef.rows[i].cells[j].innerHTML != "")
					n++;
			}
		}

		assert.equal(n, 31);
	});

	it('Pozivanje iscrtajKalendar za trenutni mjesec: očekivano je da je 1. dan u petak', function() {
		var kalendarRef = document.getElementById('tabelaKalendar');
		var datum = new Date();
		var mjesec = datum.getMonth();

		Kalendar.iscrtajKalendar(kalendarRef, mjesec);
		
		var prviDan = kalendarRef.rows[1].cells[4].innerHTML;

		assert.equal(prviDan, "1");
	});

	it('Pozivanje iscrtajKalendar za trenutni mjesec: očekivano je da je 30. dan u subotu', function() {
		var kalendarRef = document.getElementById('tabelaKalendar');
		var datum = new Date();
		var mjesec = datum.getMonth();

		Kalendar.iscrtajKalendar(kalendarRef, mjesec);
		
		var posljednjiDan = kalendarRef.rows[5].cells[5].innerHTML;

		assert.equal(posljednjiDan, "30");
	});


	it('Pozivanje iscrtajKalendar za januar: očekivano je da brojevi dana idu od 1 do 31 počevši od utorka', function() {
		var kalendarRef = document.getElementById('tabelaKalendar');
		
		Kalendar.iscrtajKalendar(kalendarRef, 0);

		var daniJanuara = ['','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20',
		'21','22','23','24','25','26','27','28','29','30','31'];
		var br = 0;
		
		for (var i = 1; i < kalendarRef.rows.length; i++) {
			for (var j = 0; j <= 6; j++) {
				if(kalendarRef.rows[i].cells[j].innerHTML === daniJanuara[br]) br++;
			}
		}

		assert.equal(br, 32);
	});

	it('Pozivanje iscrtajKalendar za septembar: očekivano je da sadrzi 7 redova (7. ukljucuje dane sedmice)', function() {
		var kalendarRef = document.getElementById('tabelaKalendar');
		
		Kalendar.iscrtajKalendar(kalendarRef, 8);

		var brojRedova = kalendarRef.rows.length;

		assert.equal(brojRedova, 7);
	});

	it('Pozivanje iscrtajKalendar za decembar: očekivano je da sadrzi 11 praznih ćelija', function() {
		var kalendarRef = document.getElementById('tabelaKalendar');
		
		Kalendar.iscrtajKalendar(kalendarRef, 11);
		var n = 0;

		for (var i = 1; i < kalendarRef.rows.length; i++) {
			for (var j = 0; j < kalendarRef.rows[i].cells.length; j++) {
				if (kalendarRef.rows[i].cells[j].innerHTML === "")
					n++;
			}
		}

		assert.equal(n, 11);

	});

});

});


