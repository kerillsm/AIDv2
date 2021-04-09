const uuidv1 = require('uuid/v1');

const Goal = require('../models/Goal');

module.exports = app => {
    app.get('/api/goals/:id', function(req, res) {
        var id = req.params.id.toLowerCase();
        Goal.find({id: id}, function (err, goal) {
            if (err) return console.error(err);
            res.send(goal[0] || {error: 'file not found'});
        })
    })

    app.get('/api/user/goals/:user', function(req, res) {

        Goal.find({ owner: req.params.user }, function (err, goal) {
            if (err) return console.error(err);
            res.send(goal);
        })
    })

    app.post('/api/goal/save', function(req, res) {
        var obj = req.body;
        console.log(obj)
        const id = obj.id
        let newGoal = new Goal({
            id: id===undefined?uuidv1():obj.id,
            type:'goals',
            title: obj.goal,
            owner: req.user.username,
            smart: obj.smart,
            pure: obj.pure,
            clear: obj.clear,
            end: obj.enddate,
            start: obj.date,
            public:obj.publicStatus

        })


        newGoal.save(function(err, goal) {
            if (err) {
                res.send({ err: true ,success:null })
            }

            res.send({ success: `${goal.title} Goal was saved`, err:null,id:id});
        });

    })

    app.post('/api/goal/updatePublicStatus',function (req,res) {
        console.log(req.body);

        let query = {'id':req.body.id};


        Goal.findOneAndUpdate(query, {
            '$set': {
                'public':true
            }
        }, {new:true}, function(err, map){
            console.log('ERR',map);

            res.send({success: `${map.title} Goal was saved` });
        });

    })

}

