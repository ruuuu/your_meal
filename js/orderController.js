// форма отправки заказа:
import { modalDeliveryForm, orderList, orderTotalAmount, orderCount } from "./elements.js";


export const orderController = (getCart) => {   // передаем фукнию getCart(), а можно было просто импортровать сюда эту функцию

      // переклчение радиобаттонов  в мобалке Оформить заказ:
      modalDeliveryForm.addEventListener('change', () => {                    // событие вешаем не на радиокнопки, а на всю  форму. change - событие  переключения радиокнопок/чекбокос/выпадающих списков
            // if (modalDeliveryForm.format.value === 'pickup') {                // если выбрали радиокнпоку Самовывоз
            //       modalDeliveryForm['address - info'].classList.add('modal-delivery__fieldset-input_hide');               // тк  modalDeliveryForm.address-info не срабоатет(потмоу что здесь значеие атрибута name состоит из двух слов), то берем значение атрибута name в квадрат скобки
            // }
            // else {
            //       modalDeliveryForm['address - info'].classList.remove('modal-delivery__fieldset-input_hide');
            // }
            // console.log('modalDeliveryForm.format.value === pickup ', modalDeliveryForm.format.value === 'pickup');

            if (modalDeliveryForm.format.value === 'pickup') {                // если выбрали радиокнпоку Самовывоз
                  modalDeliveryForm.addressInfo.classList.add('modal-delivery__fieldset-input_hide');               // у эл-та <fieldset  name="addressInfo"> есть атрибут name="addressInfo". К нему обращаемся так: modalDeliveryForm.addressInfo
            }
            if (modalDeliveryForm.format.value === 'delivery') {
                  modalDeliveryForm.addressInfo.classList.remove('modal-delivery__fieldset-input_hide');
            }

      });


      // отппавка данных на сервер:
      modalDeliveryForm.addEventListener('submit', (evt) => {     //  событие  отправки формы
            evt.preventDefault();                                 // отменяам действие по умолчаию, это  перезагурка страницы после отправки
            const formData = new FormData(modalDeliveryForm);                        // объект FormData(form) позволяет получить данные из полей формы через атрибут name
            console.log('Object.fromEntries(formData)  ', Object.fromEntries(formData));        // выведет объект {address: '',  name: 'Руфина',  phone: '897656709878',  floor: '', format: 'pickup'}

            const data = Object.fromEntries(formData);                        // data = {address: '',  name: 'Руфина',  phone: '897656709878',  floor: '', format: 'pickup'}
            data.order = getCart();                                                   // добавили к объекту свойство order, получтм  товары в корзине: [{id: , count: }, {id: , count: }, {id: , count: }]
            console.log('data ', data);

            // отправка данных на сервер:
            fetch('https://reqres.in/api/users', {                           //   fetch() возвращаает промис, это асинхронная фукнция
                  method: 'post',                                         // каким методом отправляем данные: POST, PUTCH, DELETE
                  body: JSON.stringify(data),                             // объект data преборазовываем в  JSON:   JSON.stringify(data) 
            })
                  .then(response => response.json())                      // response.json() вернет промис
                  .then(() => {
                        modalDeliveryForm.innerHTML = '';
                        modalDeliveryForm.textContent = 'Ваш заказ принят';
                  });


            modalDeliveryForm.reset();                //  очищаем форму
            localStorage.setItem('cart', []);         // очистка корзины
            orderList.innerHTML = '';                 //  очищаем весртку корзины
            orderTotalAmount.textContent = 0;
            orderCount.textContent = 0;
      });

};