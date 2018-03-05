const express = require('express');
const url = require('url');
const path = require('path');
const app = express();
const port = process.env.PORT;

const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const defaultResult = { 'unix': null, 'natural': null };
let result = {};
let date;

app.get('/:time', (req, res) => {
  res.writeHead(200, {'Content-Type': 'application/json'});
  const time = req.params.time;
  if (isNaN(time)) date = new Date(time);
  else date = new Date(time * 1000);
  if (isNaN(date.getTime())) result = defaultResult;
  else result = {
    'unix': date.getTime() / 1000,
    'normal': month[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()
  }
  res.end(JSON.stringify(result));
});

app.get('*', (req, res) => {
  result = defaultResult;
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify(result));
});

app.listen(port);
