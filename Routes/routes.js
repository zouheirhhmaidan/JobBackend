const express = require("express");
const router = express.Router();
const { createJob, getJobById } = require("../Controllers/functions");

router.post("/jobs", createJob);
router.get("/jobs/:id", getJobById);

module.exports = router;
