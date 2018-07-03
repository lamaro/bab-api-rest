var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var cerveceriaSchema = new Schema({
  id:{ type: String },
  slug:{ type: String },
  nombreCer:{ type: String },
  ubicacionCer:{ type: String },
  urlImagenCer:  { type: String },
  promBebCer:   { type: String },
  promComCer:  { type: String },
	lat:  { type: String },
	lng:  { type: String }

});


module.exports = mongoose.model('Cerveceria', cerveceriaSchema);
