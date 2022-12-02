import { navigationList, navigationListItems, catalogTitle } from "./elements.js";

// фильрация товаров по категориям:

export const navigationListController = () => {

      navigationList.addEventListener('click', (evt) => {         // вместо того чтобы вешать клик на каждую кнпоку, повеси  клик на их родителя, это  нзв делегирование
            const categoryItem = evt.target.closest('.navigation__button');         //  получим нажатый элемент
            console.log(categoryItem);

            if (!categoryItem) {          // если элменат нет
                  return;                 // ничего дальше не будет выполняться
            }

            navigationListItems.forEach(button => {         // перебираем кнопки
                  if (button === categoryItem) {
                        button.classList.add('navigation__button_active');
                        catalogTitle.textContent = button.textContent;
                  } else {
                        button.classList.remove('navigation__button_active');                   //  у сотальных кнпок убираем класс
                  }
            });
      });

};