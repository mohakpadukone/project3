const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('underscore');

let WorkoutModel = {};

// mongoose.Types.ObjectiD is a func that
// conveerts string isd to real mongo id
const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();

const WorkoutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },

  sets: {
    type: Number,
    min: 0,
    required: true,
  },

  reps: {
    type: Number,
    min: 0,
    required: true,
  },

  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },

  createdData: {
    type: Date,
    default: Date.now,
  },
});

WorkoutSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  sets: doc.sets,
  reps: doc.reps,
});

WorkoutSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return WorkoutModel.find(search).select('name sets reps').exec(callback);
};

WorkoutModel = mongoose.model('Workout', WorkoutSchema);

module.exports.WorkoutModel = WorkoutModel;
module.exports.WorkoutSchema = WorkoutSchema;
