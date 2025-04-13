// test-neo4j.ts
import neo4j from 'neo4j-driver';
import * as dotenv from 'dotenv';
dotenv.config();

const driver = neo4j.driver(
  process.env.NEO4J_URI!,
  neo4j.auth.basic(process.env.NEO4J_USER!, process.env.NEO4J_PASSWORD!)
);

async function testConnection() {
  const session = driver.session();
  try {
    const res = await session.run('RETURN 1');
    console.log('✅ Neo4j connected:', res.records);
  } catch (err) {
    console.error('❌ Neo4j failed:', err);
  } finally {
    await session.close();
    await driver.close();
  }
}

testConnection();
