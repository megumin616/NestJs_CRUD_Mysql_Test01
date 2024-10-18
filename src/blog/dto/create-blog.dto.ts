export class CreateBlogDto {
    title: string;  // ข้อมูล title ที่ผู้ใช้จะส่งเข้ามาเพื่อสร้าง blog
    details: string;  // ข้อมูลรายละเอียดที่จะบันทึก
    phone: number;  // ข้อมูลหมายเลขโทรศัพท์ที่จะบันทึก
}
