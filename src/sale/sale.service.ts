import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Sale } from './schemas/sale.schema';
import { CreateSaleDto } from './dto/create-sale.dto';
import { Model } from 'mongoose';
import { Product } from '../products/schemas/product.schema';

@Injectable()
export class SalesService {
  constructor(
    @InjectModel(Sale.name) private saleModel: Model<Sale>,
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async create(dto: CreateSaleDto) {
    // Validar stock y actualizar
    for (const item of dto.items) {
      const product = await this.productModel.findById(item.product_id);
      if (!product) throw new NotFoundException(`Producto no encontrado`);

      if (product.stock < item.quantity) {
        throw new BadRequestException(`Stock insuficiente para ${product.name}`);
      }

      product.stock -= item.quantity;
      await product.save();
    }

    const sale = new this.saleModel(dto);
    return sale.save();
  }

  findAll() {
    return this.saleModel.find().populate('items.product_id').exec();
  }

  findByUser(userId: string) {
    return this.saleModel.find({ user_id: userId }).exec();
  }
}
