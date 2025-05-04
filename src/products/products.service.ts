import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { productsList } from './products.data';
import { NotFoundError } from 'rxjs';

@Injectable()
export class ProductsService {
  private products: Product[];
  constructor() {
    this.products = productsList;
  }
  
  create(createProductDto: CreateProductDto) {
    const newProduct: Product = {
      id: this.products.length + 1,
      ...createProductDto
    };
    this.products.push(newProduct); // Add the new product to the array
    return 'Successfully created product with id${newProduct.id}'; // Return the newly created product
  }

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw new NotFoundException('Product with id ${id} not found'); // Product not found
    }
    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    const productIndex = this.products.findIndex((product) => product.id === id);
    if (productIndex === -1) {
      throw new NotFoundException('Product with id ${id} not found'); // Product not found
    }
    const product = this.products[productIndex]; // Get the existing product
    this.products[productIndex] = { ...product, ...updateProductDto };
    return 'Product updated successfully'; // Return a success message
  }

  remove(id: number) {
    const productIndex = this.products.findIndex((product) => product.id === id); // Find the index of the product to be removed
    if (productIndex === -1) {
      throw new NotFoundException('Product with id ${id} not found'); // Product not found
    }
    this.products.splice(productIndex, 1); // Remove the product from the array
    return 'Product removed successfully'; // Return a success message
  }
}
