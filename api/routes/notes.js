const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Note = require('../models/notemodel');


router.get('/', (req, res, next) => {
   Note.find()
   .exec()
   .then(docs => {
       console.log(docs);
       if (docs.length >= 0) {
        res.status(200).json(docs);

       }else{
           res.status(404).json({
               message: "No entries found"
           });
       }
      
   })
   .catch(error => {
       console.log(error);
       res.status(500).json({
           message: error
       });

   });
  
});



router.post('/', (req, res, next) => {

    const note = new Note({
        _id: new mongoose.Types.ObjectId,
        title: req.body.title,
        contents: req.body.contents
    });
    note.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: "handling post requests",
            createdNote: note
        });
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: error
        });
    

    });
});

router.get('/:id', (req, res, next) => {
    const ttle = req.params.id;
    Note.findById(ttle).exec().then(doc => {
        console.log("FROM DATABASE: ", doc);
        if(doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({message: "Requested entry not found"});

        }
        
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({error: error});
    });
  
});

router.patch('/:id', (req, res, next) => {
    const ttle = req.params.id;
    const updateOps = {};
    for(const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Note.update({ _id: ttle}, { $set: updateOps })
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: error
        });
    });
});

router.delete('/:id', (req, res, next) => {
   const ttle = req.params.id;
   Note.remove({_id: ttle}).exec()
   .then(result => {
       res.status(200).json(result);

   })
   .catch(error => {
       console.log(error);
       res.status(500).json({
           message: error
       });

   });
});

module.exports = router;