const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const urlExist = require("url-exist");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: true}));

app.use(express.static('staticFiles'));

app.get('/', function (req, res) {
	res.sendFile(__dirname + "/pocetna.html");
});

app.get('/pocetna.html', function (req, res) {
	res.sendFile(__dirname + "/pocetna.html");
});

app.get('/sale.html', function (req, res) {
	res.sendFile(__dirname + "/sale.html");
});

app.get('/unos.html', function (req, res) {
	res.sendFile(__dirname + "/unos.html");
});

app.get('/rezervacija.html', function (req, res) {
	res.sendFile(__dirname + "/rezervacija.html");
});

app.get('/ucitajPodatke', function (req, res) {
	res.sendFile(__dirname + "/zauzeca.json");
});

app.get('/ucitajSlike', function (req, res) {
	var brojac = parseInt(req.query.brojac);
	var slika1 = brojac+1;
	var slika2 = brojac+2;
	var slika3 = brojac+3;
	var image1;
	var image2;
	var image3;
	(async () => {
		const exist1 = await urlExist("http://localhost:8080/slika" +slika1+ ".jpg");
		const exist2 = await urlExist("http://localhost:8080/slika" +slika2+ ".jpg");
		const exist3 = await urlExist("http://localhost:8080/slika" +slika3+ ".jpg");
		if(exist1) image1 = "http://localhost:8080/slika" +slika1+ ".jpg"; 
		else image1 = null;
		if(exist2) image2 = "http://localhost:8080/slika" +slika2+ ".jpg";
		else image2 = null;
		if(exist3) image3 = "http://localhost:8080/slika" +slika3+ ".jpg";
		else image3 = null;
		res.send([image1,image2,image3]);
	})();
});

app.post('/vanredniRezervisi',function(req, res) {
	var primljeno = req.body;
	fs.readFile('zauzeca.json', (err, data) => {
		if (err) throw err;
		var zauzeca = JSON.parse(data);
		var dan;
		var mjesec;
		if(parseInt(primljeno["dan"])<10) dan = "0"+primljeno["dan"];
		else dan = primljeno["dan"];
		if(parseInt(primljeno["mjesec"])<10) mjesec = "0"+primljeno["mjesec"];
		else mjesec = primljeno["mjesec"];
		var datum;
		datum = dan +"." + mjesec + "." + primljeno["godina"];
		var sala = primljeno["sala"];
		for(var i =0; i<zauzeca.vanredna.length; i++){
			if(zauzeca.vanredna[i].datum == datum){
				if(zauzeca.vanredna[i].naziv == sala) {
					if(provjeriVrijeme(primljeno["pocetak"], primljeno["kraj"], zauzeca.vanredna[i].pocetak, zauzeca.vanredna[i].kraj)) {
						res.status(500).send({ error: "Nemoguca rezervacija, zauzet termin" });
						return;
					}
				}
			}	
		}
		zauzeca.vanredna.push({"datum": datum,"pocetak": primljeno["pocetak"],"kraj": primljeno["kraj"],"naziv": sala,"predavac": primljeno["predavac"]});
		fs.writeFile('zauzeca.json', JSON.stringify(zauzeca), function (err) {
			if (err) throw err;
			res.send(zauzeca);
		});
		
	});
});

app.post('/periodicniRezervisi',function(req, res) {
	var primljeno = req.body;
	fs.readFile('zauzeca.json', (err, data) => {
		if (err) throw err;
		var zauzeca = JSON.parse(data);
		var sala = primljeno["sala"];
		for(var i =0; i<zauzeca.periodicna.length; i++){
			if(zauzeca.periodicna[i].semestar == primljeno["semestar"] && zauzeca.periodicna[i].dan == primljeno["danUSedmici"] ){
				if(zauzeca.periodicna[i].naziv == sala) {
					if(provjeriVrijeme(primljeno["pocetak"], primljeno["kraj"], zauzeca.periodicna[i].pocetak, zauzeca.periodicna[i].kraj)) {
						res.status(500).send({ error: "Nemoguca rezervacija, zauzet termin" });
						return;
					}
				}
			}	
		}
		zauzeca.periodicna.push({"dan": primljeno["danUSedmici"],"semestar":primljeno["semestar"],"pocetak": primljeno["pocetak"],"kraj": primljeno["kraj"],"naziv": sala,"predavac": primljeno["predavac"]});
		fs.writeFile('zauzeca.json', JSON.stringify(zauzeca), function (err) {
			if (err) throw err;
			res.send(zauzeca);
		});
	});
});


function provjeriVrijeme(x1, x2, y1, y2) {
	var dPocetak = new Date(2019,1,1, parseInt(x1[0] + x1[1]), parseInt(x1[3] + x1[4]));
	var dKraj = new Date(2019,1,1, parseInt(x2[0] + x2[1]), parseInt(x2[3] + x2[4]));
	var d2Pocetak = new Date(2019,1,1, parseInt(y1[0] + y1[1]), parseInt(y1[3] + y1[4]));
	var d2Kraj = new Date(2019,1,1, parseInt(y2[0] + y2[1]), parseInt(y2[3] + y2[4]));
	return dPocetak.getTime() <= d2Kraj.getTime() && d2Pocetak.getTime() <= dKraj.getTime();
}

app.listen(8080);