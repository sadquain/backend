import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { Job } from './job.entity';
import { MatchDto } from './match.dto';
import { MatchResult } from './matchresult.dto';

@Controller('api')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post('jobs')
  create(@Body() job: Partial<Job>): Promise<Job> {
    return this.jobsService.create(job);
  }

  @Get('jobs')
  findAll(): Promise<Job[]> {
    return this.jobsService.findAll();
  }

  @Get('jobs/:id')
async findOne(@Param('id') id: string): Promise<Job | { status: number }> {
    const job = await this.jobsService.findOne(id);
    if (!job) {
        return { status: 404 };
    }
    return job;
}

  @Post('match')
  match(@Body() matchDto: MatchDto): Promise<MatchResult[]> {
    return this.jobsService.match(matchDto);
  }
}