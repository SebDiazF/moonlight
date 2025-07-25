import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProvidersService } from './provider.service';
import { ProvidersController } from './provider.controller';
import { Provider, ProviderSchema } from './schemas/provider.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Provider.name, schema: ProviderSchema }])],
  controllers: [ProvidersController],
  providers: [ProvidersService],
})
export class ProvidersModule {}
