import { IsArray, IsNumber, IsMongoId, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class SaleItemDto {
  @IsMongoId()
  product_id: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  unit_price: number;

  @IsNumber()
  subtotal: number;
}

export class CreateSaleDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SaleItemDto)
  items: SaleItemDto[];

  @IsNumber()
  total: number;

  @IsString()
  payment_method: string;

  @IsNumber()
  change: number;

  @IsMongoId()
  user_id: string;
}
