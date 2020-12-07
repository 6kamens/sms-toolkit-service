const express = require('express');
const router = express.Router();
const { body , check , validationResult } = require('express-validator');

router.post('/test-validator',
    [
        body('username','it not email').isEmail(),
        body('username','it shorter').isLength({ min: 20 }),

    ]
    ,(req,res)=>{

    const error = validationResult(req);

    if(!error.isEmpty()) return res.json({status : false , message:error.array()});

    res.json({status : true , message:'ok'});
});


module.exports = router;