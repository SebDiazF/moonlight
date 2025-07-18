import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class InventoryMovement extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  product_id: Types.ObjectId;

  @Prop({ enum: ['entrada', 'salida', 'ajuste'], required: true })
  type: string;

  @Prop({ required: true })
  quantity: number;

  @Prop()
  reason: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user_id: Types.ObjectId;
}

export const InventoryMovementSchema = SchemaFactory.createForClass(InventoryMovement);
