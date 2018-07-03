//File: routes/cervecerias.js
module.exports = function(app) {

  var Cerveceria = require('../models/cervecerias.js');

  //GET - Return all tvshows in the DB
  findAllCervecerias = function(req, res) {
  	Cerveceria.find(function(err, cervecerias) {
  		if(!err) {
        console.log('GET /cervecerias')
  			res.send(cervecerias);
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});
  };

  //GET - Return a Cerveceria with specified ID
  findById = function(req, res) {
  	Cerveceria.findById(req.params.id, function(err, cervecerias) {
  		if(!err) {
        console.log('GET /cerveceria/' + req.params.id);
  			res.send(cervecerias);
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});
  };

  //GET - Return a Cerveceria with specified ID
  findBySlug = function(req, res) {
   Cerveceria.find({slug: req.params.slug}, function(err, cervecerias) {
     if(!err) {
        console.log('GET /cerveceria/' + req.params.slug);
       res.send(cervecerias);
     } else {
       console.log('ERROR: ' + err);
     }
   });
  };

  //POST - Insert a new TVShow in the DB
  addCerveceria = function(req, res) {
  	console.log('POST');
  	console.log(req.body);

  	var cerveceria = new Cerveceria({
  		id:    req.body.id,
      slug: req.body.slug,
  		nombreCer: 	  req.body.nombreCer,
  		ubicacionCer:  req.body.ubicacionCer,
  		urlImagenCer:   req.body.urlImagenCer,
  		promBebCer:  req.body.promBebCer,
  		promComCer:    req.body.promComCer,
      lat:  req.body.lat,
      lng:  req.body.lng,

  	});

  	cerveceria.save(function(err) {
  		if(!err) {
  			console.log('Created');
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});

  	res.send(cerveceria);
  };

  //PUT - Update a register already exists
  updateCerveceria = function(req, res) {
  	Cerveceria.findById(req.params.id, function(err, cerveceria) {
  		cerveceria.id   = req.body.id;
  		cerveceria.slug    = req.body.slug;
  		cerveceria.nombreCer = req.body.nombreCer;
  		cerveceria.ubicacionCer  = req.body.ubicacionCer;
  		cerveceria.urlImagenCer = req.body.urlImagenCer;
  		cerveceria.promBebCer   = req.body.promBebCer;
  		cerveceria.promComCer = req.body.promComCer;
      cerveceria.lat   = req.body.lat;
  		cerveceria.lng   = req.body.lng;
  		cerveceria.save(function(err) {
  			if(!err) {
  				console.log('Updated');
  			} else {
  				console.log('ERROR: ' + err);
  			}
  			res.send(cerveceria);
  		});
  	});
  }

  //DELETE - Delete a Cerveceria with specified ID
  deleteCerveceria = function(req, res) {
  	Cerveceria.findById(req.params.id, function(err, cerveceria) {
  		cerveceria.remove(function(err) {
  			if(!err) {
  				console.log('Removed');
  			} else {
  				console.log('ERROR: ' + err);
  			}
  		})
  	});
  }

  //Link routes and functions
  app.get('/cervecerias', findAllCervecerias);
  app.get('/cerveceria/:slug', findBySlug);
  app.post('/cerveceria', addCerveceria);
  app.put('/cerveceria/:id', updateCerveceria);
  app.delete('/cerveceria/:id', deleteCerveceria);

}
