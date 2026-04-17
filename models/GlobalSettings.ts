import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface IGlobalSettings extends Document {
  heroTitle: string;
  heroSubTitle: string;
  heroDescription: string;
  stats: { label: string; value: string }[];
  socials: { platform: string; url: string }[];
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
}

const GlobalSettingsSchema = new Schema<IGlobalSettings>({
  heroTitle: { type: String, default: 'Vision of Akash' },
  heroSubTitle: { type: String, default: 'Creative Director & Influencer' },
  heroDescription: { type: String, default: 'Blending cinematic storytelling with digital influence.' },
  stats: [
    { label: { type: String }, value: { type: String } }
  ],
  socials: [
    { platform: { type: String }, url: { type: String } }
  ],
  contactEmail: { type: String },
  contactPhone: { type: String },
  contactAddress: { type: String },
});

export default models.GlobalSettings || model<IGlobalSettings>('GlobalSettings', GlobalSettingsSchema);
