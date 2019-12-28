let Kalendar = ( function() {
	var stalni;
	var privremeni;

	function provjeriSemestar (semestar,mjesec) {
		if(semestar != "ljetni" && semestar != "zimski" && (mjesec <= 0 || mjesec > 12)) return false;
		if (semestar === "ljetni" && mjesec>=2 && mjesec <=6)
			return true;
		if (semestar === "zimski" && (mjesec>=10 || mjesec === 1) )
			return true;
		return false;
	}

	function provjeriMjesec (privMjesec,mjesec){
		if(mjesec <=0 || mjesec >12) return false;
		if (mjesec != 7 && mjesec != 8 && mjesec != 9 && privMjesec===mjesec) return true;
		return false;
	}

	function obojiUZelene (kalendarRef) {
		for(var i=1; i<kalendarRef.rows.length;i++){
			for(var j=0;j<=6;j++){
				kalendarRef.rows[i].cells[j].className="slobodna";
			}
		}
	}
	function provjeriVrijeme (pocetak, kraj) {

		if(pocetak === kraj || pocetak.length != 5 || kraj.length != 5) return false;
		var pocetakSati = parseInt(pocetak.substring(0,2),10);
		var krajSati = parseInt(kraj.substring(0,2),10);
		var pocetakMinute = parseInt(pocetak.substring(3,5),10);
		var krajMinute = parseInt(kraj.substring(3,5),10);
		var pocetakDvotacka = pocetak.substring(2,3);
		var krajDvotacka = kraj.substring(2,3);

		if(pocetakSati>krajSati) return false;

		if(pocetakSati === krajSati){
			if(pocetakMinute > krajMinute) return false;
		}

		if(pocetakDvotacka != ":" || krajDvotacka !=":" || pocetakSati < 0 || pocetakSati > 23 || 
			krajSati < 0 || krajSati > 23 || pocetakMinute < 0 || pocetakMinute > 59 || krajMinute < 0 || 
			krajMinute > 59) return false;

			return true;


	}

	function provjeriVrijeme2(x1, x2, y1, y2) {
		var dPocetak = new Date(2019,1,1, parseInt(x1[0] + x1[1]), parseInt(x1[3] + x1[4]));
		var dKraj = new Date(2019,1,1, parseInt(x2[0] + x2[1]), parseInt(x2[3] + x2[4]));
		var d2Pocetak = new Date(2019,1,1, parseInt(y1[0] + y1[1]), parseInt(y1[3] + y1[4]));
		var d2Kraj = new Date(2019,1,1, parseInt(y2[0] + y2[1]), parseInt(y2[3] + y2[4]));
		return dPocetak.getTime() <= d2Kraj.getTime() && d2Pocetak.getTime() <= dKraj.getTime();
	}

	function obojiZauzecaImpl (kalendarRef, mjesec, sala, pocetak, kraj) {
		obojiUZelene(kalendarRef);
		for(var i = 0; i<stalni.length; i++){
			if(provjeriVrijeme(pocetak,kraj) && provjeriVrijeme(stalni[i].pocetak,stalni[i].kraj) && sala === stalni[i].naziv && provjeriSemestar(stalni[i].semestar,mjesec+1) && 
				provjeriVrijeme2(pocetak, kraj, stalni[i].pocetak, stalni[i].kraj) ) obojiStalne(kalendarRef,stalni[i]); 
		}

	for (var i = 0; i < privremeni.length; i++) {
		var mjesecPrivremeni = parseInt(privremeni[i].datum.substring(3,5),10);
		if(provjeriVrijeme(pocetak,kraj) && sala === privremeni[i].naziv && provjeriMjesec(mjesecPrivremeni,mjesec+1) &&
			provjeriVrijeme2(pocetak, kraj, privremeni[i].pocetak, privremeni[i].kraj) ) obojiPrivremene(kalendarRef,privremeni[i]); 
	}
}
function obojiStalne(kalendarRef,termin){
	for (var i=1; i < kalendarRef.rows.length; i++) {
		kalendarRef.rows[i].cells[termin.dan].className="zauzeta";
	}
}

function provjeriInnerHtml(a,b){
	var a = parseInt(a,10);
	if(a===b) return true;
	return false;
}

function obojiPrivremene(kalendarRef,termin){
	var dan = parseInt(termin.datum.substring(0,2),10);
	for (var i=1; i < kalendarRef.rows.length; i++) {
		for (var j=0; j<= 6; j++) {
			var innerHTML = kalendarRef.rows[i].cells[j].innerHTML;
			if(provjeriInnerHtml(innerHTML,dan)) kalendarRef.rows[i].cells[j].className="zauzeta";
		}
	}
}

function ucitajPodatkeImpl (periodicna, redovna) {
	stalni = periodicna;
	privremeni = redovna;
}

function iscrtajKalendarImpl (kalendarRef, mjesec){
	brisi(kalendarRef);
	var imeMjeseci = ['Januar','Februar','Mart','April','Maj','Juni','Juli','August','Septembar','Oktobar','Novembar','Decembar'];
	var datum = new Date();
	var godina = datum.getFullYear(); 
	var brojDana = new Date(godina, mjesec+1, 0).getDate();
	var temp = new Date(godina, mjesec).toDateString();
	var prviDan = temp.substring(0, 3);    
	var imeDana = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
	var danUSedmici = imeDana.indexOf(prviDan);   
	kalendarRef.caption.innerHTML=imeMjeseci[mjesec];
	var ispisao = 1;
	var red = 1;
	for (var j = 1; j <= 7; j++) {
		var row = kalendarRef.insertRow(j);
		for (var i=0; i < 7; i++) {
			var cell = row.insertCell(i);
			if ( (i < danUSedmici && j===1 ) || ispisao > brojDana){
				cell.className="slobodna";
				cell.innerHTML="";
			}
			else {
				cell.className = "slobodna";
				cell.innerHTML = ispisao;
				cell.onclick =  function() { klikni(this); };
				ispisao++;
			}
		} 
		if (ispisao > brojDana) break;
	}
}return {
	obojiZauzeca: obojiZauzecaImpl,
	ucitajPodatke: ucitajPodatkeImpl,
	iscrtajKalendar: iscrtajKalendarImpl
}
}
())
;