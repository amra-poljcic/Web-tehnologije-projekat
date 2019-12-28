let Pozivi = ( function() {
	function ucitajPodatkeImpl () {
		var ajax = new XMLHttpRequest();

		ajax.onreadystatechange = function () {
			if (ajax.readyState == 4 && ajax.status == 200) {
				var ucitaniPodaci = JSON.parse(ajax.responseText);
				Kalendar.ucitajPodatke(ucitaniPodaci.vanredna,ucitaniPodaci.periodicna);
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

	return {
		ucitajPodatke: ucitajPodatkeImpl,
		ucitajSlike: ucitajSlikeImpl
	}
}
())
;