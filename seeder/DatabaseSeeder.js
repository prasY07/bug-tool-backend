import connectToDatabase from '../database.js'; 
import { adminSeeder } from './AdminSeeder.js';
import { RoleSeeder } from './Role.js';

console.log('Start Seeder');

await connectToDatabase();
await adminSeeder();
await RoleSeeder();
console.log('Complete Seeder');