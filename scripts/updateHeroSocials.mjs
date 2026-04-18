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
      socials: [
        {
          platform: 'Instagram',
          url: 'https://www.instagram.com/vision_of_akash?igsh=dW5uZ3dzbG81eGVm&utm_source=qr',
        },
        {
          platform: 'YouTube',
          url: 'https://youtube.com/@vision_of_akash?si=LScxmjpcVumnSoQd',
        },
        {
          platform: 'Facebook',
          url: 'https://www.facebook.com/share/18PLMmgtDi/?mibextid=wwXIfr',
        },
      ],
    },
  },
  { upsert: true }
);

const settings = await db.collection('globalsettings').findOne({});
console.log('Updated socials:', JSON.stringify(settings?.socials || []));

await mongoose.disconnect();
