// корзина:
import { catalogList, modalProductBtn, cartAmount } from "./elements.js";


// получение корзины из localStorage:
const getCart = () => {
      //  товары  корзины храним в localStorage - это хранилище внутри браузера, в нем хранится все в виде строки-json, а не  в объектах
      const cartList = localStorage.getItem('cart');                          // ключ cart
      console.log('cartList ', cartList);

      if (cartList) {                                                         // если cartList сущемтвует
            return JSON.parse(cartList);                                      // преобразовываем строку в объект(или массив), то есть [{},{},{}]
      }
      else {                                    //   если в хранилище ничего не было
            return [];                          // вернули пустой массив(путсая корзина)
      }

};



// отображение товаров в корзине:
const renderCartList = async () => {                 // фукнция асинхронная ттк в ней делаем запрос на сервер
      const cartList = getCart(); // получам данные из лок хранилища [{},{},{}]
      console.log('корзина', cartList);
};




// обновлние корзины(localStorage) cartList:
const updateCartList = (cartList) => {         // cartList =  [ {id, count}, {id, count} ]
      localStorage.setItem('cart', JSON.stringify(cartList));                   // записываем данные в  хранилище, JSON.stringify() переводит объект(или массив)  в строку
      renderCartList();
};



// добавление товара в корзину(localStorage), вызвовется кгда жмем на "Добавить"или кнопку +, а именно запсиываем его id и его количество, весь товар записывать смысла нет. Если count не передали, аанчит передаться count=1:
const addCart = async (id, count = 1) => {
      const cartList = await getCart();               // [{id, count},{id, count},{id, count}] товары из корзины(localStorage)
      const product = cartList.find((item) => {       // переберет массиви  вернет первый элемент котрый удовлентворяет условиею
            return item.id === id;
      });

      if (product) {                      // product={}-товар
            product.count += count;
      }
      else {
            cartList.push({ id, count });   // добавили товар в корзину 
      }


      updateCartList(cartList); // обновлнямм localStarge 
};



// удаление товаров из корзины  по id товара, когда жмем на кнпоку -, вызоветя этот метод:
const removeCart = (id) => {

};



const cartController = () => { // в конроллеры добавляются слушатели

      catalogList.addEventListener('click', ({ target }) => {                 // вытащили из объекта  target, вместо того чтобы писать evt.target
            if (target.closest('.product__add')) {                            // кнопка Добавить
                  addCart(target.closest('.product').dataset.idProduct);       // передаем id  доавляемого товара                                          // добавляем товар по его id  в корзину
            }
      });


      modalProductBtn.addEventListener('click', () => {                 // кнопка Добавить в модалке
            parseInt(addCart(modalProductBtn.dataset.idProduct, cartAmount.textContent)); // parseInt() переводит из строки в число
      });
};




export const cartInit = () => {
      cartController();
      renderCartList(); // отображение товаров в коризне(locaoStorage)
      addCart(); // добавление товарв в коризну(locaoStorage)
};