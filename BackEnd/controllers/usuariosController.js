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
      u.grupo,
      u.turno_id AS turno,
      z.zonal_id,
      l.nombre AS zonal,
      a.nombre AS area
      FROM usuario u
      LEFT JOIN zonal z ON z.zonal_id = u.zonal_id
      LEFT JOIN area a ON a.area_id = z.zonal_id 
      LEFT JOIN locacion l ON l.locacion_id = z.locacion_id 
      LEFT JOIN turno t ON t.turno_id  = u.turno_id 
      ORDER BY u.fecha_de_creacion DESC
      `;

      strSql = strSql + "LIMIT " + limit + " OFFSET " + (page - 1) * limit;

      let count = 0;
      if(page === 1){
        let strSql = `
        SELECT COUNT (*) AS count
        FROM usuario u
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
      UPDATE usuario
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
      FROM usuario u 
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
        UPDATE usuario 
        SET nombre = ?, apellido = ?, correo = ?, zonal_id = ?, turno_id = ?, grupo = ? 
        
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
//insert into usuario values (1, 1, 1, "ESTEBAN", "ANDRES", "ANDALUZ", "CARVAJAL","admin1@ecu.gob.ec","$2a$12$mZKvYhUrgwjlJAxdfBxOnOwCZZ4SOKrQYYx5FDiTJGMoO7/k35q4q","ADMINISTRADOR",1,"A",now());

        let strSqlInsert = `
        INSERT INTO usuario (zonal_id, turno_id, nombre, segundo_nombre, apellido, segundo_apellido, correo, contrasena, rol, estado, grupo, fecha_de_creacion)
        VALUES( ?, ?, ?, ?, ?, ?, ?,?, "AGENTE", 1, ?, now())
        `
        let variables;
        await bcrypt.hash(contrasena, 10,).then((hash)=>{
          variables = [zonal_id, turno, nombre.toUpperCase(), segundo_nombre? segundo_nombre.toUpperCase():"", apellido.toUpperCase(), segundo_apellido ? segundo_apellido.toUpperCase(): "", correo, hash, grupo ] ;
          
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