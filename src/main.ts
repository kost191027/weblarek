import './scss/styles.scss';
import { Api } from './components/base/Api';
import { API_URL } from './utils/constants';
import { apiProducts } from './utils/data';
import { Products } from './components/Models/Products';
import { Cart } from './components/Models/Cart';
import { Buyer } from './components/Models/Buyer';
import StoreApi from './components/Models/StoreApi';
import Modal from './components/Views/Modal';
import GalleryView from './components/Views/Gallery';
import PreviewView from './components/Views/Preview';
import BasketView from './components/Views/Basket';
import { IOrderRequest } from './types';

// Instantiate models
const productsModel = new Products();
const cartModel = new Cart();
const buyerModel = new Buyer();

// Test Products model with local mock
productsModel.setItems(apiProducts.items);
console.log('Массив товаров из каталога (локальные данные):', productsModel.getItems());

// Cart model tests
const first = productsModel.getItems()[0];
if (first) {
  cartModel.add(first);
  console.log('Корзина после добавления первого товара:', cartModel.getItems());
  console.log('Сумма корзины:', cartModel.getTotal());
  console.log('Количество товаров в корзине:', cartModel.getCount());
  console.log('Товар в корзине?', cartModel.has(first.id));
  cartModel.remove(first.id);
  console.log('Корзина после удаления товара:', cartModel.getItems());
}

// Buyer model tests
buyerModel.set({ address: 'Москва', payment: 'card' });
buyerModel.setEmail('user@example.com');
buyerModel.setPhone('+79990001122');
console.log('Данные покупателя:', buyerModel.get());
console.log('Ошибки валидации покупателя:', buyerModel.validate());
buyerModel.clear();
console.log('Данные покупателя после очистки:', buyerModel.get());

// API fetch and save into Products model
const api = new Api(API_URL);
const storeApi = new StoreApi(api);

// Views
const modal = new Modal();
const gallery = new GalleryView();
const preview = new PreviewView();
const basketView = new BasketView();

function openPreview(id: string) {
  const product = productsModel.getById(id);
  if (!product) return;
  const node = preview.render(product, cartModel.has(product.id), (p) => {
    if (cartModel.has(p.id)) cartModel.remove(p.id); else cartModel.add(p);
    modal.close();
    updateBasketCounter();
  });
  modal.open(node);
}

function updateBasketCounter() {
  const counter = document.querySelector('.header__basket-counter') as HTMLElement;
  if (counter) counter.textContent = String(cartModel.getCount());
}

function openBasket() {
  const node = basketView.render(
    cartModel.getItems(),
    cartModel.getTotal(),
    (id) => { cartModel.remove(id); openBasket(); updateBasketCounter(); },
    () => openOrderStep1()
  );
  modal.open(node);
}

async function openOrderStep1() {
  const { OrderStep1View } = await import('./components/Views/OrderForms');
  const view = new OrderStep1View();
  const node = view.render(
    buyerModel.get(),
    (patch) => buyerModel.set(patch),
    () => openOrderStep2()
  );
  modal.open(node);
}

async function openOrderStep2() {
  const { OrderStep2View } = await import('./components/Views/OrderForms');
  const view = new OrderStep2View();
  const node = view.render(
    buyerModel.get(),
    (patch) => buyerModel.set(patch),
    () => submitOrder()
  );
  modal.open(node);
}

async function submitOrder() {
  const data = buyerModel.get();
  const order: IOrderRequest = {
    items: cartModel.getItems().map((i) => i.id),
    payment: data.payment!,
    address: data.address,
    email: data.email,
    phone: data.phone,
    total: cartModel.getTotal(),
  };
  try {
    const res = await storeApi.createOrder(order);
    cartModel.clear();
    buyerModel.clear();
    updateBasketCounter();
    const tpl = document.getElementById('success') as HTMLTemplateElement;
    const node = tpl.content.firstElementChild!.cloneNode(true) as HTMLElement;
    (node.querySelector('.order-success__description') as HTMLElement).textContent = `Списано ${res.total} синапсов`;
    (node.querySelector('.order-success__close') as HTMLButtonElement).addEventListener('click', () => modal.close());
    modal.open(node);
  } catch (e) {
    console.warn('Ошибка оформления заказа', e);
    const errNode = document.querySelector('.form__errors') as HTMLElement | null;
    if (errNode) errNode.textContent = 'Не удалось выполнить оплату. Повторите попытку.';
  }
}

// Basket button
document.querySelector('.header__basket')?.addEventListener('click', openBasket);

// Load products and render
storeApi.getProducts().then((items) => {
  productsModel.setItems(items);
  gallery.render(productsModel.getItems(), openPreview);
}).catch(() => {
  // Fallback to local mock
  productsModel.setItems(apiProducts.items);
  gallery.render(productsModel.getItems(), openPreview);
});

updateBasketCounter();
