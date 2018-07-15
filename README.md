# Chatty App

## About the project

One page app where users can chat live and notify when a new user is online. The number of online user is also displayed and updated everytime a new user is connected.

### Project setup

The project is running under the configuration of Webpack, Babel and the library React. Two servers are set up for running the app by using web server socket and webpack dev server.

React Boilerplate
=====================

A minimal and light dev environment for ReactJS.

### Usage

Clone the boilerplate and create your own git repo.

```
git clone git@github.com:lighthouse-labs/react-simple-boilerplate.git
cd react-simple-boilerplate
git remote rm origin
git remote add origin [YOUR NEW REPOSITORY]
# Manually update your package.json file
```

Install the dependencies and start the server.

```
npm install
npm start
open http://localhost:3000
```

Install the dependencies for web server socket and start the server.

```
npm install --save --save-exact express
npm install --save --save-exact ws
npm install -g nodemon
nodemon -L <server.js>
```

### Static Files

You can store static files like images, fonts, etc in the `build` folder.

For example, if you copy a file called my_image.png into the build folder you can access it using `http://localhost:3000/build/my_image.png`.

### Linting

This boilerplate project includes React ESLint configuration.

```
npm run lint
```

### Dependencies

* [Babel-loader](https://github.com/babel/babel-loader)
* Babel-core
* Babel-preset-es2015
* Babel-preset-react
* Css-loader
* Node-sass
* Sass-loader
* Sockjs-client
* Style-loader
* Webpack
* [Webpack-dev-server](https://github.com/webpack/webpack-dev-server)
* React
* React-dom

## App in action

#### Chat page
!["Screenshot 2018-07-15 15.12.05.png"](https://github.com/olimartin90/chatty-app/blob/master/docs/Screenshot%202018-07-15%2015.12.05.png?raw=true)

#### Chatting and Changing Users
!["Screenshot 2018-07-15 15.26.00.png"](https://github.com/olimartin90/chatty-app/blob/master/docs/Screenshot%202018-07-15%2015.26.00.png?raw=true)

