/**
 * Standalone seed runner — invoked via `npm run seed`
 * Uses NestJS application context so all modules/services are wired up.
 */
import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { SeedService } from './seed.service';
import { SitesModule } from '../sites/sites.module';
import { PeopleModule } from '../people/people.module';
import { VisitsModule } from '../visits/visits.module';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { SitesService } from '../sites/sites.service';
import { PeopleService } from '../people/people.service';
import { VisitsService } from '../visits/visits.service';

@Module({
  imports: [DatabaseModule, SitesModule, PeopleModule, VisitsModule],
  providers: [SeedService],
})
class SeedAppModule {}

async function runSeed() {
  const app = await NestFactory.createApplicationContext(SeedAppModule, {
    logger: ['log', 'error', 'warn'],
  });

  const seedService = app.get(SeedService);
  await seedService.run();
  await app.close();
  process.exit(0);
}

runSeed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
