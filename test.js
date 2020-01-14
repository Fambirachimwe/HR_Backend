const mongoose = require('mongoose');
const models = require('./api/models/models')


// mongodb connection
mongoose.connect('mongodb://localhost:27017/BackendV2', {useNewUrlParser: true, useUnifiedTopology: true});

// listengin for an open even when the connection has been set
mongoose.connection.once('open', () => {
    console.log('connected');
}).on('error', (error) => {
    console.log('connection error ', error);
});



// models.DepartmentModel.findById('5e1c603e775a6e2ebc84464f')
// .then(data => {
//     const time = data.fp.objective[0].actions[0].action.due_date;

//     console.log(time.getFullYear())
    
    
    
// })

// models.DepartmentModel.aggregate([
//     {$group: {_id: "fp"}},
//     {$match: {"fp.objective.actions.action.completed": "true" }}
// ]).then(data =>{
//     console.log(data);
// })