const DeciderLog = require('../models/DeciderLog');
const GeoDict = require('../models/GeoDict');
const NameDict = require('../models/NameDict');
const JobDict = require('../models/JobDict');
const GeekDict = require('../models/GeekDict');
const StudyDict = require('../models/StudyDict');
const InvestDict = require('../models/InvestDict');
const SportDict = require('../models/SportDict');
const Dishes = require('../models/Dishes');
const MedDict = require('../models/MedDict');
const AlcoDict = require('../models/AlcoDict');
const Books = require('../models/Books');
const MusicDict = require('../models/MusicDict');
const PetDict = require('../models/PetDict');
const VacationDict = require('../models/VacationDict');
const TransportDict = require('../models/TransportDict');
const TopQuestion = require('../models/TopQuestion');
const BuyDict = require('../models/BuyDict');
const GameDict = require('../models/GameDict');
const FitDict = require('../models/FitDict');
const DietDict = require('../models/DietDict');
const SocDict = require('../models/SocDict');
const GoDict = require('../models/GoDict');
const ColorDict = require('../models/ColorDict');

const dicts = new Map([
    ['relocation', GeoDict],
    ['names', NameDict],
    ['job', JobDict],
    ['geeks', GeekDict],
    ['study', StudyDict],
    ['investment', InvestDict],
    ['sport', SportDict],
    ['health', MedDict],
    ['alco', AlcoDict],
    ['music', MusicDict],
	['pet', PetDict],
	['buy', BuyDict],
	['games', GameDict],
	['diet', DietDict],
	['fit', FitDict],
	['vacation', VacationDict],	
	['transport', TransportDict],
	['social', SocDict],
	['color', ColorDict],
	['gonogo', GoDict]
				]);

module.exports = app => {
    app.post('/api/assistant/', (req, res) => {
        var { text, domain } = req.body;

        if(dicts.get(domain)) {
            var all = [];
            dicts.get(domain).find({}, (err, item) => {
                item.map(el => {
                    if (text.toLowerCase().match(new RegExp("\\b"+el.value.toLowerCase()+"\\b", "i"))   == el.value.toLowerCase()) {
                        all.push(el)
                    }
                })
                res.json(all);
            });
        } else {
            res.json([]);
        }
    });

    app.post('/api/assistant/topquestion', (req, res) => {
        if (req.body.text) {
            var text = req.body.text.split(/[,.!?&;:/]| /);

            TopQuestion.find()
                .then(item => {
                    item.map(item => {
                        var question = item.question.split(/[,.!?&;:/]| /);
                        var sovp = 0;
                        for (var i = 0; i < question.length; i++) {
                            for (var a = 0; a < text.length; a++) {
                                if (text[a] == question[i]) {
                                    sovp++;
                            //        text[a] = '';
                                }
                            }
                        }
                        var result = 100 * sovp / text.length;

                        if (result >= 80) {
                            res.json(item);
                        } 
                    })
                    
                    res.json(false)
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).send(err)
                })
        } else {
            res.json(false);
        }
    });

    app.post('/api/assistant/all', async (req, res) => {
        var { domain, text } = req.body;
        var sovp = {};
        
        if (domain.length == 0) {
            domain =  ['relocation', 'names', 'job', 'geeks', 'study', 'investment', 'sport', 'health', 'pet', 'transport','fit','diet','games','buy','gonogo','social','color'];
        }

        try {
            await Promise.all(
                domain.map(domain => dicts.get(domain).find({}, (err, item) => {
                    var all = [];
                    item.map(el => {
                        if (text.toLowerCase().match(new RegExp("\\b"+el.value.toLowerCase()+"\\b", "i")) == el.value.toLowerCase()) {
                            console.log(text.toLowerCase().search(el.value.toLowerCase()))
                            all.push(el)
                        }
                    })
                    if (all.length > 0) {
                        sovp[domain] = all;
                    } 
                    
                }))
            )
            console.log(sovp);
            res.json(sovp);
        } catch (err) {
            console.log(err);
            res.json(err);
        }
    });

    app.post('/api/assistant/savelog', (req, res) => {
        new DeciderLog(req.body).save()
            .then(log => {
                console.log(log);
                res.end();
            })
            .catch(err => {
                console.log(err);
                res.status(500).send(err)
            })
    });
};