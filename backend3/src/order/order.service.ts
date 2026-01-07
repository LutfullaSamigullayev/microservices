import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Order } from "./entities/order.entity";

@Injectable()
export class OrderService {
  constructor(@InjectRepository(Order) private orderRepo: Repository<Order>) {}

  async create(createOrderDto: CreateOrderDto) {
    const order = this.orderRepo.create(createOrderDto);
    return await this.orderRepo.save(order);
  }

  async findAll() {
    return await this.orderRepo.find();
  }

  async findOne(id: number) {
    const foundedOrder = await this.orderRepo.findOneBy({ id });
    if (!foundedOrder) throw new NotFoundException("Order not found");
    return foundedOrder;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const foundedOrder = await this.orderRepo.findOneBy({ id });
    if (!foundedOrder) throw new NotFoundException("Order not found");
    return await this.orderRepo.update(id, updateOrderDto);
  }

  async remove(id: number) {
    const foundedOrder = await this.orderRepo.findOneBy({ id });
    if (!foundedOrder) throw new NotFoundException("Order not found");
    return await this.orderRepo.delete(id);
  }
}
