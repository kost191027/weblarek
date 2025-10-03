import type { IProduct } from '../../../types/index';

export class Cart {
    private items: IProduct[] = [];

    getItems(): IProduct[] {
        return [...this.items];
    }

    add(item: IProduct): void {
        if (!this.has(item.id)) {
            this.items = [...this.items, item];
        }
    }

    remove(item: IProduct | string): void {
        const id = typeof item === 'string' ? item : item.id;
        this.items = this.items.filter((p) => p.id !== id);
    }

    clear(): void {
        this.items = [];
    }

    getTotal(): number {
        return this.items.reduce((sum, p) => sum + (p.price ?? 0), 0);
    }

    getCount(): number {
        return this.items.length;
    }

    has(id: string): boolean {
        return this.items.some((p) => p.id === id);
    }
}

export default Cart;

