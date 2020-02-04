const mongoose = require('mongoose');
const Schemas = require('./modelSchemas');


exports.DepartmentModel = mongoose.model('DepartmentModel', Schemas.DepSchema);

