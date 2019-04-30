const models = require('../models');

const Workout = models.Workout;
const Stats = models.Stats;

const makerPage = (req, res) => {
  Workout.WorkoutModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }

    return res.render('app', { csrfToken: req.csrfToken(), workouts: docs });
  });
};

const makeWorkout = (req, res) => {
  if (!req.body.name || !req.body.sets || !req.body.reps) {
    return res.status(400).json({ error: 'RAWR! both name and age required' });
  }

  const workoutData = {
    name: req.body.name,
    sets: req.body.sets,
    reps: req.body.reps,
    owner: req.session.account._id,
  };

  const newWorkout = new Workout.WorkoutModel(workoutData);

  const workoutPromise = newWorkout.save();

  workoutPromise.then(() => res.json({ redirect: '/maker' }));

  workoutPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Workout already exists' });
    }

    return res.status(400).json({ error: 'An error occured' });
  });

  return workoutPromise;
};

const getWorkouts = (request, response) => {
  const req = request;
  const res = response;

  return Workout.WorkoutModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.json({ workouts: docs });
  });
};

const userPage = (req, res) => {
  Stats.StatsModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }

    return res.render('user', { csrfToken: req.csrfToken(), stats: docs }); // domos
  });
};


module.exports.make = makeWorkout;
module.exports.makerPage = makerPage;
module.exports.getWorkouts = getWorkouts;
module.exports.userPage = userPage;
