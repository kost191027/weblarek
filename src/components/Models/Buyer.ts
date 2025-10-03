import type { IBuyer, TPayment } from '../../../types/index';

export class Buyer {
    private data: IBuyer = {
        payment: null,
        email: '',
        phone: '',
        address: ''
    };

    setPayment(payment: TPayment): void {
        this.data.payment = payment;
    }

    setAddress(address: string): void {
        this.data.address = address;
    }

    setEmail(email: string): void {
        this.data.email = email;
    }

    setPhone(phone: string): void {
        this.data.phone = phone;
    }

    set(partial: Partial<IBuyer>): void {
        this.data = { ...this.data, ...partial };
    }

    get(): IBuyer {
        return { ...this.data };
    }

    clear(): void {
        this.data = { payment: null, email: '', phone: '', address: '' };
    }

    validate(): Partial<Record<keyof IBuyer, string>> {
        const errors: Partial<Record<keyof IBuyer, string>> = {};
        if (!this.data.payment) errors.payment = 'Не выбран вид оплаты';
        if (!this.data.address) errors.address = 'Укажите адрес доставки';
        if (!this.data.email) errors.email = 'Укажите емэйл';
        if (!this.data.phone) errors.phone = 'Укажите телефон';
        return errors;
    }
}

export default Buyer;

