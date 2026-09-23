import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RecordVisitDto {
  @IsString()
  @IsNotEmpty()
  personId: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsInt()
  @IsOptional()
  status?: number;

  @IsString()
  @IsOptional()
  referrer?: string;

  @IsOptional()
  visitedAt?: string | Date;
}
