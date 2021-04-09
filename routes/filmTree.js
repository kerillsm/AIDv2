const uuidv1 = require('uuid/v1');

const FilmHelper = require('../models/FilmHelper');
const MoviesTree = require('../models/MoviesTree');
const SavedMoviesTree = require('../models/SavedMoviesTree');

const BooksHelper = require('../models/BookHelper');
const BooksTree = require('../models/BooksTree');
const SavedBooksTree = require('../models/SavedBooksTree');

module.exports = app => {
    app.get('/api/listOfFilms', function(req, res) {

        FilmHelper.find({}, function (err, film) {
            if (err) return console.error(err);
            console.log('name',req.body);

            res.send(film || {error: 'file not found'});
        })
    })

    app.post('/api2/savedMovieTree/delete/delete',function (req,res) {

        const body = req.body
        console.log('id',body);
        SavedMoviesTree.findOneAndRemove({ id: body.id }, function (err,tree) {
            console.log('Tree',tree);

            if (err) {
                res.send({ err: 'Something went wrong, Decision is not deleted' ,success:null,status:false })
            }

            res.send({ success: "Your Tree has been successfully deleted",err:null,status:true });
        })
    })


    app.get('/api/movieTree/:id',function (req,res) {
        MoviesTree.findOne({id:req.params.id}, function (err, film) {
            if (err) return console.error(err);
            res.send(film || {error: 'file not found'});
        })
    })

    app.get('/api/movieTree/saved/:user',function (req,res) {
        SavedMoviesTree.find({owner:req.params.user}, function (err, film) {
            if (err) return console.error(err);
            SavedBooksTree.find({owner:req.params.user}, function (err, book) {
                if (err) return console.error(err);
                res.send([...film,...book] || {error: 'file not found'});
            })
        })
    })



    app.post('/api/movieTree/save', function(req, res) {
        const obj = req.body;
        console.log(obj.title);
        let newMoviesTree = new SavedMoviesTree({
            id:uuidv1(),
            routeId: obj.routeId,
            title: obj.title,
            owner: obj.username,
            date:Date.now(),
            type:obj.type,
            public:obj.publicStatus


        })

        newMoviesTree.save(function(err, tree) {
            if (err) {
                console.error(err);
                return res.send({ err: true ,success:null })
            }

            return res.send({ success: `${obj.title} Tree was saved`, err:null,id:tree.id});
        });

    })

    app.post('/api/movieTree/updatePublicStatus',function (req,res) {
        console.log(req.body);

        let query = {'id':req.body.id};


        SavedMoviesTree.findOneAndUpdate(query, {
            '$set': {
                'public':true
            }
        }, {new:true}, function(err, map){
            console.log('ERR',map);

            res.send({success: `${map.title} Tree was saved` });
        });

    })





    app.get('/api/savedMovieTree/:id',function (req,res) {
        SavedMoviesTree.findOne({id:req.params.id}, function (err, movie) {
            if (err) return console.error(err);
            ;
            MoviesTree.findOne({id:movie.routeId}, function (err, film) {
                if (err) return console.error(err);
                res.send({dataFilm:film,dataUser:movie} || {error: 'file not found'});
            })
        })
    })

    //BOOKS





    app.get('/api/listOfBooks', function(req, res) {

        BooksHelper.find({}, function (err, book) {
            if (err) return console.error(err);
            console.log('name',req.body);

            res.send(book || {error: 'file not found'});
        })
    })

    app.post('/api2/savedBookTree/delete/delete',function (req,res) {

        const body = req.body
        console.log('id',body);
        SavedBooksTree.findOneAndRemove({ id: body.id }, function (err,tree) {
            console.log('Tree',tree);

            if (err) {
                res.send({ err: 'Something went wrong, Decision is not deleted' ,success:null,status:false })
            }

            res.send({ success: "Your Tree has been successfully deleted",err:null,status:true });
        })
    })


    app.get('/api/bookTree/:id',function (req,res) {
        BooksTree.findOne({id:req.params.id}, function (err, film) {
            if (err) return console.error(err);
            res.send(film || {error: 'file not found'});
        })
    })

    app.get('/api/bookTree/saved/:user',function (req,res) {
        SavedBooksTree.find({owner:req.params.user}, function (err, book) {
            if (err) return console.error(err);
            res.send(book || {error: 'file not found'});
        })
    })



    app.post('/api/bookTree/save', function(req, res) {
        const obj = req.body;
        console.log(obj.title);
        let newBooksTree = new SavedBooksTree({
            id:uuidv1(),
            routeId: obj.routeId,
            title: obj.title,
            owner: obj.username,
            type:obj.type,
            date:Date.now(),
            public:obj.publicStatus


        })

        newBooksTree.save(function(err, tree) {
            if (err) {
                console.error(err);
                return res.send({ err: true ,success:null })
            }

            return res.send({ success: `${obj.title} Tree was saved`, err:null,id:tree.id});
        });

    })

    app.post('/api/bookTree/updatePublicStatus',function (req,res) {
        console.log(req.body);

        let query = {'id':req.body.id};


        SavedBooksTree.findOneAndUpdate(query, {
            '$set': {
                'public':true
            }
        }, {new:true}, function(err, map){
            console.log('ERR',map);

            res.send({success: `${map.title} Tree was saved` });
        });

    })





    app.get('/api/savedBookTree/:id',function (req,res) {

        SavedBooksTree.findOne({id:req.params.id}, function (err, movie) {
            if (err) return console.error(err);

            BooksTree.findOne({id:movie.routeId}, function (err, film) {
                if (err) return console.error(err);
                res.send({dataFilm:film,dataUser:movie} || {error: 'file not found'});
            })
        })
    })


}

