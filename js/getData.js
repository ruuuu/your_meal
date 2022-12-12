// получение данных с сервера:
export const getData = async (url) => {
      const response = await fetch(url);        // полуичм промис, над его обработать(распаковать) методом then, либо вместо then использвать async/await

      if (response.ok) {
            return response.json();                //response.json() тоже асинхронный метод
      }

};