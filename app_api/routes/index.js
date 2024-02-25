const express = require('express');
const router = express.Router();

const authController = require('../controllers/authentication');
const tripsController = require('../controllers/trips');

router.route('/login').post(authController.login);
router.route('/register').post(authController.register);

const { expressjwt: jwt } = require('express-jwt');
const auth = jwt({
    secret:process.env.JWT_SECRET,
    userProperty: 'payload',
    algorithms: ["HS256"]
});

/* Update the routes that alter the database (add, update, and delete)
* by injecting the 'auth' middleware*/
router
    .route('/trips')
    .get(tripsController.tripsList)
    .post(auth, tripsController.tripsAddTrip);

router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(tripsController.tripsUpdateTrip);
    // .delete(auth, tripsController.tripsDeleteTrip);

module.exports = router;