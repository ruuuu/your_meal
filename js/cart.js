// корзина:
import { catalogList, modalProductBtn, cartAmount, orderCount, orderList, orderTotalAmount, order, orderWrapTitle, orderSubmit, modalDelivery } from "./elements.js";
import { getData } from "./getData.js";
import { API_URL, PREFIX_PRODUCT } from "./const.js";
import { orderController } from "./orderController.js";




// получение корзины из localStorage:
const getCart = () => {
      //  товары  корзины храним в localStorage - это хранилище внутри браузера, в нем хранится все в виде строки-json, а не  в объектах
      const cartList = localStorage.getItem('cart');                          // ключ cart 
      // console.log('cartList string', cartList);

      if (cartList) {                     //  если корзина есть
            // console.log('JSON.parse(cartList); ', JSON.parse(cartList));                                                       // если cartList сущемтвует
            return JSON.parse(cartList);                                      // извлекаем даннеы из хранилища localStorage , преобразовываем строку в объект(или массив), то есть [{id: , count: }, {id: , count: }, {id: , count: }]
      }
      else {                                    //   если в хранилище ничего не было
            return [];                          // вернули пустой массив(изначальная корзина пустая ) 
      }

};





// отображение верстки товаров  корзины(в блок слева):
const renderCartList = async () => {                              // фукнция асинхронная тк в ней делаем запрос на сервер в getData()
      const cartList = getCart();                                 // получам данные из лок хранилища [{id: 34255, count: 3},  {id:1231 , count: 2},  {id: , count: }]
      console.log('cartList ', cartList);

      orderSubmit.disabled = !cartList.length;                    // если  корзина пустая, то кнопку отправки дизейблим

      const allIdProducts = cartList.map(element => {             // получим массив id-ов из Корзины
            return element.id;
      });
      // console.log('allIdProducts ', allIdProducts);

      const dataProducts = cartList.length ? await getData(`${API_URL}${PREFIX_PRODUCT}/?list=${allIdProducts}`) : [];          // массив  товаров из Корзины [{id:, title:, price:, weight:}, {id:, title:, price:, weight:}, {}]
      console.log('dataProducts from trash ', dataProducts);

      const countProduct = cartList.reduce((acc, item, index, array) => {                 // перебираем массив cartList,  acc - аккумулятор, к нему  будем прибавлять,  по умолчанию acc=item. Это как sum+=
            return (acc + item.count);
      }, 0);                              // 0-нач значение acc

      orderCount.textContent = countProduct;



      const listCardTrash = dataProducts.map((item) => {                // для каждого элемента массива  вызовется коллбэк и  ее результат кладется в массив listCardTrash = [li, li, li, li]
            const li = document.createElement('li');
            li.classList.add('order__item');
            li.dataset.idProduct = item.id;                             // добавляем li дата-атртбут, чтобы можно было обавлять или убавлять число товара

            // находим item(товар корзины) в cartList:
            const cartProduct = cartList.find((cartItem) => {               // перьираем  [{id:324, count:5},  {id:111, count:3},  {id:435, count:6}], найдет первй элемент массива удовлетворяющий услвоию
                  return (cartItem.id === item.id);                       // item.id -константа
            });


            li.innerHTML = `
                  <img src="${API_URL}/${item.image}" alt="Супер сырный" class="order__image">
                  <div class="order__product">
                        <h3 class="order__product-title">${item.title}</h3>
                        <p class="order__product-weight">${item.weight}г</p>
                        <p class="order__product-price">${item.price}₽</p>
                  </div>
                  <div class="order__product-count count">
                        <button class="count__minus" data-id-product=${item.id}>-</button>
                        <p class="count__amount">${cartProduct.count}</p>
                        <button class="count__plus" data-id-product=${item.id}>+</button>
                  </div>
            `;

            return li;
      });

      orderList.textContent = '';                           // очтщаем изначально спсиок
      orderList.append(...listCardTrash);                   // вставляем массив из li в ul


      orderTotalAmount.textContent = dataProducts.reduce((acc, item) => {
            const cartProduct = cartList.find((cartItem) => cartItem.id === item.id);                 // это сокращенная запись, расшифровка: { return (cartItem.id === item.id) }
            return acc + (item.price * cartProduct.count);
      }, 0);                                                // 0-нач значение acc;
};






