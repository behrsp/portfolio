const { Pool, neonConfig } = require('@neondatabase/serverless')
const ws = require('ws')

neonConfig.webSocketConstructor = ws
const connectionString = "postgresql://neondb_owner:npg_w9PSrt2bgdeG@ep-polished-pine-ac1yf9iq-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require"

async function test() {
  const pool = new Pool({ connectionString })
  try {
    const client = await pool.connect()
    const res = await client.query('SELECT NOW()')
    console.log('Result:', res.rows[0])
    await client.release()
  } catch (err) {
    console.error('Error connecting:', err)
  } finally {
    await pool.end()
  }
}

test()
