const router = require(`express`).Router();
const fs = require(`fs`)
const util = require('util');

const readFromFile = util.promisify(fs.readFile);



router.get('/notes', (req, res) =>
  {console.log("get")
  readFromFile(`./db/db.json`, `utf8`).then(data => {res.json(JSON.parse(data))})
}
);

router.post('/notes', (req, res) =>
  {console.log(req.body)
    readFromFile(`./db/db.json`, `utf8`).then(data => {
        const parsedData = JSON.parse(data);
        parsedData.push(req.body);
        fs.writeFile(`./db/db.json`, JSON.stringify(parsedData, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written`)
  );
    })
res.json(req.body)}
);

module.exports = router;