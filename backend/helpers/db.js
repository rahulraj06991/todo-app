  // mongoClient.js
const { MongoClient } = require('mongodb');

require('dotenv').config();

const uri = process.env.MONGO_URI
console.log(uri)
const dbName = 'todo-app';

let db;

async function connectToMongo() {
  if (db) return db;

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect();
  db = client.db(dbName);
  console.log('Connected to MongoDB');
  return db;
}

module.exports = { connectToMongo };