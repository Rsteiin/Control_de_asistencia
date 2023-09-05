const con = require('../database/mySqlConnection');

const consolasController = {

  getConsolas: async(req, res) => {
    const {zonal_id} = req.body;

    if(zonal_id === undefined){
      return res.status(401).json({
        success : false,
        error : "Bad request",
        message : "Invalid json" 
      });
    }
    try{
      let strSqlConsolas = `
      SELECT c.consola_id, c.zonal_id, c.numero , i.nombre as institucion, i.siglas 
      FROM consola c
      left join institucion i on i.institucion_id = c.institucion_id
      WHERE c.zonal_id = ?
      `;

      const consolas = await con.query(strSqlConsolas, [zonal_id]);
      
      return res.status(200).json({
        success: true,
        message: "OK",
        consolas: consolas
      });

    }catch(e){
      console.log(e)
      return res.status(500).json({
        success :false,
        error : e, 
        message: "Server error"
      })
    }
  }
}

module.exports = consolasController;