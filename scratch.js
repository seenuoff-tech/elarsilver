const mysql = require('mysql2/promise');

async function testConnection() {
  try {
    const connection = await mysql.createConnection({
      host: 'gateway01.ap-southeast-1.prod.aws.tidbcloud.com',
      port: 4000,
      user: '4AFu3c6bSmYFve3.root',
      password: 'r6Jyo6ipMzr7PyhF',
      database: 'sys',
      ssl: {
        rejectUnauthorized: true
      }
    });
    console.log('Connected to sys successfully');
    
    await connection.query('CREATE DATABASE IF NOT EXISTS test;');
    console.log('Database "test" ensured');
    await connection.end();
  } catch (err) {
    console.error('Connection failed:', err.message);
  }
}
testConnection();
