import mongoose from 'mongoose';

const { Schema } = mongoose;

export const User = mongoose.model(
  'User',
  new Schema(
    {
      username: { type: String, required: true, unique: true },
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      teamId: { type: Number, required: true },
      createdAt: { type: Date, default: Date.now }
    },
    { collection: 'users' }
  )
);

export const Team = mongoose.model(
  'Team',
  new Schema(
    {
      name: { type: String, required: true },
      members: { type: Number, required: true },
      sport: { type: String, required: true },
      createdAt: { type: Date, default: Date.now }
    },
    { collection: 'teams' }
  )
);

export const Activity = mongoose.model(
  'Activity',
  new Schema(
    {
      userId: { type: Number, required: true },
      type: { type: String, required: true },
      durationMinutes: { type: Number, required: true },
      calories: { type: Number, required: true },
      date: { type: Date, default: Date.now }
    },
    { collection: 'activities' }
  )
);

export const LeaderboardEntry = mongoose.model(
  'LeaderboardEntry',
  new Schema(
    {
      rank: { type: Number, required: true },
      username: { type: String, required: true },
      points: { type: Number, required: true }
    },
    { collection: 'leaderboard' }
  )
);

export const Workout = mongoose.model(
  'Workout',
  new Schema(
    {
      title: { type: String, required: true },
      difficulty: { type: String, required: true },
      durationMinutes: { type: Number, required: true },
      focusArea: { type: String, required: true },
      equipment: { type: [String], default: [] }
    },
    { collection: 'workouts' }
  )
);
