const express = require("express");
const router = new express.Router();
const controller = require('../../controllers/apiController');

router.route('/people')
    .get(controller.people)

router.route('/planets')
    .get(controller.planets)

module.exports = router;
