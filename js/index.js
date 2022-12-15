import { modalProduct, catalogList } from "./elements.js";
import { openModal } from "./openModal.js";
import { renderListProduct } from "./renderListProduct.js";
import { navigationListController } from './navigationListController.js';
import { cartInit } from "./cart.js";





//const item = createCardProduct(burgerMax);
//console.log('item  ', item);
//catalogList.append(createCardProduct(burgerMax), createCardProduct(burgerMax), createCardProduct(burgerMax));       // append можеи приримтаь нескоько элементов




catalogList.addEventListener('click', (evt) => {                           // чтбы не вешать клик на каждый title  картчоки,мы вшаем  клик на их родителя (catalogList), это назввается делегирование. При клике на любую картчоку откроется модалка
      const target = evt.target;
      if (target.closest('.product__detail') || target.closest('.product__image')) {  // если у нажатого жлемент/его родителя есть класс .product__detail
            const id = target.closest('.product').dataset.idProduct;                      //  получаем значеие дата атрибута
            //console.log(id);
            openModal(id);
      }


});


// evt объект события котрое созданется  при назсутпоени собтия движком js
modalProduct.addEventListener('click', (evt) => {              // чтоыб не вешать обработчик  отдельно на оверлей и на  крестик, мы сразу вешаем его на их родител, это названиеся делегиерование
      const target = evt.target;                               // нажатй элемегт

      if (target.closest('.modal__close') || target === modalProduct) {                   //  если  наадали на кретсик или нажатый элемент или его родитель имеет класс modal__close
            modalProduct.classList.remove('modal_open');                                  // закрываем модалку
      }
});



const init = () => {                      // отсюда все начинается
      renderListProduct('burger');                // рендер карточек
      navigationListController(renderListProduct);         // фильтрация, renderListProduct это коллбэк функция  
      cartInit();

};


init(); 