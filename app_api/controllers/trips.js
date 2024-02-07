const mongoose = require('mongoose');
const model = mongoose.model('trips');

// GET: /trips - list all the trips
const tripsList = async (req,res) => {
    model
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

module.exports = {
    tripsList
};