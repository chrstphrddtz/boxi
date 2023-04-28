import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import validator from 'validator'


const { Schema } = mongoose;

const userSchema = new Schema({
  // UNCOMMENT WHEN IMPLEMENT USER AUTH
  email: {
    type: String,
    required: true,
    // unique: [true, "Account already exists"],
    unique: true,
    validate: validator.isEmail
  },
  password: {
    type: String,
    required: [true, "Please enter your email"],
    minLength: [8, "Your password must be at least 6 characters long"],
    select: false, //dont send back password after request
  },
  role: {
    type: String,
    default: "user",
    enum: {
      values: [
        "user",
        "admin"
      ],
    }
  },
  createdAt: { type: Date, default: Date.now },
  name: { type: String, required: true },
  image: { type: String, required: false },
  location: { type: String, required: true },
  price: { type: Number, required: false },
  description: { type: String, required: false },
  availability: { type: Object, required: false },
  active: {type: Boolean, required: false},
});

// ENCRYPTION 
userSchema.pre('save', async function(next){
  if(!this.isModified('password')){
      next()
  }
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

userSchema.methods.comparePassword = async function(enteredPassword: string){
  return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
