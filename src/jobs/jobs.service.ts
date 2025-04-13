import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './job.entity';
import { Candidate } from '../candidates/candidate.entity';
import { MatchDto } from './match.dto';
import { MatchResult } from './matchresult.dto';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private jobsRepository: Repository<Job>,
    @InjectRepository(Candidate)
    private candidatesRepository: Repository<Candidate>,
  ) {}

  private generateMockVector(dim = 1536): number[] {
    const vector = Array.from({ length: dim }, () => Math.random());
    const norm = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
    return vector.map((val) => val / norm);
  }

  async create(job: Partial<Job>): Promise<Job> {
    job.embedding = this.generateMockVector();
    const newJob = this.jobsRepository.create(job);
    return this.jobsRepository.save(newJob);
  }

  async findAll(): Promise<Job[]> {
    return this.jobsRepository.find();
  }

  async findOne(id: string): Promise<Job | null> {
    return this.jobsRepository.findOneBy({ id });
  }

async match(matchDto: MatchDto): Promise<MatchResult[]> {
  const job = await this.jobsRepository.findOneBy({ id: matchDto.jobId });
  if (!job) {
    throw new NotFoundException(`Job with ID ${matchDto.jobId} not found`);
  }

  if (!job.embedding) {
    throw new Error('Job embedding is missing');
  }

  // Ensure the embedding is properly formatted as a PostgreSQL vector
  const jobEmbedding = `[${job.embedding.join(',')}]`;

  const candidates = await this.candidatesRepository
    .createQueryBuilder('candidate')
    .select([
      'candidate.id AS "candidateId"',
      '1 - (candidate.embedding::vector <=> :jobEmbedding::vector) AS "matchScore"',
    ])
    .setParameter('jobEmbedding', jobEmbedding)
    .where('candidate.embedding IS NOT NULL')
    .orderBy('"matchScore"', 'DESC')
    .limit(3)
    .getRawMany();

  return candidates.map((c) => ({
    candidateId: c.candidateId,
    matchScore: parseFloat(c.matchScore),
  }));
}
}