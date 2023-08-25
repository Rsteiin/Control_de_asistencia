const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const con = require('../database/mySqlConnection');

const generateAccessToken = (username) => {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: "86400s" });
};

const validator = (password,baseHash) =>{
  return bcrypt.compareSync(password, baseHash);
}

const checkCredentials = (result,password) =>{
  if (result.length > 0){
    if(validator(password, result[0].contrasena)){
      if(result[0].estado === 0){
        return false;
      }
      return true;
    }
  }
  return false;
}

const apiController = {

  signIn: async (req,res) => {
    const {usuario, contrasena} = req.body;
    const correo = usuario;
    
    if(correo === undefined || contrasena === undefined){
      return res.status(401).json({
        success : false,
        error : "Bad request",
        message : "No existen credenciales" 
      });
    }

    try{
      const strSqlUser = `
      SELECT 
      u.usuario_id,
      CONCAT(ifnull(u.nombre,""),' ',ifnull(u.segundo_nombre,"")) AS apellido,
      CONCAT(ifnull(u.apellido,""),' ',ifnull(u.segundo_apellido,"")) AS apellido,
      u.correo,
      u.rol,
      u.estado,
      u.contrasena,
      z.zonal_id,
      z.nombre AS zonal,
      z.area 
      FROM usuarios u
      LEFT JOIN zonales z on z.zonal_id = u.zonal_id 
      WHERE correo = ?`;
      
      let resultUser = await con.query(strSqlUser,[correo]);

      if(checkCredentials(resultUser,contrasena)){
        return res.status(200).json({
          success : validator,
          access : "Authorizado",
          usuario_id: resultUser[0]?.usuario_id,
          nombre: resultUser[0]?.nombre,
          apellido: resultUser[0]?.apellido,
          correo: resultUser[0]?.correo,
          rol: resultUser[0]?.rol,
          estado: resultUser[0]?.estado,
          zonal_id: resultUser[0]?.zonal_id,
          zonal: resultUser[0]?.zonal,
          area: resultUser[0]?.area,
          token : generateAccessToken({correo})
        });
      } 
      return res.status(403).json({
        success : false,
        error : "Denegado",
        message : "Credenciales incorrectas"
      }); 
    }catch(e){
      console.log(e)
      return res.status(500).json({
        success :false,
        error : e, 
        message: "Validator"
      })
    }
  },
};
module.exports = apiController;