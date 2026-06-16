import { IsString, IsNumber, IsDateString, IsOptional, IsDecimal } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  sku: string;

  @IsDecimal({ decimal_digits: '2' })
  price: number;

  @IsNumber()
  @IsOptional()
  quantity?: number;

  @IsString()
  category: string;

  @IsString()
  manufacturer: string;

  @IsDateString()
  expiryDate: string;

  @IsString()
  batchNumber: string;
}
