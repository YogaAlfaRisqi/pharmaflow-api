import { Module } from '@nestjs/common';
import { PrismaModule } from '../../../infra/prisma/prisma.module';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';

@Module({
  imports: [PrismaModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductModule {}
