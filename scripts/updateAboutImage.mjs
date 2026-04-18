import fs from 'node:fs';
import mongoose from 'mongoose';

const env = fs.readFileSync('.env.local', 'utf8');
const mongoUri = (env.match(/^MONGODB_URI=(.*)$/m) || [])[1];

if (!mongoUri) {
  throw new Error('MONGODB_URI not found in .env.local');
}

await mongoose.connect(mongoUri);

const db = mongoose.connection.db;
const aboutImage = '/assets/img3.jpeg';

await db.collection('globalsettings').updateOne(
  {},
  {
    $set: {
      aboutImage,
    },
  },
  { upsert: true }
);

const settings = await db.collection('globalsettings').findOne({});
console.log('aboutImage set to:', settings?.aboutImage || '');

await mongoose.disconnect();
