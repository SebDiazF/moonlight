import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { ProvidersModule } from './provider/provider.module';

import { MongooseModule } from '@nestjs/mongoose'; //Import para la base de datos
import { InventoryModule } from './inventory/inventory.module';
import { SalesModule } from './sale/sale.module';

@Module({
  imports: [ProductsModule, ProvidersModule,
    MongooseModule.forRoot('mongodb://localhost:27017/practicamente'),
    InventoryModule,
    SalesModule, //Conexion a la base de datos
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
