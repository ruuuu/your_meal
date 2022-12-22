import { modalProduct, catalogList, modalProductBtn } from "./elements.js";
import { openModal } from "./openModal.js";
import { renderListProduct } from "./renderListProduct.js";
import { navigationListController } from './navigationListController.js';
import { cartInit } from "./cart.js";





// const item = createCardProduct(burgerMax);
// console.log('item  ', item);
// catalogList.append(createCardProduct(burgerMax), createCardProduct(burgerMax), createCardProduct(burgerMax));       // append можеи приримтаь нескоько элементов


const closeModal = (evt) => {
      console.log('evt', evt);
      if (evt.key === 'Escape') {         // если нажали на клавишу Escape
            modalProduct.classList.remove('modal_open');
            // removeEventListener сработает только, если передать название фукнции, а не  саму фунцию(безымянная функция)!!:
            document.removeEventListener('keydown', closeModal);    // при закрытии  окна, снимется обработчик. Чтобы  при нажатии клавиши(при закрытом окне),  функция closeModal()  не вызывалась
      }

};



catalogList.addEventListener('click', (evt) => {                           // чтбы не вешать клик на каждый title  картчоки,мы вшаем  клик на их родителя (catalogList), это назввается делегирование события. При клике на любую картчоку откроется модалка
      const target = evt.target;
      if (target.closest('.product__detail') || target.closest('.product__image')) {      // если у нажатого элемента/его родителя есть класс .product__detail
            const id = target.closest('.product').dataset.idProduct;                      //  получаем значеие дата атрибута
            //console.log(id);
            openModal(id);
            modalProductBtn.focus();            // наведение фокуса на кнпоку modalProductBtn
            document.addEventListener('keydown', closeModal);
      }
});



// evt объект события котрое создается  при наступлении собтия движком js
modalProduct.addEventListener('click', (evt) => {              // чтоыб не вешать обработчик  отдельно на оверлей и на  крестик, мы сразу вешаем его на их родител, это названиеся делегиерование
      const target = evt.target;                               // нажатй элемегт

      if (target.closest('.modal__close') || target === modalProduct) {                   //  если  наадали на кретсик или нажатый элемент или его родитель имеет класс modal__close
            modalProduct.classList.remove('modal_open');                                  // закрываем модалку
      }
});



const init = () => {                      // отсюда все начинается
      renderListProduct('burger');                // рендер карточек
      navigationListController();         // фильтрация
      cartInit();                                           // работа с  корзиной

};


init(); 