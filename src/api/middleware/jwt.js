import jwt from 'jsonwebtoken'

export const isAuth = (req, res, next) => {
   const { authorization } = req.headers

   if (!authorization)
      return res.status(401).json({ message: 'you must be logged in' })

   const token = authorization.replace('Bearer ', '')
   jwt.verify(token, process.env.JWT_SECRET || 'secret', (err, decode) => {
      if (err) return res.status(401).json({ message: 'Invalid token', err })
      req.user = decode
      next()
   })
}

export const isAdmin = (req, res, next) => {
   if (req.user && req.user.isAdmin) {
      next()
   } else {
      res.status(401).json({ message: 'Invalid Admin Token' })
   }
}
