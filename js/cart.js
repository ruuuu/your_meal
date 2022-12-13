// корзина:
import { catalogList, modalProductBtn, cartAmount, orderCount, orderList, orderTotalAmount } from "./elements.js";
import { getData } from "./getData.js";
import { API_URL, PREFIX_PRODUCT } from "./const.js";


// получение корзины из localStorage:
const getCart = () => {
      //  товары  корзины храним в localStorage - это хранилище внутри браузера, в нем хранится все в виде строки-json, а не  в объектах
      const cartList = localStorage.getItem('cart');                          // ключ cart 
      //console.log('cartList string', cartList);

      if (cartList) {
            //console.log('JSON.parse(cartList); ', JSON.parse(cartList));                                                       // если cartList сущемтвует
            return JSON.parse(cartList);                                      // извлекаем даннеы и хранилища , преобразовываем строку в объект(или массив), то есть [{id: , count: }, {id: , count: }, {id: , count: }]
      }
      else {                                    //   если в хранилище ничего не было
            return [];                          // вернули пустой массив(изначальная корзина пустая ) 
      }

};







// отображение верстки товаров в корзине:
const renderCartList = async () => {                        // фукнция асинхронная тк в ней делаем запрос на сервер в getData()
      const cartList = getCart();                           // получам данные из лок хранилища [{id: 34255, count: 3},  {id:1231 , count: 2},  {id: , count: }]

      const allIdProducts = cartList.map(element => {       //  получим массив id ов
            return element.id;
      });
      // console.log('allIdProducts ', allIdProducts);

      const dataProducts = await getData(`${API_URL}${PREFIX_PRODUCT}/?list=${allIdProducts}`);          // массив  товаров из Корзины [{id:, title:, price:, weight:}, {id:, title:, price:, weight:}, {}]
      // console.log('dataProducts ', dataProducts);

      const countProduct = cartList.reduce((acc, item, index, array) => {      // перебираем массив cartList,  acc - аккумулятор, к нему  будем прибавлять,  по умолчанию acc=item. Это как sum+=
            return (acc + item.count);
      }, 0);                              // 0-нач значение acc

      orderCount.textContent = countProduct;



      const listCardTrash = dataProducts.map((item) => {                // для каждого элемента массива  вызовется коллбэк и  ее результат кладется в массив listCardTrash = [li, li, li, li]
            const li = document.createElement('li');
            li.classList.add('order__item');
            li.dataset.idProduct = item.id;                             // добавляем li дата-атртбут, чтобы можно было обавлять или убавлять число товара

            const cartProduct = cartList.find((cartItem) => {               // перьираем  [{id:324, count:5},  {id:111, count:3},  {id:435, count:6}]
                  return (cartItem.id === item.id);                       // item.id -константа
            });

            // console.log('cartProduct after find', cartProduct);                 // {id:324, count:5}
            // let sum = 0;
            // const commonPrice = dataProducts.forEach((item) => {
            //       sum += item.price * cartProduct.count;
            // });

            // orderTotalAmount.textContent = commonPrice;

            li.innerHTML = `
                  <img src="${API_URL}/${item.image}" alt="Супер сырный" class="order__image">
                  <div class="order__product">
                        <h3 class="order__product-title">${item.title}</h3>
                        <p class="order__product-weight">${item.weight}г</p>
                        <p class="order__product-price">${item.price}₽</p>
                  </div>
                  <div class="order__product-count count">
                        <button class="count__minus">-</button>
                        <p class="count__amount">${cartProduct.count}</p>
                        <button class="count__plus">+</button>
                  </div>
            `;

            return li;
      });

      orderList.textContent = '';                           // очтщаем изначально спсиок

      orderList.append(...listCardTrash);                   // всавляем массив из li в ul
};











// обновлние корзины(localStorage) cartList:
const updateCartList = (cartList) => {                                  // cartList =  [ {id, count}, {id, count} ]
      localStorage.setItem('cart', JSON.stringify(cartList));                   // записываем данные в  хранилище, JSON.stringify() переводит объект(или массив)  в строку(в хранилище данные хранятся в  виде строки)
      renderCartList();
};



// добавление товара в корзину(localStorage), вызвовется кгда жмем на "Добавить"или кнопку +, а именно запсиываем его id и его количество, весь товар записывать смысла нет. Если count не передали, аанчит передаться count=1:
const addCart = async (id, count = 1) => {
      const cartList = getCart();               // [{id, count},{id, count},{id, count}] товары из корзины(localStorage)
      const product = cartList.find((item) => {       // переберет массив и  вернет первый элемент котрый удовлентворяет условиею
            return item.id === id;
      });

      if (product) {                      // product = {id, count} 
            product.count += count;
      }
      else {
            cartList.push({ id, count });       // добавили товар в корзину 
      }

      updateCartList(cartList);                 // обновлнямм localStarge 
};






// удаление товаров из корзины  по id товара, когда жмем на кнпоку -, вызоветя этот метод:
const removeCart = (id) => { // методом slice  пербрать массив, и удалить элемент(по его id) из массива
      const newCartList = cartList.slice(index1, index2);


      updateCartList(newCartList);                 // обновлнямм localStarge 
};




const cartController = () => {                                                // в контроллеры добавляются слушатели


      // собвтие вешаем не на отдельную кнопку Добавить, а на ее родителя:
      catalogList.addEventListener('click', ({ target }) => {                 // вытащили из объекта  target(деструткуризация это значит вытащить поле  из объекта), вместо того чтобы писать evt.target
            if (target.closest('.product__add')) {                            // кнопка Добавить на картчоке
                  addCart(target.closest('.product').dataset.idProduct);       // передаем id  доавляемого товара                                          // добавляем товар по его id  в корзину
            }
      });


      modalProductBtn.addEventListener('click', () => {                 // кнопка Добавить в модалке
            parseInt(addCart(modalProductBtn.dataset.idProduct, cartAmount.textContent)); // parseInt() переводит из строки в число
      });
};




export const cartInit = () => {
      cartController();
      renderCartList();                   // отображение товаров в коризне(locaoStorage) [{id: , count:}, {id: , count:}, {id: , count:}]
      addCart();                          // добавление товарв в коризну(locaoStorage)

};