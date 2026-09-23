import { Injectable, Logger } from '@nestjs/common';
import { SitesService } from '../sites/sites.service';
import { PeopleService } from '../people/people.service';
import { VisitsService } from '../visits/visits.service';
import { SEED_SITES, SEED_PEOPLE, SEED_VISITS } from './seed.data';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    private readonly sitesService: SitesService,
    private readonly peopleService: PeopleService,
    private readonly visitsService: VisitsService,
  ) {}

  async run(): Promise<void> {
    this.logger.log('🌱 Starting seed...');

    // Seed sites
    this.logger.log(`   Seeding ${SEED_SITES.length} sites...`);
    for (const site of SEED_SITES) {
      await this.sitesService.createOrUpdate({
        address: site.address,
        title: site.title,
        author: site.author,
        html: site.html,
        summary: site.summary,
      });
    }
    const siteCount = await this.sitesService.count();
    this.logger.log(`   ✅ ${siteCount} sites in database`);

    // Seed people
    this.logger.log(`   Seeding ${SEED_PEOPLE.length} people...`);
    for (const person of SEED_PEOPLE) {
      await this.peopleService.upsert(person);
    }
    const peopleCount = await this.peopleService.count();
    this.logger.log(`   ✅ ${peopleCount} people in database`);

    // Seed visits — clear first to ensure idempotent count, then re-seed
    this.logger.log(`   Seeding ${SEED_VISITS.length} visits...`);
    for (const person of SEED_PEOPLE) {
      await this.visitsService.clearHistory(person.id);
    }
    for (const visit of SEED_VISITS) {
      await this.visitsService.recordVisit({
        personId: visit.personId,
        address: visit.address,
        title: visit.title,
        status: visit.status,
        referrer: visit.referrer,
        visitedAt: visit.visitedAt,
      });
    }
    const visitCount = await this.visitsService.count();
    this.logger.log(`   ✅ ${visitCount} visits in database`);

    this.logger.log('🌊 Seed complete. The Small Web is ready.');
  }
}
