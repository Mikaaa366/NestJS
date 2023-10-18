import { Injectable } from '@nestjs/common';
import { Order, db } from 'src/db';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OrdersService {
  public getAll(): Order[] {
    return db.orders;
  }
  public getById(id: Order['id']): Order | null {
    return db.orders.find((order) => order.id === id);
  }
  public deleteById(id: Order['id']): void {
    db.orders = db.orders.filter((order) => order.id !== id);
  }
  public create(OrderData: Omit<Order, 'id' | 'productId'>): Order {
    const newOrder = { ...OrderData, id: uuidv4(), productId: uuidv4() };
    db.orders.push(newOrder);
    return newOrder;
  }
  public updateById(
    id: Order['id'],
    OrderData: Omit<Order, 'id' | 'productId'>,
  ): void {
    db.orders = db.orders.map((order) => {
      if (order.id === id) {
        return { ...order, ...OrderData };
      }
      return order;
    });
  }
}
