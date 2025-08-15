import mysql from 'mysql2/promise';

const DB_NAME = 'your_db';

const initialConfig = {
  host: 'localhost',
  user: 'root',
  password: 'wasqer',
  waitForConnections: true,
  connectionLimit: 10
};

async function initializeDB() {
    let pool;

    try {
        const tempConnection = await mysql.createConnection(initialConfig);
        const [rows] = await tempConnection.query(
        `SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?`, 
        [DB_NAME]
        );

        if (rows.length === 0) {
        await tempConnection.query(`CREATE DATABASE ${DB_NAME}`);
        console.log(`✅ Database '${DB_NAME}' created`);
        }

        pool = mysql.createPool({
      ...initialConfig,
      database: DB_NAME,
      waitForConnections: true,
      connectionLimit: 10
    });

    // Test connection
    const conn = await pool.getConnection();
    console.log(`Connected to database '${DB_NAME}'`);
    conn.release();

    } catch (error) {
        console.error('Database initialization failed:', err.message);
        process.exit(1);
    }

    return pool;
}

// Export the initialized pool
// const dbConnection = await initializeDB();
export default initializeDB;