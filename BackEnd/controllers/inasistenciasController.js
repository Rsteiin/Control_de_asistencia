const con = require('../database/mySqlConnection');
const moment = require('moment');
const inasistenciasController = {

  guardarInasistencias :async (req, res) => {
    const {consolas, usuario_id, turno } = req.body;

		if(consolas === undefined ||
			usuario_id === undefined ||
			turno === undefined
    ){
			return res.status(401).json({
        success : false,
        error : "Bad request",
        message : "invalid json" 
      });
    }

		try{
			//comprobar si ya se guardo la asistencia por turno y usuario_id
			let fecha_inicial;
			let fecha_final;
			let strSqlVerificar = `
			SELECT COUNT(*) AS registros
			FROM inasistencias i
			WHERE i.usuario_id = ?
			AND fecha_de_creacion BETWEEN ? AND ? 
			`;
			if(turno === "MAÑANA"){
				fecha_inicial = moment().format("YYYY-MM-DD") +" 08:00:00";
				fecha_final = moment().format("YYYY-MM-DD") +" 16:59:59";
			}

			if(turno === "TARDE"){
				fecha_inicial = moment().format("YYYY-MM-DD") +" 17:00:00";
				fecha_final = moment().format("YYYY-MM-DD") +" 23:59:59";
			}

			if(turno === "VELADA"){
				fecha_inicial = moment().format("YYYY-MM-DD") +" 00:00:00";
				fecha_final = moment().format("YYYY-MM-DD") +" 07:59:59";
			}

			const verification = await con.query(strSqlVerificar,[usuario_id, fecha_inicial, fecha_final]);
			
			if(verification[0].registros){
				return res.status(200).json({
					success: false,
					message: `Este usuario ya ha registrado la asistencia para el turno de la ${turno}`
				})
			}

			const fecha_registro = moment().format('YYYY-MM-DD HH:mm:ss');

			let insertInasistencia = `
			INSERT INTO inasistencias (consola_id, usuario_id, fecha_de_creacion) values ( ?, ?, ?);
			`;

			let variables = consolas.map((consola)=>([
				consola.consola_id,
				usuario_id,
				fecha_registro
			]))
			
			await con.query(insertInasistencia, variables, true, "ParamsChange");

			return res.status(200).json({
				success:true,
				message:"Registros guardados de manera correcta"
			})


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

module.exports = inasistenciasController;