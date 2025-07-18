import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Sale extends Document {
  @Prop({
    type: [
      {
        product_id: { type: Types.ObjectId, ref: 'Product' },
        quantity: Number,
        unit_price: Number,
        subtotal: Number,
      },
    ],
  })
  items: {
    product_id: Types.ObjectId;
    quantity: number;
    unit_price: number;
    subtotal: number;
  }[];

  @Prop()
  total: number;

  @Prop()
  payment_method: string;

  @Prop()
  change: number;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user_id: Types.ObjectId;
}

export const SaleSchema = SchemaFactory.createForClass(Sale);
