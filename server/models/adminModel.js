const { Pool } = require('pg');
const PG_URI = process.env.DB;
const pool = new Pool({
  connectionString: PG_URI,
});

// updated syntax for adminModel to prevent leaks
module.exports = {
  query: async (text, params, callback) => {
    // Acquire a connection
    const client = await pool.connect(); 
    try {
      const result = await client.query(text, params, callback);
      return result;
    } catch (e) {
      console.error('Error from adminModel.js', e);
      // Re-throw the error to be caught by the middleware
      throw e; 
    } finally {
      // Close the client and release the connection back to the pool
      client.end(); 
    }
  },
};
