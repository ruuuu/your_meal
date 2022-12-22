import { ingredientsList, modalProductTitle, modalProductImage, modalProductDescription, ingredientsCalories, modalProductPriceCount, modalProduct, modalProductBtn } from "./elements.js";
import { getData } from "./getData.js";
import { PREFIX_PRODUCT, API_URL } from "./const.js";
import { addCart, removeCart } from './cart.js';



// отрисовка верстки модалки товара:
export const openModal = async (id) => {                    // тк  в этой фукнуии будет запрос на сервер, поэтому поставим фукнции async, .then() не будем использовать, им щас редко пользуются

      const product = await getData(`${API_URL}${PREFIX_PRODUCT}/${id}`);            // { id, title, descrition,  price, weight, image }, ставим await тк запро на сервер идет 
      console.log('product feom sever ', product);





      ingredientsList.textContent = ''; //  очищаем спсико изначально
      // 1 ый вариант:
      // for (let i = 0; i < product.ingredients.length; i++) {
      //       const li = document.createElement('li');
      //       li.classList.add('ingredients__item');
      //       li.textContent = product.ingredients[i];
      //       ingredientsList.append(li);
      // }

      // 2-ой вариант:
      const ingredientsListItems = product.ingredients.map((item) => {              //  полуичм новый масиив
            const li = document.createElement('li');
            li.classList.add('ingredients__item');
            li.textContent = item;
            return li;                          //  положили в массив этот li
      });
      //console.log(ingredientsListItems); // [li.ingredients__item, li.ingredients__item]
      ingredientsList.append(...ingredientsListItems);

      // 3-ий вариант:
      // product.ingredients.forEach((item) => {
      //       const li = document.createElement('li');
      //       li.classList.add('ingredients__item');
      //       li.textContent = item;
      //       ingredientsList.append(li);
      // });

      modalProductTitle.textContent = product.title;
      modalProductImage.src = `${API_URL}/${product.image}`;
      modalProductDescription.textContent = product.description;
      ingredientsCalories.textContent = `${product.weight}кг  ${product.calories}ккал`;
      modalProductPriceCount.textContent = product.price;


      modalProductBtn.dataset.idProduct = product.id;                           // кнопке Добавить (в модалке товара)  добавили дата-атрибут id-product
      modalProduct.classList.add('modal_open');                         // сперва заполняем модалку, а потом  открываем  ее

      // modalProduct.addEventListener('click', (evt) => {                      // обработик вешаем не на кнопку =/-, а на ее родителя (модалка), это называется делегирование события
      //       const targetPlus = evt.target.closest('.count__plus');       // кнпока +
      //       if (targetPlus) {
      //             addCart(targetPlus.dataset.idProduct);                // переадем id
      //       }

      //       const targetMinus = evt.target.closest('.count__minus');       // кнпока -
      //       if (targetMinus) {
      //             removeCart(targetMinus.dataset.idProduct);                // переадем id
      //       }
      // });


};

