const con = require("../database/mySqlConnection");

const personController = {
  getPersonQueue: async (req, res) => {
    //Date from the sent from the front-end
    const {
      owner,
      id_automation,
      date_beg,
      date_end,
      term,
      page,
      limit,
      paginate,
    } = req.body;
    if (owner === undefined || id_automation === undefined) {
      return res.status(404).json({
        error: "Bad request",
        success: false,
      });
    }
    let fecha = new Date();
    let today =
      fecha.getFullYear() +
      "-" +
      (fecha.getMonth() + 1) +
      "-" +
      fecha.getDate();
    //Get the last week default

    let fecha_beg = fecha.setDate(fecha.getDate() - 7);
    let fecha_nueva = new Date(fecha_beg);
    let date_beg_send = date_beg ? date_beg : today;
    let date_end_send = date_end ? date_end : fecha_nueva;

    let strSql = `SELECT DISTINCT mapq.id_person, mp.name, mp.lastname, mp.user, mp.phone_country, mp.image_profile, mp.email, mp.date_registration, mp.phone,          id_person_interaction
    FROM man_automation_person_queue mapq
    LEFT JOIN man_person mp ON mp.id_person = mapq.id_person
    WHERE mp.user = ?
    AND mapq.id_automation = ?
    AND date(mapq.date_sent) BETWEEN ? 
    AND  ?
    AND mp.name LIKE '%${term ? term : ""}%'
    ORDER BY mapq.date_sent DESC`;

    if (paginate) {
      strSql = strSql + " LIMIT " + limit + " OFFSET " + (page - 1) * limit;
    }

    let strSqlCount = `SELECT DISTINCT COUNT(mapq.id_person) as total
      FROM man_automation_person_queue mapq
      LEFT JOIN man_person mp ON mp.id_person = mapq.id_person
      WHERE mp.user = ?
      AND mapq.id_automation = ?
      AND date(mapq.date_sent) BETWEEN ? 
      AND  ?
      AND mp.name LIKE '%${term ? term : ""}%'`;

    try {
      const result = await con.query(strSql, [
        owner,
        id_automation,
        date_beg_send,
        date_end_send,
      ]);
      const resultCount = await con.query(strSqlCount, [
        owner,
        id_automation,
        date_beg_send,
        date_end_send,
      ]);

      return res.status(200).json({
        result: result,
        total: resultCount[0].total,
        limit: limit,
        success: true,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        error: e,
        success: false,
      });
    }
  },

  getPersonMailEventsAutomation: async (req, res) => {
    const { id_campaign, id_person } = req.body;
    if (id_campaign === undefined || id_person === undefined) {
      return res.status(404).json({
        error: "Bad request",
        success: false,
      });
    }

    let strSql = `SELECT *
      FROM man_mail_events mme, man_mail_events_type mmet
      WHERE mme.internal_campaign = ?
      AND mme.event = mmet.event_english 
      And mme.internal_person = ?
      AND mme.event != 'Send'
      ORDER BY mme.datetime`;

    try {
      const result = await con.query(strSql, [id_campaign, id_person]);
      return res.status(200).json({
        result: result,
        success: true,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        error: e,
        success: false,
      });
    }
  },

  getPersonCategories: async (req, res) => {
    const { owner } = req.body;

    if (owner === undefined) {
      return res.status(404).json({
        error: "Bad Request",
        success: false,
      });
    }

    let strSql = `SELECT DISTINCT lg.description as category, lg.id as id_log_group 
    FROM log_groups lg 
    where username = ?`;

    try {
      const result = await con.query(strSql, [owner]);
      return res.status(200).json({
        result: result,
        success: true,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        error: e,
        success: false,
      });
    }
  },

  getPersonByCategory: async (req, res) => {
    const { id_log_group } = req.body;

    if (id_log_group === undefined) {
      return res.status(404).json({
        error: "Bad Request",
        success: false,
      });
    }

    let strSql = `SELECT  DISTINCT  lgp.id_person, mp.name, mp.second_name, mp.lastname, mp.second_lastname  
    FROM log_group_person lgp, man_person mp   
    WHERE lgp.id_group  = ?
    AND lgp.id_person = mp.id_person  `;

    try {
      const result = await con.query(strSql, [id_log_group]);
      return res.status(200).json({
        result: result,
        success: true,
      });
    } catch (e) {
      return res.status(500).json({
        error: e,
        success: false,
      });
    }
  },

  getPersonBySchedule: async (req, res) => {
    const { id_schedule_definition } = req.body;

    if (id_schedule_definition === undefined) {
      return res.status(404).json({
        error: "Bad Request",
        success: false,
      });
    }

    try {
      let strSql = `
      SELECT  mp.name, mp.lastname, mp.id_person
      FROM apo_appointment_schedule_definition_person aasdp, man_person mp
      WHERE aasdp.id_schedule_definition = ?
      AND aasdp.id_person = mp.id_person
      `;

      const result = await con.query(strSql, [id_schedule_definition]);

      return res.status(200).json({
        success: true,
        result: result,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        error: e,
        success: false,
      });
    }
  },
  getPersonTraitsMessages: async (req, res) => {
    const { id_person, owner } = req.body;
    if (id_person === undefined || owner === undefined) {
      return res.status(404).json({
        error: "Bad Request",
        success: false,
      });
    }
    try {
      let strSqlLastMessage = `
      SELECT max(datetime_created) as last_message_date ,count_messages, source
      FROM box_chat bc 
      WHERE bc.user = ?
      AND id_person_costumer = ?
      `;
      let resultLastMessage = await con.query(strSqlLastMessage, [
        owner,
        id_person,
      ]);

      let strSqlChannels = `SELECT DISTINCT bit2.description as channel
        FROM box_chat bc, box_inbox_type bit2 
        WHERE bc.user = ?
        AND id_person_costumer = ?
        AND source = bit2.inbox_type 
          `;
      const resultChannels = await con.query(strSqlChannels, [
        owner,
        id_person,
      ]);

      let strSqlInboxes = `SELECT DISTINCT bi.name as inbox
        FROM box_chat bc, box_inbox bi 
        WHERE bc.user = ?
        AND id_person_costumer = ?
        AND bc.inbox_number = bi.id_inbox 
`;
      const resultInboxes = await con.query(strSqlInboxes, [owner, id_person]);

      let strSqlMessages = `SELECT COUNT(id_chat) as messages
        FROM box_chat bc 
        WHERE bc.user = ?
        AND id_person_costumer = ?
        `;
      const resultMessages = await con.query(strSqlMessages, [
        owner,
        id_person,
      ]);

      let result = {
        last_message: resultLastMessage ? resultLastMessage[0] : null,
        channels: resultChannels,
        inboxes: resultInboxes,
        messages: resultMessages[0]?.messages,
      };
      return res.status(200).json({
        success: true,
        result: result,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        error: e,
        success: false,
      });
    }
  },
  getPersonAdditionalInfo: async (req, res) => {
    const { id_person } = req.body;

    if (id_person === undefined) {
      return res.status(404).json({
        error: "Bad Request",
        success: false,
      });
    }

    let strSql = `SELECT nombres as "Nombre", estado_civil as "Estado civil", STR_TO_DATE(fecha_nacimiento, '%d/%m/%Y') as "Fecha de nacimiento", 
    sexo as "Género", correo as "Correo", direccion1 as "Dirección 1", 
    direccion2 as "Dirección 2", direccion3 as "Dirección 3", telefono1 as "Teléfono 1",
    telefono2 as "Teléfono 2", telefono3 as "Teléfono 3", e1.prov_pais as "Provincia", e1.cant_nom as "Cantón", 
    e1.parr_nom as "Parroquia" 
    FROM man_person_enriched_data e1
    WHERE e1.id_person = ?`;

    try {
      const result = await con.query(strSql, [id_person]);
      return res.status(200).json({
        result: result,
        success: true,
      });
    } catch (e) {
      return res.status(500).json({
        error: e,
        success: false,
      });
    }
  },
};

module.exports = personController;
