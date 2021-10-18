import express from 'express';
import cors from 'cors'
const app = express();
import mongoose from 'mongoose';
import path from 'path';
import { PostModel } from './schemas/post.schema.js';
import { UserModel } from './schemas/user.schema.js'
import { MessageModel } from './schemas/message.schemas.js';


import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import cookieParser from "cookie-parser";

import dotenv from "dotenv";
import { authHandler } from "./middleware/auth.middleware.js";
dotenv.config();
const access_secret = process.env.ACCESS_TOKEN_SECRET as string;
console.log(access_secret);



import http from 'http';

import { createServer } from "http";
import { Server } from "socket.io";
const PORT = '3501'

const saltRounds = 10;

// const app = express();
// const PORT = 3501;

mongoose
  .connect("mongodb://localhost:27017/test")
  .then(() => {
    console.log("Connected to DB Successfully");
  })
  .catch((err) => console.log("Failed to Connect to DB", err));


app.use(cookieParser())
// app.use(cors({
//           credentials: true,
//           origin: ['http://localhost:4200', 'http://localhost:3502', 'http://localhost:8080']
//       }));

const server = createServer(app);
let io = new Server(server, {
    cors: {origin: ['http://localhost:4200']}
    
})


app.use(express.json());
app.use(cors())

app.get('/', function(req, res) {
     res.json({message:'test'});
  });


io.on('connection', (socket) => {
  console.log('user connected');
  socket.on('join', function(data){
    socket.join(data.room);
    io.emit('new user joined', {user:data.user, message:'joined.'});
  });
  socket.on('leave', function(data){
    io.emit('left room', {user:data.user, message:'left room.'});
    socket.leave(data.room);
  });

 socket.on('message',function(data){
    io.in(data.room).emit('new message', {user:data.user, message:data.message});
 })
 socket.on('chatmessage', (msg: any) => {
          const message = new msg({ msg });
          message.save().then(() => {
              io.emit('message', msg)
          })
      })
  
      socket.on("message", function () {
          MessageModel.find({}, (message) => {
              console.log('message');
              socket.emit("send message", message);
          });
      });
});





app.get('/messages', function(req,res){
    MessageModel.find()
    .then(data => res.json({data}))
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
    .then((data:any) => {
        res.json({data});
    })
    .catch((err: any) => {
        res.status(501);
        res.json({errors: err});
    })
});


app.get("/posts", function (req, res) {
    PostModel.find()
      .then((data) => res.json({ data }))
      .catch((err) => {
        res.status(501);
        res.json({ errors: err });
      });
  });
  
  



app.get('/users', function(req,res){
    UserModel.find()
    .then(data => res.json({data}))
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
    .then((data) => {
        res.json({data});
    })
    .catch(err => {
        res.status(501);
        res.json({errors: err});
    })
});






  
 
  
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


















// import express from 'express';
// const app = express();
// import cors from 'cors';
// import mongoose from 'mongoose';
// import path from 'path';
// import { PostModel } from './schemas/post.schema.js';
// import { UserModel } from './schemas/user.schema.js'
// import { MessageModel } from './schemas/message.schemas.js';




// import bcrypt from "bcrypt";
// import jwt from 'jsonwebtoken';
// import cookieParser from "cookie-parser";

// import dotenv from "dotenv";
// import { authHandler } from "./middleware/auth.middleware.js";
// dotenv.config();
// const access_secret = process.env.ACCESS_TOKEN_SECRET as string;
// console.log(access_secret);

//  import http from 'http';
// import { createServer } from "http";
// import { Server } from "socket.io";



// const __dirname = path.resolve();
// const PORT = 3501;
// app.use(cors());


// mongoose.connect('mongodb://localhost:27017/slack')
// .then(() => {
//     console.log('Connected to DB Successfully');
// })
//     .catch(err => console.log('Failed to Connect to DB', err))


//     // app.use(cookieParser())
//     // app.use(cors({
//     //     credentials: true,
//     //     origin: ['http://localhost:4200', 'http://localhost:3502', 'http://localhost:8080']
//     // }));
//     const server = createServer(app);
//     let io = new Server(server,{
//         cors: {origin: ['http://localhost:4200']}
//       });
    
//     io.on('connection', (socket) => {
//       console.log('a user connected');
//     socket.emit('user message', "here is my chat") 
//     });
    



// app.use(express.json());

// app.get('/', function(req, res) {
//    res.json({message:'test'});
// });

// let userList = new Map();

// io.on('connection', (socket) => {
//     console.log('a user connected')
//     let userName = socket.handshake.query.userName;
//     addUser(userName, socket.id);

//     socket.broadcast.emit('user-list', [...userList.keys()]);
//     socket.emit('user-list', [...userList.keys()]);
    

//     socket.emit('message', (msg: any) => {
//         socket.broadcast.emit('message-broadcast', { message: msg, userName: userName });
//     });

//     socket.on('disconnect', (reason: any) => {
//         removeUser(userName, socket.id);
//     })

//     socket.on('chatmessage', (msg: any) => {
//         const message = new msg({ msg });
//         message.save().then(() => {
//             io.emit('message', msg)
//         })
//     })

//     socket.on("message", function () {
//         MessageModel.find({}, (message) => {
//             console.log('message');
//             socket.emit("send message", message);
//         });
//     });


//     socket.on("create-messages", function (req:any, res:any) {
//         const { sender, to, text } = req.body
//         const message = new MessageModel({
//             sender,
//             to,
//             text,
            
//         });
//         message.save().then((data:any) => {
//             socket.emit('successfully saved')
//         })
//             .catch((err:any) => {
//                 socket.emit('error')
//             })
//     })
// });

