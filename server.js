// Server.js
const express = require('express');
const app = express();

// Server IP
const IP = process.env.IP || '160.153.250.157';
// Server Port
const PORT = process.env.PORT || 3001;

const path = require('path');
const router = express.Router();

// PrestAPI
app.use('/', express.static('views/prestapi'));
router.get('/*',function(req,res){
  res.sendFile(__dirname + '/views/prestapi/index.html');
});


// Add the router
app.use('/', router);
// Console Output
app.listen(PORT, () => {
  console.log(`App is running! Listening at http:\/\/${IP} on port ${PORT}`);
});
