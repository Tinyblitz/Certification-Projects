const express = require('express')
const app = express();
require('dotenv').config()
const mongoose = require('mongoose');

app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});
app.use(express.urlencoded({extended: true}));

// Connect to mongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
 
// User Collection
const userSchema = new mongoose.Schema({
  username: String
});

const User = mongoose.model("User", userSchema);

// Exercise Collection
const exerciseSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},  // Reference to User: One-To-Many
  description: String,
  duration: Number,
  date: Date
});

const Exercise = mongoose.model("Excercise", exerciseSchema);

// Create User via POST /api/users and obtain all users via GET /api/users
app.route('/api/users')
   .get( async (req,res) => {
     const allUsers = await User.find({});
     res.json(allUsers);
   })
   .post( async (req,res) => {

    // Add new User document to database
     const { username } = req.body;
     const newUser = new User({ username });
     await newUser.save();

     const { _id } = newUser;

     res.json({username, _id});
   });

// Create Exercises via POST /api/users/:_id/exercises
app.post('/api/users/:_id/exercises', async (req,res) => {
  const { _id } = req.params;
  const  { description, duration, date } = req.body;
  const dateObj = !date ? new Date() : new Date(`${date}T00:00:00`);  // Make sure it follows correct time zone
  const dateString = dateObj.toDateString();

  try {
    const user = await User.findById(_id);
    if (!user) return res.status(404).json({ error: "Invalid ID, user not found" });
    const { username } = user;

    // Add new exercise to database
    const newExcercise = new Exercise({
      userId: _id,
      description,
      duration,
      date: dateObj
    });
    await newExcercise.save();

    res.json({_id, username, date: dateString, duration: Number(duration), description});
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while processing your request" });
  }
})

// Pull user exercise logs from database via GET /api/users/:_id/logs
app.get('/api/users/:_id/logs', async (req, res) => {
  const { _id } = req.params;
  const { from, to, limit } = req.query; // Obtain filter parameters if used

  try {
    // Find the user by their _id
    const user = await User.findById(_id);
    if (!user) return res.status(404).json({ error: "Invalid ID, user not found" });
    const { username } = user;

    // Build query for exercises with optional date range filtering
    const query = { userId: _id };

    // Check if date filter parameters used
    if (from) query.date = { $gte: new Date(from) };  // Filter for exercises after or on the 'from' date
    if (to) query.date = { ...query.date, $lte: new Date(to) };  // Filter for exercises before or on the 'to' date

    // Find exercises for the user with the built query
    const listOfExercises = await Exercise.find(query).limit(limit ? parseInt(limit) : 0);

    const count = listOfExercises.length;

    // Format for array output
    const log = listOfExercises.map((entry)=>{
      const { description, duration, date } = entry;
      return { description, duration, date: date.toDateString() };
    });

    return res.json({
      _id,
      username,
      count,
      log,
    })
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while processing your request" });
  }
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
