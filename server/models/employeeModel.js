const { Pool } = require('pg');
const PG_URI = process.env.DB;
const pool = new Pool({
  connectionString: PG_URI,
});

// updated syntax for employeeModel to prevent leaks, and fixing the server crash
module.exports = {
  query: async (text, params, callback) => {
    try {  
      const client = await pool.connect();
      const result = await pool.query(text, params, callback);
      client.release();
      return result;
    }
    catch(e){
      console.log('error', e, 'from employeeModel.js' )
    }
  }
};