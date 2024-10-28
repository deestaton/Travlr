const express = require('express');
const router = express.Router();
const { expressjwt: jwt } = require('express-jwt');
const authController = require('../controllers/authentication');
const tripsController = require('../controllers/trips');


// Check if JWT_SECRET is configured
if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET is not configured');
    process.exit(1);
}

// JWT middleware configuration
const auth = jwt({
    secret:process.env.JWT_SECRET,
    userProperty: 'payload',
    algorithms: ["HS256"]
});

// Authentication routes
router.post('/login', authController.login);
router.post('/register', authController.register);


/* Update the routes that alter the database (add, update, and delete)
* by injecting the 'auth' middleware*/
router
    .route('/trips')
    .get(tripsController.tripsList)
    .post(auth, tripsController.tripsAddTrip);

router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(tripsController.tripsUpdateTrip)
    .delete(auth, tripsController.tripsDeleteTrip);


// Error handling middleware
router.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({
            error: 'Unauthorized',
            message: 'Invalid or missing authentication token',
        });
    } else {
        next(err);
    }
});

module.exports = router;