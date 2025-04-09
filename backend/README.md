To run the application in your system:

Run "npm install"

Run "node app.js" //as npm is not being used to start this application & app.js is entry point

For adding your DB, Create a .env file in the root directory.

Add variable MONGO_URI='<connection string>'

Before running make sure the post in which it is running is empty or change the port if required. It leads to a breaking change means URL needs to be changed in the React Front end.