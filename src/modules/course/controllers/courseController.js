const courseService = require("../services/courseService");

const courseController = {
  createCourse: async (req, res) => {
    try {
      const courseData = req.body;

      const courseId = await courseService.createCourse(courseData);

      return res.status(201).json({
        message: "Course created successfully",
        courseId,
      });
    } catch (error) {
      console.error("Error in createCourse controller:", error.message);
      return res.status(500).json({
        message: "Error creating course",
        error: error.message,
      });
    }
  },

  getCourseDetails: async (req, res) => {
    try {
      const { id } = req.params;

      const courseDetails = await courseService.getCourseDetails(id);

      if (!courseDetails) {
        return res.status(404).json({
          message: "Course not found",
        });
      }

      return res.status(200).json({
        message: "Course details retrieved successfully",
        data: courseDetails,
      });
    } catch (error) {
      console.error("Error in getCourseDetails controller:", error.message);
      return res.status(500).json({
        message: "Error retrieving course details",
        error: error.message,
      });
    }
  },
};

module.exports = courseController;
