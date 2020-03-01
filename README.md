# CanBeTheObjectIdentify  :boom:
## Description

We wanted to do a game in which the people have an approcha with image classification. People can put different objects to the webcam and check if is detect or not. 

## Authors 

- [Diego Riveros](https://dfriveros11.github.io/DiegoRiverosWebPage/)  :man:
- [Laura Pardo](https://laupardo.github.io/index.html)   :girl:

## Check the page  :sunglasses:
[Link]()

## Deployment
To deploy the page locally, it's neccesary to clone or download the repository. To run this repository is neccesary to install npm and yarn. Then, run the following command:

```
 yarn add mongodb
```
Almost there!!! Now, you need to have a Mongo database to connect.

### Windows

### Ubuntu
You can dowload docker for [here](https://docs.docker.com/install/linux/docker-ce/ubuntu/).
After dowloaning docker, run the next command:
```
docker run -d --name some-mongo -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=mongoadmin -e MONGO_INITDB_ROOT_PASSWORD=secret mongo:4.0.4
```
If you want to check mongo shell in the docker image, just run in the console : 
```
docker run -it --rm --link some-mongo:mongo mongo mongo --host mongo -u mongoadmin -p secret --authenticationDatabase admin some-db
```
Before running the project, remember to set the variables by running the next commands: 
```
export MONGO_USER=mongoadmin
export MONGO_PWD=secret
```
Now, all you have to do, is to be inside the CanBeTheObjectIdentify folder and run: 
```
yarn start
```

## GIF

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
