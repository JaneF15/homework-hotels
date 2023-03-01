class Product {

  constructor(name, price, quantity, description) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.description = description;
  }

}

let arrOfProduct = [new Product('стол', 10000, 40, 'материал: дерево; цвет: белый; вес: 15000г'),
  new Product('стул', 2000, 70, 'материал: пластик; цвет: белый; вес: 3400г'),
  new Product('шкаф', 10500, 55, 'материал: лдсп; цвет: белый; вес: 68000г'),
  new Product('стеллаж', 3000, 60, 'материал: лдсп; цвет: белый; вес: 20000г'),
  new Product('диван', 8000, 80, 'материал: фанера, пенополиуретан, велюр; цвет: абстракция; вес: 12700г'),
  new Product('кресло', 7200, 20, 'материал: дерево, пенополиуретан, велюр; цвет: зеленый; вес: 20000г')];


  let productFilterer = {

    filterProducts(str) {

      let options = str.split('&');
      let result = this.slice();

      for (let option of options) {

        let content = option.split('-');

        let name = content[0];
        let filterMethod = content[1];
        let filterValue = content[2];

        if (content.length == 3) {

          result = 

          (filterMethod == 'contains') ? 
            result.filter(product => product[name].includes(filterValue)) :

          (filterMethod == 'starts') ?
            result.filter(product => product[name].startsWith(filterValue)) :

          (filterMethod == 'ends') ? 
            result.filter(product => product[name].endsWith(filterValue)) :

            [];

        }

        if (content.length == 2) {

          let filterMethod = (content[1].at(1) == '=') ? content[1].slice(0, 2) : content[1].at(0);
          let filterValue = (filterMethod.length == 2) ? content[1].slice(2) : content[1].slice(1);

          result = 

          (filterMethod == '<') ? 
            result.filter(product => product[name] < filterValue) :

          (filterMethod == '=') ?
            result.filter(product => product[name] == filterValue) :

          (filterMethod == '>') ? 
            result.filter(product => product[name] > filterValue) :

          (filterMethod == '<=') ? 
            result.filter(product => product[name] <= filterValue) :

          (filterMethod == '>=') ? 
            result.filter(product => product[name] >= filterValue) :

            [];

        }

      }

      return result;
    }

  };

  Object.assign(Array.prototype, productFilterer);

  //console.log(arrOfProduct.filterProducts('name-contains-т&price-=3000&quantity->5&description-ends-г'));
  //console.log(arrOfProduct.filterProducts('name-starts-с&quantity-<=60'));
  //console.log(arrOfProduct.filterProducts('description-contains-белый').filterProducts('description-contains-лдсп'));