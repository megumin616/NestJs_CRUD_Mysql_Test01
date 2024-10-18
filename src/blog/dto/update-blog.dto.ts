import { PartialType } from '@nestjs/mapped-types';
import { CreateBlogDto } from './create-blog.dto';

export class UpdateBlogDto extends PartialType(CreateBlogDto) {}

//ไฟล์นี้ใช้สำหรับการอัพเดทข้อมูล blog โดยที่เราไม่จำเป็นต้องส่งข้อมูลทุกช่องเหมือนตอนสร้างใหม่ สามารถอัพเดทเฉพาะบางส่วนได้