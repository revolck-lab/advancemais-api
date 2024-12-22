const courseImageModel = require("../models/courseImageModel");
const courseThumbnailModel = require("../models/courseThumbnailModel");
const courseModel = require("../models/courseModel");

const courseService = {
  createCourse: async (courseData) => {
    try {
      const {
        title,
        description,
        category_id,
        instructor_id,
        modality_id,
        workload,
        vacancies,
        price,
        start_time,
        end_time,
        course_image,
        course_thumbnail,
      } = courseData;

      const imageId = await courseImageModel.create(course_image);

      const thumbnailId = await courseThumbnailModel.create(course_thumbnail);

      const newCourse = {
        title,
        description,
        category_id,
        instructor_id,
        course_image_id: imageId,
        thumbnail_id: thumbnailId,
        modality_id,
        workload,
        vacancies,
        price,
        start_time,
        end_time,
      };

      const courseId = await courseModel.create(newCourse);

      return courseId;
    } catch (error) {
      console.error("Error in createCourse service:", error.message);
      throw error;
    }
  },

  getCourseDetails: async (id) => {
    try {
      const course = await courseModel.findById(id);

      if (!course) {
        return null;
      }

      const courseImage = await courseImageModel.findById(course.course_image_id);
      const courseThumbnail = await courseThumbnailModel.findById(course.thumbnail_id);

      return {
        ...course,
        course_image: courseImage,
        course_thumbnail: courseThumbnail,
      };
    } catch (error) {
      console.error("Error in getCourseDetails service:", error.message);
      throw error;
    }
  },
};

module.exports = courseService;
