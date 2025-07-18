import { IsMongoId, IsNumber, IsString, IsIn } from 'class-validator';

export class CreateMovementDto {
  @IsMongoId()
  product_id: string;

  @IsIn(['entrada', 'salida', 'ajuste'])
  type: string;

  @IsNumber()
  quantity: number;

  @IsString()
  reason: string;

  @IsMongoId()
  user_id: string; // para despues de aplicar el JWT
}
