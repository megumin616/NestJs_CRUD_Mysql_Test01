import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
// กำหมดการตรวจสอบอื่นๆได้ตามที่ต้องการ

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
