import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InventoryMovement } from './schemas/inventory-movement.schema';
import { CreateMovementDto } from './dto/create-movement.dto';
import { Product } from '../products/schemas/product.schema';

@Injectable()
export class InventoryService {
  constructor(
    @InjectModel(InventoryMovement.name) private movementModel: Model<InventoryMovement>,
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async create(dto: CreateMovementDto) {
    const product = await this.productModel.findById(dto.product_id);
    if (!product) throw new NotFoundException('Producto no encontrado');

    const quantity = Math.abs(dto.quantity);

    // Ajustar stock del producto según tipo de movimiento
    if (dto.type === 'entrada') {
      product.stock += quantity;
    } else if (dto.type === 'salida') {
      if (product.stock < quantity) throw new BadRequestException('Stock insuficiente');
      product.stock -= quantity;
    } else if (dto.type === 'ajuste') {
      product.stock = quantity; // cantidad exacta nueva
    }

    await product.save();

    // Guardar movimiento
    const movement = new this.movementModel(dto);
    return movement.save();
  }

  findAll() {
    return this.movementModel.find().populate('product_id', 'name').exec();
  }

  findByProduct(productId: string) {
    return this.movementModel.find({ product_id: productId }).exec();
  }
}
