import fs from 'node:fs';
import mongoose from 'mongoose';

const env = fs.readFileSync('.env.local', 'utf8');
const mongoUri = (env.match(/^MONGODB_URI=(.*)$/m) || [])[1];

if (!mongoUri) {
  throw new Error('MONGODB_URI not found in .env.local');
}

await mongoose.connect(mongoUri);

const db = mongoose.connection.db;

await db.collection('globalsettings').updateOne(
  {},
  {
    $set: {
      stats: [
        { value: '1000+', label: 'Projects' },
        { value: '10K+', label: 'Followers' },
      ],
      heroBadgeText: 'ALL GUJARAT SERVICE AVAILABLE',
      heroBadgeShow: true,
    },
  },
  { upsert: true }
);

const settings = await db.collection('globalsettings').findOne({});
console.log('Updated stats:', JSON.stringify(settings?.stats || []));
console.log('Updated badge:', settings?.heroBadgeText, '| show:', settings?.heroBadgeShow);

await mongoose.disconnect();
