// src/data-source.ts
import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { Candidate } from './candidates/candidate.entity';
import { Job } from './jobs/job.entity';

config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'synapse',
  entities: [Candidate, Job], // Explicitly list your entities
  migrations: ['src/migrations/*.ts'],
  migrationsTableName: 'typeorm_migrations',
  logging: true,
});