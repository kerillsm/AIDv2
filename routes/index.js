var passport       = require('passport');
var LocalStrategy  = require('passport-local').Strategy;
const Map = require('../models/Map');
const Goal = require('../models/Goal');
const Tree = require('../models/Tree');
const User = require('../models/User');
const Share = require('../models/Share');
const Smap = require('../models/Smap');
const ContactUs = require('../models/ContactUs');


module.exports = app => {
     var mapsCard = {
        'slider': Map,
        'tree': Tree
     }

    var login = function(req, res, next) {
        console.log(req.body);
        passport.authenticate('local',
            function(err, user, info) {
                console.log('User',user);
                return err
                    ? res.send({error: 'Wrong',info:null,status:false})
                    : user
                        ? req.logIn(user, function(err) {
                            console.log('user',user);
                            return err
                                ? res.send({err: err,info:null,status:false})
                                : res.send({info: 'You\'ve successfully signed in!',err:null,status:true});
                        })
                        : res.send({err:info.message,info:null,status:false});
            }
        )(req, res, next);
    };

    var logout = function(req, res) {
        req.logout();
        res.redirect('/');
    };

    const register = function(req, res, next) {

        const user = new User({ username: req.body.email, password: req.body.password});
        User.findOne({ username: req.body.email }, function(err, user) {
            if (user) res.send({err: 'This login is already taken.',info:null})
        })
        console.log(user, 'AID:user!')
        user.save(function(err) {
            return err
                ? res.send({err: err,info:null})
                : res.send({info: 'Welcome',err:null})
        });
    };

    var isAuth = function (req, res, next){
        req.isAuthenticated()
            ? next()
            : res.redirect('/404');
    };

    app.post('/api/login',    login);
    app.post('/api/register', register);
    app.get('/api/logout',    logout);
    app.get('/api/islogged', function(req, res) {
        res.send({ isAuth: req.isAuthenticated() });
    })

    app.get('/api/self', function(req, res) {
        const user = req.user === undefined ? null : req.user.username
        res.send({ user });
    })

    app.get('/api/isAdmin', function(req, res) {
        const user = req.user === undefined ? null : req.user.isAdmin
        res.send({ user });
    })



    app.get('/api/user')

    app.get('/private', isAuth, function(req, res) {
        console.log('AID:user is auth');
    })




    app.get('/api/maps/:id', function(req, res) {
        var id = req.params.id.toLowerCase();
        Map.find({id: id}, function (err, map) {
            if (err) return console.error(err);
            res.send(map[0] || {error: 'file not found'});
        })
    })

    app.get('/api/smaps/:id', function(req, res) {
        var id = req.params.id.toLowerCase();
        //console.log(id);
        Smap.find({id: id}, function (err, smap) {
            if (err) return console.error(err);
            res.send(smap[0] || {error: 'file not found'});
        })
    })

    app.get('/api/goals/:id', function(req, res) {
        var id = req.params.id.toLowerCase();
        Goal.find({id: id}, function (err, goal) {
            if (err) return console.error(err);
            res.send(goal[0] || {error: 'file not found'});
        })
    })

    app.get('/api/tree/:id', function(req, res) {
        var id = req.params.id.toLowerCase();

        Tree.find({id: id}, function (err, tree) {
            if (err) return console.error(err);
            res.send(tree[0] || {error: 'file not found'});
        })
    })

    app.get('/api/user/maps/:user', function(req, res) {

        Map.find({ owner: req.params.user }, function (err, map) {
            if (err) return console.error(err);
            res.send(map);
        })
    })

    app.get('/api/publicMaps/last/:user', function(req, res) {

        Map.find({ owner: req.params.user }, function (err, map) {
            if (err) return console.error(err);
            let data = map.filter(item=>{
                return item.private === false
            }).sort((a,b)=>{
                return b.end - a.end
            })
            data.length = 5
            res.send(data);
        })
    })



    app.get('/api/user/goals/:user', function(req, res) {

        Goal.find({ owner: req.params.user }, function (err, goal) {
            if (err) return console.error(err);
            res.send(goal);
        })
    })

    app.get('/api/user/maps/all/:user', function(req, res) {

        const mapsStructure = mapsCard;
        const mapsTypes = Object.keys(mapsStructure);

        recursiveRequest(mapsTypes, []);

        function recursiveRequest(types, data) {
            if (types.length === 0) {
                res.send(data);
                return;
            }

            mapsStructure[types[0]].find({ owner: req.params.user }, function(err, maps) {
                maps.push(types[0]);
                data.push(maps);
                recursiveRequest(types.slice(1), data);
            })
        }
    })

    app.get('/api/share/:id', function(req, res) {
        var id = req.params.id.toLowerCase();

        Share.find({id: id}, function(err, share) {
            if (err) return console.error(err);
            res.send(share[0] || {error: 'file not found'});
        });
    })

    app.get('/api/maps/all/', function(req, res) {
        const allMaps = [];
        Map.find(function(err, maps) {
            allMaps.push(maps.map(function(el) {
                el.type = 'slider';
            }))
        });
        Tree.find(function(err, maps) {
            allMaps.push(maps.map(function(el) {
                el.type = 'tree';
            }))
        })
    })

    app.post('/api/share', function(req, res) {
        var obj = req.body;
        console.log(obj)
        var share = new Share({
            id: guid(),
            title: obj.title,
            cases: obj.cases,
            total: obj.total,
            results: obj.results
        })

        share.save(function(err, share) {
            res.send(share);
        })
    })

    app.post('/api/map/save', function(req, res) {
        var obj = req.body;
        // console.log(req.body);

        console.log('body',obj)
        if(obj.id === undefined){
            var newMap = new Map({
                id: guid(),
                type:'maps',
                title: obj.title,
                cases: obj.cases,
                owner: obj.owner,
                options: obj.results,
                start: Date.now(),
                end:Date.now(),
                private:obj.status
            })

            newMap.save(function(err, map) {
                if (err) {
                    res.send({ err: `Something went wrong, ${map.title} Decision is not saved` })
                }

                res.send({ success: `${map.title} Decision has been successfully saved` });
            });
        }
        else{
            Map.findOne({'id':obj.id},function (err,map) {
                console.log('Checking',map)
                if(obj.owner !== map.owner){
                    var newMap = new Map({
                        id: guid(),
                        type:'maps',
                        title: obj.title,
                        cases: obj.cases,
                        owner: obj.owner,
                        options: obj.results,
                        start: Date.now(),
                        end:Date.now(),
                        private:obj.status
                    })

                    newMap.save(function(err, map) {
                        if (err) {
                            res.send({ err: `Something went wrong, ${map.title} Decision is not saved` })
                        }

                        res.send({ success: `${map.title} Decision has been successfully saved` });
                    });
                }
                else {
                    let updateMap =  {
                        title: obj.title,
                        type:'maps',
                        cases: obj.cases,
                        owner: obj.owner,
                        options: obj.results,
                        start: Date.now(),
                        end:Date.now(),
                        private:obj.status
                    }
                    Map.findOneAndUpdate({'id':obj.id}, updateMap, {upsert:true}, function(err, map){
                        if (err) {
                            res.send({ err: `Something went wrong, ${map.title} Decision is not saved` })
                        }

                        res.send({ success: `${map.title} Decision has been successfully saved` });
                    });
                }
            })


        }

    })

    app.post('/api/map/delete',function (req,res) {

        const body = req.body
        console.log('id',body);
        Map.findOneAndRemove({ id: body.id }, function (err,map) {
            if (err) {
                res.send({ err: 'Something went wrong, Decision is not deleted' ,success:null,status:false })
            }

            res.send({ success: "Your Decision has been successfully deleted",err:null,status:true });
        })
    })



    app.post('/api/tree/save', function(req, res) {
        var obj = req.body;


        var tree = new Tree({
            id: guid(),
            type:'tree',
            title: "some pretty good title",
            edges: obj.edges,
            nodes: obj.nodes,
            owner: 'admin',
            date: new Date().toString(),
        });

        tree.save(function(err, map) {
            if (err) {
                res.send({ err: 'something went wrong, tree is not saved' })
            }

            res.send({ success: "Tree has been successfully saved" });
        });
    })

    app.post('/api/contactus', function(req, res) {
        const newMessage = {
            name: req.body.name,
            email: req.body.email,
            message: req.body.message
        };
    
        new ContactUs(newMessage).save()
            .then(message => res.json(message))
            .catch(err => console.log(err));            
    });


    app.get('/api/shares', function(req, res) {

        Share.find({}, function (err, share) {
            if (err) return console.error(err);
            const lastItem = share.length-1;

            let value = () => {
                let rand = Math.random()*lastItem;

                let floor =  Math.floor(rand)
                return floor
            }
            res.send([share[value()],share[value()],share[value()],share[value()],share[value()],share[value()],share[value()],share[value()],share[value()],share[value()]]);

        })
    })

    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }
};

