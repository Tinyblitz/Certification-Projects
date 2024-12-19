require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dns = require('dns');
const {URL} = require('url');
const mongoose = require('mongoose');

// Connect to mongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const urlSchema = new mongoose.Schema({
  longurl: String,
  shorturl: Number
});

let Url = mongoose.model("Url", urlSchema);

// Basic Configuration
const port = process.env.PORT || 3000;

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Middleware -  body-parser
app.use(bodyParser.urlencoded({extended: false}));

// Redirect to link using shorturl
app.get( '/api/shorturl/:shorturl', async (req,res) => {
  const shortUrl = Number(req.params.shorturl);
  try {
    const targetDoc = await Url.findOne({ shorturl: shortUrl });

    if (!targetDoc) {
      return res.json({ "error": "Short URL does not exist in database" });
    }

    const longUrl = targetDoc.longurl;
    return res.redirect(longUrl);
  } catch (err) {
    return res.json({ "error": "Something went wrong when attempting to retrieve document" });
  }
});

// Provide shorturl and add to database
app.post('/api/shorturl', function(req, res) {

  const originalUrl = req.body.url;
  try {
    dns.lookup(new URL(originalUrl).hostname, async (err) => {
      // Catch error when url does not exist
      if(err) return res.json({"error": "invalid url"});

      const existingDoc = await Url.findOne({longurl: originalUrl});
      let shortUrl;

      if (!existingDoc) {

        // Shorturl created from current count of available documents
        const count = await Url.countDocuments();
        shortUrl = count + 1;

        // Create new document to add to database
        let newUrl = new Url({
          longurl: originalUrl,
          shorturl: shortUrl
        });

        await newUrl.save()
      }
      else {
        shortUrl = existingDoc.shorturl;
      }

      res.json({ "original_url": originalUrl, "short_url": shortUrl });
    })
  }
  catch(err) {
    // Catch error when input is not in url format
    res.json({"error": "invalid url"});
  }
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
