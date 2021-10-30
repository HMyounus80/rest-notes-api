const jwt = require('jsonwebtoken');
const User = require('../models/user')

module.exports.auth = async(req, res, next) =>{
    if(req.signedCookies){
        //accessing cookies
       const token = req.signedCookies['auth']
       try {
            //verify token
       const decoded = jwt.verify(token, 'SecretKey');
       //Getting User
       const user = await User.findById(decoded.id);
       req.user = user;
       next()
       } catch (error) {
           res.status(401).send('UnAuthorized Access')
       }
      
       
    }else{
        res.status(401).send('No token Provided or Unauthorized')
    }
  };
  