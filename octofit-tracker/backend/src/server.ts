import express from 'express';
import { connectDatabase } from './config/database.js';
import {
  Activity,
  LeaderboardEntry,
  Team,
  User,
  Workout
} from './models/index.js';

const app = express();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const frontendOrigin = codespaceName
  ? `https://${codespaceName}-5173.app.github.dev`
  : 'http://localhost:5173';
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());

app.use((req, res, next) => {
  const origin = req.headers.origin;
  const allowedOrigins = [frontendOrigin, 'http://localhost:5173', 'http://localhost:3000'];

  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else if (!origin && codespaceName) {
    res.setHeader('Access-Control-Allow-Origin', frontendOrigin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
    return;
  }

  next();
});

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'octofit-backend',
    port,
    apiBaseUrl,
    frontendOrigin
  });
});

app.get(['/api/users', '/api/users/'], async (_req, res) => {
  const users = await User.find().lean();
  res.json(users);
});

app.get(['/api/teams', '/api/teams/'], async (_req, res) => {
  const teams = await Team.find().lean();
  res.json(teams);
});

app.get(['/api/activities', '/api/activities/'], async (_req, res) => {
  const activities = await Activity.find().sort({ date: 1 }).lean();
  res.json(activities);
});

app.get(['/api/leaderboard', '/api/leaderboard/'], async (_req, res) => {
  const leaderboard = await LeaderboardEntry.find().sort({ points: -1, username: 1 }).lean();
  res.json(leaderboard);
});

app.get(['/api/workouts', '/api/workouts/'], async (_req, res) => {
  const workouts = await Workout.find().sort({ durationMinutes: 1 }).lean();
  res.json(workouts);
});

const startServer = async () => {
  await connectDatabase();
  app.listen(port, '0.0.0.0', () => {
    console.log(`Octofit backend listening on ${apiBaseUrl}`);
  });
};

startServer().catch((error) => {
  console.error('Failed to start Octofit backend:', error);
  process.exit(1);
});
