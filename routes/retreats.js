const express = require('express');
const router = express.Router();
const checkAuth = require('../auth/check-auth.js');
const retreatController = require('../controllers/retreat.js')


router.get('/', retreatController.getAllRetreats);

router.get('/:id', retreatController.showRetreat);

router.post('/addRetreat', checkAuth, retreatController.addRetreat);

router.post('/update/:id', checkAuth, retreatController.updateRetreat);

router.delete('/delete/:id', checkAuth, retreatController.deleteRetreat);

module.exports = router;
