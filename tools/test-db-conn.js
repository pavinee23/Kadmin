const mysql = require('mysql2/promise')

function getConfig(prefix) {
  // prefix: '' for main, 'MYSQL_USER_' for user DB env names
  const host = process.env[prefix ? 'MYSQL_USER_HOST' : 'MYSQL_HOST'] || process.env.MYSQL_HOST || 'localhost'
  const port = parseInt(process.env[prefix ? 'MYSQL_USER_PORT' : 'MYSQL_PORT'] || process.env.MYSQL_PORT || '3306', 10)
  const user = process.env[prefix ? 'MYSQL_USER_USER' : 'MYSQL_USER'] || process.env.MYSQL_USER || 'ksystem'
  const password = process.env[prefix ? 'MYSQL_USER_PASSWORD' : 'MYSQL_PASSWORD'] || process.env.MYSQL_PASSWORD || 'Ksave2025Admin'
  const database = process.env[prefix ? 'MYSQL_USER_DATABASE' : 'MYSQL_DATABASE'] || process.env.MYSQL_DATABASE || 'ksystem'
  return { host, port, user, password, database }
}

async function test(prefix, label) {
  const cfg = getConfig(prefix)
  console.log(`Testing ${label} DB connection to ${cfg.host}:${cfg.port} as ${cfg.user} (db: ${cfg.database})`)
  let conn
  try {
    conn = await mysql.createConnection({
      host: cfg.host,
      port: cfg.port,
      user: cfg.user,
      password: cfg.password,
      database: cfg.database,
      connectTimeout: 10000
    })
    const [rows] = await conn.execute('SELECT 1 AS ok')
    console.log(`${label} DB connected OK:`, rows)
  } catch (err) {
    console.error(`${label} DB connection FAILED:`, err.message || err)
  } finally {
    try { if (conn) await conn.end() } catch (e) {}
  }
}

(async () => {
  await test('', 'Main')
  await test('user', 'User')
})()
