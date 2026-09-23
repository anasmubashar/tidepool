import { IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

export class CreateSiteDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)*$/, {
    message: 'Address must be a valid domain identifier (e.g. tidepool.zz or atlas.zz)',
  })
  address: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsNotEmpty()
  html: string;

  @IsString()
  @IsOptional()
  summary?: string;
}
