
const productDetail = document.querySelector('.product__detail'); // button
const modalProduct = document.querySelector('.modal_product');
const catalogList = document.querySelector('.catalog__list'); // ul

const product = {             // пока это даннеы с сервера
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

const modalProductTitle = document.querySelector('.modal-product__title');
const modalProductDescription = document.querySelector('.modal-product__description');
const ingredientsList = document.querySelector('.ingredients__list');
const ingredientsCalories = document.querySelector('.ingredients__calories');
const modalProductPriceCount = document.querySelector('.modal-product__price-count');
const modalProductImage = document.querySelector('.modal-product__image');

modalProductTitle.textContent = product.title;
modalProductImage.src = product.image;
modalProductDescription.textContent = product.description;
ingredientsCalories.textContent = product.calories;
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



catalogList.addEventListener('click', (evt) => {                           // чтбы не вешать клик на каждый title  картчоки,мы вшаем  клик на их родителя (catalogList), это назввается делегирование. При клике на любую картчоку откроется модалка
      const target = evt.target;
      if (target.closest('.product__detail') || target.closest('.product__image')) {                               // если у нажатого жлемент/его родителя есть класс .product__detail
            modalProduct.classList.add('modal_open');
      }

});


// evt объект события котрое созданется  при назсутпоени собтия движком js
modalProduct.addEventListener('click', (evt) => {              // чтоыб не вешать обработчик  отдельно на оверлей и на  крестик, мы сразу вешаем его на их родител, это названиеся делегиерование
      const target = evt.target;                               // нажатй элемегт

      if (target.closest('.modal__close') || target === modalProduct) {                   //  если  наадали на кретсик или нажатый элемент или его родитель имеет класс modal__close
            modalProduct.classList.remove('modal_open');                            // закрываем модалку
      }
});

