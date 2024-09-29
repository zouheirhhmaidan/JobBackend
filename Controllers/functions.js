const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const jobsFilePath = path.join(__dirname, "../JobsData.json");

const readJobsFromFile = () => {
  try {
    const data = fs.readFileSync(jobsFilePath, "utf8");
    if (data) {
      console.log("jobs:", data);
      return JSON.parse(data);
    } else {
      console.log("no");
      return;
    }
  } catch (err) {
    console.error("Error reading file:", err);
    return [];
  }
};

const writeJobsToFile = (jobs) => {
  try {
    fs.writeFileSync(
      jobsFilePath,
      JSON.stringify(jobs),
      "utf8",
      (result, error) => {
        if (error) {
          console.log("error");
        } else {
          console.log(result);
        }
      }
    );
  } catch (err) {
    console.error("Error writing to file:", err);
  }
};

const createJob = async (req, res) => {
  try {
    const jobs = readJobsFromFile();

    let data = { ...req.body, id: uuidv4() };
    jobs.push(data);
    await writeJobsToFile(jobs);

    res.status(200).send({ id: data.id });
  } catch (err) {
    console.log(err.message);
  }
};

const getJobById = async (req, res) => {
  try {
    console.log(req.params.id);
    let jobs = readJobsFromFile();
    let data = jobs.find((e) => e.id === req.params.id);
    res.status(200).send(data);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

module.exports = { createJob, getJobById };
