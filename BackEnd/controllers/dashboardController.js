const con = require('../database/mySqlConnection');

const dashboardController = {

  getCharts: async (req, res) => {

  },

  getGraficaTurno: async (req, res) => {
    const { year, institucion, turnos, area} = req.body;

    if( year === undefined ||
      area === undefined ||
      institucion === undefined ||
      turnos === undefined ){
        return res.status(401).json({
          success : false,
          error : "Bad request",
          message : "invalid json" 
        });
      }

    try{
      let fecha_inicio = year + "-01-01 00:00:00";
      let fecha_fin = year + "-12-31 23:59:59";

      let strSql =`
      SELECT MONTH (fecha_de_creacion) AS mes, COUNT(*) cantidad, turno_id AS turno 
      FROM inasistencia i 
      LEFT JOIN consola c ON c.consola_id = i.consola_id 
      LEFT JOIN institucion i2 on i2.institucion_id = c.institucion_id 
      LEFT JOIN zonal z on z.zonal_id = c.zonal_id 
      WHERE i2.siglas = ?`

      strSql = strSql + " AND i.turno_id IN (" + turnos.toString() +") "
      
      if(area.length === 1){
        strSql = strSql + ` AND z.area_id = ${area[0]} `;
      }
      
      strSql = strSql + ` 
      AND i.fecha_de_creacion BETWEEN ? AND ?
      GROUP BY mes, turno_id 
      ORDER BY turno_id 
      `
      const datos = await con.query(strSql,[institucion, fecha_inicio, fecha_fin]);
      let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
      let turnos_nombres = ["MAÑANA", "TARDE", "VELADA"];
      let sendData =  []

      for(let j=0; j < meses.length;j++ ){
        let series = []
        for(let i=0; i < turnos.length ; i++){
          const found = datos.find(({ mes, turno }) => mes === (j+1) && turno===turnos[i]);
          series.push({
            name: turnos_nombres[turnos[i]-1],
            value: !!found ? found.cantidad : 0
          })
        }
        sendData.push({
          name :meses[j],
          series:series
        })
      }
      
      return res.status(200).json({
        success: true, 
        data: sendData,
      })
    }catch(e){
      console.log(e);
      return res.status(500).json({
        success : false,
        error : e,
        message : "Error en el servidor" 
      });
    }
    
    
  }



};

module.exports = dashboardController;

/**select c.numero as consola, Count(i.inasistencia_id) 
from inasistencia i
left join consola c on c.consola_id = i.consola_id 
left join institucion i2 on i2.institucion_id = c.institucion_id 
where i2.institucion_id = 12
and i.fecha_de_creacion between "2023-09-05 00:00:00" and "2023-09-05 23:59:59"
group by c.numero 
order by c.numero  */

