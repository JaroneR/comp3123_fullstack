const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat.js');

//Get All Messages
router.get('/api/history', function(req, res, next) {
  Chat.find((err, results)=>{
    if(err) throw err;
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(results, null, 4));
  });
}); 

//Save Messages To History
router.post('/api/history', function(req, res, next) {
  Chat.create(req.body, function (err, chat) {
    if (err) return next(err);
    res.json(chat);
  });
});

module.exports = router;