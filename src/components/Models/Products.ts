import type { IProduct } from '../../../types/index';

export class Products {
    private items: IProduct[] = [];
    private selected: IProduct | null = null;

    setItems(items: IProduct[]): void {
        this.items = Array.isArray(items) ? [...items] : [];
    }

    getItems(): IProduct[] {
        return [...this.items];
    }

    getById(id: string): IProduct | undefined {
        return this.items.find((p) => p.id === id);
    }

    setSelected(item: IProduct | null): void {
        this.selected = item;
    }

    getSelected(): IProduct | null {
        return this.selected;
    }
}

export default Products;

