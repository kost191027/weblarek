import { IProduct } from '../../types';

class ProductCatalog {
  arrayProducts: IProduct[] = [];

  constructor() {
    this.arrayProducts = [];
  }

  setArrayProducts(arrayProducts: IProduct[]): void {
    this.arrayProducts = arrayProducts;
  }

  getArrayProducts(): IProduct[] {
    return this.arrayProducts;
  }

  getProduct(id: string): IProduct | undefined {
    return this.arrayProducts.find(product => product.id === id);
  }
}

export { ProductCatalog };