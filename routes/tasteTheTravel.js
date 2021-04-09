

const uuidv1 = require('uuid/v1');

const Countries = require('../models/Countries');
const Dish = require('../models/Dish')
const ShareTaste = require('../models/ShareTaste')

module.exports = app =>{





    app.get('/api/countries/:region',function (req,res) {


         Countries.find({'regionTitle':req.params.region},function (err,countries) {
             if(err){
                 console.log(err);
             }
             res.send(countries)
         })
    })

    app.get('/api/taste/all',function (req,res) {

        Dish.find({},function (err,dishes) {
            if(err){
                console.log(err);
            }
            res.send(dishes)
        })


    })

    app.post('/api/taste/share',function (req,res) {
        const len = req.body.data.length
        let shareTest = new ShareTaste({
            id: uuidv1(),
            data:req.body.data.splice(len-5,len)

        })


        shareTest.save(function(err, share) {
            if (err) {
                res.send({ err: true ,success:null })
            }

            res.send({ success: true, err:null,id:share.id});
        });

    })


    app.get('/api/taste/share/:id',function (req,res) {

        ShareTaste.findOne({'id':req.params.id},function (err,dishes) {
            if(err){
                console.log(err);
            }
            res.send(dishes)
        })


    })







}