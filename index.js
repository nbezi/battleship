'use strict';

var express = require('express'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),  
  session = require('express-session'),
  webpackConfig = require('./webpack.config.js'),
  webpack = require("webpack"),
  winston = require('winston'),
  Battleship = require('./lib/game');

var game = new Battleship(10);

var webpackCompiler = webpack(webpackConfig);
webpackCompiler.watch({
    aggregateTimeout: 300,
    poll: true
}, function(err, stats) {});

var app = express();
app.set('view engine', 'ejs');
app.set('view options', {layout: false});

var sessionOptions = {
	secret: 'yoppers-secret', resave: true, saveUninitialized: true,
	cookie: {expires: 366 * 24 * 60 * 60 * 1000, rolling: true}
}

app.use(session(sessionOptions));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));	

app.get('/game/:player', (req, res, next) => {
	var player = req.params.player;
	if (player != 1 && player != 2) {
		res.status(403).send("Invalid player number");
	}

	req.session.player = player;
	res.render('game');
});

app.get('/game', (req, res, next) => {
	res.json(game.getGameState(req.session.player));
});

app.put('/move', (req, res, next) => {
	res.json(game.makeMove(req.session.player, req.body.row, req.body.column));
});

app.get('/restart', (req, res, next) => {
	res.json(game.restart());
});

app.use('/static', express.static(__dirname + '/views/static/'));

app.listen(8081);
winston.info('(Express+EJS): Battlership listening on port ' + 8081);
