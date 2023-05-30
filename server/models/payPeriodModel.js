const { Pool } = require('pg');
const PG_URI = process.env.DB;
const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: async (text, params, callback) => {
    try{  
      const result = await pool.query(text, params, callback);
      return result;
    }
    catch(e){
      console.log('error', e, 'from payPeriodModel.js' )
    }
  }
};
