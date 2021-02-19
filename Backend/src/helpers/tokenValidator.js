
const jwt = require("jsonwebtoken");

exports.tokenValidator =async (req, res, next)=>{
  const token = req.header("user_token");
  if (!token) {
    res.status(401).send("Access Denied");
  }
  try {
      const verified = await jwt.verify(token, process.env.SECRET_KEY);
      req.user = verified;
      next();
  } catch (error) {
      res.status(400).send('Error in Token');
  }
}