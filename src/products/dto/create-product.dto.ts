import { IsString, IsNumber, IsOptional, IsIn } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  sku?: string;

  @IsOptional()
  @IsString()
  barcode?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsIn(['pieza', 'kg', 'litro', 'paquete'])
  unit: string;

  @IsNumber()
  purchase_price: number;

  @IsNumber()
  sale_price: number;

  @IsOptional()
  @IsNumber()
  stock?: number;

  @IsOptional()
  @IsNumber()
  min_stock?: number;

  @IsOptional()
  @IsString()
  provider_id?: string;

  @IsOptional()
  variants?: string[];
}
