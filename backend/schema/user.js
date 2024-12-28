import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

  email: {
    type: String,
    required: true,
    unique: true,
  },

  name: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
    minlength: 6,
  },

  profilePic: {
    type: String,
    default: "",
  },

},
{ timestamps: true }  // it adds created ans updated at
);    

const User = mongoose.model("User" , userSchema);  //creating user model in collections based on user schema

export default User;
