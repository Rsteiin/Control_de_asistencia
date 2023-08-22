//Mysql params for the connection string

const mySqlConfig = {
  db:{
    connectionLimit : 50000,
    host: process.env.URL,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database : process.env.DATABASE
  },
  //add pagnation params if needed 
  listPerPage: 10,
};

module.exports = mySqlConfig