module.exports = function(appi) {
//File: controllers/cervecerias.js
var mongoose = require('mongoose');
var Cerveceria = mongoose.model('Cerveceria');

//GET - Return all cervecerias in the DB
findAllCervecerias = function(req, res) {
	Cerveceria.find(function(err, cervecerias) {
    if(err) res.send(500, err.message);

    console.log('GET /cervecerias')
		res.status(200).jsonp(cervecerias);
	});
};

//GET - Return a cerveceria with specified ID
findById = function(req, res) {
	Cerveceria.findById(req.params.id, function(err, cerveceria) {
    if(err) return res.send(500, err.message);

    console.log('GET /cerveceria/' + req.params.id);
		res.status(200).jsonp(cerveceria);
	});
};

//POST - Insert a new cerveceria in the DB
addCerveceria = function(req, res) {
	console.log('POST');
	console.log(req.body);

	var cerveceria = new Cerveceria({
		title:    req.body.title,
		year: 	  req.body.year,
		country:  req.body.country,
		poster:   req.body.poster,
		seasons:  req.body.seasons,
		genre:    req.body.genre,
		summary:  req.body.summary
	});

	cerveceria.save(function(err, cerveceria) {
		if(err) return res.send(500, err.message);
    res.status(200).jsonp(cerveceria);
	});
};

//PUT - Update a register already exists
updateCerveceria = function(req, res) {
	Cerveceria.findById(req.params.id, function(err, cerveceria) {
		cerveceria.id   = req.body.petId;
		cerveceria.nombreCer    = req.body.nombreCer;
		cerveceria.ubicacionCer = req.body.ubicacionCer;
		cerveceria.urlImagenCer  = req.body.urlImagenCer;
		cerveceria.promBebCer = req.body.promBebCer;
		cerveceria.promComCer   = req.body.promComCer;

		cerveceria.save(function(err) {
			if(err) return res.send(500, err.message);
      res.status(200).jsonp(cerveceria);
		});
	});
};

//DELETE - Delete a cerveceria with specified ID
deleteCerveceria = function(req, res) {
	Cerveceria.findById(req.params.id, function(err, cerveceria) {
		cerveceria.remove(function(err) {
			if(err) return res.send(500, err.message);
      res.status(200);
		})
	});
};
}
