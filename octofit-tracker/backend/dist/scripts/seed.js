import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js';
// Seed the octofit_db database with test data
const users = [
    { username: 'alex', name: 'Alex Chen', email: 'alex@example.com', teamId: 1 },
    { username: 'maya', name: 'Maya Singh', email: 'maya@example.com', teamId: 2 },
    { username: 'leo', name: 'Leo Martinez', email: 'leo@example.com', teamId: 1 },
    { username: 'nina', name: 'Nina Patel', email: 'nina@example.com', teamId: 2 },
    { username: 'omar', name: 'Omar Hassan', email: 'omar@example.com', teamId: 3 }
];
const teams = [
    { name: 'Trail Blazers', members: 3, sport: 'Running' },
    { name: 'Peak Performers', members: 2, sport: 'Cycling' },
    { name: 'Harbor Hustlers', members: 4, sport: 'CrossFit' }
];
const activities = [
    { userId: 1, type: 'Run', durationMinutes: 35, calories: 420, date: new Date('2026-09-11T06:30:00Z') },
    { userId: 2, type: 'Cycle', durationMinutes: 40, calories: 510, date: new Date('2026-09-12T18:00:00Z') },
    { userId: 3, type: 'Strength', durationMinutes: 45, calories: 380, date: new Date('2026-09-10T17:15:00Z') },
    { userId: 4, type: 'Row', durationMinutes: 28, calories: 330, date: new Date('2026-09-13T07:10:00Z') },
    { userId: 5, type: 'HIIT', durationMinutes: 24, calories: 410, date: new Date('2026-09-08T19:20:00Z') }
];
const leaderboard = [
    { rank: 1, username: 'alex', points: 980 },
    { rank: 2, username: 'maya', points: 940 },
    { rank: 3, username: 'leo', points: 900 },
    { rank: 4, username: 'nina', points: 865 },
    { rank: 5, username: 'omar', points: 820 }
];
const workouts = [
    { title: 'Morning Interval Run', difficulty: 'Moderate', durationMinutes: 30, focusArea: 'Cardio', equipment: ['Shoes', 'Watch'] },
    { title: 'Strength Circuit', difficulty: 'High', durationMinutes: 40, focusArea: 'Upper Body', equipment: ['Dumbbells', 'Bench'] },
    { title: 'Core Recovery Flow', difficulty: 'Low', durationMinutes: 20, focusArea: 'Mobility', equipment: ['Mat'] },
    { title: 'Tempo Ride', difficulty: 'Moderate', durationMinutes: 35, focusArea: 'Legs', equipment: ['Bike', 'Bottle'] },
    { title: 'Battle Rope Blast', difficulty: 'High', durationMinutes: 25, focusArea: 'Full Body', equipment: ['Battle Rope', 'Timer'] }
];
const seedDatabase = async () => {
    await connectDatabase();
    console.log('Seed the octofit_db database with test data');
    await Promise.all([
        User.deleteMany({}),
        Team.deleteMany({}),
        Activity.deleteMany({}),
        LeaderboardEntry.deleteMany({}),
        Workout.deleteMany({})
    ]);
    const createdUsers = await User.insertMany(users);
    const createdTeams = await Team.insertMany(teams);
    const createdActivities = await Activity.insertMany(activities);
    const createdLeaderboard = await LeaderboardEntry.insertMany(leaderboard);
    const createdWorkouts = await Workout.insertMany(workouts);
    console.log(JSON.stringify({
        users: createdUsers.length,
        teams: createdTeams.length,
        activities: createdActivities.length,
        leaderboard: createdLeaderboard.length,
        workouts: createdWorkouts.length
    }, null, 2));
    await mongoose.disconnect();
};
seedDatabase().catch((error) => {
    console.error('Seed failed:', error);
    process.exit(1);
});
