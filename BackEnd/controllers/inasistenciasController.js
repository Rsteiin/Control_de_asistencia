const con = require('../database/mySqlConnection');
const moment = require('moment');

const  diasEnUnMes = (mes, año) => {
	return new Date(año, mes, 0).getDate();
}

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
			FROM inasistencia i
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
			INSERT INTO inasistencia (consola_id, usuario_id, fecha_de_creacion) values ( ?, ?, ?);
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
  },

	getInasistenciasPorInstitucion: async (req, res) => {
		const{ institucion } = req.body;

		if(institucion === undefined){
			return res.status(401).json({
        success : false,
        error : "Bad request",
        message : "invalid json" 
      });
    }

		try{
			let today = new Date(); 
			let year = today.getFullYear();
			let month = today.getMonth() +1;
			let numero = diasEnUnMes(month,year);
			if(month < 10 ){
				month = "0"+month
			}
			let date_begin = year + "-" + month + "-" + "01 00:00:00";
			let date_end = year + "-" + month + "-" + numero + " 23:59:59";

			let strSql = `
      SELECT
      c.numero,
      a.nombre AS area,
      (SELECT COUNT(*)
      FROM inasistencia i
      WHERE i.consola_id = c.consola_id
      AND i.fecha_de_creacion BETWEEN ? AND ?) AS inasistencias
      FROM consola c 
      LEFT JOIN zonal z ON z.zonal_id = c.zonal_id 
      LEFT JOIN area a ON a.area_id  = z.area_id 
      LEFT JOIN institucion i2 ON i2.institucion_id =  c.institucion_id
      WHERE i2.siglas = ?
      AND  0 < (SELECT COUNT(*) 
      FROM inasistencia i 
      WHERE i.consola_id = c.consola_id
      AND i.fecha_de_creacion BETWEEN ? AND ?)
			`;

			let strSqlConsolas = `
      SELECT a.nombre AS area, count(*) AS cantidad
      FROM consola c
      LEFT JOIN zonal z ON z.zonal_id = c.zonal_id 
      LEFT JOIN area a ON a.area_id  = z.area_id 
      LEFT JOIN institucion i ON i.institucion_id = c.institucion_id 
      WHERE i.siglas = ?
      GROUP BY a.nombre 
			`;

			let strSqlConfig = `
      SELECT i.nombre AS institucion
	  	FROM institucion i 
	  	WHERE i.siglas = ?
			`;

			let variables =[[ date_begin, date_end, institucion, date_begin, date_end],[institucion], [institucion]];
			let consultas = [strSql, strSqlConsolas, strSqlConfig]

			const consulta = await con.query(consultas, variables, true, "SqlChange&&ParamsChange");

			const datos = consulta[0].map((inasistencia)=>({
				consola: inasistencia.numero,
				area: inasistencia.area,
				inasistencias: inasistencia.inasistencias,
				porcentaje: (inasistencia.inasistencias/93).toFixed(2) +"%"
			}))

			return res.status(200).json({
				inasistencias: datos,
				turnos: numero * 3,
				consolas_totales: consulta[1],
				institucion: consulta[2][0]?.institucion
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