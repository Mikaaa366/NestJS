import { IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';
export class UpdateOrderDTO {
  @IsNotEmpty()
  @IsString()
  @Length(10, 60)
  client: string;

  @IsNotEmpty()
  @IsString()
  @Length(20, 150)
  address: string;

  @IsNotEmpty()
  @IsUUID()
  @IsString()
  productId: string;

  @IsNotEmpty()
  @IsUUID()
  @IsString()
  clientId: string;
}
