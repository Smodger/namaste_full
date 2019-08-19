const express = require('express');
const router = express.Router();
const checkAuth = require('../auth/check-auth.js');
const lessonController = require('../controllers/lesson.js')


router.get('/', lessonController.getAllLessons);

router.get('/:id', lessonController.showLesson);

router.post('/addLesson', checkAuth, lessonController.createLesson);

router.post('/update/:id', checkAuth, lessonController.updateLesson);

router.delete('/delete/:id', checkAuth, lessonController.deleteLesson);

module.exports = router;
