import { usersDummy } from '../..//Dummies/dummies.js'
import Users from '../models/usersModel.js'
import bcrypt from 'bcrypt'
import { generateToken } from '../helpers/jwt.js'
import { validationResult } from 'express-validator'
import e from 'express'

export const seed = async (req, res) => {
   await Users.deleteMany({})

   const createdUsers = await Users.insertMany(usersDummy)

   res.send(createdUsers)
}

export const login = async (req, res) => {
   const errors = validationResult(req)
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
   }

   const { email, password } = req.body

   const user = await Users.findOne({ email })
   if (user) {
      const token = generateToken(user)

      if (bcrypt.compareSync(password, user.password)) {
         return res
            .status(200)
            .cookie('token', token, { httpOnly: true })
            .json({
               _id: user.id,
               name: user.name,
               email: user.email,
               isAdmin: user.isAdmin,
               photo: user.photo,
               token,
            })
      }
   }

   res.status(401).json({ message: 'Invalid email or password!' })
}

export const register = async (req, res) => {
   const errors = validationResult(req)
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
   }

   const { name, email, password, photo } = req.body

   const user = new Users({
      name,
      email,
      password: bcrypt.hashSync(password, 8),
      photo,
   })

   const createdUser = await user.save()
   res.status(200).json({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      photo: createdUser.photo,
      token: generateToken(createdUser),
   })
}

export const userDetail = async (req, res) => {
   const userId = req.params.id
   try {
      const user = await Users.findById(userId).select('-password')
      if (userId === req.user._id) {
         return res.status(200).json(user)
      } else {
         throw e
      }
   } catch (error) {
      return res.status(404).json({ message: 'User not found!' })
   }
}
