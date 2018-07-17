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
  	Cerveceria.findById(req.params._id, function(err, cervecerias) {
  		if(!err) {
        console.log('GET /cerveceria/' + req.params._id);
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

  //PUT - Agrega comentario en una cerveceria y calcula el promedio
  updateComentarios = function(req, res) {
    Cerveceria.findById(req.params.id, function(err, cerveceria) {

      let Comentario = function(
        nombreUsuario,
        comentarioUsuario,
        puntajeBebidaUsuario,
        puntajeComidaUsuario
      ){
        this.nombreUsuario = nombreUsuario;
        this.comentarioUsuario = comentarioUsuario;
        this.puntajeBebidaUsuario = puntajeBebidaUsuario;
        this.puntajeComidaUsuario = puntajeComidaUsuario;
      };

      let comentario = new Comentario(
        req.body.nombreUsuario,
        req.body.comentarioUsuario,
        req.body.puntajeBebidaUsuario,
        req.body.puntajeComidaUsuario
      );
      cerveceria.comentarios.push(comentario);

      let promedioBebida = 0;
      let promedioComida = 0;
      let cantCervecerias = 0;
      for (cantCervecerias; cantCervecerias < cerveceria.comentarios.length; cantCervecerias++) {
        promedioBebida += Number(cerveceria.comentarios[cantCervecerias].puntajeBebidaUsuario);
        promedioComida += Number(cerveceria.comentarios[cantCervecerias].puntajeComidaUsuario);
      }
      cerveceria.promBebCer  = promedioBebida / cantCervecerias;
      cerveceria.promComCer  = promedioComida / cantCervecerias;

      cerveceria.save(function(err) {
        if(!err) {
          console.log('Comentario Agregado!');
        } else {
          console.log('ERROR: ' + err);
        }
        res.send(cerveceria);
      });

    });
  }

  comentariosCerveceria = function(req, res) {
  	Cerveceria.findById(req.params._id, function(err, comentarios) {
  		if(!err) {
        console.log('GET /cerveceria/' + req.params._id + '/comentarios');
  			res.send(comentarios.comentarios);
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});
  };

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
  app.get('/cervecerias', findAllCervecerias); //Trae todas las servecerias
  app.get('/cerveceria/:slug', findBySlug); //Trae una cerveceria por slug
  app.get('/cerveceria/id/:_id', findById); //Trae una cerveceria por id
  app.post('/cerveceria', addCerveceria); //Agrega una cerveceria
  app.put('/cerveceria/:id', updateCerveceria); //Actualiza una cerveceria
  app.get('/cerveceria/comentarios/:_id', comentariosCerveceria); //Trae todos los comentarios de una cerveceria
  app.put('/cerveceria/comentario/add/:id', updateComentarios); //Agrega un comentario a una cerveceria
  app.delete('/cerveceria/:id', deleteCerveceria); //Elimina una cerveceria

}
