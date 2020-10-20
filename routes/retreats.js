const express = require('express');
const router = express.Router();
const checkAuth = require('../auth/check-auth.js');
const retreatController = require('../controllers/retreat.js');
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

router.get('/', retreatController.getAllRetreats);

router.get('/:id', retreatController.showRetreat);

router.post('/addRetreat', upload.array('retreatImages', 13), checkAuth, retreatController.addRetreat);

router.post('/update/:id', upload.single('newImage'), checkAuth, retreatController.updateRetreat);

router.delete('/delete/:id', checkAuth, retreatController.deleteRetreat);

module.exports = router;