// обновлние корзины(localStorage) cartList:
const updateCartList = (cartList) => {                                           // cartList =  [ {id: , count: }, {id: , count: } ]
      localStorage.setItem('cart', JSON.stringify(cartList));                   // записываем данные в  хранилище, JSON.stringify() переводит объект(или массив)  в строку(в хранилище данные хранятся в  виде строки)
      renderCartList();                                                         // отрисовываем верстку корзины
};




//  id  товара  добавляеммго  в корзину(localStorage), вызвовется кгда жмем на "Добавить"или кнопку +, а именно запсиываем его id и его количество, весь товар записывать смысла нет. Если count не передали, аанчит передаться count=1:
export const addCart = (id, count = 1) => {
      const cartList = getCart();               // [{id, count},{id, count},{id, count}] товары из корзины(localStorage)

      //   ищем, нет ли  уже товара c id в корзине:
      const product = cartList.find((item) => {       // переберет массив и  вернет первый элемент котрый удовлентворяет условиею
            return item.id === id;
      });

      if (product) {                      // если товар с его  id есть в Корзине, то увеличиваем его число. product = {id, count} 
            product.count += count;
      }
      else {                              // если товара  с id нет в Корзине, то добавляем его в корзину
            cartList.push({ id, count });       // добавили товар { id, count } в корзину 
      }

      updateCartList(cartList);                 // обновлнямм localStarge 
};






// удаление товаров из корзины  по id товара, когда жмем на кнпоку -, вызоветя этот метод:
export const removeCart = (id) => {                    // методом slice  перебрать массив, и удалить элемент(по его id) из массива
      const cartList = getCart();               // [{id: , count: },  {id: , count: }]
      const productIndex = cartList.findIndex((item) => item.id === id);            // получим индекс элемента, котрый удовелтворяет условию
      cartList[productIndex].count -= 1;

      if (cartList[productIndex].count < 1) {
            cartList.splice(productIndex, 1);  // удаляем элемет массива c индексом productIndex
      }
      updateCartList(cartList);                 // обновлням localStarge 
};



// очищение данных после отправки закза на сервер:
export const clearCart = () => {
      // localStorage.clear();                        // очистит весь localStorage, этот способ не подходит , тк если там будут еще данные по авторизации или др данные
      localStorage.removeItem('cart');                //    удаляем объект  с ключом cart
      renderCartList();                              // отрисуем верстку корзины
};



const cartController = () => {                                                // в контроллеры добавляются слушатели addEventListener

      // собвтие вешаем не на отдельную кнопку Добавить(на карточке товара), а на ее родителя(ul), это делегироваине события:
      catalogList.addEventListener('click', ({ target }) => {                 // вытащили из объекта  target(деструткуризация это значит вытащить поле  из объекта), вместо того чтобы писать evt.target
            if (target.closest('.product__add')) {                            // кнопка Добавить на картчоке
                  addCart(target.closest('.product').dataset.idProduct);       // передаем id  доавляемого товара                                          // добавляем товар по его id  в корзину
            }
      });


      modalProductBtn.addEventListener('click', () => {                 // кнопка Добавить в модалке товара
            addCart(modalProductBtn.dataset.idProduct, parseInt(cartAmount.textContent));             // parseInt() переводит из строки в целое  число
      });


      orderList.addEventListener('click', (evt) => {                      // обработчик вешаем не на кнопку =/-, а на ее родителя (ul), это называется делегирование события
            const targetPlus = evt.target.closest('.count__plus');       // кнпока +
            if (targetPlus) {
                  addCart(targetPlus.dataset.idProduct);                // переадем id
            }

            const targetMinus = evt.target.closest('.count__minus');       // кнпока -
            if (targetMinus) {
                  removeCart(targetMinus.dataset.idProduct);                // переадем id
            }
      });


      orderWrapTitle.addEventListener('click', () => {                  // при нажатии на Корзину, она раскрывается 
            order.classList.toggle('order_open');
      });


      orderSubmit.addEventListener('click', () => {
            modalDelivery.classList.add('modal_open');
      });


      modalDelivery.addEventListener('click', ({ target }) => {                           // либо вместо { target } можно передать evt и потом испльзвать evt.target
            if (target.closest('.modal__close') || modalDelivery === target) {                      // если нажали на крестик или на оверлей модалки
                  modalDelivery.classList.remove('modal_open');
            }

      });
};




export const cartInit = () => {
      cartController();
      renderCartList();                   // отображение товаров в коризне(locaoStorage) [{id: , count:}, {id: , count:}, {id: , count:}]
      addCart();                          // добавление товарв в коризну(locaoStorage)
      orderController(getCart);           //  передаем фукнцию getCart()
};