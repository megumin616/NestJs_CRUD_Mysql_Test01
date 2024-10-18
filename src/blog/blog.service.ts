import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { Repository } from 'typeorm';

@Injectable()  // ใช้ decorator นี้เพื่อบอกว่า BlogService เป็น service ที่สามารถถูก inject เข้าไปใช้งานในส่วนอื่นได้
export class BlogService {
  constructor(
    @InjectRepository(Blog) // ใช้เพื่อ inject repository ของ Blog entity
    private blogRepository: Repository<Blog>,  // ตัวแปร blogRepository จะเชื่อมต่อกับตาราง Blog ในฐานข้อมูล
  ) {}   // NestJS จะจัดการ inject repository นี้ให้โดยอัตโนมัติเมื่อ BlogService ถูกสร้าง

  // ฟังก์ชันสร้าง blog ใหม่
  async create(createBlogDto: CreateBlogDto) {
    const blog = await this.blogRepository.create(createBlogDto);  // สร้าง blog object จาก DTO
    const toSave = await this.blogRepository.insert(blog);  // บันทึกลงในฐานข้อมูล
    return toSave;
  }

  // ดึงข้อมูล blog ทั้งหมด
  findAll() {
    return this.blogRepository.find();  // ดึงข้อมูลจากตาราง Blog ทั้งหมด
  }

  // ดึงข้อมูล blog เดียวจาก id
  findOne(id: number) {
    return this.blogRepository.findOneBy({ id: id });  // ค้นหา blog โดยใช้ id
    //ใน TypeScript/JavaScript เวลาเราสร้าง object และต้องการกำหนดค่าให้กับ properties ของมัน เราใช้รูปแบบ key: value
    //ซึ่งมันก้เลยต้องกำหมดแบบ {id: id}
  }

  // อัพเดท blog
  async update(id: number, updateBlogDto: UpdateBlogDto) {
    let blog = await this.blogRepository.findOneBy({ id: id });  // ค้นหา blog ที่มี id ตรงกับที่ส่งเข้ามา
    blog = {
      ...blog,  // กระจายข้อมูลเดิมของ blog
      ...updateBlogDto  // กระจายข้อมูลใหม่ที่ต้องการอัพเดทจาก DTO
    };
    const toUpdate = await this.blogRepository.save(blog);  // บันทึก blog ที่อัพเดทแล้วลงในฐานข้อมูล
    return toUpdate;  // ส่งคืนข้อมูล blog ที่อัพเดทแล้ว
  }
  

  // ลบ blog
  async remove(id: number) {
    const toDelete = await this.blogRepository.delete(id);  // ลบ blog โดยใช้ id
    return toDelete;
  }
}
