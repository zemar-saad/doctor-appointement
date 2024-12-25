const {login ,logOut,register ,getUserDetails,getAllUsers} = require("../controllers/UserController")

const router = require("express").Router()

router.post("/login", login)
router.post("/register",register)
router.post("/logout/:id",logOut)
router.get('/getdetails' , getUserDetails)
router.get('/getusers' , getAllUsers)

module.exports = router