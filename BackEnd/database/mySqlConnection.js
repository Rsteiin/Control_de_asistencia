const mysql = require('mysql2/promise');
const mySqlConfig = require('./mySqlConfig');

/* Create a new connection,execute a query with the following params (sql,params) and return the result.

sql is the DML (SELECT, INSERT, UPDATE, DELETE). Add params if pagination needed
*/

async function query(sql, params, mutiple, option) {
  const connection = await mysql.createConnection(mySqlConfig.db);
  if(mutiple){
    let results = [];
    if(option === "SqlChange&&ParamsChange"){
      await Promise.all(sql.map(async (sqlQuery,index)=>{
        let partialResult = await connection.execute(sqlQuery,params[index]);
        results.push(partialResult[0]);
      }));
    }
    if(option === "ParamsChange"){
      await Promise.all(params.map(async (param)=>{
        let partialResult = await connection.execute(sql,param);
        results.push(partialResult[0]);
      }));
    }
    if(option === "SqlChange"){
      await Promise.all(sql.map(async (sqlQuery)=>{
        let partialResult = await connection.execute(sqlQuery,params);
        results.push(partialResult[0]);
      }));
    }
    await connection.end();
    return results;
  }else{
    const [results, ] = await connection.execute(sql,params);
    connection.end();
    return results;
  }
}

module.exports = {
  query
}