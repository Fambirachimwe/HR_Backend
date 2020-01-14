const express = require('express');
const router = express.Router();
const models = require('../models/models');



router.get('/department', (req, res, next) => {
    models.DepartmentModel.find()
    .then(response => {
        if(response){
            res.status(200).json({
                departments: response
            })
        } else{
            res.status(200).json({
                message: 'no departments added '
            })
        }
        
    })
    .catch(err =>{
        res.status(500).json({error: err})
    }); 
});


router.post('/department', (req, res, next) =>{
    const department = new models.DepartmentModel({
        name: req.body.name,
        fp: req.body.fp,
        cp: req.body.cp,
        lg: req.body.lg
    })
    .save()
    .then(dpt => {
        res.status(200).json({
            message: 'new department added',
            dpt
        });
    })
    .catch(err =>{
        res.status(500).json({error: err})
    }); 
});


router.delete('/department/:id', (req, res, next) =>{
    const id = req.params.id;
    models.DepartmentModel.findByIdAndDelete(id)
    .then(dpt =>{
        res.status(200).json({
            message: 'delete complete',
            dpt
        })
    })
    .catch(err =>{
        res.status(500).json({error: err})
    }); 
});


//updating a department
// ie a single entity or the whole document 

router.patch('/department/:id', (req, res, next) => {
    const id = req.params.id;
    models.DepartmentModel.findByIdAndUpdate(id, req.body.update, {new: true})
    .then(result => {
        if(result){
           res.status(200).json({
               message: 'update complete'
           })
        }
    }).catch(err =>{
        res.status(500).json({error: err})
    }); 
});


// filters
//fp 
router.get('/department/fp', (req, res, next) => {
    models.DepartmentModel.aggregate([
        {$group: {_id:"$fp"}}
    ]).then(result => {
        if(result.length > 0){
            res.status(200).json({
                result
            })
        }else{
            res.status(200).json({
                message: 'not fp in the model'
            });
        }
    })
});

//cp
router.get('/department/cp', (req, res, next) => {
    models.DepartmentModel.aggregate([
        {$group: {_id:"$cp"}}
    ]).then(result => {
        if(result.length > 0){
            res.status(200).json({
                result
            })
        }else{
            res.status(200).json({
                message: 'not cp in the model'
            });
        }
    })
});

//lg
router.get('/department/lg', (req, res, next) => {
    models.DepartmentModel.aggregate([
        {$group: {_id:"$lg"}}
    ]).then(result => {
        if(result.length > 0){
            res.status(200).json({
                result
            })
        }else{
            res.status(200).json({
                message: 'not lg in the model'
            });
        }
    })
});


// yearly filter 
// router.get('/department/:year', (req, res, next) => {
//     const year = req.params.year;
//     models.DepartmentModel.aggregate([
//         {$match: {$fp: "objective.actions.action.due_date" }}
//     ])
// });




module.exports = router;

