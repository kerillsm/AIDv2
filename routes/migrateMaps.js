const uuidv1 = require('uuid/v1');

const Smap = require('../models/Smap');
const Map = require('../models/Map')

module.exports = app => {
    app.get('/api/migration/:category', function(req, res) {

        let category = req.params.category.toLowerCase();
        Smap.find({category:category}, function (err, category) {
            if (err) return console.error(err);

            const lastItem = category.length-1;

            let value = () => {
                let rand = Math.random()*lastItem;

                let floor =  Math.floor(rand)
                return floor
            }

            const data = [category[value()],category[value()],category[value()],category[value()],category[value()],category[value()],category[value()],category[value()],category[value()],category[value()]]
            const result = data.filter(item=>item !== null)

            res.send(result.includes(undefined) === true ? []: data|| {error: 'file not found'});
        }).limit(100).lean()
    })

    app.get('/api/publicMaps/smaps', function(req, res) {

        Map.find({private:false}, function (err, map) {
            if (err) return console.error(err);

            //console.log(map);

            res.send(map.filter(item=>item.start).reverse().splice(0,10));
        })
    })

    app.get('/api/testMaps/:category', function(req, res) {

        //console.log(req.params)

        let category = req.params.category.toLowerCase();
        Smap.find({category:category}, function (err, category) {
            if (err) return console.error(err);

            const lastItem = category.length-1;
            const result = category.filter(item=>item !== null)

            res.send(result);
        }).limit(10).lean()
    })

}