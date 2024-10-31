require('dotenv').config();
const express = require('express');
var session = require('express-session');
const { v4: uuidv4 } = require('uuid');
const { Client } = require('pg');
const app = express();
const port = process.env.PORT;
const path = require('path');
const mysql = require('mysql');
const cookieparser = require('cookie-parser');

const client = new Client(process.env.DATABASE_URL);
app.use(cookieparser());

// this is the connection to the database
(async () => {
  await client.connect();
  try {
    console.log("connected")
  } catch (err) {
    console.error("error executing query:", err);
  }
})(); 

/* EXAMPLE FUNCTIONALITY from mdn
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});
*/

app.use(session({ // this stores it in server side
  secret: [process.env.HOUSE],
  resave: false,
  saveUninitialized: true,
}))

app.use((req, res, next) => {
  if (!req.cookies.userIdentifier) {
      const userIdentifier = uuidv4();
      console.log("Unique identifier:" , userIdentifier);
      
      // this stores it client side
      res.cookie('userIdentifier', userIdentifier, { maxAge: 7 * 24 * 60 * 60 * 1000 }); 
      
      // Attach to request object for later use
      req.userIdentifier = userIdentifier;
  } else {
      req.userIdentifier = req.cookies.userIdentifier;
  }
  next();
});

//to break down the form from the create group submission form on the groupForm page
app.use(express.urlencoded({ extended: true }));

// ~~~~~~~~~   This whole thing for generating new links and groups ~~~~~~~~~~~~~~~~~
// just a random generator of 4 chars
function generateGroupID(String){
  let result = '';
  const characters = 'asdfghjklzxcvbnmqwertyuiop1234567890';
  
  for (let i = 0; i < 4; i++){
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  client.query( 'INSERT INTO groups (groupID, groupName) VALUES ($1, $2)',
    [result, String], (error, results) =>{
      if (error) {
        console.error('Error inserting group into database:', error);
        return res.status(500).send('Server error');
      }
      else{
        console.log("Group Added Successfully");
      }
    })
  return result;
}

// this is the function where we would insert the group into the database
app.post('/create-group', (req,res) =>{
  const groupID = generateGroupID(req.body.name);
  const groupName = req.body.name;
  console.log(groupName);
  res.redirect(`/group/${groupID}?name=${encodeURIComponent(groupName)}`);
})

// this is the function to check if the group exists in the DB and to prep the members on what to do 
app.get('/group/:groupID', (req, res) =>{
  const groupID = req.params.groupID;
  const groupName = req.query.name;
  const userIdentifier = req.userIdentifier;
  console.log("Hello There + ", userIdentifier)
  res.render('group', { groupID, groupName });
})

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'public', "views"));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index.ejs', { title: 'Date Checker', message: 'check?' });
  });

app.get('/sessioncheck', (req, res) => {
    if (!req.session.views) {
      req.session.views = 1;
      res.send('Welcome to the site!');
      req.write(uid);
    } else {
      req.session.views++;
      res.send(`You have visited this site ${req.session.views} times.`);
      res.send(`Your session ID ${req.session.uid}`);
    }
  });

app.listen(port, () => {
    console.log(`Server is running on PORT:${port}`);
});


