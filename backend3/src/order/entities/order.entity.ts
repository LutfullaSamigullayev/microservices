import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "order" })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product_id: string;

  @Column()
  count: number;
}
