const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const con = require('../database/mySqlConnection');

const generateAccessToken = (username) => {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: "86400s" });
};

const validator = (password,baseHash) =>{
  return bcrypt.compareSync(password, baseHash.replace("$2y$", "$2a$"));
}

const checkCredentials = (result,password) =>{
  if (result.length > 0){
    if(validator(password, result[0].password)){
      return true;
    }
  }
  return false;
}

const apiController = {
  createToken: async (req,res) => {
    const {u, p} = req.body;

    if(u===undefined || p===undefined){

      return res.status(400).json({
        success : false,
        access : "denied",
        status : "No credentials"
      });

    }
    const strSqlAdmin = `SELECT password  FROM man_user mu
    WHERE username ='admin'
    AND status = '0'`;
    try{
      let resultAdmin = await con.query(strSqlAdmin);
      if(checkCredentials(resultAdmin,p)){
        return res.status(200).json({
            success : validator,
            access : "granted",
            token : generateAccessToken({u})
        });
      }
      const strSqlUser = `SELECT password  FROM man_user mu
      WHERE username = ?
      AND status = '0'`;
      let resultUser= await con.query(strSqlUser,[u]);
      if(checkCredentials(resultUser,p)){
        return res.status(200).json({
          success : validator,
          access : "granted",
          token : generateAccessToken({u})
        });
      } 
      return res.status(403).json({
        success : false,
        access : "denied",
        status : "username||password incorrect"
      }); 
    }catch(e){
      console.log(e)
      return res.status(500).json({
        success :false,
        access : "denied",
        error : e, 
        type:"Validator"
      })
    }
  },
};
module.exports = apiController;