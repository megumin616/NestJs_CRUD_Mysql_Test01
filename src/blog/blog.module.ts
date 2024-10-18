import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Blog])  // เชื่อมต่อ entity Blog กับ TypeORM เพื่อให้ CRUD ทำงานกับ Blog table
  ],
  controllers: [BlogController],  // BlogController จะจัดการกับ routing ของ Blog
  providers: [BlogService],  // BlogService จะเป็นตัวเชื่อมต่อกับฐานข้อมูล
})
export class BlogModule {}
