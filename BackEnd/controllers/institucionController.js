const con = require('../database/mySqlConnection');

const institucionController = {

	getInstituciones : async(req, res)=> {

		try{

			let strSql = `
			SELECT i.institucion_id, i.nombre, i.siglas
			FROM institucion i 
			`;

			const instituciones = await con.query(strSql,[]);
			
      return res.status(200).json({
        success: true,
        instituciones: instituciones,
      })

		}catch(e){
			return res.status(500).json({
        success : false,
        error : e,
        message : "Error en el servidor" 
      });
		}
	}
};

module.exports = institucionController;