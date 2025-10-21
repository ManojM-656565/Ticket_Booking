// import mongoose from "mongoose";

const mongoose=require("mongoose")
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      requied: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

module.exports=mongoose.model("User",userSchema);
