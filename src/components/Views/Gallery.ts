import type { IProduct } from '../../types';
import { CDN_URL, categoryMap } from '../../utils/constants';

export class GalleryView {
    private root: HTMLElement;
    private tpl: HTMLTemplateElement;

    constructor() {
        const root = document.querySelector('.gallery') as HTMLElement;
        const tpl = document.getElementById('card-catalog') as HTMLTemplateElement;
        if (!root || !tpl) throw new Error('Gallery root or template not found');
        this.root = root;
        this.tpl = tpl;
    }

    render(items: IProduct[], onClick: (id: string) => void) {
        const nodes = items.map((item) => this.createCard(item, onClick));
        this.root.replaceChildren(...nodes);
    }

    private createCard(item: IProduct, onClick: (id: string) => void) {
        const node = this.tpl.content.firstElementChild!.cloneNode(true) as HTMLElement;
        const title = node.querySelector('.card__title') as HTMLElement;
        const price = node.querySelector('.card__price') as HTMLElement;
        const image = node.querySelector('.card__image') as HTMLImageElement;
        const category = node.querySelector('.card__category') as HTMLElement;

        title.textContent = item.title;
        category.textContent = item.category;
        category.className = `card__category ${categoryMap[item.category] ?? ''}`.trim();
        image.src = `${CDN_URL}${item.image}`;
        image.alt = item.title;

        if (item.price == null) {
            price.textContent = 'Недоступно';
            (node as HTMLButtonElement).disabled = true;
        } else {
            price.textContent = `${item.price} синапсов`;
        }

        node.addEventListener('click', () => onClick(item.id));
        return node;
    }
}

export default GalleryView;

