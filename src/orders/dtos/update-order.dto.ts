import { IsNotEmpty, IsString, Length } from 'class-validator';
export class UpdateOrderDTO {
  @IsNotEmpty()
  @IsString()
  @Length(10, 60)
  client: string;

  @IsNotEmpty()
  @IsString()
  @Length(20, 150)
  address: string;
}
