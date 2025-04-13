import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { Job } from './job.entity';
import { Candidate } from '../candidates/candidate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Job, Candidate])],
  providers: [JobsService],
  controllers: [JobsController],
})
export class JobsModule {}