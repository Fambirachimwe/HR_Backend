const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const actionSchema = new Schema({
    description: String,
    target: String,
    completed: {type: Boolean, default: false },
    due_date: {type: Date, default: Date.now()}
});

const keyIssueSchema = new Schema({
    name: String,
    objective: [{
        description: String,
        actions: [{action:actionSchema}] // action schema
    }],
    
});

//name
// financial perspective cusomer perspective learning and growth
// exports.DepartmentSchema = new Schema({
//     name: String,
//     fp: keyIssueSchema,
//     cp: keyIssueSchema,
//     lg: keyIssueSchema
// });


exports.DepSchema = new Schema({
    name: String,
    keyIssues: [
        {fp: keyIssueSchema},
        {cp: keyIssueSchema},
        {lg: keyIssueSchema},
       
    ]
})





