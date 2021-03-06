const express = require('express')
const User = require('../models/User')

const router = express.Router()

const bcrypt = require('bcrypt');



//REGISTER
router.post('/register', async (req, res) => {
   try {
       const salt = await bcrypt.genSalt(10)
       const hashedPassword = await bcrypt.hash(req.body.password, salt)
       
       const user = await new User({
           username: req.body.username,
           email: req.body.email,
           password: hashedPassword
       })

       
       await user.save();
       res.status(201).json({
           msg: "user created", user
       })
    
   } catch (error) {
       res.status(500).json({
           msg: "something went wrong"
       })
   }
})

router.post('/login', async (req,res) => {
   try {
    const user = await User.findOne({email: req.body.email});
    !user && res.status(404).json("wrong credentials")

    const validPassword = await bcrypt.compare(req.body.password, user.password)
     !validPassword && res.status(400).json("wrong credentials")

     res.status(200).json(user)
     console.log(user)
   } catch (error) {
      res.status(500).json({
          msg: "Something went wrong"
      }) 
   }
})



module.exports = router;