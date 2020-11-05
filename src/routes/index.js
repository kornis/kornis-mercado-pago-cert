const express = require('express');
const router = express.Router();

const indexController = require("../controllers/indexController");

/* GET home page. */
router.get('/', indexController.home);

/* GET detail page */
router.get('/detail', indexController.detail);

router.get('/success', indexController.success);
router.get('/pending', indexController.pending);
router.get('/failure', indexController.failure);

module.exports = router;
