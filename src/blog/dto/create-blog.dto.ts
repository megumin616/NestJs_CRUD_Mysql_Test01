import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateBlogDto {
    @IsNotEmpty()
    @IsString()
    title: string;  // ข้อมูล title ที่ผู้ใช้จะส่งเข้ามาเพื่อสร้าง blog

    @IsNotEmpty()
    @IsString()
    details: string;  // ข้อมูลรายละเอียดที่จะบันทึก

    @IsNotEmpty()
    @IsNumber()
    phone: number;  // ข้อมูลหมายเลขโทรศัพท์ที่จะบันทึก
}
