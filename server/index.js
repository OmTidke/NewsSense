const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

const RegisterModel = require('./models/Register')
const NewsModel = require('./models/News')


const app = express()

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser());


// 127.0.0.1
mongoose.connect('mongodb://127.0.0.1:27017/news-app');

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(!token){
        return res.json("The token is missing");
    }else{
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if(err){
                return res.json("The token is wrong.");
            }else{
                req.email = decoded.email;
                req.firstName = decoded.firstName;
                req.lastName = decoded.lastName;
                next();
            }
        })
    }
}

app.get('/',verifyUser, (req, res) => {
    return res.json({email: req.email, firstName: req.firstName, lastName: req.lastName});
})


app.post('/login', (req, res) => {
    const {loginEmail, loginPassword } = req.body;
    RegisterModel.findOne({email: loginEmail})
    .then(user => {
        if(user){
            if(user.password === loginPassword){
                const token = jwt.sign({email: user.email, firstName: user.firstName, lastName: user.lastName}, 'jwt-secret-key', {expiresIn: '1d'});
                // res.cookie('token', token);
                res.cookie('token', token, { secure: true, httpOnly: true });
                return res.json("Logged in successfuly");
            }else{
                res.json(`${user.password} ${loginPassword} Incorrect Password`);
            } 
        }else{
            res.json("Account does not exist");
        }
    })
    .catch(err => res.json(err))
})

app.post('/register', (req, res) => {
    const {firstName, lastName, email, password} = req.body;
    RegisterModel.findOne({email: email})
    .then(user => {
        if(user){
            res.json('User already have an account');
        }else{
            RegisterModel.create({  firstName: firstName,
                                    lastName: lastName,
                                    email: email,
                                    password: password})
            .then(result => res.json("Account created"))
            .catch(err => res.json(err))
        }
    }).catch(err => res.json(err))
})

app.post('/singlenews/*', (req, res) => {
    const {email, url} = req.body;
    NewsModel.findOne({email: email, url: url})
    .then(user => {
        if(user){
            res.json('User have already saved this news');
        }else{
            NewsModel.create({  email: email,
                                url: url})
            .then(result => res.json("News Saved"))
            .catch(err => res.json(err))
        }
    }).catch(err => res.json(err))
})

app.get('/fetchSavedNews', verifyUser, (req, res) => {
    // Fetch news items based on the user's email
    NewsModel.find({ email: req.email })
      .then(savedNews => {
        res.json(savedNews);
      })
      .catch(err => {
        res.status(500).json({ error: 'An error occurred while fetching saved news' });
      });
  });
  
app.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json("logged out")
})

app.listen(4001, ()=> {
    console.log(`Server is running at 4001.`);
})
