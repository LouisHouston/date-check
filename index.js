require('dotenv').config();
const express = require('express');
var session = require('express-session');
//const { Client } = require('pg'); how to connect to db
const app = express();
const port = process.env.PORT;
const path = require('path');

app.use(session({
  secret: [process.env.HOUSE],
  resave: false,
  saveUninitialized: true,
  cookie:{
    maxAge: 24 * 7 * 60 * 60 * 1000
  }
}))

//to break down the form from the creategroup submission form on the groupForm page
app.use(express.urlencoded({ extended: true }));

// ~~~~~~~~~   This whole thing for generating new links and groups ~~~~~~~~~~~~~~~~~
// just a random generator of 4 chars
function generateGroupID(){
  let result = '';
  const characters = 'asdfghjklzxcvbnmqwertyuiop1234567890';
  
  for (let i = 0; i < 4; i++){
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// this is the function where we would insert the group into the database
app.post('/create-group', (req,res) =>{
  const groupID = generateGroupID();
  const groupName = req.body.name;
  console.log(groupName);
  res.redirect(`/group/${groupID}?name=${encodeURIComponent(groupName)}`);
})

// this is the function to check if the group exists in the DB and to prep the members on what to do 
app.get('/group/:groupID', (req, res) =>{
  const groupID = req.params.groupID;
  const groupName = req.query.name;
  res.render('group', { groupID, groupName });
})

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'public', "views"));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index.ejs', { title: 'Date Checker', message: 'check?' });
  });

// just seeing if this works
app.get('/sessioncheck', (req, res) => {
    if (!req.session.views) {
      req.session.views = 1;
      res.send('Welcome to the site!');
    } else {
      req.session.views++;
      res.send(`You have visited this site ${req.session.views} times.`);
    }
  });

app.listen(port, () => {
    console.log(`Server is running on PORT:${port}`);
});

/* Use for DB connection later on
const client = new Client(process.env.DATABASE_URL);

(async () => {
  await client.connect();
  try {
    const results = await client.query("SELECT NOW()");
    console.log(results);
  } catch (err) {
    console.error("error executing query:", err);
  } finally {
    client.end();
  }
})(); 
*/
