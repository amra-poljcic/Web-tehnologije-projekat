var kalendar = document.getElementById('tabelaKalendar');
var datum = new Date();
var mjesec = datum.getMonth();   

window.onload = function(){
	Kalendar.iscrtajKalendar(kalendar, mjesec);
	Pozivi.ucitajPodatke();
}

function Sljedeci() {
	if (mjesec < 11) {
		mjesec++;
		Kalendar.iscrtajKalendar(kalendar, mjesec);
		osvjeziSale();
	}
	document.getElementById("sljedeci").disabled=true;
}

function brisi(kalendar) {
	var brojRedova = kalendar.rows.length;
	for (var i = 0; i < brojRedova - 1; i++)
		kalendar.deleteRow(1);
}

function Prethodni() {
	if (mjesec > 0) {
		mjesec--;
		Kalendar.iscrtajKalendar(kalendar, mjesec);
		osvjeziSale();
	}
    document.getElementById("prethodni").disabled=true;
}

function osvjeziSale() {
	var a = document.getElementById("listaSala").value;
	var b = document.getElementById("pocetak").value;
	var c = document.getElementById("kraj").value;
	Kalendar.obojiZauzeca(kalendar,mjesec,a,b,c);
}