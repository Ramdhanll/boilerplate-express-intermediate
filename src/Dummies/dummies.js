import bcrypt from 'bcrypt'
import User from '../api/models/usersModel.js'

let salt = bcrypt.genSaltSync(8)

export const usersDummy = [
   {
      name: 'Ramadhani',
      photo: 'https://bit.ly/ryan-florence',
      email: 'erdevlop@gmail.com',
      password: bcrypt.hashSync('password', salt),
      isAdmin: true,
   },
   {
      name: 'user test 1',
      photo: 'https://bit.ly/ryan-florence',
      email: 'usertest1@gmail.com',
      password: bcrypt.hashSync('password', salt),
   },
   {
      name: 'user test 2',
      photo: 'https://bit.ly/ryan-florence',
      email: 'usertest2@gmail.com',
      password: bcrypt.hashSync('password', salt),
   },
]
