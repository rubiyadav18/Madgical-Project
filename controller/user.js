
const bcrypt = require("bcrypt")
const User = require("../models/user") 
const{generateJwtToken}=require("../middleware/auth")

module.exports.Signup= async (req, res) => {
    try {
         const {userName,password} = req.body;

      if (!(userName &&  password)) {
        res.status(400).send("All input is required");
      }
      const oldUser = await User.findOne({userName }); 
      if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
      }
  
      //Encrypt user password
      encryptedPassword = await bcrypt.hash(password, 10);
      // Create user in our database
      const user = await User.create({
        userName,
        time:Date.now(),
        password: encryptedPassword,
      });
      const token = generateJwtToken(user)
      user.token = token;
      res.status(201).json(user);
    } catch (err) {
      console.log(err);
    }
  };


  //login

  module.exports.Login= async (req, res) => {

    
    try {
      const { userName, password } = req.body;
  
      if (!(userName && password)) {
        res.status(400).send("All input is required");
      }
      const user = await User.findOne({userName });
      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = generateJwtToken(user)
        user.token = token;
        // user
        res.status(200).json(user);
      }
      res.status(400).send("Invalid Credentials");
    } catch (err) {
      console.log(err);
    }
    
  };