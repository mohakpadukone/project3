const models = require('../models');

const Stats = models.Stats;

const userPage = (req, res) => {
  Stats.StatsModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }

    return res.render('user', { csrfToken: req.csrfToken(), stats: docs }); // domos
  });
};

const statsPage = (req, res) => {
  Stats.StatsModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }

    return res.render('stats', { csrfToken: req.csrfToken(), stats: docs }); // domos
  });
};

const storeStats = (req, res) => {
  if (!req.body.name || !req.body.age || !req.body.height || !req.body.weight) {
    return res.status(400).json({ error: 'RAWR! both name age required' });
  }

  const statsData = {
    name: req.body.name,
    age: req.body.age,
    weight: req.body.weight,
    height: req.body.height,
    owner: req.session.account._id,
  };

  const newStats = new Stats.StatsModel(statsData);

  const statsPromise = newStats.save();

  statsPromise.then(() => res.json({ redirect: '/maker' }));

  statsPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'stats already made' });
    }

    return res.status(400).json({ error: 'An error occured' });
  });

  return statsPromise;
};


module.exports.store = storeStats;
module.exports.statsPage = statsPage;
module.exports.userPage = userPage;
