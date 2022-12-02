import { modalProduct, catalogList } from "./elements.js";
import { createCardProduct } from "./createCardProduct.js";
import { openModal } from "./openModal.js";
import { renderListProduct } from "./renderListProduct.js";
import { navigationListController } from './navigationListController.js';


const burgerMax = {             // пока это даннеы с сервера
      title: 'Бургер мах',
      price: '1000',
      weight: '500',
      calories: '1234',
      description: 'Огромный бургер, съешь сам или поделись с другими',
      image: 'img/megaburger.jpg',
      ingredients: [
            'Пшеничная булочка',
            'Мега котлета из говядины',
            'Много сыра',
            'Листья салата',
            'Чипотл'
      ]
};









//const item = createCardProduct(burgerMax);
//console.log('item  ', item);
//catalogList.append(createCardProduct(burgerMax), createCardProduct(burgerMax), createCardProduct(burgerMax));       // append можеи приримтаь нескоько элементов




catalogList.addEventListener('click', (evt) => {                           // чтбы не вешать клик на каждый title  картчоки,мы вшаем  клик на их родителя (catalogList), это назввается делегирование. При клике на любую картчоку откроется модалка
      const target = evt.target;
      if (target.closest('.product__detail') || target.closest('.product__image')) {  // если у нажатого жлемент/его родителя есть класс .product__detail
            openModal(burgerMax);
      }

});


// evt объект события котрое созданется  при назсутпоени собтия движком js
modalProduct.addEventListener('click', (evt) => {              // чтоыб не вешать обработчик  отдельно на оверлей и на  крестик, мы сразу вешаем его на их родител, это названиеся делегиерование
      const target = evt.target;                               // нажатй элемегт

      if (target.closest('.modal__close') || target === modalProduct) {                   //  если  наадали на кретсик или нажатый элемент или его родитель имеет класс modal__close
            modalProduct.classList.remove('modal_open');                            // закрываем модалку
      }
});



const init = () => {                      // отсюда все начинается
      renderListProduct();                // рендер карточек
      navigationListController();         // фильтрация  
};


init(); 