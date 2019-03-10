const express = require('express');
const router = express.Router();
const Elog = require('../models/Events.js');
const Chat = require('../models/Chat.js');

router.get('/api/eventlog', function(req, res, next) {
  Elog.find((err, results)=>{
      if(err) throw err;
      res.header("Content-Type",'application/json');
      res.send(JSON.stringify(results, null, 4));
  });
});

router.get('/', function (req, res) {
  res.render('index');
})

router.get("/api/history", (req, res) => {
  Chat.find({}, (err, results)=>{
    if(err) throw err;
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(results, null, 4));
  });
});

router.get("/api/main", (req, res) => {
  Chat.find({room: "Main chat room"}, (err, results)=>{
    if(err) throw err;
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(results, null, 4));
  });
});

router.get("/api/other", (req, res) => {
    Chat.find({room: "Miscellaneous room"}, (err, results)=>{
      if(err) throw err;
      res.header("Content-Type",'application/json');
      res.send(JSON.stringify(results, null, 4));
    });
  }); 

module.exports = router;