const express = require('express');
const router = express.Router();
const checkAuth = require('../auth/check-auth.js');
const workshopController = require('../controllers/workshop.js');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  }
});

router.get('/', workshopController.getAllWorkshops);

router.get('/:id', workshopController.showWorkshop);

router.post('/addWorkshop', upload.array('image', 1), checkAuth, workshopController.createWorkshop);

router.post('/update/:id', checkAuth, workshopController.updateWorkshop);

router.delete('/delete/:id', checkAuth, workshopController.deleteWorkshop);

module.exports = router;
