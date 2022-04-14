# Ciao Tours EMS

In order to startup this project, you must follow these steps:

# 1. Estabish a connection with a mysql workbench

a. Create a new database called ciao_tours_ems
b. This must be done manually so the backend can find the schema

# 2. Run CiaoToursEmsApplication in the ciao-tours-backend project

a. This is found under main > java > com.sait.ciaoToursEMS

# 3. Back in mysql workbench, you should see tables that were created in ciao_tours_ems schema

a. Run the script called startup.sql located in the same directory you found this; this will create the rows necessary to run the system properly

# 4. You need to create an HTTP POST request to the signup endpoint, this can be done on the terminal, or any other way you know how

a. We recommend using Postman to do this
b. The endpoint is the following: http://localhost:8080/api/auth/signup
note: the default port is 8080, if yours is different, include this change in the endpoint
c. The json file to include is found in the same directory called openingadmin.json

# 5. In your local terminal, navigate to the directory that holds the frontend project

a. The first time you run a react project, you must install code for packages
npm install
b. once the install is complete, you can start the project
npm start

# 6. A window should appear in your browser with the login screen of our application.

a. The POST request made (step 4) will have created an admin account with the username 'admin' and password of 'password'. Log in using these credidentials and you will be able to log in and start using the system as an administrator.
