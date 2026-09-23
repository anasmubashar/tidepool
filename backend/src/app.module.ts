import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { SitesModule } from './sites/sites.module';
import { PeopleModule } from './people/people.module';
import { VisitsModule } from './visits/visits.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [
    DatabaseModule,
    SitesModule,
    PeopleModule,
    VisitsModule,
    SearchModule,
  ],
})
export class AppModule {}
