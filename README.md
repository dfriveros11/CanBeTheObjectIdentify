# Can Be The Object Identify?  :boom:
## Description

We wanted to do a game in which the people have an approach with image classification. People can put different objects to the webcam and check if is detect or not. 

## Authors 

- [Diego Riveros](https://dfriveros11.github.io/DiegoRiverosWebPage/)  :man:
- [Laura Pardo](https://laupardo.github.io/index.html)   :girl:

## Check the page  :sunglasses:
[Link](https://canbetheobjectidentify.herokuapp.com/)

## Prerequisites
In order to deploy the page locally, you should have the following technologies installed if you don't have installed just click on the name and you will be redirected to the dowloand page:
- [Nodejs](https://nodejs.org/es/download/)
- [Mongodb](https://www.mongodb.com/download-center/community) or [Docker](https://docs.docker.com/install/linux/docker-ce/ubuntu/)


## Deployment
Enter in the root folder of the proyect and run the following commands: 

```
 # Install dependencies for server
 yarn install
 
 # Add mongodb to yarn
 yarn add mongodb
```
Almost there!!!.

### Windows
Go to where you intsalled mongo (eg.)
```
C:\Program Files\MongoDB\Server\3.2\bin>
```
Enter command
```
mongod
```
Then, open a new cmd and set your environment variables to be the admin and password

```
SET MONGO_USER=[YOUR DB ADMIN GOES HERE]
SET MONGO_PWD=[THE PASSWORD FOR THAT ADMI GOES HERE]
```
Go to where you intsalled mongo (eg.)
```
C:\Program Files\MongoDB\Server\3.2\bin>
```
Enter command
```
mongo
```
Then open a new cmd and go to you folder where the app is and set the needed environment variables 
```
SET clientID=[HERE GOES THE CLIENT ID FOR GOOGLE AUTHENTICATION]
SET clientSecret=[HERE GOES THE SECRET FOR THE AUTHENTICATION]
SET dbURI=[HERE GOES THE URI FOR YOUR DB]
SET cookieKey=[HERE GOES YOUR COOKIE KEY]
SET GOOGLEKEY=[HERE GOES YOUR GOOGLE MAPS API KEY]

```
Then type
```
yarn start
```
Then open another tabor window for cmd and go to where the front folder is 
```
yarn start
```
### Ubuntu
Create the image to mongodb with the name some-mongo with user mongoadmin and password secret:
```
docker run -d --name some-mongo -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=mongoadmin -e MONGO_INITDB_ROOT_PASSWORD=secret mongo:4.0.4
```
If you want to check mongo shell in the docker image, just run in the console : 
```
docker run -it --rm --link some-mongo:mongo mongo mongo --host mongo -u mongoadmin -p secret --authenticationDatabase admin some-db
```
Before running the project, remember to set the variables for MONGO_USER and MONGO_PWD in this example run the next commands: 
```
export MONGO_USER=mongoadmin
export MONGO_PWD=secret
```
Now, all you have to do is to be inside the root folder of the project and run: 
```
yarn start
```

## GIF
![](https://media.giphy.com/media/hVmqHPv6Ha4ek0g44A/giphy.gif)
## Used technologies

- HTML
- CSS
- Bootsrap 
- Javascript
- TensorFlow.js
- MongoDB
- Docker

# MIT License 
This project is licensed by the MIT [License](https://github.com/dfriveros11/CanBeTheObjectIdentify/edit/master/LICENSE.md).
