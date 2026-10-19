import mongoose from 'mongoose';

export async function connectToDB(): Promise<void> {
  await mongoose.connect(process.env.DATABASE_URL as string);
  console.log('Successfully connected to Database');
}
