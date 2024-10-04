# JobBackend

Description of this project:

1 - To run the server, kindly run "npm install" and "npm start"
2 - It will run on port 7001
3- The following are what i have used to complete the backend of the jobs task: - Express js - Env file to store secret keys - jobsData.json to sotre the data instead of a database as requested

app.js: Main file of the applicaiton

JobsModel.js: The file where all the functions are defined
JobsRoute.js: The file that define the route that we call which runs a certain funciton

The following funcitons are implemented to complete the task:

    - readJobsFromFile: reads the data that is stored in the jobsData.json and returns it

    - writeJobsToFile: writes the data that is passed to it into the mentioned file

    - createJob: function that receives data in the body and passes it to the writeJobsToFile as a parameter to write it in the file, then it calls the getImage function to retrieve a random image from unsplash api which is delayed between 5 seconds and 5 minutes randomly

    - getImage: retrieves a random image from unsplash, then it gets the jobs from the file by passing the id of the job so it stores the image and change the status to resolved if success

    - getJobs: retrieves all the jobs from the file

    - getJobById: retrieves from the file the job  which contains a certain id passed to the funciton

    NOTE:

    - time spent on the application (backend): around 1 hour and few minutes including debugging

    Thanks for your time!
    Zouheir Hmaidan
