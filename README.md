# bruinplanner
An interactive application for UCLA students to help design a 4-year plan. UCLA has always struggled with presenting course requirements and requisites due to them having too many websites with unnecessary information such as outdated 4-year plans. Instead, if students had an interactive 4-year planner where they could select their major and visually see their required classes with their respective prereqs, it would save them a lot of time and pain. This website allows students to create an account that would give them access to 4-year planners based on major(s) in which they could organize their classes based on requirements.

## Setup 
Navigate to your desired directory and clone the Bruinplanner repository.
```bash
git clone https://github.com/jchangz01/bruinplanner.git
```

Create a .env file in the root directory to define the environment variables.
```bash
cd bruinplanner
touch .env
```
Add the following to the .env file.
```
SESSION_SECRET=secret
DATABASE_URL=mongodb://localhost/bruinplanner
```


**OPTIONAL**: If you would like to connect the contact page to your gmail,
add the following to the .env file in addition to the contents above 
```
CONTACT_EMAIL_ADDRESS="YOUR GMAIL ACCOUNT"
CONTACT_EMAIL_PASS="YOUR GMAIL ACCOUNT PASSWORD"
```
To ensure connection, make sure "less secure app access" is enabled on your
gmail account.


Install the dependencies for the backend. These are definined in the package.json file and will be installed into a node_modules folder.
```bash
npm install
```
Now, install the dependencies for the client. 
```bash
cd client
npm install
```

## MongoDB Installation
Bruinplanner uses a MongoDB database. If it is not installed on your system, please set it up as follows.
### MacOS
```bash
brew tap mongodb/brew
brew install mongodb-community@4.4
brew services start mongodb-community@4.4
```
### Windows
Download and install from https://www.mongodb.com/try/download/community.  
- Version: 4.4.2 (current)  
- Platform: Windows  
- Package: msi
### WSL2 (assuming you are using Ubuntu as your Linux distro)
Install the current working package of MongoDB.
```bash
sudo apt-get install mongodb
```
Set up the proper database folders and give permissions.
```bash
cd /
sudo mkdir -p data/db
sudo chown -R `id -un` data/db
```
When you are ready to run Bruinplanner, start up the local database server. It will run on the default port (27017).
```bash
mongod
```

## Running Bruinplanner
Create a production build of the application. Then start the server to launch the application locally on port 8080.
```bash
cd bruinplanner/client
npm run build 
cd ..
npm run server
```
