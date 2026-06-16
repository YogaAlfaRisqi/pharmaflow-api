import { Module } from '@nestjs/common';
import { ProductModule } from './products/product.module';

@Module({
    imports: [ProductModule],
    exports: [ProductModule]
})
export class CatalogModule {}
