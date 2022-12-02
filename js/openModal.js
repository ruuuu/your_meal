import { ingredientsList, modalProductTitle, modalProductImage, modalProductDescription, ingredientsCalories, modalProductPriceCount, modalProduct } from "./elements.js";


export const openModal = (product) => {

      modalProductTitle.textContent = product.title;
      modalProductImage.src = product.image;
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
      const ingredientsListItems = product.ingredients.map((item) => { //  полуичм новый масиив
            const li = document.createElement('li');
            li.classList.add('ingredients__item');
            li.textContent = item;
            return li; //  положили в массив этот li
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

      modalProduct.classList.add('modal_open');                         // сперва заполняем молаку, а потом  открываем  ее
};

