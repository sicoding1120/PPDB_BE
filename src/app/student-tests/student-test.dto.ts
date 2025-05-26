import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateStudentTestDto {
  @IsUUID()
  @IsNotEmpty()
  studentID: string;

  @IsUUID()
  @IsNotEmpty()
  testID: string;
}
import { IsDateString, IsNumber, IsOptional } from 'class-validator';

export class UpdateStudentTestDto {
  @IsOptional()
  @IsDateString()
  finishedAt?: string;

  @IsOptional()
  @IsNumber()
  score?: number;
}
