export class Modal {
    private container: HTMLElement;
    private content: HTMLElement;
    private closeBtn: HTMLElement;

    constructor(selector = '#modal-container') {
        const container = document.querySelector(selector) as HTMLElement;
        if (!container) throw new Error('Modal container not found');
        this.container = container;
        this.content = container.querySelector('.modal__content') as HTMLElement;
        this.closeBtn = container.querySelector('.modal__close') as HTMLElement;

        this.onBackdropClick = this.onBackdropClick.bind(this);
        this.close = this.close.bind(this);

        this.closeBtn.addEventListener('click', this.close);
        this.container.addEventListener('mousedown', this.onBackdropClick);
    }

    open(node: HTMLElement) {
        this.content.replaceChildren(node);
        this.container.classList.add('modal_active');
        document.body.classList.add('is-modal-open');
    }

    close() {
        this.container.classList.remove('modal_active');
        document.body.classList.remove('is-modal-open');
        this.content.replaceChildren();
    }

    private onBackdropClick(e: MouseEvent) {
        if (e.target === this.container) this.close();
    }
}

export default Modal;

