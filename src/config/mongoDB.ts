import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const { MANGO_USERNAME, MANGO_PASSWORD_OAKLINE } = process.env;

if (!MANGO_USERNAME || !MANGO_PASSWORD_OAKLINE) {
  throw new Error('Missing MongoDB credentials in .env');
}

const MONGO_OAKLINE_URL = `mongodb+srv://${encodeURIComponent(MANGO_USERNAME)}:${encodeURIComponent(MANGO_PASSWORD_OAKLINE)}@oakline-cluster-aws.mvm1w6a.mongodb.net/?appName=oakline-cluster-aws`;

const connectToOakLine = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_OAKLINE_URL,{dbName: 'oakline'});
    console.log(`MongoDB Connected successfully to ${mongoose.connection.name}`);
  } catch (err) {
    console.error(err instanceof Error ? err.message : err);
    process.exit(1);
  }
};

export default connectToOakLine;