import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()  // บอกว่า class นี้เป็น entity ที่จะกลายเป็นตารางในฐานข้อมูล
export class Blog {
    @PrimaryGeneratedColumn()  // คอลัมน์ id จะถูกสร้างอัตโนมัติเป็นคีย์หลักและมีค่าเพิ่มขึ้นเอง
    id: number;

    @Column()  // กำหนดว่า title เป็นคอลัมน์ในตาราง
    title: string;

    @Column()  // กำหนดว่า details เป็นคอลัมน์ในตาราง
    details: string;

    @Column()  // กำหนดว่า phone เป็นคอลัมน์ในตาราง
    phone: number;
}
