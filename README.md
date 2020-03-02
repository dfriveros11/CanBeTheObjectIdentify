# Can Be The Object Identify?  :boom:
## Description

We wanted to do a game in which the people have an approach with image classification. People can put different objects to the webcam and check if is detect or not. 

## Authors 

- [Diego Riveros](https://dfriveros11.github.io/DiegoRiverosWebPage/)  :man:
- [Laura Pardo](https://laupardo.github.io/index.html)   :girl:

## Check the page  :sunglasses:
[Link](https://canbetheobjectidentify.herokuapp.com/)

## Prerequisites
In order to deploy the page locally, you should have the following technologies install if you don't have installed just click on the name and you will be redirected to the dowloand page:
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
![](gif.gif)
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
