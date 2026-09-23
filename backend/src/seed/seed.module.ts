import { Module } from '@nestjs/common';
import { SitesModule } from '../sites/sites.module';
import { PeopleModule } from '../people/people.module';
import { VisitsModule } from '../visits/visits.module';
import { SeedService } from './seed.service';

@Module({
  imports: [SitesModule, PeopleModule, VisitsModule],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
