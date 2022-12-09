import React, { useState, useEffect } from "react";
import { products as productsFromData } from "../data/products";
import Product from "./product";
import SortSelect from "./sortSelect";
import _ from "lodash";

const sortOptions = [
  {
    value: "priceASC",
    label: "Цена по возрастанию",
    sort: (products) => _.orderBy(products, ["price"], ["asc"])
  },
  {
    value: "priceDESC",
    label: "Цена по убыванию",
    sort: (products) => _.orderBy(products, ["price"], ["desc"])
  },
  {
    value: "ratingASC",
    label: "Рейтинг по возрастанию",
    sort: (products) => _.orderBy(products, ["rating.rate"], ["asc"])
  },
  {
    value: "ratingDESC",
    label: "Рейтинг по убыванию",
    sort: (products) => _.orderBy(products, ["rating.rate"], ["desc"])
  }
];

const ProductList = () => {
  const [products] = useState(productsFromData);

  // Переменная для хранения сортированных товаров
  const [sortProducts, setSortProducts] = useState(productsFromData);
  // Установим сортировку по умолчанию
  const [sortSign, setSortSign] = useState("priceDESC");
  const handleChangeSortSign = (e) => {
    setSortSign(e.target.value);
  };

  // отслеживаем изменение признака сортировки или списка товаров
  useEffect(() => {
    // В sortOptions ищем признак по которому сортируем
    const findOption = sortOptions.find(({ value }) => value === sortSign);

    // Если такой признак есть
    if (findOption) {
      // Вызываем нужный метод сортировки
      setSortProducts(findOption.sort(products));
    } else {
      // Если не нашли то просто устанавливаем продукты
      setSortProducts(products);
    }
  }, [sortSign, products]);

  return (
    <div className="container mt-t">
      <div>
        <SortSelect
          value={sortSign}
          options={sortOptions}
          onSort={handleChangeSortSign}
        />
      </div>
      <div className="row mt-4">
        {sortProducts.map((product) => (
          <Product key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
