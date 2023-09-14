const { Pool } = require('pg');
const PG_URI = process.env.DB;
const pool = new Pool({
  connectionString: PG_URI,
});

// OLD MODEL SYNTAX (ALLOWED LEAKS)
// module.exports = {
//   query: async (text, params, callback) => {
//     try{  
//       const result = await pool.query(text, params, callback);
//       return result;
//     }
//     catch(e){
//       console.log('error', e, 'from employeeModel.js' )
//     }
//   }
// };

// NEW SYNTAX FOR THE MODEL THAT PREVENTS LEAKS
module.exports = {
  query: async (text, params, callback) => {
    // Acquire a connection
    const client = await pool.connect(); 
    try {
      const result = await client.query(text, params, callback);
      return result;
    } catch (e) {
      console.error('Error from employeeModel.js', e);
      // Re-throw the error to be caught by the middleware
      throw e; 
    } finally {
      // Close the client and release the connection back to the pool
      client.end(); 
    }
  },
};