const express = require("express");
const courseController = require("../../course/controllers/courseController");

const router = express.Router();

router.get("/courses/:id", courseController.getCourseDetails);
router.post("/courses", courseController.createCourse);

module.exports = router;
