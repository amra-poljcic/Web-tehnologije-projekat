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
app.listen(8080);