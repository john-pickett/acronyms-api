require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');

const db = require('./db/db');
const sequelize = db.sequelize;
const User = db.models.User;
const app = express();
const port = 3000;

// for parsing JSON-encoded req.body(ies)
app.use(bodyParser.json());

// connects to Postgres and then starts up the express server
sequelize.authenticate().then(() => {
	app.listen(port, () => {
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
