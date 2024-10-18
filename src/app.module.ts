import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogModule } from './blog/blog.module';
import { TypeOrmModule } from '@nestjs/typeorm';  // TypeORM จะทำให้ไม่ต้องเขียนคำสั่ง SQL โดยตรงมากนัก
import { UsersModule } from './users/users.module';
import { Blog } from './blog/entities/blog.entity';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',  // ชนิดของฐานข้อมูลที่ใช้คือ MySQL
      host: 'localhost',  // ที่อยู่ของฐานข้อมูล
      port: 3306,  // พอร์ตสำหรับเชื่อมต่อกับ MySQL
      username: 'root',  // ชื่อผู้ใช้สำหรับเชื่อมต่อ
      password: '',  // รหัสผ่านสำหรับเชื่อมต่อ (ในที่นี้ไม่ได้ตั้งค่า)
      database: 'nestjs-crud01',  // ชื่อฐานข้อมูล
      entities: [Blog, User],  // กำหนด entity ที่จะใช้สำหรับตารางในฐานข้อมูล
      synchronize: true,  // ใช้เพื่ออัพเดท schema อัตโนมัติเมื่อมีการเปลี่ยนแปลง
    }),
    BlogModule,
    UsersModule,  // import โมดูล Blog ที่จะจัดการ CRUD
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
