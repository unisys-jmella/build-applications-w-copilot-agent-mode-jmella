import mongoose from 'mongoose';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

export const connectDatabase = async () => {
  try {
    await mongoose.connect(connectionString);
    console.log(`Connected to MongoDB at ${connectionString}`);
    return mongoose.connection;
  } catch (error) {
    console.error('Error connecting to octofit_db:', error);
    throw error;
  }
};

mongoose.connection.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

export default mongoose.connection;
