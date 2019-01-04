import React from "react";
import ProductsList from "../components/productList";
import Product from "../components/product";

const Products = ({ products, addToCart }) => (
  <ProductsList title="Products">
    {products.map(product => (
      <Product
        key={product.id}
        product={product}
        onAddToCartClicked={() => addToCart(product.id)}
      />
    ))}
  </ProductsList>
);
