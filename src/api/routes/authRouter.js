import express from "express"
import { body } from "express-validator"
import isAuth from "../middleware/isAuth.js"
import User from "../models/userModel.js"
import {
   login,
   register,
   seed,
   userDetail,
} from "../controller/authController.js"

const authRouter = express.Router()

authRouter.get("/seed", seed)
authRouter.get("/:id", isAuth, userDetail)

authRouter.post(
   "/login",
   body("email").notEmpty().withMessage("the email field is required!"),
   body("password").notEmpty().withMessage("the password field is required!"),
   login
)

authRouter.post(
   "/register",
   body("name").notEmpty().withMessage("the name field is required!"),
   body("email").notEmpty().withMessage("the email field is required!"),
   body("email").isEmail().withMessage("not an email!"),
   body("email").custom((value) => {
      return User.findOne({ email: value }).then((user) => {
         if (user) return Promise.reject("E-mail already in use")
      })
   }),
   body("password").notEmpty().withMessage("the password field is required!"),
   body("photo").notEmpty().withMessage("the photo field is required!"),
   register
)

export default authRouter
