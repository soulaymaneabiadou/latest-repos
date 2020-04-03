const express = require('express');
const { getReposByLanguages } = require('../controllers/repos');

const router = express.Router();

router.route('/').get(getReposByLanguages);

module.exports = router;
