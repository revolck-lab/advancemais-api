const express = require("express");
const courseController = require("../../course/controllers/courseController");

const router = express.Router();

router.get("/course/:id", courseController.getCourseDetails);
router.get('/course', courseController.getCourses);
router.post("/course", courseController.createCourse);

module.exports = router;
