import type { IProduct } from '../../types';

export class BasketView {
    private tplWrap: HTMLTemplateElement;
    private tplItem: HTMLTemplateElement;

    constructor() {
        this.tplWrap = document.getElementById('basket') as HTMLTemplateElement;
        this.tplItem = document.getElementById('card-basket') as HTMLTemplateElement;
        if (!this.tplWrap || !this.tplItem) throw new Error('Basket templates not found');
    }

    render(items: IProduct[], total: number, onRemove: (id: string) => void, onCheckout: () => void) {
        const wrap = this.tplWrap.content.firstElementChild!.cloneNode(true) as HTMLElement;
        const list = wrap.querySelector('.basket__list') as HTMLElement;
        const price = wrap.querySelector('.basket__price') as HTMLElement;
        const submit = wrap.querySelector('.basket__button') as HTMLButtonElement;

        if (items.length === 0) {
            list.replaceChildren(document.createTextNode('Корзина пуста'));
            submit.disabled = true;
        } else {
            const nodes = items.map((item, idx) => {
                const li = this.tplItem.content.firstElementChild!.cloneNode(true) as HTMLElement;
                (li.querySelector('.basket__item-index') as HTMLElement).textContent = String(idx + 1);
                (li.querySelector('.card__title') as HTMLElement).textContent = item.title;
                (li.querySelector('.card__price') as HTMLElement).textContent = `${item.price ?? 0} синапсов`;
                (li.querySelector('.basket__item-delete') as HTMLButtonElement).addEventListener('click', () => onRemove(item.id));
                return li;
            });
            list.replaceChildren(...nodes);
        }

        price.textContent = `${total} синапсов`;
        submit.addEventListener('click', onCheckout);
        return wrap;
    }
}

export default BasketView;

