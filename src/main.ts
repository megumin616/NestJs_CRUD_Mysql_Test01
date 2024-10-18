import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // จะลบฟิลด์ที่ไม่ถูกกำหนดใน DTO ออก
    //เหตุผล: การตั้งค่า whitelist ช่วยให้คุณมั่นใจได้ว่าข้อมูลที่เข้ามาจะมีเฉพาะฟิลด์ที่คุณต้องการใน DTO เท่านั้น 
    //ซึ่งช่วยป้องกันการโจมตีโดยการส่งข้อมูลที่ไม่จำเป็นหรืออาจทำให้แอปพลิเคชันของคุณเสียหายได้

    forbidNonWhitelisted: true, // จะเกิดข้อผิดพลาดถ้ามีฟิลด์ที่ไม่ถูกกำหนด
    //เหตุผล: การตั้งค่า forbidNonWhitelisted ช่วยให้คุณไม่เพียงแต่ลบฟิลด์ที่ไม่ต้องการออก 
    //แต่ยังป้องกันไม่ให้ข้อมูลนั้นถูกประมวลผลต่อไป ซึ่งช่วยเพิ่มความปลอดภัยให้กับ API ของคุณโดยการปฏิเสธข้อมูลที่ไม่ถูกต้องทันที

    transform: true, // จะแปลงข้อมูลที่ส่งเข้ามาให้ตรงกับประเภทที่กำหนดใน DTO
    //การทำงาน: เมื่อ transform ถูกตั้งค่าเป็น true, Nest.js จะทำการแปลงข้อมูลที่ส่งเข้ามาให้ตรงกับประเภทที่กำหนดใน DTO โดยอัตโนมัติ 
    //เช่น ถ้าคุณมีฟิลด์ที่ต้องการให้เป็นตัวเลข แต่ผู้ใช้ส่งเข้ามาเป็นสตริง (เช่น "123"), มันจะถูกแปลงเป็นตัวเลข (123)
  }));
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
