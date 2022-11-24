const express = require('express')
//const{ port, url } = require("./config")
const app = express()
const db = require('./db')
const firestore = db.database.firestore()
const colection = "login"

app.use(express.urlencoded({extended:false}))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/login', (req, res) =>{
    res.render('login')
})

app.post('/login', async (req, res) =>{
  const data = {
    username: req.body.username,
    password: req.body.password
  }
  console.log(data)
  let checkuser = await firestore.collection(colection).where("username", "==", data.username).get()

  if(checkuser.empty){
    return res.render('err', {masage:"User not found",
    link:"<a href='/login'>Go back to login</a>"
  })
  }
  let user = {}
  checkuser.forEach(doc => {
    const x = {
      username: doc.data().username,
      password: doc.data().password
    } 
    user = x
  })
  if(data.password != user.password){
    return res.render('err', {
      massage: "Password is not correct",
      link: "<a href='/login'>Go back to login</a>"
    })
  }
  return res.render("welcome", {
    username: data.username
  })
})

app.post('/', async (req, res) =>{
  let checkuser = await firestore.collection(colection).where("username", "==", req.body.username).get()
  console.log("Check")
  if(!checkuser.empty){
    return res.render('err', {masage:"User already exist",
    link:"<a href='/'>Register</a>"
  })
  }
  const data = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  }
  await firestore.collection(colection).doc().set(data)
  console.log("submit")
  return res.render('success', {masage:"sucess", 
  link:"<a href='/'>Register</a>"})
})

app.listen(8080, () => console.log("app is listening at http://localhost:8080"))
