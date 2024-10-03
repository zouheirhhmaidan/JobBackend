const JobsModel = require("../Models/JobsModel");

var JobsRoute = function (app) {
  app.post("/jobs", (req, res) => {
    JobsModel.createJob(req.body, (error, result) => {
      if (error) return res.status(400).send(error);
      res.send(result);
    });
  });
  app.get("/jobs", (req, res) => {
    JobsModel.getJobs((error, result) => {
      if (error) return res.status(400).send(error);
      res.send(result);
    });
  });
};

module.exports = JobsRoute;
