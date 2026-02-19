#!/usr/bin/env node
/**
 * Test Database Connection Script
 * ตรวจสอบการเชื่อมต่อฐานข้อมูลทั้งหมด
 */

const mysql = require('mysql2/promise');

// Load .env.local manually if exists
const fs = require('fs');
const path = require('path');
const envPath = path.join(__dirname, '.env.local');
if (fs.existsSync(envPath)) {
  const envFile = fs.readFileSync(envPath, 'utf8');
  envFile.split('\n').forEach(line => {
    const match = line.match(/^([^=:#]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim();
      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  });
}

const configs = {
  main: {
    name: 'Main Database (mysql.ts)',
    host: process.env.MYSQL_HOST || '127.0.0.1',
    port: parseInt(process.env.MYSQL_PORT || '3306'),
    user: process.env.MYSQL_USER || 'ksystem',
    password: process.env.MYSQL_PASSWORD || 'Ksave2025Admin',
    database: process.env.MYSQL_DATABASE || 'ksystem',
  },
  user: {
    name: 'User Database (mysql-user.ts)',
    host: process.env.MYSQL_HOST || process.env.MYSQL_USER_HOST || 'localhost',
    port: parseInt(process.env.MYSQL_PORT || process.env.MYSQL_USER_PORT || '3306'),
    user: process.env.MYSQL_USER || process.env.MYSQL_USER_USER || 'ksystem',
    password: process.env.MYSQL_PASSWORD || process.env.MYSQL_USER_PASSWORD || 'Ksave2025Admin',
    database: process.env.MYSQL_DATABASE || process.env.MYSQL_USER_DATABASE || 'ksystem',
  },
  customer: {
    name: 'Customer Database (mysql-customer.ts)',
    host: process.env.MYSQL_CUSTOMER_HOST || process.env.MYSQL_HOST || 'localhost',
    port: parseInt(process.env.MYSQL_CUSTOMER_PORT || process.env.MYSQL_PORT || '3306'),
    user: process.env.MYSQL_CUSTOMER_USER || process.env.MYSQL_USER || 'ksystem',
    password: process.env.MYSQL_CUSTOMER_PASSWORD || process.env.MYSQL_PASSWORD || 'Ksave2025Admin',
    database: process.env.MYSQL_CUSTOMER_DATABASE || 'ksystem',
  },
  ksave: {
    name: 'K-save Database (mysql-ksave.ts)',
    host: process.env.MYSQL_HOST || '127.0.0.1',
    port: Number(process.env.MYSQL_PORT || 3306),
    user: process.env.MYSQL_USER || 'ksystem',
    password: process.env.MYSQL_PASSWORD || 'Ksave2025Admin',
    database: 'ksystem',
  }
};

async function testConnection(name, config) {
  console.log(`\n🔍 Testing ${name}...`);
  console.log(`   Host: ${config.host}:${config.port}`);
  console.log(`   User: ${config.user}`);
  console.log(`   Database: ${config.database}`);

  try {
    const connection = await mysql.createConnection({
      host: config.host,
      port: config.port,
      user: config.user,
      password: config.password,
      database: config.database,
      connectTimeout: 5000
    });

    // Test query
    const [rows] = await connection.execute('SELECT DATABASE() as db, USER() as user, NOW() as time');

    console.log(`   ✅ Connection successful!`);
    console.log(`   📊 Connected to: ${rows[0].db}`);
    console.log(`   👤 User: ${rows[0].user}`);
    console.log(`   ⏰ Server time: ${rows[0].time}`);

    await connection.end();
    return true;
  } catch (error) {
    console.log(`   ❌ Connection failed!`);
    console.log(`   Error: ${error.message}`);
    return false;
  }
}

async function testAllConnections() {
  console.log('========================================');
  console.log('🔗 Database Connection Test');
  console.log('========================================');

  const results = {};

  for (const [key, config] of Object.entries(configs)) {
    results[key] = await testConnection(config.name, config);
  }

  console.log('\n========================================');
  console.log('📊 Test Summary');
  console.log('========================================');

  let successCount = 0;
  for (const [key, success] of Object.entries(results)) {
    const status = success ? '✅ PASS' : '❌ FAIL';
    console.log(`${status} - ${configs[key].name}`);
    if (success) successCount++;
  }

  console.log('========================================');
  console.log(`Total: ${successCount}/${Object.keys(results).length} connections successful`);
  console.log('========================================\n');

  process.exit(successCount === Object.keys(results).length ? 0 : 1);
}

testAllConnections();