// app.get('/messages', function(req,res){
//     MessageModel.find()
//     .then(data => res.json({data}))
//     .catch(err => {
//         res.status(501)
//         res.json({errors: err});
//     })
// });

// app.post('/create-message', function(req,res){
//     const {sender,text} = req.body;
//     const message = new MessageModel({
//         sender,
//         text,
//     });
//     message.save()
//     .then((data:any) => {
//         res.json({data});
//     })
//     .catch((err: any) => {
//         res.status(501);
//         res.json({errors: err});
//     })
// });


// function addUser(userName:any, id:any) {
//     if (!userList.has(userName)) {
//         userList.set(userName, new Set(id));
//     } else {
//         userList.get(userName).add(id);
//     }
// }

// function removeUser(userName: any, id: any) {
// if (userList.has(userName)) {
//     let userIds = userList.get(userName);
    
//     if (userIds.size == 0) {
//         userList.delete(userName)
//     };
// }
// }




// app.get('/posts', function(req,res){
//     PostModel.find()
//     .then(data => res.json({data}))
//     .catch(err => {
//         res.status(501)
//         res.json({errors: err});
//     })
// });

// app.get('/users', function(req,res){
//     UserModel.find()
//     .then(data => res.json({data}))
//     .catch(err => {
//         res.status(501)
//         res.json({errors: err});
//     })
// });
// app.post('/create-user', function(req,res){
//     const {name, email, username} = req.body;
//     const user = new UserModel({
//         name,
//         email,
//         username,
//     });
//     user.save()
//     .then((data) => {
//         res.json({data});
//     })
//     .catch(err => {
//         res.status(501);
//         res.json({errors: err});
//     })
// });

// app.post('/create-post', function(req,res){
//     const {title, body} = req.body;
//     const post = new PostModel({
//         title,
//         body,
//     });
//     post.save()
//     .then((data) => {
//         res.json({data});
//     })
//     .catch(err => {
//         res.status(501);
//         res.json({errors: err});
//     })
// });





// // app.get("/posts", function (req, res) {
// //     PostModel.find()
// //       .then((data) => res.json({ data }))
// //       .catch((err) => {
// //         res.status(501);
// //         res.json({ errors: err });
// //       });
// //   });
  
// //   app.get("/users", authHandler, function (req: any, res) {
// //     UserModel.find({email: req.user.email}, '-password')
// //       .then((data) => res.json({ data }))
// //       .catch((err) => {
// //         res.status(501);
// //         res.json({ errors: err });
// //       });
// //   });
// //   app.post("/create-user", function (req, res) {
// //     const { name, email, username, password } = req.body;
  
// //     bcrypt.genSalt(saltRounds, function (err, salt) {
// //       bcrypt.hash(password, salt, function (err, hash) {
// //         const user = new UserModel({
// //           name,
// //           username,
// //           email,
// //           password: hash,
// //         });
// //         user
// //           .save()
// //           .then((data) => {
// //             res.json({ data });
// //           })
// //           .catch((err) => {
// //             res.status(501);
// //             res.json({ errors: err });
// //           });
// //       });
// //     });
// //   });
  
// //   app.post("/create-post", function (req, res) {
// //     const { title, body } = req.body;
// //     const post = new PostModel({
// //       title,
// //       body,
// //     });
// //     post
// //       .save()
// //       .then((data) => {
// //         res.json({ data });
// //       })
// //       .catch((err) => {
// //         res.status(501);
// //         res.json({ errors: err });
// //       });
// //   });
  
// //   app.delete("/delete-user/:id", function (req, res) {
// //     const _id = req.params.id;
// //     UserModel.findByIdAndDelete(_id).then((data) => {
// //       console.log(data);
// //       res.json({ data });
// //     });
// //   });
  
// //   app.put("/update-user/:id", function (req, res) {
// //     console.log("Update user");
// //     UserModel.findByIdAndUpdate(
// //       req.params.id,
// //       {
// //         $set: { name: req.body.name, email: req.body.email },
// //       },
// //       {
// //         new: true,
// //       },
// //       function (err, updateUser) {
// //         if (err) {
// //           res.send("Error updating user");
// //         } else {
// //           res.json(updateUser);
// //         }
// //       }
// //     );
// //   });
  
//   app.post("/login", function (req, res) {
//     const { email, password } = req.body;
  
//     UserModel.findOne({ email })
//       .then((user) => {
//           console.log(user);
        
//         bcrypt.compare(password, `${user?.password}`, function (err, result) {
//           if (result) {
//             console.log("It matches!");
//             const accessToken = jwt.sign({user}, access_secret)
//             res.cookie('jwt', accessToken, {
//                 httpOnly: true,
//                 maxAge: 60 * 1000,
//             })
//             res.json({message: 'Successfully Logged In'})
//           } else {
//             res.sendStatus(403);
//           }
//         });
//       })
//       .catch((err) => {
//         return res.sendStatus(404);
//       });
//   });





// app.delete('/delete-user/:id', function(req, res) {
//     const _id = req.params.id;
//     UserModel.findByIdAndDelete(_id).then((data) => {
//         console.log(data);
//         res.json({data});
//     });
// })

// app.put('/update-user/:id', function(req, res) {
//     console.log("Update user");
//     UserModel.findByIdAndUpdate(
//         req.params.id,
//         {
//             $set: { name: req.body.name, email: req.body.email },
//         },
//         {
//             new: true,
//         },
//         function(err, updateUser) {
//             if(err) {
//                 res.send("Error updating user");
//             }
//             else{
//                 res.json(updateUser);
//             }
//         }
//     )
// })




// server.listen(PORT, function () {
//   console.log(`starting at localhost http://localhost:${PORT}`);
// });



