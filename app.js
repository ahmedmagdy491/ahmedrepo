const PORT = process.env.PORT || 3000; 
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routers/authRouter');
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({extended:false});
const cookieParser = require('cookie-parser');
const {requireAuth ,checkUser} = require('./middlewear/authMiddlewear');


const app = express();

// middleware
app.use(express.static('public'));

// urlencoded
app.use(urlencodedParser)

// view engine
app.set('view engine', 'ejs');

app.use(express.json())

//cookies
app.use(cookieParser());

// database connection
const dbURI = 'mongodb://localhost:27017/node-auth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(PORT))
  .catch((err) => console.log(err));
// routes
app.get('*',checkUser);
app.get('/', (req, res) => {
  res.render('home');

})
app.get('/smoothies', requireAuth , (req, res) => res.render('smoothies'));

app.use(authRoutes);




