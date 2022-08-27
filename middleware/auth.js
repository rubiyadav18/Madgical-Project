
const jwt = require("jsonwebtoken");
const JWTkey = process.env.TOKEN_KEY
const User =require("../models/user")




module.exports.generateJwtToken = (user) => {
  return jwt.sign({ user },JWTkey, {
    expiresIn: "7d",
  });
};

module.exports.isAuthenticated = (req, res, next) => {
  if (req.headers.authorization) {
    console.log('entered authorization')
    const token = req.headers.authorization;
    if (token=="") res.status(401).json({ message: "Authorization required" });
    const user = jwt.verify(token, JWTkey);
    if (!user) res.status(401).json({ message: "Authorization required" });
    req.user = user.id;
    const checkuser = User.findById(req.user);

    if (checkuser) return next();
    return res.status(400).json({
      message: "User access denied"
    })
         
  } else {
    return res.status(401).json({ message: "Authorization required" });
  }

};
