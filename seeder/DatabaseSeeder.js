import connectToDatabase from '../database.js'; 
import { adminSeeder } from './AdminSeeder.js';

console.log('Start Seeder');

await connectToDatabase();
await adminSeeder();
console.log('Complete Seeder');