const express = require('express')
const router = new express.Router();

const backendroutes = require ('./backend/apiRoutes')

router.use('/api', backendroutes);

module.exports = router;