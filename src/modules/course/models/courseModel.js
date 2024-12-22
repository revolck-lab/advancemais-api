const knexInstance = require("../../../config/db");

const courseImageModel = {
  create: async (courseImage) => {
    const db = await knexInstance();
    const [id] = await db("course_image").insert(courseImage);
    return id;
  },
  findById: async (id) => {
    const db = await knexInstance();
    return db("course_image").where({ id }).first();
  },
  update: async (id, courseImage) => {
    const db = await knexInstance();
    return db("course_image").where({ id }).update(courseImage);
  },
};

const courseThumbnailModel = {
  create: async (courseThumbnail) => {
    const db = await knexInstance();
    const [id] = await db("course_thumbnail").insert(courseThumbnail);
    return id;
  },
  findById: async (id) => {
    const db = await knexInstance();
    return db("course_thumbnail").where({ id }).first();
  },
  update: async (id, courseThumbnail) => {
    const db = await knexInstance();
    return db("course_thumbnail").where({ id }).update(courseThumbnail);
  },
};

const courseModel = {
  create: async (course) => {
    const db = await knexInstance();
    const [id] = await db("course").insert(course);
    return id;
  },
  findById: async (id) => {
    const db = await knexInstance();
    return db("course").where({ id }).first();
  },
  update: async (id, course) => {
    const db = await knexInstance();
    return db("course").where({ id }).update(course);
  },
  delete: async (id) => {
    const db = await knexInstance();
    return db("course").where({ id }).del();
  },
};

module.exports = {
  courseImageModel,
  courseThumbnailModel,
  courseModel,
};
