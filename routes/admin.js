const User = require('../models/User');
const Share = require('../models/Share');
const Smap = require('../models/Smap');
const Goal = require('../models/Goal');
const MultiDecision = require('../models/MultiDecision');
const DeciderLog = require('../models/DeciderLog');

module.exports = app => {
    app.get('/api/admin/userlist', function(req, res) {
        User.find({}).select('username').limit(10)
            .then(user => res.json(user))
            .catch(err => console.log(err));
    });

    app.get('/api/admin/sharelist', function(req, res) {
        Share.find({}).sort({$natural: -1}).limit(10)
            .then(item => res.json(item))
            .catch(err => console.log(err));
    });

    app.get('/api/admin/smaps', function(req, res) {
        Smap.find({}).sort({$natural: -1}).limit(10)
            .then(item => res.json(item))
            .catch(err => console.log(err))
    });

    app.get('/api/admin/goals', function(req, res) {
        Goal.find({}).sort({$natural: -1}).limit(10)
            .then(item => res.json(item))
            .catch(err => console.log(err))
    });

    app.get('/api/admin/multidecision', function(req, res) {
        MultiDecision.find({}).sort({$natural: -1}).limit(10)
            .then(item => res.json(item))
            .catch(err => console.log(err))
    });

    app.get('/api/admin/logs', function(req, res) {
        DeciderLog.find({}).sort({$natural: -1}).limit(50)
            .then(item => res.json(item))
            .catch(err => console.log(err))
    });

    app.get('/api/admin/log/:id', function(req, res) {
        const { id } = req.params;

        DeciderLog.findById(id)
            .then(item => res.json(item))
            .catch(err => console.log(err));
    })
}