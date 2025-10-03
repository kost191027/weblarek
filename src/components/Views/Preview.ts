import type { IProduct } from '../../types';
import { CDN_URL, categoryMap } from '../../utils/constants';

export class PreviewView {
    private tpl: HTMLTemplateElement;

    constructor() {
        const tpl = document.getElementById('card-preview') as HTMLTemplateElement;
        if (!tpl) throw new Error('Preview template not found');
        this.tpl = tpl;
    }

    render(item: IProduct, inCart: boolean, onToggle: (product: IProduct) => void) {
        const node = this.tpl.content.firstElementChild!.cloneNode(true) as HTMLElement;
        const image = node.querySelector('.card__image') as HTMLImageElement;
        const category = node.querySelector('.card__category') as HTMLElement;
        const title = node.querySelector('.card__title') as HTMLElement;
        const text = node.querySelector('.card__text') as HTMLElement;
        const price = node.querySelector('.card__price') as HTMLElement;
        const btn = node.querySelector('.card__button') as HTMLButtonElement;

        image.src = `${CDN_URL}${item.image}`;
        image.alt = item.title;
        category.textContent = item.category;
        category.className = `card__category ${categoryMap[item.category] ?? ''}`.trim();
        title.textContent = item.title;
        text.textContent = item.description;

        if (item.price == null) {
            btn.disabled = true;
            btn.textContent = 'Недоступно';
            price.textContent = '';
        } else {
            price.textContent = `${item.price} синапсов`;
            btn.textContent = inCart ? 'Удалить из корзины' : 'В корзину';
            btn.addEventListener('click', () => onToggle(item));
        }

        return node;
    }
}

export default PreviewView;

