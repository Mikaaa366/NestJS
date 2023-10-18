import { IsNotEmpty, IsString, Length } from 'class-validator';
export class CreateOrderDTO {
  @IsNotEmpty()
  @IsString()
  @Length(10, 60)
  client: string;

  @IsNotEmpty()
  @IsString()
  @Length(20, 150)
  address: string;
  productId: string;
}
