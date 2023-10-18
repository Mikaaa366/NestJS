import { Injectable } from '@nestjs/common';
import { Product, db } from 'src/db';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductsService {
  public getAll(): Product[] {
    return db.products;
  }
  public getById(id: Product['id']): Product | null {
    return db.products.find((product) => product.id === id);
  }
  public deleteById(id: Product['id']): void {
    db.products = db.products.filter((product) => product.id !== id);
  }
  public create(ProductData: Omit<Product, 'id'>): Product {
    const newProduct = { ...ProductData, id: uuidv4() };
    db.products.push(newProduct);
    return newProduct;
  }
  public updateById(id: Product['id'], ProductData: Omit<Product, 'id'>): void {
    db.products = db.products.map((product) => {
      if (product.id === id) {
        return { ...product, ...ProductData };
      }
      return product;
    });
  }
}
