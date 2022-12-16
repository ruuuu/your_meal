// форма отправки заказа:

import { modalDeliveryForm, orderList, orderTotalAmount, orderCount, modalDeliveryContainer } from "./elements.js";
import { clearCart } from "./cart.js";


export const orderController = (getCart) => {   // передаем фукнию getCart(), а можно было просто импортровать сюда эту функцию

      const checkDelivery = () => {
            if (modalDeliveryForm.format.value === 'pickup') {                // если выбрали радиокнпоку Самовывоз
                  modalDeliveryForm.addressInfo.classList.add('modal-delivery__fieldset-input_hide');               // у эл-та <fieldset  name="addressInfo"> есть атрибут name="addressInfo". К нему обращаемся так: modalDeliveryForm.addressInfo
            }
            if (modalDeliveryForm.format.value === 'delivery') {
                  modalDeliveryForm.addressInfo.classList.remove('modal-delivery__fieldset-input_hide');
            }
      }

      //  переклчение радиобаттонов  в модалке Оформить заказ:
      //  событие вешаем не на радиокнопки, а на всю  форму. change - событие  переключения радиокнопок/чекбокос/выпадающих списков 
      modalDeliveryForm.addEventListener('change', checkDelivery);  // как только натсупит событие, так вызовется перданная фукнция. Скобик не стави у нее, иначе вызовется сразу не дожидаясь настпуления события 

      //() => {                   
      // if (modalDeliveryForm.format.value === 'pickup') {                // если выбрали радиокнпоку Самовывоз
      //       modalDeliveryForm['address - info'].classList.add('modal-delivery__fieldset-input_hide');               // тк  modalDeliveryForm.address-info не срабоатет(потмоу что здесь значеие атрибута name состоит из двух слов), то берем значение атрибута name в квадрат скобки
      // }
      // else {
      //       modalDeliveryForm['address - info'].classList.remove('modal-delivery__fieldset-input_hide');
      // }
      // console.log('modalDeliveryForm.format.value === pickup ', modalDeliveryForm.format.value === 'pickup');
      //});


      // отппавка данных на сервер:
      modalDeliveryForm.addEventListener('submit', (evt) => {     //  событие  отправки формы
            evt.preventDefault();                                 // отменяам действие по умолчаию, это  перезагурка страницы после отправки
            const formData = new FormData(modalDeliveryForm);                        // объект FormData(form) позволяет получить данные из полей формы через атрибут name
            console.log('Object.fromEntries(formData)  ', Object.fromEntries(formData));        // выведет объект {address: '',  name: 'Руфина',  phone: '897656709878',  floor: '', format: 'pickup'}

            const data = Object.fromEntries(formData);                        // data = {address: '',  name: 'Руфина',  phone: '897656709878',  floor: '',  format: 'pickup'}
            data.order = getCart();                                                   // добавили к объекту свойство order, получтм  товары в корзине: [{id: , count: }, {id: , count: }, {id: , count: }]
            console.log('data ', data);

            // отправка данных на сервер https://63895b67c5356b25a2feb4a8.mockapi.io/order:
            fetch('https://reqres.in/api/users', {                           //   fetch() возвращаает промис, это асинхронная фукнция
                  method: 'post',                                         // каким методом отправляем данные: POST, PUTCH, DELETE
                  body: JSON.stringify(data),                             // объект data преборазовываем в  JSON:   JSON.stringify(data) 
            })
                  .then(response => response.json())                      // полная запись: {return response.json()}.  response.json() вернет промис
                  //.then(data => console.log('data from server ', data))
                  .then((response) => {

                        modalDeliveryForm.reset();                      //  очищаем форму
                        checkDelivery();                                // проверяем чтобы при рабиодбатонне САмовывоз, убрался блок с  адресом
                        modalDeliveryContainer.innerHTML = `   
                              <h2> Спасибо большое за заказ! </h2>  
                              <p> Ваш номер заказа ${response.id} </p>
                              <p>ваш заказ: </p>
                        `;

                        //debugger
                        const ul = document.createElement('ul');
                        data.order.forEach(item => {
                              const li = document.createElement('li');
                              li.textContent = item.id;
                              ul.append(li);

                        });

                        modalDeliveryContainer.append(ul);




                        // мой вариант: 
                        // modalDeliveryForm.innerHTML = '';
                        // modalDeliveryForm.textContent = 'Ваш заказ принят';
                        // localStorage.setItem('cart', []);         // очистка корзины(localStorage)
                        // clearCart();                              // либо здеь можно вызывать очитску вертки корзины
                        // orderList.innerHTML = '';                 //  очищаем верстку корзины
                        // orderTotalAmount.textContent = 0;
                        // orderCount.textContent = 0;
                  })
                  .then(clearCart)              // либо можно здесь вызвать очистку верcтки корзины, скобки у функции не указываем!
            //.finally(clearCart);             // либо можно здесь вызвать очистку верcтки корзины, скобки у функции не указываем!

      });

};