import { IProduct } from '../../types';

class Cart {
  cartItems: IProduct[] = [];

  addItem(item: IProduct): void {
    if (!this.isItemInCart(item.id)) {
      this.cartItems.push(item);
    }
  }

  removeItem(id: string): void {
    this.cartItems = this.cartItems.filter(item => item.id !== id);
  }

  getTotalPrice(): number {
    const totalPrice = this.cartItems.reduce((sum, item) => sum + (item.price || 0), 0);
    return totalPrice;
  }

  getCartItems(): IProduct[] {
    return this.cartItems;
  }

  isItemInCart(id: string): boolean {
    const isInCart = this.cartItems.some(item => item.id === id);
    return isInCart;
  }

  clearCart(): void {
    this.cartItems = [];
  }
}

export { Cart };