import express from 'express';
import dotenv from "dotenv";
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import cookieParser from "cookie-parser";

import User from './schema/user.js';   //importing user schema
import Message from './schema/message.js';

import cloudinary from './ex/cloudinary.js';
import {app , server , getReceiverSocketId , io} from './ex/socket.js';


import path from "path";

// const app = express();  //imported from soket.js
dotenv.config();

const MONGODB = process.env.MONGODB;

// app.use(bodyParser.json());
app.use(
    cors({
        origin: "https://chat-app-frontend-qxkg.onrender.com", // Replace with the frontend URL
        credentials: true, // Allow cookies to be sent
      })
);         //for accessing data from different ports
app.use(express.json({limit: '10mb' })); //to enable json method
app.use(express.urlencoded({ extended: true  , limit: '10mb' }));  // For parsing application/x-www-form-urlencoded
app.use(cookieParser()); 

mongoose.connect(MONGODB, {
    autoIndex: true
}).then(() => {
    console.log("connected to database")
})
    .catch((err) => {
        console.log(err.message);
    });


//JWT
//let token; just trying , it worked
const generatetoken = (userId, res) => {

    //for creating tokens
    const token = jwt.sign({ userId }, process.env.MY_JWT_ACCESS, { expiresIn: "1d" })  //passing userid(payload) and  my_jwt_access(my signature)

    //sets a cookies in clients browser
    res.cookie("jwt", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,//it is in millisecond (1 days)
         httpOnly: true, // Prevent XSS
         sameSite: "None", // Cross-origin allowed
         secure: true,
    });

     console.log("token1: " , token);
};

const verifyJWT = async (req, res, next) => {

    try {

        const token = req.cookies.jwt;
        console.log("token2: " , token);

        if (!token) {
            console.log("no token sirrr!")
            return res.status(401).json({ error: "No access token" })
        }

        const decoded = jwt.verify(token, process.env.MY_JWT_ACCESS);  //decoded contains the payload that has userid with it

        if (!decoded) {
            console.log("Unauthorized - Invalid Token");
            return res.status(401).json({ message: "Unauthorized - Invalid Token" });
        }

        const user = await User.findById(decoded.userId).select("-password");  //we are finding the user in thee database and delselecting the password so that password is not passes by mistake(- minus means deselct)

        if (!user) {
            return res.status(404).json({ message: "User not found" });  //not possible but still , if someone gets my token by chance
        }

        req.user = user; //this line means that verification is done ,now access is given to the user

        next();
    } 
    
    catch (error) {
        console.log("Error in middleware: ", error.message);
        res.status(500).json({ "error": error.message});
        
    }

};

//for checking authorisation
app.get("/auth/check", verifyJWT, (req, res) => {
    // console.log("check auth- " , req.user);
    // res.status(200).json({ user: req.user }); // Respond with user details
    if (req.user) {
        return res.status(200).json({   //earlier with req.user on reloading it was vanishing out
          _id: req.user._id,
          name: req.user.name,
          email: req.user.email,
          profilePic: req.user.profilePic,
          createdAt: req.user.createdAt,
        });
      } else {
        return res.status(401).json({ error: "Not authenticated" });
      }
  });

app.post("/signup", async (req, res) => {

    console.log("ok");

    const { name, email, password } = req.body;

    // console.log(name.length());
    console.log(name);

    //console.log(req.body);  // Log the body to check its content

    try {


        console.log("ok3")
        const user = await User.findOne({ email })

        //console.log("ok2")
        if (user) return res.status(400).json({ "error": "Email already exist" });


        const new_user = new User({ name, email, password });

        new_user.save()
            .then((pp) => {
                //console.log(pp);
                generatetoken(new_user._id, res)
                res.status(201).json({ message: "User created successfully", user: pp  });
            })
            .catch((err) => {

                if (err.code === 11000) {  //403 code is for forbidden data 

                    return res.status(500).json({ "error": "Email already exist" });
                }
                return res.status(403).json({ "error": err.message });
            })
    }

    catch (err) {
        return res.status(500).json({ "error": err.message })
    }

});


app.post("/login", async (req, res) => {

    let { email, password } = req.body;

    try {

        const user = await User.findOne({ email })

        // console.log(password , user.password)

        if (!user) {
            return res.status(400).json({ "error": "Email not found" });
        }

        if (password != user.password) {
            console.log("wrong");
            return res.status(403).json({ "error": "Galat password 🤡" });
        }


        generatetoken(user._id, res);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profilePic: user.profilePic,
            createdAt: user.createdAt,
            //token, just trying , it worked
        })

    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ "error": err.message });
    }

});

//home page users
app.get("/get-users" , verifyJWT , async(req , res) => {

    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password"); //not including loggedin user and deselecting passwprd from the data sent
        //console.log(filteredUsers);
        res.status(200).json(filteredUsers);

      } catch (error) {
        console.error("Error in getUsersForSidebar: ", error.message);
        res.status(500).json({ error: "Internal server error" });
      }
});


//getting messages
app.get("/get-messages/:id" , verifyJWT , async(req , res) => {

    try {
        const { id: userToChatId } = req.params;
        const myId = req.user._id;

        //console.log(userToChatId , myId)
    
        const messages = await Message.find({
          $or: [
            { senderId: myId, receiverId: userToChatId },
            { senderId: userToChatId, receiverId: myId },
          ],
        });
    
        res.status(200).json(messages);
        //console.log(messages);
      } catch (error) {
        console.log("Error in getMessages controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
      }
});




app.post("/send-messages/:id" , verifyJWT , async ( req , res) => {

    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;
    
        let imageUrl;
        if (image) {
          // Upload base64 image to cloudinary
          const uploadResponse = await cloudinary.uploader.upload(image);
          imageUrl = uploadResponse.secure_url;
        }
    
        const newMessage = new Message({
          senderId,
          receiverId,
          text,
          image: imageUrl,
        });
    
        await newMessage.save();
    
        //for real time messaging
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("newMessage", newMessage);
        }
    
        res.status(201).json(newMessage);
      } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
      }
});

app.put("/update-profile" , verifyJWT , async(req , res) => {

    try {
        const { profilePic } = req.body;
        const userId = req.user._id;
    
        if (!profilePic) {
          return res.status(400).json({ message: "Profile pic is required" });
        }
    
        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(  //updating in database
          userId,
          { profilePic: uploadResponse.secure_url },
          { new: true }
        );
    
        res.status(200).json(updatedUser);
      } catch (error) {
        console.log("error in update profile:", error);
        res.status(500).json({ message: "Internal server error" });
      }
});

app.post("/logout", (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 }); //making my signature null and jwtage 0
        return res.status(200).json("logged out");
    }
    catch (err) {
        return res.status(500).json({ "error": err.message });
    }
});


server.listen(3001, () => {
    console.log("listening");
})
