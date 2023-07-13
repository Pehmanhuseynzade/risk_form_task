const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

const app = express()

app.use(cors())
app.use(bodyParser.json())
dotenv.config()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const loginSchema = new mongoose.Schema({
    firstName: String, 
    lastName: String,
    email: String,
    confirmEmail :String,
    phone :Number,
    rating :Number,
  });

const loginModel = mongoose.model('login', loginSchema);

//POST DATAS

app.post(`/api/form`,async(req,res)=>{
    const{firstName,lastName,email,confirmEmail,phone,rating} = req.body
    const newPost = new loginModel({
         firstName:firstName,
         lastName:lastName,
         email:email,
         confirmEmail:confirmEmail,
         phone:phone,
         rating:rating
    })
    await newPost.save()
    res.status(201).send({
         message:"Posted Succesfully!",
         payload:newPost
    })
})

//GET DATAS

app.get(`/api/form`,async(req,res)=>{
    const{name}=req.query
    const newGet = await loginModel.find()
    if(!name){
         res.status(200).send(newGet)
    }
    else{
         const searched = newGet.filter((x)=>
         x.name.toLowerCase().trim().includes(name.toLowerCase().trim())  
         )
         res.status(200).send(searched)
    }
})

//GET DATAS BY ID

app.get(`/api/form/:id`,async(req,res)=>{
     const {id} = req.params
     const formID = await loginModel.findById(id)
     res.status(200).send(formID) 
})

//DELETE

app.delete(`/api/form/:id`,async(req,res)=>{
    const id=req.params.id
    const newDelete = await loginModel.findByIdAndDelete(id)
    res.status(202).send(newDelete)
})

//UPDATE

app.put(`/api/form/:id`,async(req,res)=>{
     const id = req.params.id
     const{firstName,lastName,email,confirmEmail,phone,rating} = req.body
     const Updatedatas = {
          firstName:firstName,
          lastName:lastName,
          email:email,
          confirmEmail:confirmEmail,
          phone:phone,
          rating:rating
     }
     await loginModel.findByIdAndUpdate(id,Updatedatas)
     res.status(200).send({
          message:`Update is succesfully!`
      })
     
     })


PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})

DB_PASSWORD = process.env.DB_PASSWORD
DB_CONNECTION = process.env.DB_CONNECTION

mongoose.connect(DB_CONNECTION.replace('<password>',DB_PASSWORD)).then(()=>{
     console.log("MongoDB Connected!!!")
});
