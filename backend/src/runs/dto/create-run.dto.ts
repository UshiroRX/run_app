import { IsNumber, IsString, Min, MinLength } from "class-validator";

export class CreateRunDto {
  @IsNumber()
  @Min(0.1)
  distance!: number;

  @IsNumber()
  @Min(1)
  time!: number;

  @IsString()
  @MinLength(2)
  location!: string;
}
