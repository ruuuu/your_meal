import { navigationList, navigationListItems, catalogTitle } from "./elements.js";
import { renderListProduct } from "./renderListProduct.js";


// фильрация товаров по категориям:

export const navigationListController = () => {

      navigationList.addEventListener('click', (evt) => {         // вместо того чтобы вешать клик на каждую кнпоку, повесили  клик на их родителя, это  нзв делегирование события
            const categoryItem = evt.target.closest('.navigation__button');         //  получим нажатый элемент
            //console.log(categoryItem);

            if (!categoryItem) {          // если элменат нет
                  return;                 // ничего дальше не будет выполняться
            }

            navigationListItems.forEach((button) => {         // перебираем кнопки
                  if (button === categoryItem) {
                        button.classList.add('navigation__button_active');
                        catalogTitle.textContent = button.textContent;
                        renderListProduct(button.dataset.category);                               //button.dataset.category -  получаем значение дата-атрибута data-category
                  } else {
                        button.classList.remove('navigation__button_active');                   //  у сотальных кнпок убираем класс
                  }
            });
      });

};