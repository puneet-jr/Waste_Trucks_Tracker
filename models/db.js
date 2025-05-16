import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: process.env.password,
  database: 'junkyard'
});

export async function getConnection() {
  return pool.getConnection();
}

export async function execute(...args) {
  const conn = await getConnection();
  try {
    return await conn.execute(...args);
  } finally {
    conn.release();
  }
}
