import { Body, Controller, Delete, Get, Param, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { VisitsService } from './visits.service';
import { RecordVisitDto } from './dto/record-visit.dto';

@Controller('visits')
export class VisitsController {
  constructor(private readonly visitsService: VisitsService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async recordVisit(@Body() dto: RecordVisitDto) {
    return this.visitsService.recordVisit(dto);
  }

  @Get()
  async getVisits(
    @Query('personId') personId?: string,
    @Query('limit') limit?: string,
    @Query('q') q?: string,
  ) {
    const numLimit = limit ? parseInt(limit, 10) : 100;
    if (personId && personId.trim()) {
      return this.visitsService.getHistoryByPerson(personId, numLimit, q);
    }
    return this.visitsService.getAllVisits(numLimit, q);
  }

  @Get('person/:personId')
  async getHistory(
    @Param('personId') personId: string,
    @Query('limit') limit?: string,
    @Query('q') q?: string,
  ) {
    const numLimit = limit ? parseInt(limit, 10) : 100;
    return this.visitsService.getHistoryByPerson(personId, numLimit, q);
  }

  @Delete('person/:personId')
  async clearHistory(@Param('personId') personId: string) {
    await this.visitsService.clearHistory(personId);
    return { success: true, message: `History cleared for ${personId}` };
  }
}
