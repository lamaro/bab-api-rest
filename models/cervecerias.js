var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var cerveceriaSchema = new Schema({
  id:{ type: Number },
  slug:{ type: String },
  nombreCer:{ type: String },
  ubicacionCer:{ type: String },
  urlImagenCer:  { type: String },
  promBebCer:   { type: Number },
  promComCer:  { type: Number },
});


module.exports = mongoose.model('Cerveceria', cerveceriaSchema);