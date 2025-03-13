var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.json({ message: '主页面' });
});

module.exports = router;
