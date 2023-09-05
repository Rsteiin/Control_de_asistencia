const con = require('../database/mySqlConnection');

const dashboardController = {

  getCharts: async (req, res) => {

  },

  getGraficaTurno: async (req, res) => {
    const { year, month, institucion, turnos } = req.body;

    if( year === undefined ||
      month === undefined ||
      institucion === undefined ||
      turno === undefined
      ){
        
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

