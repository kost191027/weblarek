import type { IBuyer, TPayment } from '../../types';

export class OrderStep1View {
    private tpl: HTMLTemplateElement;

    constructor() {
        this.tpl = document.getElementById('order') as HTMLTemplateElement;
        if (!this.tpl) throw new Error('Order template not found');
    }

    render(data: IBuyer, onChange: (patch: Partial<IBuyer>) => void, onNext: () => void) {
        const node = this.tpl.content.firstElementChild!.cloneNode(true) as HTMLFormElement;
        const btnCard = node.querySelector('button[name="card"]') as HTMLButtonElement;
        const btnCash = node.querySelector('button[name="cash"]') as HTMLButtonElement;
        const address = node.querySelector('input[name="address"]') as HTMLInputElement;
        const submit = node.querySelector('button[type="submit"]') as HTMLButtonElement;
        const errors = node.querySelector('.form__errors') as HTMLElement;

        const update = () => {
            const valid = Boolean(data.payment) && Boolean(address.value.trim());
            submit.disabled = !valid;
            errors.textContent = '';
            if (!data.payment) errors.textContent = 'Не выбран вид оплаты';
            else if (!address.value.trim()) errors.textContent = 'Укажите адрес доставки';
        };

        btnCard.addEventListener('click', () => { onChange({ payment: 'card' as TPayment }); data.payment = 'card'; update(); });
        btnCash.addEventListener('click', () => { onChange({ payment: 'cash' as TPayment }); data.payment = 'cash'; update(); });
        address.value = data.address ?? '';
        address.addEventListener('input', () => { onChange({ address: address.value }); update(); });

        node.addEventListener('submit', (e) => { e.preventDefault(); if (!submit.disabled) onNext(); });
        update();
        return node;
    }
}

export class OrderStep2View {
    private tpl: HTMLTemplateElement;
    constructor() {
        this.tpl = document.getElementById('contacts') as HTMLTemplateElement;
        if (!this.tpl) throw new Error('Contacts template not found');
    }

    render(data: IBuyer, onChange: (patch: Partial<IBuyer>) => void, onSubmit: () => void) {
        const node = this.tpl.content.firstElementChild!.cloneNode(true) as HTMLFormElement;
        const email = node.querySelector('input[name="email"]') as HTMLInputElement;
        const phone = node.querySelector('input[name="phone"]') as HTMLInputElement;
        const submit = node.querySelector('button[type="submit"]') as HTMLButtonElement;
        const errors = node.querySelector('.form__errors') as HTMLElement;

        email.value = data.email ?? '';
        phone.value = data.phone ?? '';

        const update = () => {
            const valid = Boolean(email.value.trim()) && Boolean(phone.value.trim());
            submit.disabled = !valid;
            errors.textContent = '';
            if (!email.value.trim()) errors.textContent = 'Укажите емэйл';
            else if (!phone.value.trim()) errors.textContent = 'Укажите телефон';
        };

        email.addEventListener('input', () => { onChange({ email: email.value }); update(); });
        phone.addEventListener('input', () => { onChange({ phone: phone.value }); update(); });
        node.addEventListener('submit', (e) => { e.preventDefault(); if (!submit.disabled) onSubmit(); });
        update();
        return node;
    }
}

export default { OrderStep1View, OrderStep2View };

