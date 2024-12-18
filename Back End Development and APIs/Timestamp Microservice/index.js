// init project
const express = require('express');
const app = express();

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:date?", (req, res) => {
    let input = req.params.date;
    if (!isNaN(Number(input))) input = Number(input);
    const date = new Date(input ? input : Date.now());
  
    if (isNaN(date.getTime())) return res.json({error : "Invalid Date"});
  
    let unixDate = date.getTime();
    let utcDate = date.toUTCString();

    res.json({"unix": unixDate, "utc": utcDate});
});

// Listen on port set in environment variable or default to 3000
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
