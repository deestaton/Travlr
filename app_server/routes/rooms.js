var express = require('express');
var router = express.Router();
const controller = require('../controllers/rooms');

router.get("/", controller.rooms);

module.exports = router;