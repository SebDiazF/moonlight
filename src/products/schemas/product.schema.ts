import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  sku: string;

  @Prop()
  barcode: string;

  @Prop()
  category: string;

  @Prop({ enum: ['pieza', 'kg', 'litro', 'paquete'], default: 'pieza' })
  unit: string;

  @Prop({ required: true })
  purchase_price: number;

  @Prop({ required: true })
  sale_price: number;

  @Prop({ default: 0 })
  stock: number;

  @Prop({ default: 0 })
  min_stock: number;

  @Prop()
  provider_id: string; // Referencia (puedes usar ObjectId si quieres luego)

  @Prop({ type: [String], default: [] })
  variants: string[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
