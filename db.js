const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const db = require('mongoose');


let app=express()
 db.connect("mongodb://localhost:27017/vishwa")
.then(()=>{console.log("db connected")})
.catch((e)=>{console.log("error --"+e)})


app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
let myschema=new db.Schema(
    {
        name:{type:String, required:true, unique:false, trim:true},
        phone:{type:String, required:true, unique:true, trim:true},
        mail:{type:String, required:false, unique:false, trim:true}
    }
)

let mymod=db.model("users",myschema)

app.post("/reg",async(req, res)=>{
    let {name, mail, phone}=req.body 
    if(!name||!phone){
        res.send("enter all fields")
    }
   let exist= await mymod.findOne({phone})
   if(exist){
    res.send("user already exist")
   }else{
    await mymod.create({name, mail, phone})
    res.send("insert success")
   }
})

app.get("/users",async(req,res)=>{
    
    res.send(await mymod.find())
})

app.listen(9000)