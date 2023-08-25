const con = require('../database/mySqlConnection');

const usuariosController = {

  getUsers: async(req,res) =>{
    const {page, limit} = req.body;
    if(page === undefined || limit === undefined){
      return res.status(401).json({
        success : false,
        error : "Bad request",
        message : "invalid json" 
      });
    }

    try{
      let strSql = `
      SELECT  
      u.usuario_id,
      u.nombre,
      u.segundo_nombre,
      u.apellido,
      u.segundo_apellido,
      u.correo,
      u.rol,
      u.estado,
      u.turno,
      u.grupo,
      z.zonal_id,
      z.nombre AS zonal,
      z.area 
      FROM usuarios u
      LEFT JOIN zonales z on z.zonal_id = u.zonal_id 
      `;

      strSql = strSql + "LIMIT " + limit + " OFFSET " + (page - 1) * limit;

      let count = 0;
      if(page === 1){
        let strSql = `
        SELECT COUNT (*) AS count
        FROM usuarios u
        `;
        count = await con.query(strSql,[]);
      }

      const usuarios = await con.query(strSql,[]);

      return res.status(200).json({
        success: true,
        usuarios: usuarios,
        total: count[0].count, 
      })

    }catch(e){
      return res.status(500).json({
        success : false,
        error : e,
        message : "Error en el servidor" 
      });
    }
  },
  changeStatus: async (req, res) =>{
    const {usuario_id, estado} = req.body

    if(usuario_id === undefined || estado === undefined){
      return res.status(401).json({
        success : false,
        error : "Bad request",
        message : "invalid json" 
      });
    }

    try{
      
      let strSql = `
      UPDATE usuarios
      SET estado = ?
      WHERE usuario_id = ?;
      `;

      await con.query(strSql, [estado, usuario_id]);

      return res.status(200).json({
        success: true,
        message: `Se ha ${estado === 1 ? "activado" : "desactivado"} el usuario`
      }); 
    }catch(e){
      return res.status(500).json({
        success : false,
        error : e,
        message : "Error en el servidor" 
      });
    }
  }
};

module.exports = usuariosController