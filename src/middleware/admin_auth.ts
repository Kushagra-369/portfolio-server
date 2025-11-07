// import jwt  from 'jsonwebtoken'
// import { errorHandling } = require('../error/errorhandling')
// require('dotenv').config()
// exports.AdminAuthenticate = (req, res, next) => {
//     try {
//         const token = req.headers["x-api-key"]
//         if (!token) { return res.status(400).send({ status: false, msg: "Token must be present" }) }

//         const decodedToken = jwt.verify(token, process.env.AdminTokenKey)
//         req.admin = decodedToken.adminId
//         next()
//     }
//     catch (e) { errorHandling(e, res) }

// }

// exports.AdminAuthorize = (req, res, next) => {
//      try {
//         const jwtadminId = req.admin
//         const id = req.params.id
//         if(!id) return res.status(400).send({ status: false, msg: "id must be present" })
//         if (id != jwtadminId) { return res.status(400).send({ status: false, msg: "Unauthorized Admin" }) }
     
//         next()
//     }
//     catch (e) { errorHandling(e, res) }

// }