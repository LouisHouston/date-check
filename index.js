require('dotenv').config();
const express = require('express');
//const { Client } = require('pg'); how to connect to db
const app = express();
const port = process.env.PORT;
const path = require('path');


app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'public', "views"));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index.ejs', { title: 'Date Checker', message: 'check?' });
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