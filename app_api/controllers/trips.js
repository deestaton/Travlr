const mongoose = require('mongoose');
const Model = mongoose.model('trips');

// GET: /trips - list all the trips
const tripsList = async (req,res) => {
    Model
        .find({}) // empty filter returns all trips
        .exec((err, trips) => {
            if (!trips) { // If no trips are returned
                return res
                    .status(404)
                    .json({ "message": "Trips not found"});
            } else if (err) {
                return res
                    .status(404)
                    .json(err);
            } else {
                return res 
                    .status(200)
                    .json(trips);
            }
        });
};

// GET: /trips/:tripCode - returns a single trip
const tripsFindByCode = async (req, res) => {
    Model
        .find({ "code": req.params.tripCode })
        .exec((err, trip) => {
            if (!trip) {
                return res
                    .status(404)
                    .json({ "message": "trip not found" });
            } else if (err) {
                return res
                    .status(404)
                    .json(err);
            } else {
                return res
                    .status(200)
                    .json(trip);
            }
        });
};

module.exports = {
    tripsList,
    tripsFindByCode,
};