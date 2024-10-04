const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const jobsFilePath = path.join(__dirname, "../JobsData.json");
const axios = require("axios").default;

function JobsModel() {}

const readJobsFromFile = () => {
  try {
    const data = fs.readFileSync(jobsFilePath, "utf8");
    if (data) {
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
    console.error("Error writing to file:", err.message);
  }
};

JobsModel.createJob = async (data, callback) => {
  try {
    const jobs = readJobsFromFile();
    let body = {
      ...data,
      id: uuidv4(),
      status: "pending",
      index: jobs.length,
    };
    jobs.push(body);

    writeJobsToFile(jobs);

    callback(null, body.id);

    getImage(body.id);
  } catch (err) {
    console.log(err);
    callback(err.message);
  }
};

const getImage = async (id) => {
  try {
    console.log(process.env.ACCESS_KEY);
    const delay = Math.floor(Math.random() * (300000 - 5000 + 1)) + 5000;

    await new Promise((resolve) => setTimeout(resolve, delay));
    const { data: requestedImage } = await axios.get(
      "https://api.unsplash.com/photos/random?query=food&pages=1",
      {
        headers: {
          Authorization: `Client-ID ${process.env.ACCESS_KEY}`,
        },
      }
    );

    if (requestedImage) {
      let jobs = readJobsFromFile();
      let index = jobs.findIndex((job) => job.id === id);
      jobs[index]["image"] = requestedImage?.urls?.small;
      jobs[index]["status"] = "Resolved";
      writeJobsToFile(jobs);
    }
  } catch (err) {
    let jobs = readJobsFromFile();
    let index = jobs.findIndex((job) => job.id === id);
    jobs[index]["image"] = "";
    jobs[index]["status"] = "Error";
    writeJobsToFile(jobs);
  }
};

JobsModel.getJobs = async (callback) => {
  try {
    let jobs = await readJobsFromFile();
    callback(null, jobs);
  } catch (err) {
    callback(err.message);
  }
};

JobsModel.getJobById = (id, callback) => {
  try {
    console.log(id);
    let jobs = readJobsFromFile();
    let data = jobs.find((e) => e.id === id);
    //   res.status(200).send({ data });
    callback(null, data);
  } catch (err) {
    callback(err.message);
  }
};

module.exports = JobsModel;
