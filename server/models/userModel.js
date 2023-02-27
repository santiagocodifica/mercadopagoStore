const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const validator = require("validator")

const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

userSchema.statics.signup = async function(username, email, password){
  if(!email || !password || !username){ throw Error("All fields must be filled") }
  if(!validator.isEmail(email)){ throw Error("Email not valid") }
  if(!validator.isStrongPassword(password)){ throw Error("Password not strong enough") }

  console.log("enters static signup")

  const exists = await this.findOne({ email })
  if(exists){ throw Error("Email already in use") }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ username, email, password: hash })

  return user
}

userSchema.statics.login = async function(email, password){
  if(!email || !password){ throw Error("All fields must be filled") }

  console.log("enters static login")
  const user = await this.findOne({ email })
  if(!user){ throw Error("Incorrect Email") }

  const match = await bcrypt.compare(password, user.password)
  if(!match){ throw Error("Incorrect Password") }

  return user
}

module.exports = mongoose.model("user", userSchema)
