const uuidv1 = require('uuid/v1');

const MultiDecision = require('../models/MultiDecision');

module.exports = app =>{
    app.post('/api/procon/save', function(req, res) {
        var obj = req.body;
        console.log(obj)
        const titleArr = obj[0].map(item=>item.inputTitleValue)
        const id = uuidv1()
        if(obj[2] === null){
            let newMultiDecision = new MultiDecision({
                id: id,
                type:'procon',
                owner: obj[1],
                data:obj[0],
                start:obj[3],
                end:obj[3],
                title:titleArr.join(' vs ')
            })



            newMultiDecision.save(function(err, map) {
                if (err) {
                    res.send({ err: true ,success:null })
                }

                res.send({ success: `${titleArr.join(' vs ')} MultiDecision was saved`, err:null});
            });
        }
        else{
            console.log('update');
            let titleArr = obj[0].map(item=>item.inputTitleValue)
            let update = new MultiDecision({
                data:obj[0],
                title:titleArr.join(' vs ')
            })
            console.log('id',obj[2])
            let query = {'id':obj[2]};

            MultiDecision.findOne({'id':`${obj[2]}`}, function(err, map){
                console.log('MAP',map);
            });
            MultiDecision.findOneAndUpdate(query, {
                '$set': {
                    'data': obj[0],
                    'title': titleArr.join(' vs ')
                }
            }, {new:true}, function(err, map){
                res.send({ success: `${titleArr.join(' vs ')} MultiDecision was saved` });
            });



        }



    })

    app.get('/api/procon/:user/all',function (req,res) {

        MultiDecision.find({owner:req.params.user},function (err,procon) {
            if(err){
                console.log(err);
            }
            res.send(procon)
        })
    })

    app.post('/api/multiDecision/delete',function (req,res) {

        const body = req.body
        console.log('multiDecision id',body);
        MultiDecision.findOneAndRemove({ id: body.id }, function (err,map) {
            if (err) {
                res.send({ err: 'Something went wrong, Decision is not deleted' ,success:null,status:false })
            }

            res.send({ success: "Your Decision has been successfully deleted",err:null,status:true });
        })
    })

    app.get('/api/procon/:id',function (req,res) {

        MultiDecision.find({id:req.params.id},function (err,procon) {
            if(err){
                console.log(err);
            }
            res.send({procon})
        })
    })


}