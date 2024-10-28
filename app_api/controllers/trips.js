const mongoose = require('mongoose');
const Trip = mongoose.model('trips');
const User = mongoose.model('users');

// GET: /trips - list all the trips
const tripsList = async (req,res) => {
    Trip
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
        }
    );
};

// GET: /Trips/:tripCode - returns a single trip
const tripsFindByCode = async (req, res) => {
    Trip
        .find({ code: req.params.tripCode })
        .exec((err, trips) => {
            if (!trips) {
                return res
                    .status(404)
                    .json({ "message": "Trip not found" });
            } else if (err) {
                return res
                    .status(404)
                    .json(err);
            } else {
                return res
                    .status(200)
                    .json(trips);
            }
        }
    );
};

// POST
const tripsAddTrip = async (req, res) => {
    getUser(req, res,
        (req, res) => {
            Trip
                .create({
                    code: req.body.code,
                    name: req.body.name,
                    length: req.body.length,
                    start: req.body.start,
                    resort:  req.body.resort,
                    perPerson:  req.body.perPerson,
                    image:  req.body.image,
                    description:  req.body.description
                },
                (err, trip) => {
                    if (err) {
                        return res
                            .status(400) // bad request, invalid content
                            .json(err);
                    } else {
                        return res
                            .status(201) // created
                            .json(trip);
                    }
                }
            );
        }
    );
};

// PUT
const tripsUpdateTrip = async (req, res) => {
    getUser(req, res,
        (req, res) => {
            Trip
                .findOneAndUpdate({ code: req.params.tripCode }, {
                    code: req.body.code,
                    name: req.body.name,
                    length: req.body.length,
                    start: req.body.start,
                    resort: req.body.resort,
                    perPerson: req.body.perPerson,
                    image: req.body.image,
                    description: req.body.description
                }, { new: true })
                .then(trip => {
                    if (!trip) {
                        return res
                            .status(404)
                            .send({
                                message: "Trip not found with code " + req.params.tripCode
                            });
                    }
                    res.send(trip);
                }).catch(err => {
                    if (err.kind === 'ObjectId') {
                        return res
                            .status(404)
                            .send({
                                message: "Trip not found with code " + req.params.tripCode
                            });
                    }
                    return res
                        .status(500) // server error
                        .json(err);
                }
            );
        }
    );
}

// Delete
const tripsDeleteTrip = async (req, res) => {
    console.log(req.params.tripCode);
    Trip
        .findOneAndRemove({ code: req.params.tripCode }, {
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        })
        .then(trip => {
            if (!trip) {
                return res
                    .status(404)
                    .send({
                        message: "Trip not found with code " + req.params.tripCode
                    });
            }
            res.send(trip);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res
                    .status(404)
                    .send({
                        message: "Trip not found with code " + req.params.tripCode
                    });
            }
            return res
                .status(500) // server error
                .json(err);
        }
    );
}

const getUser = (req, res, callback) => {
    if (req.auth && req.auth.email) {
        User.findOne({ email: req.auth.email }).exec((err, user) => {
            if (!user) {
                return res.status(404).json({ message: "User not found1" });
            } else if (err) {
                console.log(err);
                return res.status(404).json(err);
            }
            callback(req, res, user.name);
        });
    } else {
        return res.status(404).json({ message: "User not found2" });
    }
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip,
    tripsDeleteTrip,
};