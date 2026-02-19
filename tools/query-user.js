const mysql = require('mysql2/promise')

async function main() {
  const conn = await mysql.createConnection({
    host: process.env.MYSQL_HOST || '127.0.0.1',
    port: parseInt(process.env.MYSQL_PORT || '3306'),
    user: process.env.MYSQL_USER || 'ksystem',
    password: process.env.MYSQL_PASSWORD || 'Ksave2025Admin',
    database: process.env.MYSQL_DATABASE || 'ksystem',
    connectTimeout: 10000
  })

  try {
    const [rows] = await conn.execute("SELECT userId, userName, password, name, typeID FROM user_list WHERE userName = 'admin' LIMIT 5")
    console.log('Rows:', rows)
  } catch (e) {
    console.error('Query error:', e.message || e)
  } finally {
    try { await conn.end() } catch (e) {}
  }
}

main()
