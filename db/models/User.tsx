import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  // UNCOMMENT WHEN IMPLEMENT USER AUTH
  // email: {
  //   type: String,
  //   required: true,
  //   unique: [true, "Account already exists"],
  //   validate: [validator.isEmail, "Please enter a valid email"]
  // },
  // password: {
  //   type: String,
  //   required: [true, "Please enter your email"],
  //   minLength: [8, "Your password must be at least 6 characters long"],
  //   select: false, //dont send back password after request
  // },
  // role: {
  //   type: String,
  //   default: "user",
  //   enum: {
  //     values: [
  //       "user",
  //       "admin"
  //     ],
  //   }
  // },
  // createdAt: {
  //   type: Date,
  //   default: Date.now
  // },
  name: { type: String, required: true },
  image: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: false },
});

const User = mongoose.models.User || mongoose.model("Location", userSchema);

export default User;
