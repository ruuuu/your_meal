import { getData } from "./getData.js";
import { API_URL, PREFIX_PRODUCT } from "./const.js";
import { catalogList } from "./elements.js";
import { createCardProduct } from "./createCardProduct.js";



// рендер товараов на странице:
export const renderListProduct = async () => {
      catalogList.textContent = '';                                     //сперва  очищаем список , потом его будем заполнять

      const listProduct = await getData(`${API_URL}${PREFIX_PRODUCT}`);       // тк getData отправляем запрос на сервер, то это асинхронная операция, поэтому ставим async/await
      console.log('listProduct ', listProduct);

      const listCard = listProduct.map(createCardProduct);   // для каждого элемента массива  вызовется фукнция createCardProduct, и  ее результат кладется в массив listCard = [li, li, li, li]
      //console.log('listCard ', listCard);
      catalogList.append(...listCard);

};