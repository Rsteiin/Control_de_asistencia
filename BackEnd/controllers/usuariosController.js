const con = require('../database/mySqlConnection');
const bcrypt = require('bcryptjs');

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
      ORDER BY u.fecha_de_creacion DESC
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
  },

  saveUser: async(req, res) => {
    const {usuario_id, nombre, segundo_nombre, apellido, segundo_apellido, correo, contrasena, zonal_id, turno, grupo } = req.body;
    if(
      nombre === undefined ||
      apellido === undefined ||
      correo === undefined ||
      zonal_id === undefined ||
      turno === undefined ||
      grupo === undefined 
    ){
      return res.status(401).json({
        success : false,
        error : "Bad request",
        message : "invalid json" 
      });
    }
   
    try{
      const strSqlVerifyMail = `
      SELECT u.correo, u.usuario_id 
      FROM usuarios u 
      WHERE u.correo = ? 
      `
      const verification = await con.query(strSqlVerifyMail, [correo]);

      if(usuario_id){ 
        if( verification.length > 0){
          if(usuario_id !== verification[0].usuario_id){
            return res.status(405).json({
              success:false,
              error: "Error al editar",
              message: "El correo se encuentra registrado con otro usuario."
            })
          }
        }

        let variables = [ nombre.toUpperCase(), apellido.toUpperCase(), correo, zonal_id, turno, grupo ];
        let strSqlUpdate =`
        UPDATE usuarios 
        SET nombre = ?, apellido = ?, correo = ?, zonal_id = ?, turno = ?, grupo = ? 
        
        `
        if(segundo_nombre){
          strSqlUpdate = strSqlUpdate + ", segundo_nombre  = ? ";
          variables.push(segundo_nombre.toUpperCase());
        }

        if(segundo_apellido){
          strSqlUpdate = strSqlUpdate + ", segundo_apellido = ? ";
          variables.push(segundo_apellido.toUpperCase());
        }

        strSqlUpdate = strSqlUpdate + " WHERE usuario_id = ?"

        variables.push(usuario_id);

        await con.query(strSqlUpdate, variables);

        return res.status(200).json({
          success: true,
          message: "Se ha editado de manera correcta el usuario"
        });

      }else{
        if(verification.length > 0){
          return res.status(405).json({
            success:false,
            error: "Error al guardar",
            message: "Correo ya registrado"
          })
        }

        let strSqlInsert = `
        INSERT INTO usuarios (zonal_id, nombre, segundo_nombre, apellido, segundo_apellido, correo, contrasena, rol, estado, turno, grupo, fecha_de_creacion)
        VALUES( ?, ?, ?, ?, ?, ?, ?, "AGENTE", 1, ?, ?, now())
        `
        let variables;
        await bcrypt.hash(contrasena, 10,).then((hash)=>{
          variables = [zonal_id, nombre.toUpperCase(), segundo_nombre? segundo_nombre.toUpperCase():"", apellido.toUpperCase(), segundo_apellido ? segundo_apellido.toUpperCase(): "", correo, hash, turno, grupo ] ;
          
        })

        await con.query(strSqlInsert,variables);  
        
        return res.status(200).json({
          success:true,
          message: "Se ha creado de manera correcta el usuario"
        })
        
      }

    }catch(e){
      console.log(e)
      return res.status(500).json({
        success : false,
        error : e,
        message : "Error en el servidor" 
      });
    }

  }
};

module.exports = usuariosController