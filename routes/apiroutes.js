const router = require(`express`).Router();
const fs = require(`fs`)
const util = require('util');
const { v4: uuidv4 } = require(`uuid`);

const readFromFile = util.promisify(fs.readFile);



router.get('/notes', (req, res) =>
  {readFromFile(`./db/db.json`, `utf8`).then(data => {res.json(JSON.parse(data))})
}
);

router.post('/notes', (req, res) =>
  {
      // gives the notes a unique ID in db.json
      const { title, text } = req.body
      const note = {
          title,
          text,
          id: uuidv4(),
      }
      // reading content of the db file than giving it a variable.
    readFromFile(`./db/db.json`, `utf8`).then(data => {
        const parsedData = JSON.parse(data);
        parsedData.push(note);
        fs.writeFile(`./db/db.json`, JSON.stringify(parsedData, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written`)
  );
    })
res.json(req.body)}
);

module.exports = router;