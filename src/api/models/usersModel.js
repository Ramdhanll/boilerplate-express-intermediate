import mongoose from 'mongoose'

const usersSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
      },
      photo: {
         type: String,
         required: true,
      },
      email: {
         type: String,
         required: true,
         unique: [true, 'hahahah'],
      },
      password: {
         type: String,
         required: true,
      },
      isAdmin: {
         type: Boolean,
         required: true,
         default: false,
      },
   },
   {
      timestamps: true,
   }
)

const Users = mongoose.model('Users', usersSchema)

export default Users
