var express = require('express');
var router = express.Router();

// console.log("-----------");
// console.log("-----------");
// var paytm = require('./paytm');
// paytm.InitiateTransactionAPI(100, 1).
//   then((response) => {
//     if (response) {
//       console.log("--------", response);
//     }
//   }).catch((error) => {
//     console.log("--------", error);
//   });




/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;



