import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Provider } from './schemas/provider.schema';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';

@Injectable()
export class ProvidersService {
  constructor(@InjectModel(Provider.name) private model: Model<Provider>) {}

  create(dto: CreateProviderDto) {
    const provider = new this.model(dto);
    return provider.save();
  }

  findAll() {
    return this.model.find().exec();
  }

  findOne(id: string) {
    return this.model.findById(id).exec();
  }

  async update(id: string, dto: UpdateProviderDto) {
    const provider = await this.model.findByIdAndUpdate(id, dto, { new: true });
    if (!provider) throw new NotFoundException('Proveedor no encontrado');
    return provider;
  }

  async remove(id: string) {
    const provider = await this.model.findByIdAndDelete(id);
    if (!provider) throw new NotFoundException('Proveedor no encontrado');
    return provider;
  }
}
