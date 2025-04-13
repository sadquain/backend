import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Candidate } from './candidate.entity';

@Injectable()
export class CandidatesService {
  constructor(
    @InjectRepository(Candidate)
    private candidatesRepository: Repository<Candidate>,
  ) {}

  private generateMockVector(dim = 1536): number[] {
    const vector = Array.from({ length: dim }, () => Math.random());
    const norm = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
    return vector.map((val) => val / norm);
  }

  async create(candidate: Partial<Candidate>): Promise<Candidate> {
    candidate.embedding = this.generateMockVector();
    const newCandidate = this.candidatesRepository.create(candidate);
    return this.candidatesRepository.save(newCandidate);
  }

  async findAll(): Promise<Candidate[]> {
    return this.candidatesRepository.find();
  }

  async findOne(id: string): Promise<Candidate | null> {
    return this.candidatesRepository.findOneBy({ id });
  }

  
}