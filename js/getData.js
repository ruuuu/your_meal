// получение данных с сервера:
export const getData = async (url) => {
      const response = await fetch(url);        // полуичм промис(асинхронная операция), над его обработать(распаковать) методом then, либо вместо then использвать async/await

      if (response.ok) {
            return response.json();                //response.json() тоже асинхронный метод
      }




      // вместо fetch можно испоьзвоть XMLHTTPRequest:
      // const result = new Promise((resolve, reject) => {  // если статус ответа успшен, то вызовется фукнция resolve, иначе reject
      //       const xml = new XMLHttpRequest();
      //       xml.open('get', url); // парвым парамтером указываем метод, потмо урл сервера

      //       xml.addEventListener('load', () => {
      //             if (xml.status === 200) {
      //                   resolve(xml.response); // пока не вызовется resolve(), в response  будет промис
      //             }
      //             else {
      //                   reject(new Error(xml.statusText))
      //             }
      //       });

      //       xml.send();

      // });
      result.then((response) => { // response это то, что вернет функциz resolve(); переданный коллбэк запутсится только тогда, когда завершится промис
            console.log(response);
      })
      // return response;

};