import { ingredientsList, modalProductTitle, modalProductImage, modalProductDescription, ingredientsCalories, modalProductPriceCount, modalProduct, modalProductBtn } from "./elements.js";
import { getData } from "./getData.js";
import { PREFIX_PRODUCT, API_URL } from "./const.js";



// откртыие модалки товара:
export const openModal = async (id) => {                    // тк  в этой фукнуии будет запрос на сервер, поэтому поставим фукнции async, .then() не будем использовать, им щас редко пользуются

      const product = await getData(`${API_URL}${PREFIX_PRODUCT}/${id}`);            // { id, title, descrition,  price, weight, image }
      console.log('product feom sever ', product);

      modalProductTitle.textContent = product.title;
      modalProductImage.src = `${API_URL}/${product.image}`;
      modalProductDescription.textContent = product.description;
      ingredientsCalories.textContent = `${product.weight}кг  ${product.calories}кал`;
      modalProductPriceCount.textContent = product.price;


      // 1 ый вариант:
      ingredientsList.textContent = ''; //  очищаем спсико изначально
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

      modalProductBtn.dataset.idProduct = product.id;                           // кнопке Добавить (в модалке)  добавили дата-атрибут id-product
      modalProduct.classList.add('modal_open');                         // сперва заполняем модалку, а потом  открываем  ее
};

