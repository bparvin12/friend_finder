var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var PORT = process.env.PORT || 3000;

//application/json parser
var jsonParser = bodyParser.json()

//application/url parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// app.get('/', function (req, res) {
//     res.send('Friend Finder');
// });

//parse various different custom JSON types as JSON 
app.use(bodyParser.json({ type: 'application/*+json' }))

// parse some custom thing into a Buffer 
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))

// parse an HTML body into a string 
app.use(bodyParser.text({ type: 'text/html' }))

require("./app/routing/apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js")(app);

app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});
