require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');

const db = require('./db/db');
const sequelize = db.sequelize;
const User = db.models.User;
const Acronym = db.models.Acronym;
const app = express();
const port = 3000;

// for parsing JSON-encoded req.body(ies)
app.use(bodyParser.json());

// allowing for CORS requests
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, DELETE, PATCH");
    next();
  });

// connects to Postgres and then starts up the express server
sequelize.sync({force: false}).then(() => {
	app.listen(process.env.PORT || port, () => {
	  console.log(`Server running on port ${port}`)
	})
});

// API Endpoints
app.get('/', (req, res) => {
	res.send('hello world')
	
});

app.get('/users', (req, res) => {
	User.findAll().then((users) => {
		res.send(users)
	})
});

app.post('/users', (req, res) => {
	var name = req.body.name;
	var firstName = name.split(' ')[0];
	var lastName = name.split(' ')[1];
	
	const user = User.build({
		firstName: firstName,
		lastName: lastName
	});

	user.save().then((record) => {
		res.send('User saved: ' + JSON.stringify(record));
	}).catch((err) => {
		console.log('err ' + err)
	});
});

app.get('/acronyms', (req, res) => {
	Acronym.findAll().then((acronyms) => {
		res.send(acronyms)
	})
});

app.post('/acronyms', (req, res) => {
	var abrev = req.body.abrev;
	var def = req.body.def;
	var notes = req.body.notes;

	const acronym = Acronym.build({
		abrev: abrev,
		def: def,
		notes: notes
	})

	acronym.save().then((record) => {
		res.send('Acronym saved: ' + JSON.stringify(record));
	}).catch((err) => {
		console.log('err ' + err)
	});
});

app.delete('/acronyms/:id', (req, res) => {
	const id = req.params.id;

	Acronym.findOne({
		where: { id }
	}).then((acro) => {
		acro.destroy().then((record) => {
			res.send('Record id: ' + id + ' was deleted.')
		})
	})
})