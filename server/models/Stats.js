const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('underscore');

let StatsModel = {};

// mongoose.Types.ObjectiD is a func that
// conveerts string isd to real mongo id
const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();

const StatsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },

  age: {
    type: Number,
    min: 0,
    required: true,
  },

  weight: {
    type: Number,
    min: 0,
    required: true,
  },

  height: {
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

StatsSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  age: doc.age,
  weight: doc.weight,
  height: doc.height,
});

StatsSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return StatsModel.find(search).select('name age height weight').exec(callback);
};

StatsModel = mongoose.model('Stats', StatsSchema);

module.exports.StatsModel = StatsModel;
module.exports.StatsSchema = StatsSchema;
