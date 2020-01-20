var kalendar = document.getElementById('tabelaKalendar');
var datum = new Date();
var mjesec = datum.getMonth(); 
var vrijemePocetak = document.getElementById("pocetak");
var vrijemeKraj = document.getElementById("kraj");  
var sala = document.getElementById("listaSala");
var tabela = document.getElementById("tabelaKalendar");
var imeMjeseci = ['Januar','Februar','Mart','April','Maj','Juni','Juli','August','Septembar','Oktobar','Novembar','Decembar'];
var periodicnost = document.getElementById("periodicnost");
var predavaci = ['Tom','MikiMaus','PajaPatak','Pepeljuga','Crvenkapica','MalaMu','Njuso','Gargamel','Snjeguljica'];

window.onload = function(){
	Kalendar.iscrtajKalendar(kalendar, mjesec);
	Pozivi.ucitajPodatke();
	Pozivi.ucitajOsoblje();
	Pozivi.ucitajSale();
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


function klikni(celija) {
	var dan = celija.innerHTML;
	var mjesec = parseInt(imeMjeseci.indexOf(tabela.caption.innerHTML)+1);
	var semestar;
	if(celija.className == "slobodna"){
		if(vrijemePocetak.value == "" || vrijemeKraj.value=="")
			alert("Odaberite vrijeme rezervacije");
		else {
			var izbor = confirm("Da li zelite rezervirati termin?");
			if(izbor) {
				if(periodicnost.checked){
					if (mjesec>=2 && mjesec <=6)
						semestar = "ljetni";
					if (mjesec>=10 || mjesec === 1)
						semestar = "zimski";	
				Pozivi.periodicniRezervisi(celija.cellIndex,semestar,dan, mjesec,datum.getFullYear(),vrijemePocetak.value,vrijemeKraj.value,sala.value,"Tom");
					
				}
				else{
				Pozivi.vanredniRezervisi(dan, mjesec,datum.getFullYear(),vrijemePocetak.value,vrijemeKraj.value,sala.value,"Tom");

				}
					
			}
		}
	}
	else 
		alert("Nije moguće rezervisati salu " + sala.value +" za navedeni datum "+ 
		dan+ "/"+ mjesec + "/" + datum.getFullYear() + " i termin od "+ vrijemePocetak.value + " do " + vrijemeKraj.value +"!");	
}

function osvjeziSale() {
	var a = document.getElementById("listaSala").value;
	var b = document.getElementById("pocetak").value;
	var c = document.getElementById("kraj").value;
	Kalendar.obojiZauzeca(kalendar,mjesec,a,b,c);
}