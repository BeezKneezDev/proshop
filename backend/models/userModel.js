import mongoose from 'mongoose'
import bcrpt from 'bcryptjs'

const userSchema = mongoose.Schema(
  {
    name: {
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
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  {
    timestamps: true
  }
)

// run after a email match is found
// enteredpassword ~ userInput
// this.password ~ checking against the password in the DB
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrpt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrpt.genSalt(10)
  this.password = await bcrpt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User
