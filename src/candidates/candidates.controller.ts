import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CandidatesService } from './candidates.service';
import { Candidate } from './candidate.entity';

@Controller('api/candidates')
export class CandidatesController {
  constructor(private readonly candidatesService: CandidatesService) {}

  @Post()
  create(@Body() candidate: Partial<Candidate>): Promise<Candidate> {
    return this.candidatesService.create(candidate);
  }

  @Get()
  findAll(): Promise<Candidate[]> {
    return this.candidatesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Candidate | { status: number }> {
      const candidate = await this.candidatesService.findOne(id);
      if (!candidate) {
          return { status: 404 };
      }
      return candidate;
  }
}