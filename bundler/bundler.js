const fs = require('fs');
const path = require('path');


const Bundler = {};

Bundler.bundle = function(req,res, next) {
  //find files to bundle
  fs.readdir(path.join(__dirname, '../templates'), (err, files) => {
    if (err) throw err;

    //create server.js file with routes to each html page
    serverText =  "const express = require('express'); \nconst fs = require('fs');\nconst path = require('path'); \nconst app = express(); \n\n"

    for(var i in files) {
      serverText += `app.get('/${files[i].replace()}')`
    }

    fs.writeFile(path.join(__dirname, '../templates/server.js'), serverText, (err) => {
      if (err) throw err;
      console.log('done');
    })


    next();
  });
};

module.exports = Bundler;
