const express = require('express');
const router = express.Router();
const checkAuth = require('../auth/check-auth.js');
const workshopController = require('../controllers/workshop.js')


router.get('/', workshopController.getAllWorkshops);

router.get('/:id', workshopController.showWorkshop);

router.post('/addWorkshop', checkAuth, workshopController.createWorkshop);

router.post('/update/:id', checkAuth, workshopController.updateWorkshop);

router.delete('/delete/:id', checkAuth, workshopController.deleteWorkshop);

module.exports = router;
