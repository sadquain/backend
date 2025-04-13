import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CandidatesService } from './candidates.service';
import { CandidatesController } from './candidates.controller';
import { Candidate } from './candidate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Candidate])],
  providers: [CandidatesService],
  controllers: [CandidatesController],
})
export class CandidatesModule {}