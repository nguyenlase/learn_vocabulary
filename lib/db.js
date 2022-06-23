// Require and initialize outside of your main handler
const mysql = require('serverless-mysql')({
    config: {
      host     : process.env.MYSQL_HOST,
      database : process.env.MYSQL_DATABASE,
      user     : process.env.MYSQL_USERNAME,
      password : process.env.MYSQL_PASSWORD
    }
  })
   
  // Main handler function
export const sql_query = async (event, context = []) => {
    // Run your query
    let results = await mysql.query(event,context)
   
    // Run clean up function
    await mysql.end()
   
    // Return the results
    return results
  }