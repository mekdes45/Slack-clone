import express from 'express';
import cors from 'cors'
const app = express();
import mongoose from 'mongoose';
import { PostModel } from './schemas/post.schema.js';
import { UserModel } from './schemas/user.schema.js'
import { MessageModel } from './schemas/message.schemas.js';


import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import cookieParser from "cookie-parser";

import dotenv from "dotenv";
dotenv.config();
const access_secret = process.env.ACCESS_TOKEN_SECRET as string;
console.log(access_secret);


import { createServer } from "http";
import { Server } from "socket.io";
const PORT = '3503';


mongoose
  .connect("mongodb://localhost:27017/slack-app")
  .then(() => {
    console.log("Connected to DB Successfully");
  })
  .catch((err) => console.log("Failed to Connect to DB", err));

  app.use(express.json());
  app.use(cors())
  
app.use(cookieParser())
const server = createServer(app);
let io = new Server(server, {
    cors: {origin: ['http://localhost:4200','http://localhost:3501','http://localhost:8080']}
    
})

app.get('/', function(req, res) {
     res.json({message:'test'});
  });


//one client connect to the server
io.on('connection', (socket) => {
  console.log('user connected');
  socket.on('join', function(data){
    socket.join(data.room);
    io.emit('new user joined', {user:data.user, message:'joined.'});
  });
//client to excute on server
  socket.on('leave', function(data){
    io.emit('left room', {user:data.user, message:'left room.'});
    socket.leave(data.room);
  });

 socket.on('message',function(data){
    io.in(data.room).emit('new message', {user:data.user, message:data.message});
 })

});


app.get('/messages', function(req,res){
    MessageModel.find()
      .then(data => res.json({
        data}))
    .catch(err => {
        res.status(501)
        res.json({errors: err});
    })
});

app.post('/create-message', function(req,res){
    const {sender,text} = req.body;
    const message = new MessageModel({
        sender,
        text,
    });
    message.save()
      .then((data: any) => {
        console.log(data)
        res.json({data});
    })
    .catch((err: any) => {
        res.status(501);
        res.json({errors: err});
    })
});


app.get("/Posts", function (req, res) {
    PostModel.find()
      .then((data) => res.json({ data }))
      .catch((err) => {
        res.status(501);
        res.json({ errors: err });
      });
  });
  
  



app.get('/users', function(req,res){
    UserModel.find()
      .then(data => res.json({ data }))
    .catch(err => {
        res.status(501)
        res.json({errors: err});
    })
});
app.post('/create-user', function(req,res){
    const {name, email, username} = req.body;
    const user = new UserModel({
        name,
        email,
        username,
    });
    user.save()
      .then((data) => {
        console.log(data)
        res.json({data});
    })
    .catch(err => {
        res.status(501);
        res.json({errors: err});
    })
});

app.post('/create-post', function(req,res){
    const {title, body} = req.body;
    const post = new PostModel({
        title,
        body,
    });
    post.save()
      .then((data) =>
      {
        console.log(data);
        res.json({data});
    })
    .catch(err => {
        res.status(501);
        res.json({errors: err});
    })
});

app.delete('/delete-user/:id', function (req, res) {
  const _id = req.params.id;
  UserModel.findByIdAndDelete(_id).then((data) => {
    console.log(data);
    res.json({ data });
  });
});
app.delete('/delete-message/:id', function (req, res) {
  const _id = req.params.id;
  MessageModel.findByIdAndDelete(_id).then((data) => {
    console.log(data);
    res.json({ data });
  });
});



app.put('/update-user/:id', function(req, res) {
  console.log("Update user");
  UserModel.findByIdAndUpdate(
      req.params.id,
      {
          $set: { name: req.body.name, email: req.body.email },
      },
      {
          new: true,
      },
      function(err, updateUser) {
          if(err) {
              res.send("Error updating user");
          }
          else{
              res.json(updateUser);
          }
      }
  )
})

  
  app.post("/login", function (req, res) {
    const { email, password } = req.body;
  
    UserModel.findOne({ email })
      .then((user) => {
          console.log(user);
        
        bcrypt.compare(password, `${user?.password}`, function (err, result) {
          if (result) {
            console.log("It matches!");
            const accessToken = jwt.sign({user}, access_secret)
            res.cookie('jwt', accessToken, {
                httpOnly: true,
                maxAge: 60 * 1000,
            })
            res.json({message: 'Successfully Logged In'})
          } else {
            res.sendStatus(403);
          }
        });
      })
      .catch((err) => {
        return res.sendStatus(404);
      });
  });



  server.listen(PORT, function () {
    console.log(`starting at localhost http://localhost:${PORT}`);
  });











































































































